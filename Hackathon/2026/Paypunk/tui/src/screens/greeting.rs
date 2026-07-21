use crate::api::WalletApi;
use crate::app::Nav;
use crate::components::text_field::{TextField, TextFieldConfig};
use crate::components::Component;
use crate::screens::help::HelpScreen;
use crate::screens::home::HomeScreen;
use crate::screens::Screen;
use crate::ui;
use async_trait::async_trait;
use ratatui::layout::{Constraint, Layout, Margin};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;

pub struct GreetingScreen {
    pw_field: TextField, // TOOD: Use Zeroizable fields to avoid memory being dumped
    error_msg: Option<String>,
}

impl GreetingScreen {
    pub fn new() -> Self {
        Self {
            pw_field: TextField::new(TextFieldConfig {
                label: "Password".into(),
                placeholder: "".into(),
                password_mode: true,
                initial_value: String::new(),
                feedback: None,
            }),
            error_msg: None,
        }
    }
}

#[async_trait(?Send)]
impl Screen for GreetingScreen {
    fn name(&self) -> &str {
        "Greeting"
    }

    async fn init(&mut self, _api: &dyn WalletApi) {}

    fn render(&mut self, frame: &mut Frame, _api: &dyn WalletApi) {
        let theme = ui::theme();
        let area = frame.area();
        let chunks = Layout::vertical([
            Constraint::Length(5),
            Constraint::Min(5),
            Constraint::Length(3),
        ])
        .split(area);
        let header = chunks[0];
        let body = chunks[1];
        let footer = chunks[2];

        let title = theme.title(" PayPunk Wallet ").centered();
        frame.render_widget(Paragraph::new(title).style(Style::new().bg(ui::BG)), header);

        let subtitle = theme
            .muted("Enter your password to unlock")
            .into_centered_line();
        frame.render_widget(
            Paragraph::new(subtitle).style(Style::new().bg(ui::BG)),
            header.inner(Margin {
                vertical: 2,
                horizontal: 0,
            }),
        );

        let block = theme.titled_block("Unlock");
        let inner = block.inner(body);
        frame.render_widget(block, body);

        self.pw_field.set_focused(true);
        self.pw_field.render(
            frame,
            inner.inner(Margin {
                vertical: 2,
                horizontal: 4,
            }),
        );

        if let Some(ref err) = self.error_msg {
            let err_para =
                Paragraph::new(Line::from(vec![theme.error(err)])).style(Style::new().bg(ui::BG));
            frame.render_widget(
                err_para,
                inner.inner(Margin {
                    vertical: 4,
                    horizontal: 4,
                }),
            );
        }

        let footer_text = theme.help_line([("Enter", "Unlock"), ("Ctrl+C", "Quit")]);
        let fb = Block::new().style(Style::new().bg(ui::SURFACE));
        frame.render_widget(fb, footer);
        frame.render_widget(
            Paragraph::new(footer_text).style(Style::new().bg(ui::SURFACE)),
            footer.inner(Margin {
                vertical: 0,
                horizontal: 1,
            }),
        );
    }

    async fn handle_input(
        &mut self,
        key: crossterm::event::KeyEvent,
        api: &mut dyn WalletApi,
    ) -> Nav {
        use crossterm::event::KeyCode;
        match key.code {
            KeyCode::Char('?') => return Nav::Push(Box::new(HelpScreen::new(self.name()))),
            _ => {
                let _ = self.pw_field.handle_event(key);
                if key.code == KeyCode::Enter {
                    // TODO: handle Zeroizing
                    let password = self.pw_field.value().to_string();
                    match api.unlock(password).await {
                        Ok(_data) => return Nav::Replace(Box::new(HomeScreen::new())),
                        Err(e) => self.error_msg = Some(e.0),
                    }
                }
            }
        }
        Nav::None
    }
}
