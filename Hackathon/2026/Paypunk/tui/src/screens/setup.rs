use crate::api::types::*;
use crate::api::WalletApi;
use crate::app::Nav;
use crate::components::list::{LabelItem, List};
use crate::components::text_field::{TextField, TextFieldConfig};
use crate::components::Component;
use crate::screens::assets::AssetsScreen;
use crate::screens::component_demo::ComponentDemoScreen;
use crate::screens::help::HelpScreen;
use crate::screens::home::HomeScreen;
use crate::screens::Screen;
use crate::ui;
use async_trait::async_trait;
use ratatui::layout::{Constraint, Layout, Margin, Rect};
use ratatui::style::Style;
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;
use ratatui_cheese::fieldset::{Fieldset, FieldsetFill};
use ratatui_cheese::input::InputState;

enum SetupStep {
    Choice,
    ShowMnemonic,
    VerifyMnemonic,
    SetPassword,
    Creating,
    ImportMnemonic,
    ImportPassword,
}

pub struct SetupScreen {
    data: SetupData,
    step: SetupStep,
    choice_list: List<()>,
    verify_fields: [TextField; 3],
    verify_focus: usize,
    password_field: TextField,
    confirm_field: TextField,
    pw_focus: usize,
    pw_error: Option<String>,
    import_states: Vec<InputState>,
    import_focus: usize,
    import_pw_field: TextField,
    import_confirm_field: TextField,
    import_pw_focus: usize,
    import_pw_error: Option<String>,
    error_msg: Option<String>,
    spinner_frame: u32,
}

impl SetupScreen {
    pub fn new() -> Self {
        let choice_items: Vec<Box<dyn Component<()>>> = vec![
            Box::new(LabelItem::new("✦  Create New Wallet")),
            Box::new(LabelItem::new("↻  Import Existing Wallet")),
        ];
        Self {
            data: SetupData {
                app_version: String::new(),
                wallet_exists: false,
                new_mnemonic: vec![],
                word_count: 0,
                import_methods: vec![],
            },
            step: SetupStep::Choice,
            choice_list: List::new(choice_items),
            verify_fields: [
                TextField::new(TextFieldConfig {
                    label: "Word #4".into(),
                    placeholder: "".into(),
                    password_mode: false,
                    initial_value: String::new(),
                    feedback: None,
                }),
                TextField::new(TextFieldConfig {
                    label: "Word #8".into(),
                    placeholder: "".into(),
                    password_mode: false,
                    initial_value: String::new(),
                    feedback: None,
                }),
                TextField::new(TextFieldConfig {
                    label: "Word #12".into(),
                    placeholder: "".into(),
                    password_mode: false,
                    initial_value: String::new(),
                    feedback: None,
                }),
            ],
            verify_focus: 0,
            password_field: TextField::new(TextFieldConfig {
                label: "Password".into(),
                placeholder: "".into(),
                password_mode: true,
                initial_value: String::new(),
                feedback: None,
            }),
            confirm_field: TextField::new(TextFieldConfig {
                label: "Confirm Password".into(),
                placeholder: "".into(),
                password_mode: true,
                initial_value: String::new(),
                feedback: None,
            }),
            pw_focus: 0,
            pw_error: None,
            import_states: (0..12).map(|_| InputState::new()).collect(),
            import_focus: 0,
            import_pw_field: TextField::new(TextFieldConfig {
                label: "New Password".into(),
                placeholder: "".into(),
                password_mode: true,
                initial_value: String::new(),
                feedback: None,
            }),
            import_confirm_field: TextField::new(TextFieldConfig {
                label: "Confirm Password".into(),
                placeholder: "".into(),
                password_mode: true,
                initial_value: String::new(),
                feedback: None,
            }),
            import_pw_focus: 0,
            import_pw_error: None,
            error_msg: None,
            spinner_frame: 0,
        }
    }
}

#[async_trait(?Send)]
impl Screen for SetupScreen {
    fn name(&self) -> &str {
        "Setup"
    }

    async fn init(&mut self, api: &dyn WalletApi) {
        self.data = api.get_setup().await;
        self.choice_list.set_focused(true);
    }

