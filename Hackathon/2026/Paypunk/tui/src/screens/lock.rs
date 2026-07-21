use crate::api::types::*;
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
use ratatui::text::{Line, Text};
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;

pub struct LockScreen {
    data: Option<LockData>,
    pw_field: TextField,
    focus: usize,
    error_msg: Option<String>,
}

impl LockScreen {
    pub fn new() -> Self {
        Self {
            data: None,
            pw_field: TextField::new(TextFieldConfig {
                label: "Password".into(),
                placeholder: "".into(),
                password_mode: true,
                initial_value: String::new(),
                feedback: None,
            }),
            focus: 0,
            error_msg: None,
        }
    }
}

#[async_trait(?Send)]
impl Screen for LockScreen {
    fn name(&self) -> &str {
        "Lock"
    }

    async fn init(&mut self, api: &dyn WalletApi) {
        self.data = Some(api.get_lock().await);
    }

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

        let title = theme.title(" Wallet Locked ").centered();
        frame.render_widget(Paragraph::new(title).style(Style::new().bg(ui::BG)), header);

        let subtitle = theme.muted("Authenticate to unlock").into_centered_line();
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

        if let Some(ref data) = self.data {
            let mut lines: Vec<Line> = Vec::new();

            if data.auth_methods.password_set {
                self.pw_field.set_focused(self.focus == 0);
                self.pw_field.render(
                    frame,
                    inner.inner(Margin {
                        vertical: 2,
                        horizontal: 4,
                    }),
                );
            }

            if data.failed_attempts > 0 {
                lines.push(Line::from(""));
                lines.push(Line::from(vec![
                    theme.warning(format!("Failed attempts: {}", data.failed_attempts))
                ]));
            }

            if let Some(ref err) = self.error_msg {
                lines.push(Line::from(""));
                lines.push(Line::from(vec![theme.error(err)]));
            }

            if !lines.is_empty() {
                let para = Paragraph::new(Text::from(lines)).style(Style::new().bg(ui::BG));
                frame.render_widget(
                    para,
                    inner.inner(Margin {
                        vertical: 2,
                        horizontal: 4,
                    }),
                );
            }
        }

        let footer_text = theme.help_line([
            ("Tab", "Switch"),
            ("Enter", "Unlock"),
            ("Esc", "Back"),
            ("?", "Help"),
        ]);
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
            KeyCode::Tab | KeyCode::Down => {
                self.focus = 0;
            }
            KeyCode::Up => {
                self.focus = 0;
            }
            _ => {
                if self.focus == 0 {
                    let _ = self.pw_field.handle_event(key);
                }
                if key.code == KeyCode::Enter {
                    match api
                        .submit_lock(LockInput {
                            credential: Credential {
                                cred_type: "password".into(),
                                value: self.pw_field.value().into(),
                            },
                        })
                        .await
                    {
                        Ok(_) => return Nav::Replace(Box::new(HomeScreen::new())),
                        Err(e) => self.error_msg = Some(e.0),
                    }
                } else if key.code == KeyCode::Esc {
                    return Nav::Pop;
                }
            }
        }
        Nav::None
    }
}
