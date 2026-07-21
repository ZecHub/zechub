pub mod assets;
pub mod component_demo;
pub mod connect_signer;
pub mod greeting;
pub mod help;
pub mod history;
pub mod home;
pub mod lock;
pub mod receive;
pub mod send;
pub mod settings;
pub mod setup;
pub mod splash;

use crate::api::WalletApi;
use crate::app::Nav;
use async_trait::async_trait;
use ratatui::Frame;

#[async_trait(?Send)]
pub trait Screen {
    fn name(&self) -> &str;
    async fn init(&mut self, _api: &dyn WalletApi) {}
    async fn on_reactivate(&mut self, _api: &mut dyn WalletApi) {}
    fn render(&mut self, frame: &mut Frame, api: &dyn WalletApi);
    async fn handle_input(
        &mut self,
        key: crossterm::event::KeyEvent,
        api: &mut dyn WalletApi,
    ) -> Nav;
    async fn handle_paste(&mut self, _text: &str, _api: &mut dyn WalletApi) -> Nav {
        Nav::None
    }
    /// Called on every render tick (every ~50ms). Screens can use this for
    /// polling async operations (e.g. checking if a background send completed).
    async fn tick(&mut self, _api: &mut dyn WalletApi) -> Nav {
        Nav::None
    }
}