    fn render(&mut self, frame: &mut Frame, _api: &dyn WalletApi) {
        let theme = ui::theme();
        let area = frame.area();
        let chunks = Layout::vertical([
            Constraint::Length(4),
            Constraint::Min(5),
            Constraint::Length(3),
        ])
        .split(area);
        let title_area = chunks[0];
        let content_area = chunks[1];
        let footer_area = chunks[2];

        let title_block = Block::new()
            .style(Style::new().bg(ui::BG))
            .title(Line::from(" PayPunk Wallet ").centered())
            .title_style(Style::new().fg(ui::palette().primary));
        frame.render_widget(title_block, title_area);

        let title_sub = Paragraph::new(Line::from("Setup").centered()).style(theme.text);
        frame.render_widget(
            title_sub,
            title_area.inner(Margin {
                vertical: 2,
                horizontal: 0,
            }),
        );

        match self.step {
            SetupStep::Choice => self.render_choice(frame, content_area),
            SetupStep::ShowMnemonic => self.render_show_mnemonic(frame, content_area),
            SetupStep::VerifyMnemonic => self.render_verify(frame, content_area),
            SetupStep::SetPassword => self.render_set_password(frame, content_area),
            SetupStep::Creating => self.render_creating(frame, content_area),
            SetupStep::ImportMnemonic => self.render_import(frame, content_area),
            SetupStep::ImportPassword => self.render_import_password(frame, content_area),
        }

        let footer_text = theme.help_line([
            ("↑↓", "Navigate"),
            ("Enter", "Select"),
            ("Esc", "Back"),
            ("Ctrl+A", "Assets"),
            ("Ctrl+D", "Demo"),
            ("?", "Help"),
            ("Ctrl+C", "Quit"),
        ]);
        let footer_block = Block::new().style(Style::new().bg(ui::SURFACE));
        frame.render_widget(footer_block, footer_area);
        frame.render_widget(
            Paragraph::new(footer_text).style(Style::new().bg(ui::SURFACE)),
            footer_area.inner(Margin {
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

        if key
            .modifiers
            .contains(crossterm::event::KeyModifiers::CONTROL)
        {
            match key.code {
                KeyCode::Char('a') => {
                    return Nav::Replace(Box::new(AssetsScreen::new(AccountInfo {
                        account_id: "acc_1".into(),
                        name: "Account #1".into(),
                        chain_id: "eip155:1".into(),
                        address: String::new(),
                        protocol: "Ethereum".into(),
                    })))
                }
                KeyCode::Char('d') => return Nav::Replace(Box::new(ComponentDemoScreen::new())),
                _ => {}
            }
        }

        match key.code {
            KeyCode::Char('?') => return Nav::Push(Box::new(HelpScreen::new(self.name()))),
            _ => {}
        }
        match self.step {
            SetupStep::Choice => match key.code {
                KeyCode::Up | KeyCode::Down => {
                    let _ = self.choice_list.handle_event(key);
                }
                KeyCode::Enter => {
                    if self.choice_list.selected() == Some(0) {
                        self.step = SetupStep::ShowMnemonic;
                    } else {
                        self.step = SetupStep::ImportMnemonic;
                    }
                }
                _ => {}
            },
            SetupStep::ShowMnemonic => match key.code {
                KeyCode::Enter => {
                    self.step = SetupStep::VerifyMnemonic;
                }
                KeyCode::Esc => {
                    self.step = SetupStep::Choice;
                }
                _ => {}
            },
            SetupStep::VerifyMnemonic => match key.code {
                KeyCode::Tab | KeyCode::Down => {
                    self.verify_focus = (self.verify_focus + 1).min(2);
                }
                KeyCode::BackTab | KeyCode::Up => {
                    self.verify_focus = self.verify_focus.saturating_sub(1);
                }
                _ => {
                    let _ = self.verify_fields[self.verify_focus].handle_event(key);
                    match key.code {
                        KeyCode::Enter => {
                            let verify_words = vec![
                                WordVerification {
                                    index: 3,
                                    word: self.verify_fields[0].value().into(),
                                },
                                WordVerification {
                                    index: 7,
                                    word: self.verify_fields[1].value().into(),
                                },
                                WordVerification {
                                    index: 11,
                                    word: self.verify_fields[2].value().into(),
                                },
                            ];
                            let correct = verify_words.iter().enumerate().all(|(i, vw)| {
                                let expected_idx = match i {
                                    0 => 3,
                                    1 => 7,
                                    _ => 11,
                                };
                                self.data
                                    .new_mnemonic
                                    .get(expected_idx)
                                    .map(|w| w == &vw.word)
                                    .unwrap_or(false)
                            });
                            if correct {
                                self.step = SetupStep::SetPassword;
                                self.pw_focus = 0;
                                self.error_msg = None;
                            } else {
                                self.error_msg = Some("Words don't match. Try again.".into());
                            }
                        }
                        KeyCode::Esc => {
                            self.step = SetupStep::ShowMnemonic;
                        }
                        _ => {}
                    }
                }
            },
            SetupStep::SetPassword => {
                let pw_len = self.password_field.value().len();
                let pw_valid = pw_len >= 4;
                let show_confirm = pw_valid;

                match key.code {
                    KeyCode::Tab | KeyCode::Down => {
                        if self.pw_focus == 0 && show_confirm {
                            self.pw_focus = 1;
                        } else if self.pw_focus == 1 {
                            self.pw_focus = 0;
                        }
                    }
                    KeyCode::BackTab | KeyCode::Up => {
                        self.pw_focus = 0;
                    }
                    _ => {
                        if self.pw_focus == 0 {
                            let _ = self.password_field.handle_event(key);
                            let new_len = self.password_field.value().len();
                            if new_len > 0 && new_len < 4 {
                                self.pw_error =
                                    Some("Password must be at least 4 characters.".into());
                            } else {
                                self.pw_error = None;
                            }
                        } else if show_confirm {
                            let _ = self.confirm_field.handle_event(key);
                        }
                        match key.code {
                            KeyCode::Enter => {
                                let pw = self.password_field.value().to_string();
                                if pw.len() < 4 {
                                    self.pw_error =
                                        Some("Password must be at least 4 characters.".into());
                                } else if pw != self.confirm_field.value() {
                                    self.pw_error = Some("Passwords don't match.".into());
                                } else {
                                    self.step = SetupStep::Creating;
                                    self.spinner_frame = 0;
                                    let api = api as &mut dyn WalletApi;
                                    match api
                                        .submit_setup_create(SetupCreateInput {
                                            verification_words: vec![],
                                            backup_confirmed: true,
                                            password: pw,
                                        })
                                        .await
                                    {
                                        Ok(()) => {
                                            return Nav::Replace(Box::new(HomeScreen::new()));
                                        }
                                        Err(e) => {
                                            self.step = SetupStep::SetPassword;
                                            self.error_msg = Some(e.0);
                                        }
                                    }
                                }
                            }
                            KeyCode::Esc => {
                                self.step = SetupStep::VerifyMnemonic;
                            }
                            _ => {}
                        }
                    }
                }
            }
            SetupStep::ImportMnemonic => match key.code {
                KeyCode::BackTab | KeyCode::Up => {
                    if self.import_focus >= 3 {
                        self.import_focus -= 3;
                    }
                }
                KeyCode::Down => {
                    if self.import_focus + 3 < 12 {
                        self.import_focus += 3;
                    }
                }
                KeyCode::Left => {
                    self.import_focus = self.import_focus.saturating_sub(1);
                }
                KeyCode::Right | KeyCode::Tab => {
                    if self.import_focus < 11 {
                        self.import_focus += 1;
                    }
                }
                KeyCode::Char(c) => {
                    if self.import_focus < 12 {
                        self.import_states[self.import_focus].insert_char(c);
                    }
                }
                KeyCode::Backspace => {
                    if self.import_focus < 12 {
                        self.import_states[self.import_focus].delete_before();
                    }
                }
                KeyCode::Enter => {
                    let phrase = self
                        .import_states
                        .iter()
                        .map(|s| s.value().trim())
                        .filter(|w| !w.is_empty())
                        .collect::<Vec<_>>()
                        .join(" ");
                    if phrase.is_empty() {
                        self.error_msg = Some("Please enter your recovery phrase.".into());
                    } else {
                        self.step = SetupStep::ImportPassword;
                        self.import_pw_focus = 0;
                        self.import_pw_error = None;
                    }
                }
                KeyCode::Esc => {
                    self.step = SetupStep::Choice;
                }
                _ => {}
            },
            SetupStep::ImportPassword => {
                let pw_len = self.import_pw_field.value().len();
                let pw_valid = pw_len >= 4;
                let show_confirm = pw_valid;

                match key.code {
                    KeyCode::Tab | KeyCode::Down => {
                        if self.import_pw_focus == 0 && show_confirm {
                            self.import_pw_focus = 1;
                        } else if self.import_pw_focus == 1 {
                            self.import_pw_focus = 0;
                        }
                    }
                    KeyCode::BackTab | KeyCode::Up => {
                        self.import_pw_focus = 0;
                    }
                    KeyCode::Esc => {
                        self.step = SetupStep::ImportMnemonic;
                        self.import_pw_error = None;
                    }
                    _ => {
                        if self.import_pw_focus == 0 {
                            let _ = self.import_pw_field.handle_event(key);
                            let new_len = self.import_pw_field.value().len();
                            if new_len > 0 && new_len < 4 {
                                self.import_pw_error =
                                    Some("Password must be at least 4 characters.".into());
                            } else {
                                self.import_pw_error = None;
                            }
                        } else if show_confirm {
                            let _ = self.import_confirm_field.handle_event(key);
                        }
                        match key.code {
                            KeyCode::Enter => {
                                let pw = self.import_pw_field.value().to_string();
                                if pw.len() < 4 {
                                    self.import_pw_error =
                                        Some("Password must be at least 4 characters.".into());
                                } else if pw != self.import_confirm_field.value() {
                                    self.import_pw_error = Some("Passwords don't match.".into());
                                } else {
                                    let phrase = self
                                        .import_states
                                        .iter()
                                        .map(|s| s.value().trim())
                                        .filter(|w| !w.is_empty())
                                        .collect::<Vec<_>>()
                                        .join(" ");
                                    match api
                                        .submit_setup_import(SetupImportInput {
                                            method: "mnemonic".into(),
                                            secret: phrase,
                                            password: pw.into(),
                                        })
                                        .await
                                    {
                                        Ok(()) => {
                                            return Nav::Replace(Box::new(HomeScreen::new()));
                                        }
                                        Err(e) => {
                                            self.import_pw_error = Some(e.0);
                                        }
                                    }
                                }
                            }
                            _ => {}
                        }
                    }
                }
            }
            SetupStep::Creating => {}
        }
        Nav::None
    }

    async fn handle_paste(&mut self, text: &str, _api: &mut dyn WalletApi) -> Nav {
        match self.step {
            SetupStep::ImportMnemonic => {
                let words: Vec<&str> = text.split_whitespace().collect();
                if words.len() == 12 {
                    for (i, word) in words.iter().enumerate() {
                        self.import_states[i].set_value(word.to_string());
                    }
                    self.import_focus = 11;
                } else if !words.is_empty() && self.import_focus < 12 {
                    self.import_states[self.import_focus].set_value(words[0].to_string());
                }
            }
            SetupStep::SetPassword => {
                if self.pw_focus == 0 {
                    self.password_field.handle_paste(text);
                } else if !self.password_field.value().is_empty() {
                    self.confirm_field.handle_paste(text);
                }
            }
            SetupStep::ImportPassword => {
                if self.import_pw_focus == 0 {
                    self.import_pw_field.handle_paste(text);
                } else if !self.import_pw_field.value().is_empty() {
                    self.import_confirm_field.handle_paste(text);
                }
            }
            _ => {}
        }
        Nav::None
    }
}

impl SetupScreen {
    fn render_choice(&mut self, frame: &mut Frame, area: Rect) {
        let fieldset = Fieldset::new()
            .title(" Get Started ")
            .fill(FieldsetFill::Slash)
            .top_alignment(ratatui::layout::Alignment::Left);
        let inner = fieldset.inner(area);
        frame.render_widget(fieldset, area);

        self.choice_list.set_focused(true);
        self.choice_list.render(
            frame,
            inner.inner(Margin {
                vertical: 1,
                horizontal: 2,
            }),
        );

        let help = Paragraph::new(Line::from("Choose an option to continue"))
            .style(Style::new().fg(ui::palette().muted))
            .centered();
        let help_area =
            Layout::vertical([Constraint::Length(4), Constraint::Min(0)]).split(inner)[0];
        frame.render_widget(
            help,
            help_area.inner(Margin {
                vertical: 5,
                horizontal: 0,
            }),
        );
    }

    fn render_show_mnemonic(&self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Your Recovery Phrase");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        let chunks = Layout::vertical([
            Constraint::Length(3),
            Constraint::Min(6),
            Constraint::Length(2),
        ])
        .split(inner);

        let warning = Paragraph::new(Line::from(vec![
            theme.warning("⚠ "),
            theme.warning("Write this down. Never share it with anyone."),
        ]))
        .style(Style::new().bg(ui::BG));
        frame.render_widget(
            warning,
            chunks[0].inner(Margin {
                vertical: 1,
                horizontal: 2,
            }),
        );

        let grid_area = chunks[1].inner(Margin {
            vertical: 0,
            horizontal: 2,
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
                if idx >= self.data.new_mnemonic.len() {
                    continue;
                }
                let cell = row_areas[row * 2];
                let word = &self.data.new_mnemonic[idx];
                let display = if word.is_empty() { "______" } else { word };
                let cell_bg = Block::new().style(Style::new().bg(ui::SURFACE));
                frame.render_widget(cell_bg, cell);
                let label = Paragraph::new(Line::from(vec![
                    Span::styled(
                        format!("{:2}.", idx + 1),
                        Style::new().fg(ui::palette().muted),
                    ),
                    Span::styled(
                        format!(" {}", display),
                        Style::new().fg(ui::palette().foreground).bg(ui::SURFACE),
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

        let continue_btn = Paragraph::new(Line::from(vec![
            theme.muted(" Press "),
            theme.accent("ENTER"),
            theme.muted(" after saving your phrase "),
        ]))
        .centered()
        .style(Style::new().bg(ui::BG));
        frame.render_widget(continue_btn, chunks[2]);
    }

    fn render_verify(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Verify Recovery Phrase");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        let instruction = Paragraph::new(Line::from(vec![
            theme.span("Enter the requested words to confirm you saved them:")
        ]))
        .style(Style::new().bg(ui::BG));
        frame.render_widget(
            instruction,
            inner.inner(Margin {
                vertical: 1,
                horizontal: 2,
            }),
        );

        for (i, field) in self.verify_fields.iter_mut().enumerate() {
            field.set_focused(i == self.verify_focus);
            let y_offset = 3 + i * 3;
            field.render(
                frame,
                inner.inner(Margin {
                    vertical: y_offset as u16,
                    horizontal: 2,
                }),
            );
        }

        if let Some(ref err) = self.error_msg {
            let err_para =
                Paragraph::new(Line::from(vec![theme.error(err)])).style(Style::new().bg(ui::BG));
            frame.render_widget(
                err_para,
                inner.inner(Margin {
                    vertical: 12,
                    horizontal: 4,
                }),
            );
        }
    }

    fn render_set_password(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Set Password");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        let instruction = Paragraph::new(Line::from(vec![
            theme.span("Create a password to protect your wallet:")
        ]))
        .style(Style::new().bg(ui::BG));
        frame.render_widget(
            instruction,
            inner.inner(Margin {
                vertical: 1,
                horizontal: 2,
            }),
        );

        self.password_field.set_focused(self.pw_focus == 0);
        self.password_field.render(
            frame,
            inner.inner(Margin {
                vertical: 3,
                horizontal: 2,
            }),
        );

        let pw = self.password_field.value();
        let pw_valid = pw.len() >= 4;
        let show_confirm = pw_valid;

        let mut extra_y = 5;

        if let Some(ref err) = self.pw_error {
            let err_para =
                Paragraph::new(Line::from(vec![theme.error(err)])).style(Style::new().bg(ui::BG));
            frame.render_widget(
                err_para,
                inner.inner(Margin {
                    vertical: extra_y,
                    horizontal: 4,
                }),
            );
            extra_y += 1;
        }

        if show_confirm {
            self.confirm_field.set_focused(self.pw_focus == 1);
            self.confirm_field.render(
                frame,
                inner.inner(Margin {
                    vertical: extra_y,
                    horizontal: 2,
                }),
            );
        } else if !pw.is_empty() {
            let hint = Paragraph::new(Line::from(vec![
                theme.muted("Type at least 4 characters to unlock confirmation")
            ]))
            .style(Style::new().bg(ui::BG));
            frame.render_widget(
                hint,
                inner.inner(Margin {
                    vertical: extra_y,
                    horizontal: 4,
                }),
            );
        }
    }

    fn render_import(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Import Wallet");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        let chunks = Layout::vertical([
            Constraint::Length(2),
            Constraint::Min(6),
            Constraint::Length(2),
        ])
        .split(inner);

