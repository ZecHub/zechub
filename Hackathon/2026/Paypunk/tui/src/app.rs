use crate::api::types::SyncStatus;
use crate::api::WalletApi;
use crate::screens::history::HistoryScreen;
use crate::screens::Screen;
use std::io;

pub enum Nav {
    None,
    Push(Box<dyn Screen>),
    Pop,
    Replace(Box<dyn Screen>),
    Quit,
    History(String), // account_id
}

pub struct App {
    pub screen_stack: Vec<Box<dyn Screen>>,
    pub api: Box<dyn WalletApi>,
    pub should_quit: bool,
    pub sync_status: SyncStatus,
}

impl App {
    pub fn new(api: Box<dyn WalletApi>) -> Self {
        Self {
            screen_stack: Vec::new(),
            api,
            should_quit: false,
            sync_status: SyncStatus::default(),
        }
    }

    pub fn push_screen(&mut self, screen: Box<dyn Screen>) {
        self.screen_stack.push(screen);
    }

    pub fn pop_screen(&mut self) {
        self.screen_stack.pop();
    }

    pub fn render(&mut self, frame: &mut ratatui::Frame) {
        let api: &dyn WalletApi = &*self.api;
        if let Some(screen) = self.screen_stack.last_mut() {
            screen.render(frame, api);
        }
    }

    pub async fn handle_input(&mut self, key: crossterm::event::KeyEvent) -> io::Result<()> {
        let api: &mut dyn WalletApi = &mut *self.api;
        let nav = if let Some(screen) = self.screen_stack.last_mut() {
            screen.handle_input(key, api).await
        } else {
            Nav::None
        };
        self.process_nav(nav).await;
        Ok(())
    }

    pub async fn handle_paste(&mut self, text: &str) {
        let api: &mut dyn WalletApi = &mut *self.api;
        let nav = if let Some(screen) = self.screen_stack.last_mut() {
            screen.handle_paste(text, api).await
        } else {
            Nav::None
        };
        self.process_nav(nav).await;
    }

    pub async fn tick(&mut self) {
        let nav = {
            let api: &mut dyn WalletApi = &mut *self.api;
            if let Some(screen) = self.screen_stack.last_mut() {
                screen.tick(api).await
            } else {
                Nav::None
            }
        };
        self.process_nav(nav).await;
        if let Ok(status) = tokio::time::timeout(
            std::time::Duration::from_millis(50),
            self.api.get_sync_status("Zcash"),
        )
        .await
        {
            self.sync_status = status;
        }
    }

    async fn process_nav(&mut self, nav: Nav) {
        match nav {
            Nav::None => {}
            Nav::Push(mut s) => {
                s.init(&*self.api).await;
                self.push_screen(s);
            }
            Nav::Pop => {
                self.pop_screen();
                if let Some(screen) = self.screen_stack.last_mut() {
                    screen.on_reactivate(&mut *self.api).await;
                }
            }
            Nav::Replace(mut s) => {
                s.init(&*self.api).await;
                self.screen_stack.pop();
                self.push_screen(s);
            }
            Nav::Quit => self.should_quit = true,
            Nav::History(account_id) => {
                let accounts = self.api.list_accounts().await;
                if let Ok(accs) = accounts {
                    if let Some(acc) = accs.iter().find(|a| a.account_id == account_id) {
                        let mut screen = Box::new(HistoryScreen::new(account_id, acc.name.clone()));
                        screen.init(&*self.api).await;
                        self.push_screen(screen);
                    }
                }
            }
        }
    }
}
