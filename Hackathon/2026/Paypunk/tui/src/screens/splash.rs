use std::time::{Duration, Instant};

use crate::api::WalletApi;
use crate::app::Nav;
use crate::screens::Screen;
use async_trait::async_trait;
use paypunk_logo::{centered, Logo, LOGO_H, LOGO_W};
use ratatui::Frame;
use tachyonfx::{Effect, EffectRenderer};

const TOTAL_MS: u64 = 1000 + 900;

pub struct SplashScreen {
    next: Option<Box<dyn Screen>>,
    effect: Effect,
    start: Instant,
    last_frame: Instant,
}

impl SplashScreen {
    pub fn new(next: Box<dyn Screen>) -> Self {
        Self {
            next: Some(next),
            effect: paypunk_logo::splash_effect(),
            start: Instant::now(),
            last_frame: Instant::now(),
        }
    }
}

#[async_trait(?Send)]
impl Screen for SplashScreen {
    fn name(&self) -> &str {
        "Splash"
    }

    fn render(&mut self, frame: &mut Frame, _api: &dyn WalletApi) {
        let elapsed = self.last_frame.elapsed();
        self.last_frame = Instant::now();

        let area = centered(frame.area(), LOGO_W, LOGO_H);
        frame.render_widget(Logo, area);
        frame.render_effect(&mut self.effect, area, elapsed.into());
    }

    async fn tick(&mut self, _api: &mut dyn WalletApi) -> Nav {
        if self.start.elapsed() >= Duration::from_millis(TOTAL_MS) {
            if let Some(next) = self.next.take() {
                return Nav::Replace(next);
            }
        }
        Nav::None
    }

    async fn handle_input(
        &mut self,
        _key: crossterm::event::KeyEvent,
        _api: &mut dyn WalletApi,
    ) -> Nav {
        Nav::None
    }
}