        let label = Paragraph::new(Line::from(vec![
            theme.span("Enter your 12-word recovery phrase:")
        ]))
        .style(Style::new().bg(ui::BG));
        frame.render_widget(
            label,
            chunks[0].inner(Margin {
                vertical: 0,
                horizontal: 2,
            }),
        );

        let grid_area = chunks[1].inner(Margin {
            vertical: 0,
            horizontal: 2,
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
                if idx >= 12 {
                    continue;
                }
                let cell = row_areas[row * 2];
                let is_focused = idx == self.import_focus;
                let val = self.import_states[idx].value();
                let masked: String = val.chars().map(|_| '•').collect();
                let cursor = if is_focused && val.is_empty() {
                    "█"
                } else if is_focused {
                    " "
                } else {
                    " "
                };
                let display = if val.is_empty() {
                    format!("______{}", cursor)
                } else {
                    format!("{}{}", masked, cursor)
                };
                let cell_style = if is_focused {
                    ui::selected_style()
                } else {
                    Style::new().fg(ui::palette().foreground).bg(ui::SURFACE)
                };
                let cell_bg = Block::new().style(Style::new().bg(ui::SURFACE));
                frame.render_widget(cell_bg, cell);
                let label = Paragraph::new(Line::from(vec![
                    Span::styled(
                        format!("{:2}.", idx + 1),
                        Style::new().fg(ui::palette().muted),
                    ),
                    Span::styled(format!(" {}", display), cell_style),
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

        if let Some(ref err) = self.error_msg {
            let err_para =
                Paragraph::new(Line::from(vec![theme.error(err)])).style(Style::new().bg(ui::BG));
            frame.render_widget(
                err_para,
                chunks[2].inner(Margin {
                    vertical: 0,
                    horizontal: 2,
                }),
            );
        }

        let hint = Paragraph::new(Line::from(vec![theme.muted(
            "Paste a 12-word phrase to fill all fields, or type each word individually",
        )]))
        .centered()
        .style(Style::new().bg(ui::BG));
        frame.render_widget(
            hint,
            chunks[2].inner(Margin {
                vertical: 1,
                horizontal: 2,
            }),
        );
    }

    fn render_import_password(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Set Password");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        let instruction = Paragraph::new(Line::from(vec![
            theme.span("Create a password to protect your wallet:")
        ]))
        .style(Style::new().bg(ui::BG));
        frame.render_widget(
            instruction,
            inner.inner(Margin {
                vertical: 1,
                horizontal: 2,
            }),
        );

        self.import_pw_field.set_focused(self.import_pw_focus == 0);
        self.import_pw_field.render(
            frame,
            inner.inner(Margin {
                vertical: 3,
                horizontal: 2,
            }),
        );

        let pw = self.import_pw_field.value();
        let pw_valid = pw.len() >= 4;
        let show_confirm = pw_valid;

        let mut extra_y = 5;

        if let Some(ref err) = self.import_pw_error {
            let err_para =
                Paragraph::new(Line::from(vec![theme.error(err)])).style(Style::new().bg(ui::BG));
            frame.render_widget(
                err_para,
                inner.inner(Margin {
                    vertical: extra_y,
                    horizontal: 4,
                }),
            );
            extra_y += 1;
        }

        if show_confirm {
            self.import_confirm_field
                .set_focused(self.import_pw_focus == 1);
            self.import_confirm_field.render(
                frame,
                inner.inner(Margin {
                    vertical: extra_y,
                    horizontal: 2,
                }),
            );
        } else if !pw.is_empty() {
            let hint = Paragraph::new(Line::from(vec![
                theme.muted("Type at least 4 characters to unlock confirmation")
            ]))
            .style(Style::new().bg(ui::BG));
            frame.render_widget(
                hint,
                inner.inner(Margin {
                    vertical: extra_y,
                    horizontal: 4,
                }),
            );
        }
    }

    fn render_creating(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Creating Wallet");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        self.spinner_frame += 1;
        let spinner = match self.spinner_frame % 4 {
            0 => "◐",
            1 => "◓",
            2 => "◑",
            3 => "◒",
            _ => "◐",
        };

        let lines = vec![
            Line::from(vec![
                theme.accent(format!(" {} Creating your wallet... ", spinner))
            ])
            .centered(),
            Line::from(""),
            Line::from(vec![
                theme.muted("Generating encryption keys and securing your seed.")
            ])
            .centered(),
            Line::from(vec![theme.muted("This should only take a moment.")]).centered(),
        ];
        let para = ratatui::widgets::Paragraph::new(ratatui::text::Text::from(lines))
            .style(Style::new().bg(ui::BG));
        frame.render_widget(
            para,
            inner.inner(Margin {
                vertical: 3,
                horizontal: 2,
            }),
        );
    }
}
