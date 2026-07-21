use crate::api::WalletApi;
use crate::app::Nav;
use crate::screens::Screen;
use crate::ui;
use async_trait::async_trait;
use ratatui::layout::{Constraint, Layout, Margin};
use ratatui::style::Style;
use ratatui::Frame;
use ratatui_bubbletea_components::{Help, KeyBinding};

pub struct HelpScreen {
    current_screen: String,
}

impl HelpScreen {
    pub fn new(screen_name: &str) -> Self {
        Self {
            current_screen: screen_name.to_string(),
        }
    }

    fn bindings_for(&self) -> Vec<KeyBinding> {
        let pairs: Vec<(&[&str], &str)> = match self.current_screen.as_str() {
            "Wallets" => vec![
                (&["↑", "↓"][..], "Select wallet"),
                (&["Enter"][..], "View assets"),
                (&["q"][..], "Quit"),
                (&["?"][..], "Toggle help"),
            ],
            "Assets" => vec![
                (&["↑", "↓"][..], "Navigate assets"),
                (&["←", "→"][..], "Send / Receive buttons"),
                (&["Enter"][..], "Send / Select action"),
                (&["Esc"][..], "Back to wallets"),
                (&["?"][..], "Toggle help"),
            ],
            "Home" => vec![
                (&["↑", "↓"][..], "Select asset"),
                (&["s"][..], "Send from asset"),
                (&["o"][..], "Receive to asset"),
                (&["r"][..], "Refresh balances"),
                (&["t"][..], "Settings"),
                (&["l"][..], "Lock wallet"),
                (&["q"][..], "Quit"),
                (&["?"][..], "Toggle help"),
            ],
            "Send" => vec![
                (&["Tab", "↓"][..], "Next field"),
                (&["↑"][..], "Previous field"),
                (&["←", "→"][..], "Change fee tier"),
                (&["Enter"][..], "Review / Confirm / Done"),
                (&["Esc"][..], "Back / Edit"),
                (&["?"][..], "Toggle help"),
            ],
            "Receive" => vec![
                (&["←", "→"][..], "Switch chain"),
                (&["Esc"][..], "Back"),
                (&["?"][..], "Toggle help"),
            ],
            "Lock" => vec![
                (&["Tab", "↓"][..], "Next field"),
                (&["↑"][..], "Previous field"),
                (&["Enter"][..], "Unlock"),
                (&["Esc"][..], "Back"),
                (&["?"][..], "Toggle help"),
            ],
            "Settings" => vec![
                (&["↑", "↓"][..], "Navigate"),
                (&["Enter"][..], "Save / Select"),
                (&["Esc"][..], "Back"),
                (&["?"][..], "Toggle help"),
            ],
            "Setup" => vec![
                (&["↑", "↓"][..], "Navigate"),
                (&["Enter"][..], "Select / Confirm"),
                (&["Esc"][..], "Back"),
                (&["Ctrl+C"][..], "Quit"),
                (&["?"][..], "Toggle help"),
            ],
            _ => vec![
                (&["Esc"][..], "Close help"),
                (&["q"][..], "Close help"),
                (&["?"][..], "Toggle help"),
            ],
        };
        pairs
            .into_iter()
            .map(|(keys, desc)| KeyBinding::with_keys(keys.iter().copied(), desc))
            .collect()
    }
}

#[async_trait(?Send)]
impl Screen for HelpScreen {
    fn name(&self) -> &str {
        "Help"
    }

    fn render(&mut self, frame: &mut Frame, _api: &dyn WalletApi) {
        let area = frame.area();
        let theme = ui::theme();
        let block = theme.titled_modal_block(format!(" {} ", self.current_screen));
        let inner = block.inner(area);
        frame.render_widget(block, area);

        let chunks = Layout::vertical([
            Constraint::Length(2),
            Constraint::Min(1),
            Constraint::Length(2),
        ])
        .split(inner);

        let header = theme
            .help_line([("", format!("{} keybindings", self.current_screen))])
            .centered();
        frame.render_widget(
            ratatui::widgets::Paragraph::new(header).style(Style::new().bg(ui::BG)),
            chunks[0],
        );

        let help = Help::new(self.bindings_for()).expanded().theme(theme);
        frame.render_widget(
            &help,
            chunks[1].inner(Margin {
                vertical: 1,
                horizontal: 2,
            }),
        );

        let footer = theme.help_line([("Esc/q", "Close help")]).centered();
        frame.render_widget(
            ratatui::widgets::Paragraph::new(footer).style(Style::new().bg(ui::BG)),
            chunks[2],
        );
    }

    async fn handle_input(
        &mut self,
        key: crossterm::event::KeyEvent,
        _api: &mut dyn WalletApi,
    ) -> Nav {
        use crossterm::event::KeyCode;
        match key.code {
            KeyCode::Esc | KeyCode::Char('q') | KeyCode::Char('?') => Nav::Pop,
            _ => Nav::None,
        }
    }
}
