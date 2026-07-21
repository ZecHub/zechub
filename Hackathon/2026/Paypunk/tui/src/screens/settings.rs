use crate::api::types::*;
use crate::api::WalletApi;
use crate::app::Nav;
use crate::components::text_field::{TextField, TextFieldConfig};
use crate::components::Component;
use crate::screens::help::HelpScreen;
use crate::screens::Screen;
use crate::ui;
use async_trait::async_trait;
use ratatui::layout::{Constraint, Layout, Margin, Rect};
use ratatui::style::Style;
use ratatui::text::{Line, Span, Text};
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;

enum SettingsAction {
    Main,
    RevealPhrase,
}

pub struct SettingsScreen {
    data: Option<SettingsData>,
    action: SettingsAction,
    auto_lock_field: TextField,
    fiat_field: TextField,
    reveal_field: TextField,
    phrase: Option<Vec<String>>,
    focus: usize,
    error_msg: Option<String>,
}

impl SettingsScreen {
    pub fn new() -> Self {
        Self {
            data: None,
            action: SettingsAction::Main,
            auto_lock_field: TextField::new(TextFieldConfig {
                label: "Auto-Lock (min)".into(),
                placeholder: "".into(),
                password_mode: false,
                initial_value: String::new(),
                feedback: None,
            }),
            fiat_field: TextField::new(TextFieldConfig {
                label: "Fiat Currency".into(),
                placeholder: "".into(),
                password_mode: false,
                initial_value: String::new(),
                feedback: None,
            }),
            reveal_field: TextField::new(TextFieldConfig {
                label: "Password".into(),
                placeholder: "".into(),
                password_mode: true,
                initial_value: String::new(),
                feedback: None,
            }),
            phrase: None,
            focus: 0,
            error_msg: None,
        }
    }
}

#[async_trait(?Send)]
impl Screen for SettingsScreen {
    fn name(&self) -> &str {
        "Settings"
    }

    async fn init(&mut self, api: &dyn WalletApi) {
        self.data = Some(api.get_settings().await);
        if let Some(ref data) = self.data {
            self.auto_lock_field
                .set_value(&data.security.auto_lock_minutes.to_string());
            self.fiat_field.set_value(&data.fiat_currency);
        }
    }

    fn render(&mut self, frame: &mut Frame, _api: &dyn WalletApi) {
        let theme = ui::theme();
        let area = frame.area();
        let chunks = Layout::vertical([
            Constraint::Length(3),
            Constraint::Min(5),
            Constraint::Length(3),
        ])
        .split(area);
        let header = chunks[0];
        let body = chunks[1];
        let footer = chunks[2];

        let title = theme.title(" Settings ").centered();
        frame.render_widget(Paragraph::new(title).style(Style::new().bg(ui::BG)), header);

        match self.action {
            SettingsAction::Main => self.render_main(frame, body),
            SettingsAction::RevealPhrase => self.render_reveal(frame, body),
        }

        let footer_text = match self.action {
            SettingsAction::Main => theme.help_line([
                ("↑↓", "Navigate"),
                ("Enter", "Save"),
                ("Esc", "Back"),
                ("?", "Help"),
            ]),
            SettingsAction::RevealPhrase => {
                theme.help_line([("Enter", "Auth"), ("Esc", "Cancel"), ("?", "Help")])
            }
        };
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
            _ => {}
        }
        match self.action {
            SettingsAction::Main => match key.code {
                KeyCode::Up => self.focus = self.focus.saturating_sub(1),
                KeyCode::Down => self.focus = (self.focus + 1).min(3),
                _ => {
                    let handled = match self.focus {
                        0 => self.auto_lock_field.handle_event(key),
                        1 => self.fiat_field.handle_event(key),
                        _ => None,
                    };
                    if handled.is_none() {
                        match key.code {
                            KeyCode::Enter => {
                                if self.focus == 2 {
                                    self.action = SettingsAction::RevealPhrase;
                                    self.reveal_field = TextField::new(TextFieldConfig {
                                        label: "Password".into(),
                                        placeholder: "".into(),
                                        password_mode: true,
                                        initial_value: String::new(),
                                        feedback: None,
                                    });
                                    self.focus = 0;
                                } else if self.focus == 3 {
                                    let lock = self.auto_lock_field.value().parse().unwrap_or(5);
                                    let _ = api
                                        .submit_settings(SettingsInput {
                                            updated_security: UpdatedSecurity {
                                                auto_lock_minutes: lock,
                                            },
                                            fiat_currency: self.fiat_field.value().into(),
                                        })
                                        .await;
                                }
                            }
                            KeyCode::Esc => return Nav::Pop,
                            _ => {}
                        }
                    }
                }
            },
            SettingsAction::RevealPhrase => match key.code {
                _ => {
                    let handled = self.reveal_field.handle_event(key);
                    if handled.is_none() {
                        match key.code {
                            KeyCode::Enter => {
                                match api
                                    .submit_reveal_phrase(RevealPhraseInput {
                                        auth_type: "password".into(),
                                        value: self.reveal_field.value().into(),
                                    })
                                    .await
                                {
                                    Ok(phrase) => {
                                        self.phrase = Some(phrase);
                                    }
                                    Err(e) => self.error_msg = Some(e.0),
                                }
                            }
                            KeyCode::Esc => {
                                self.action = SettingsAction::Main;
                                self.phrase = None;
                                self.error_msg = None;
                            }
                            _ => {}
                        }
                    }
                }
            },
        }
        Nav::None
    }

    async fn handle_paste(&mut self, text: &str, _api: &mut dyn WalletApi) -> Nav {
        match self.action {
            SettingsAction::Main => match self.focus {
                0 => self.auto_lock_field.handle_paste(text),
                1 => self.fiat_field.handle_paste(text),
                _ => {}
            },
            SettingsAction::RevealPhrase => {
                self.reveal_field.handle_paste(text);
            }
        }
        Nav::None
    }
}

