use std::collections::HashMap;
use std::sync::Arc;
use std::time::{Duration, Instant};

use rand::RngCore;
use serde::Serialize;
use tokio::sync::{Mutex, Semaphore};
use turnstile_core::{ScanError, ScanRequest, ScanResult};

const JOB_TTL: Duration = Duration::from_secs(30 * 60);
const MAX_CONCURRENT_SCANS: usize = 4;

#[derive(Clone, Serialize)]
#[serde(tag = "status", rename_all = "camelCase")]
pub enum JobState {
    Running,
    Done { result: ScanResult },
    Failed { error: String },
}

pub struct Jobs {
    inner: Arc<Mutex<HashMap<String, (JobState, Instant)>>>,
    permits: Arc<Semaphore>,
}

impl Default for Jobs {
    fn default() -> Self {
        Self::new()
    }
}

impl Jobs {
    pub fn new() -> Self {
        Self {
            inner: Arc::new(Mutex::new(HashMap::new())),
            permits: Arc::new(Semaphore::new(MAX_CONCURRENT_SCANS)),
        }
    }

    fn mint_id() -> String {
        let mut bytes = [0u8; 16];
        rand::rng().fill_bytes(&mut bytes);
        bytes.iter().map(|b| format!("{b:02x}")).collect()
    }

    pub async fn get(&self, id: &str) -> Option<JobState> {
        let jobs = self.inner.lock().await;
        jobs.get(id).map(|(state, _)| state.clone())
    }

    async fn set(&self, id: &str, state: JobState) {
        let mut jobs = self.inner.lock().await;
        jobs.retain(|_, (_, at)| at.elapsed() < JOB_TTL);
        jobs.insert(id.to_string(), (state, Instant::now()));
    }

    pub async fn spawn<F, Fut>(&self, request: ScanRequest, run: F) -> String
    where
        F: FnOnce(ScanRequest) -> Fut + Send + 'static,
        Fut: std::future::Future<Output = Result<ScanResult, ScanError>> + Send,
    {
        let id = Self::mint_id();
        self.set(&id, JobState::Running).await;

        let jobs = Self {
            inner: Arc::clone(&self.inner),
            permits: Arc::clone(&self.permits),
        };
        let job_id = id.clone();

        tokio::spawn(async move {
            let _permit = jobs.permits.acquire().await;
            tracing::info!(job = %job_id, "scan started");

            let state = match run(request).await {
                Ok(result) => {
                    tracing::info!(
                        job = %job_id,
                        verdict = ?result.verdict,
                        scanned_to_height = result.scanned_to_height,
                        "scan complete"
                    );
                    JobState::Done { result }
                }
                Err(error) => {
                    tracing::warn!(job = %job_id, %error, "scan failed");
                    JobState::Failed {
                        error: error.to_string(),
                    }
                }
            };

            jobs.set(&job_id, state).await;
        });

        id
    }
}
