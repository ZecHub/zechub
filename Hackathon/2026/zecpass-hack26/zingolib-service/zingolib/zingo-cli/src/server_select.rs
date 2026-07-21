//! Dynamic server selection via `get_info()` against a curated list of indexers.
//!
//! When no `--server` is specified, we call `get_info()` on each URI in
//! `most_up_indexer_uris::MOST_UP_INDEXER_URIS` concurrently,
//! measure response time, and return the responsive servers sorted
//! from fastest to slowest.

use std::time::{Duration, Instant};

use crate::commands::RT;
use crate::most_up_indexer_uris::MOST_UP_INDEXER_URIS;
use zingo_netutils::{GrpcIndexer, Indexer as _};

/// A server that responded successfully to `get_info()`, with its measured latency.
#[derive(Debug)]
pub(crate) struct RankedServer {
    pub uri: http::Uri,
    pub latency: Duration,
}

/// Calls `get_info()` on all curated indexer URIs concurrently and
/// returns those that responded, sorted fastest to slowest.
///
/// Uses a per-server timeout so one slow server doesn't block the rest.
pub(crate) fn select_servers() -> Vec<RankedServer> {
    const GET_INFO_TIMEOUT: Duration = Duration::from_secs(5);

    let uris: Vec<http::Uri> = MOST_UP_INDEXER_URIS
        .iter()
        .filter_map(|s| s.parse::<http::Uri>().ok())
        .collect();

    println!("No --server specified. Probing {} indexers...", uris.len());

    let mut ranked: Vec<RankedServer> = RT.block_on(async {
        let mut handles = Vec::new();

        for uri in uris {
            handles.push(tokio::spawn(async move {
                let start = Instant::now();
                let mut indexer = match GrpcIndexer::new(uri.clone()).await {
                    Ok(i) => i,
                    Err(_) => return None,
                };
                match indexer.get_lightd_info(GET_INFO_TIMEOUT).await {
                    Ok(_info) => Some(RankedServer {
                        uri,
                        latency: start.elapsed(),
                    }),
                    _ => None,
                }
            }));
        }

        let mut results = Vec::new();
        for handle in handles {
            if let Ok(Some(ranked)) = handle.await {
                results.push(ranked);
            }
        }
        results
    });

    ranked.sort_by_key(|r| r.latency);

    if ranked.is_empty() {
        eprintln!("Warning: no indexers responded. Falling back to default.");
    } else {
        println!(
            "Selected server: {} ({:?})",
            ranked[0].uri, ranked[0].latency
        );
        for r in &ranked[1..] {
            println!("  also available: {} ({:?})", r.uri, r.latency);
        }
    }

    ranked
}

/// Resolves the indexer server from CLI arguments.
///
/// If `--server` was provided explicitly, uses that URI and returns an
/// empty ranked list. Otherwise, probes curated indexers with `get_info()`
/// and returns the fastest responder along with the full ranked list.
pub(crate) fn resolve_server(
    matches: &clap::ArgMatches,
) -> Result<(http::Uri, Vec<RankedServer>), http::uri::InvalidUri> {
    if let Some(explicit) = matches.get_one::<http::Uri>("server") {
        Ok((
            zingolib::config::construct_lightwalletd_uri(Some(explicit.to_string()))?,
            vec![],
        ))
    } else {
        let ranked = select_servers();
        let server = if let Some(best) = ranked.first() {
            best.uri.clone()
        } else {
            zingolib::config::construct_lightwalletd_uri(None)?
        };
        Ok((server, ranked))
    }
}