impl SettingsScreen {
    fn render_main(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Preferences");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        self.auto_lock_field.set_focused(self.focus == 0);
        self.auto_lock_field.render(
            frame,
            inner.inner(Margin {
                vertical: 0,
                horizontal: 2,
            }),
        );

        self.fiat_field.set_focused(self.focus == 1);
        self.fiat_field.render(
            frame,
            inner.inner(Margin {
                vertical: 3,
                horizontal: 2,
            }),
        );

        let mut lines = vec![
            Line::from(""),
            Line::from(vec![if self.focus == 2 {
                theme.accent("▸ Reveal Recovery Phrase")
            } else {
                theme.muted("▸ Reveal Recovery Phrase")
            }]),
            Line::from(""),
            Line::from(vec![if self.focus == 3 {
                theme.accent("▸ Save Settings")
            } else {
                theme.muted("▸ Save Settings")
            }]),
        ];

        if let Some(ref data) = self.data {
            lines.push(Line::from(""));
            lines.push(Line::from(vec![
                theme.muted(format!("Version: {}", data.app_version))
            ]));
        }

        let para = Paragraph::new(Text::from(lines)).style(Style::new().bg(ui::BG));
        frame.render_widget(
            para,
            inner.inner(Margin {
                vertical: 6,
                horizontal: 2,
            }),
        );
    }

    fn render_reveal(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        if let Some(ref phrase) = self.phrase {
            let block = theme.titled_block("Recovery Phrase");
            let inner = block.inner(area);
            frame.render_widget(block, area);

            let warning = Paragraph::new(Line::from(vec![
                theme.warning("⚠ Never share your recovery phrase")
            ]))
            .centered()
            .style(Style::new().bg(ui::BG));
            frame.render_widget(
                warning,
                inner.inner(Margin {
                    vertical: 0,
                    horizontal: 0,
                }),
            );

            let grid_area = inner.inner(Margin {
                vertical: 2,
                horizontal: 4,
            });
            let cols = Layout::horizontal([
                Constraint::Ratio(1, 3),
                Constraint::Length(2),
                Constraint::Ratio(1, 3),
                Constraint::Length(2),
                Constraint::Ratio(1, 3),
            ])
            .split(grid_area);

            let row_heights: Vec<Constraint> = (0..4)
                .flat_map(|_| [Constraint::Length(3), Constraint::Length(1)])
                .collect();
            let rows = Layout::vertical(row_heights);

            for col in 0..3 {
                let col_area = cols[col * 2];
                let row_areas = rows.split(col_area);
                for row in 0..4 {
                    let idx = row * 3 + col;
                    if idx >= phrase.len() {
                        continue;
                    }
                    let cell = row_areas[row * 2];
                    let word = &phrase[idx];
                    let cell_bg = Block::new().style(Style::new().bg(ui::SURFACE));
                    frame.render_widget(cell_bg, cell);
                    let label = Paragraph::new(Line::from(vec![
                        Span::styled(
                            format!("{:2}.", idx + 1),
                            Style::new().fg(ui::palette().muted),
                        ),
                        Span::styled(
                            format!(" {}  ", word),
                            Style::new().fg(ui::palette().primary).bold(),
                        ),
                    ]));
                    frame.render_widget(
                        label,
                        cell.inner(Margin {
                            vertical: 1,
                            horizontal: 1,
                        }),
                    );
                }
            }
        } else {
            let block = theme.titled_block("Authenticate to Reveal");
            let inner = block.inner(area);
            frame.render_widget(block, area);

            self.reveal_field.set_focused(true);
            self.reveal_field.render(
                frame,
                inner.inner(Margin {
                    vertical: 2,
                    horizontal: 4,
                }),
            );

            if let Some(ref err) = self.error_msg {
                let err_para = Paragraph::new(Line::from(vec![theme.error(err)]))
                    .style(Style::new().bg(ui::BG));
                frame.render_widget(
                    err_para,
                    inner.inner(Margin {
                        vertical: 5,
                        horizontal: 4,
                    }),
                );
            }
        }
    }
}
