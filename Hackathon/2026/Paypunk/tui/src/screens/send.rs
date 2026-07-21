use crate::api::types::*;
use crate::api::WalletApi;
use crate::app::Nav;
use crate::components::dropdown_picker::{DropdownAction, DropdownPicker, Searchable};
use crate::components::text_field::{TextField, TextFieldConfig};
use crate::components::Component;
use crate::screens::help::HelpScreen;
use crate::screens::Screen;
use crate::ui;
use async_trait::async_trait;
use crossterm::event::KeyEvent;
use ratatui::layout::{Constraint, Layout, Margin, Rect};
use ratatui::style::{Color, Style};
use ratatui::text::{Line, Span, Text};
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;
use std::time::Instant;

struct AddressBookEntryItem {
    entry: AddressBookEntry,
    focused: bool,
}

impl AddressBookEntryItem {
    fn new(entry: AddressBookEntry) -> Self {
        Self {
            entry,
            focused: false,
        }
    }
}

impl Searchable for AddressBookEntryItem {
    fn search_text(&self) -> String {
        format!("{} {}", self.entry.name, self.entry.address)
    }
}

impl Component<()> for AddressBookEntryItem {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let text = if self.focused {
            Paragraph::new(Line::from(vec![
                Span::styled(
                    format!(" {} ", self.entry.name),
                    Style::new().fg(Color::Black).bold(),
                ),
                Span::styled(&self.entry.address, Style::new().fg(Color::Black)),
            ]))
        } else {
            Paragraph::new(Line::from(vec![
                ui::theme().accent(format!(" {} ", self.entry.name)),
                ui::theme().muted(&self.entry.address),
            ]))
        };
        frame.render_widget(text, area);
    }

    fn handle_event(&mut self, _key: KeyEvent) -> Option<()> {
        None
    }

    fn set_focused(&mut self, focused: bool) {
        self.focused = focused;
    }

    fn is_focused(&self) -> bool {
        self.focused
    }
}

enum SendStep {
    Form,
    Review,
    Sending,
    Confirm,
}

pub struct SendScreen {
    account_id: String,
    account_name: String,
    account_address: String,
    chain_id: String,
    protocol: String,
    step: SendStep,
    to_picker: DropdownPicker<AddressBookEntryItem, ()>,
    amount_field: TextField,
    memo_field: TextField,
    password_field: TextField,
    review_data: Option<SendReviewData>,
    result: Option<SendResult>,
    focus: usize,
    copied_feedback: Option<String>,
    send_data: ApiState<SendData>,
    spinner_start: Option<Instant>,
    send_phase: String,
}

impl SendScreen {
    pub fn new(account: AccountInfo) -> Self {
        Self {
            account_id: account.account_id,
            account_name: account.name,
            account_address: account.address,
            chain_id: account.chain_id,
            protocol: account.protocol,
            step: SendStep::Form,
            to_picker: DropdownPicker::new("To", "Enter address or search contacts...", Vec::new()),
            amount_field: TextField::new(TextFieldConfig {
                label: "Amount".into(),
                placeholder: "Enter amount...".into(),
                password_mode: false,
                initial_value: String::new(),
                feedback: None,
            }),
            memo_field: TextField::new(TextFieldConfig {
                label: "Memo (optional)".into(),
                placeholder: "Enter memo (Zcash only)...".into(),
                password_mode: false,
                initial_value: String::new(),
                feedback: None,
            }),
            password_field: TextField::new(TextFieldConfig {
                label: "Password".into(),
                placeholder: "Enter password...".into(),
                password_mode: true,
                initial_value: String::new(),
                feedback: None,
            }),
            review_data: None,
            result: None,
            focus: 0,
            copied_feedback: None,
            send_data: ApiState::Loading,
            spinner_start: None,
            send_phase: String::new(),
        }
    }
}

#[async_trait(?Send)]
impl Screen for SendScreen {
    fn name(&self) -> &str {
        "Send"
    }

    async fn on_reactivate(&mut self, api: &mut dyn WalletApi) {
        api.refresh_send(&self.account_id).await;
        self.send_data = api.send_state(&self.account_id).await;
        let book = api.get_address_book().await;
        self.to_picker.set_items(
            book.entries
                .into_iter()
                .filter(|e| e.protocol == self.protocol && e.address != self.account_address)
                .map(AddressBookEntryItem::new)
                .collect(),
        );
    }

    async fn tick(&mut self, api: &mut dyn WalletApi) -> Nav {
        if let SendStep::Sending = self.step {
            self.send_phase = api.poll_send_phase().await;
            if let Some(result) = api.poll_send_result().await {
                self.result = Some(result);
                self.step = SendStep::Confirm;
            }
        }
        Nav::None
    }

    async fn init(&mut self, api: &dyn WalletApi) {
        self.send_data = api.send_state(&self.account_id).await;
        let book = api.get_address_book().await;
        self.to_picker.set_items(
            book.entries
                .into_iter()
                .filter(|e| e.protocol == self.protocol && e.address != self.account_address)
                .map(AddressBookEntryItem::new)
                .collect(),
        );
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

        let step_name = match self.step {
            SendStep::Form => "Send — Enter Details",
            SendStep::Review => "Send — Review",
            SendStep::Sending => "Send — Processing",
            SendStep::Confirm => "Send — Confirmed",
        };

        let title_text = format!(" {} — {} ", step_name, self.account_name);
        let title = theme.title(&title_text).centered();
        frame.render_widget(Paragraph::new(title).style(Style::new().bg(ui::BG)), header);

        let addr_line =
            Paragraph::new(Line::from(vec![theme.muted(&self.account_address)]).centered())
                .style(Style::new().bg(ui::BG));
        frame.render_widget(
            addr_line,
            header.inner(Margin {
                vertical: 2,
                horizontal: 0,
            }),
        );

        match self.step {
            SendStep::Form => self.render_form(frame, body),
            SendStep::Review => self.render_review(frame, body),
            SendStep::Sending => self.render_sending(frame, body),
            SendStep::Confirm => self.render_confirm(frame, body),
        }

        let footer_text = match self.step {
            SendStep::Form => theme.help_line([
                ("Tab/↓", "Focus"),
                ("Enter", "Review"),
                ("Esc", "Back"),
                ("?", "Help"),
            ]),
            SendStep::Review => {
                theme.help_line([("Enter", "Send"), ("Esc", "Edit"), ("?", "Help")])
            }
            SendStep::Sending => theme.help_line([("", "Processing...")]),
            SendStep::Confirm => {
                theme.help_line([("c", "Copy TX Hash"), ("Enter", "Done"), ("?", "Help")])
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
        match self.step {
            SendStep::Form => {
                let is_zcash =
                    self.chain_id.contains("bip122") || !self.chain_id.contains("eip155");
                let max_focus = if is_zcash { 2 } else { 1 };
                match key.code {
                    KeyCode::Tab => {
                        if self.focus == 0
                            && self.to_picker.is_open()
                            && self.to_picker.has_filtered()
                        {
                            self.to_picker.handle_event(key);
                        } else {
                            if self.focus == 0 {
                                self.to_picker.close();
                            }
                            self.focus = (self.focus + 1).min(max_focus);
                        }
                    }
                    KeyCode::Down => {
                        if self.focus == 0 && self.to_picker.has_items() {
                            self.to_picker.handle_event(key);
                            if self.to_picker.is_open() && !self.to_picker.has_filtered() {
                                self.to_picker.close();
                                self.focus = (self.focus + 1).min(max_focus);
                            }
                        } else {
                            self.focus = (self.focus + 1).min(max_focus);
                        }
                    }
                    KeyCode::BackTab => {
                        if self.focus == 0
                            && self.to_picker.is_open()
                            && self.to_picker.has_filtered()
                        {
                            self.to_picker.handle_event(key);
                        } else {
                            if self.focus == 0 {
                                self.to_picker.close();
                            }
                            self.focus = self.focus.saturating_sub(1);
                        }
                    }
                    KeyCode::Up => {
                        if self.focus == 0
                            && self.to_picker.is_open()
                            && self.to_picker.has_filtered()
                        {
                            self.to_picker.handle_event(key);
                        } else if self.focus == 0 && self.to_picker.is_open() {
                            self.to_picker.close();
                        } else if self.focus == 0 {
                        } else {
                            self.focus = self.focus.saturating_sub(1);
                        }
                    }
                    KeyCode::Enter => {
                        if self.focus == 0 && self.to_picker.is_open() {
                            if self.to_picker.has_filtered() {
                                if let Some(DropdownAction::Selected(idx)) =
                                    self.to_picker.handle_event(key)
                                {
                                    let addr = self
                                        .to_picker
                                        .get_item(idx)
                                        .map(|item| item.entry.address.clone());
                                    if let Some(address) = addr {
                                        self.to_picker.set_value(&address);
                                    }
                                }
                            } else {
                                self.to_picker.close();
                            }
                        } else {
                            let memo = if is_zcash {
                                Some(self.memo_field.value().to_string())
                            } else {
                                None
                            };
                            let review = api
                                .submit_send_review(SendReviewInput {
                                    to_address: self.to_picker.value().into(),
                                    amount: self.amount_field.value().into(),
                                    token_id: "eth-native".into(),
                                    chain_id: self.chain_id.clone(),
                                    account_id: self.account_id.clone(),
                                    memo,
                                })
                                .await;
                            self.review_data = Some(review);
                            if self
                                .review_data
                                .as_ref()
                                .map(|d| d.skip_review)
                                .unwrap_or(false)
                            {
                                self.step = SendStep::Sending;
                                self.spinner_start = Some(Instant::now());
                            } else {
                                self.step = SendStep::Review;
                            }
                        }
                    }
                    _ => {
                        if key.code == KeyCode::Esc {
                            return Nav::Pop;
                        } else {
                            match self.focus {
                                0 => {
                                    self.to_picker.handle_event(key);
                                }
                                1 => {
                                    self.amount_field.handle_event(key);
                                }
                                2 => {
                                    self.memo_field.handle_event(key);
                                }
                                _ => {}
                            }
                        }
                    }
                }
            }
            SendStep::Review => match key.code {
                KeyCode::Enter => {
                    if let Some(ref review) = self.review_data {
                        let password = self.password_field.value().to_string();
                        let result = api
                            .submit_send_confirm(SendConfirmInput {
                                reviewed: ReviewedDetails {
                                    to_address: review.to_address.clone(),
                                    amount: review.amount.clone(),
                                    fee_estimate: review.fee_estimate.clone(),
                                    total_amount: review.total_amount.clone(),
                                },
                                auth_confirmation: AuthConfirmation {
                                    auth_type: "password".into(),
                                    value: password,
                                },
                                signed_tx: String::new(),
                            })
                            .await;
                        if result.status == "pending" {
                            self.step = SendStep::Sending;
                            self.spinner_start = Some(Instant::now());
                        } else {
                            self.result = Some(result);
                            self.step = SendStep::Confirm;
                        }
                    }
                }
                KeyCode::Esc => {
                    self.step = SendStep::Form;
                }
                _ => {
                    self.password_field.handle_event(key);
                }
            },
            SendStep::Sending => {
                self.send_phase = api.poll_send_phase().await;
                if let Some(result) = api.poll_send_result().await {
                    self.result = Some(result);
                    self.step = SendStep::Confirm;
                }
            }
            SendStep::Confirm => match key.code {
                KeyCode::Enter | KeyCode::Esc => {
                    return Nav::Pop;
                }
                KeyCode::Char('c') => {
                    if let Some(ref result) = self.result {
                        let mut cb = arboard::Clipboard::new().ok();
                        if let Some(ref mut clipboard) = cb {
                            let _ = clipboard.set_text(result.tx_hash.clone());
                        }
                        self.copied_feedback = Some("Copied!".into());
                    }
                }
                _ => {}
            },
        }
        Nav::None
    }

    async fn handle_paste(&mut self, text: &str, _api: &mut dyn WalletApi) -> Nav {
        match self.step {
            SendStep::Form => match self.focus {
                0 => self.to_picker.handle_paste(text),
                1 => self.amount_field.handle_paste(text),
                2 => self.memo_field.handle_paste(text),
                _ => {}
            },
            SendStep::Review => self.password_field.handle_paste(text),
            _ => {}
        }
        Nav::None
    }
}

impl SendScreen {
    fn render_form(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Transaction Details");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        match &self.send_data {
            ApiState::Loading => {
                let msg = Paragraph::new(Line::from(vec![theme.muted(" Loading...")]))
                    .centered()
                    .style(Style::new().bg(ui::BG));
                frame.render_widget(
                    msg,
                    inner.inner(Margin {
                        vertical: 3,
                        horizontal: 2,
                    }),
                );
            }
            ApiState::Error(err) => {
                ui::render_error_banner(frame, area, err);
                let msg = Paragraph::new(Line::from(vec![
                    theme.error(" Could not load send data. "),
                    theme.muted("Press "),
                    theme.accent("Esc"),
                    theme.muted(" to go back."),
                ]))
                .centered()
                .style(Style::new().bg(ui::BG));
                frame.render_widget(
                    msg,
                    inner.inner(Margin {
                        vertical: 4,
                        horizontal: 2,
                    }),
                );
            }
            ApiState::Loaded(ref data) => {
                let divisor = 10u128.pow(data.decimals as u32) as f64;
                let bal = data.spendable_balance.parse::<f64>().unwrap_or(0.0) / divisor;
                let bal_str = format!("{:.8}", bal);
                let is_ethereum = data.chain_id.contains("eip155");
                let symbol = if is_ethereum { "ETH" } else { "ZEC" };

                self.to_picker.set_focused(self.focus == 0);
                self.to_picker.render(
                    frame,
                    inner.inner(Margin {
                        vertical: 3,
                        horizontal: 2,
                    }),
                );

                let amt_placeholder = format!("Enter amount ({})...", symbol);
                self.amount_field.set_placeholder(&amt_placeholder);
                self.amount_field.set_focused(self.focus == 1);
                self.amount_field.render(
                    frame,
                    inner.inner(Margin {
                        vertical: 6,
                        horizontal: 2,
                    }),
                );

                if !is_ethereum {
                    self.memo_field.set_focused(self.focus == 2);
                    self.memo_field.render(
                        frame,
                        inner.inner(Margin {
                            vertical: 9,
                            horizontal: 2,
                        }),
                    );
                }

                // Render dropdown overlay last so it appears on top of all fields
                self.to_picker.render_overlay(
                    frame,
                    inner.inner(Margin {
                        vertical: 3,
                        horizontal: 2,
                    }),
                );

                let y_offset = if !is_ethereum { 12 } else { 9 };

                let balance_line = if !is_ethereum {
                    Line::from(vec![
                        theme.muted("Balance: "),
                        theme.span(format!("{} {}", bal_str, symbol)),
                        theme.muted(" (max 8 decimals)"),
                    ])
                } else {
                    Line::from(vec![
                        theme.muted("Balance: "),
                        theme.span(format!("{} {}", bal_str, symbol)),
                    ])
                };
                let bal_para = Paragraph::new(balance_line).style(Style::new().bg(ui::BG));
                frame.render_widget(
                    bal_para,
                    inner.inner(Margin {
                        vertical: y_offset,
                        horizontal: 2,
                    }),
                );
            }
        }
    }

    fn render_review(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Review Transaction");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        if let Some(ref review) = self.review_data {
            let is_ethereum = self.chain_id.contains("eip155");
            let ticker = if is_ethereum { "ETH" } else { "ZEC" };

            let decimals = if let ApiState::Loaded(ref data) = &self.send_data {
                data.decimals
            } else {
                18
            };
            let from_address = if let ApiState::Loaded(ref data) = &self.send_data {
                data.from_address.clone()
            } else {
                String::new()
            };

            let amount_display =
                format!("{} {}", format_eth_amount(&review.amount, decimals), ticker);

            let fee_display = format!(
                "{} {}",
                format_eth_amount(&review.fee_estimate, decimals),
                ticker
            );

            let total_display = format!(
                "{} {}",
                format_eth_amount(&review.total_amount, decimals),
                ticker
            );

            let chain_display = if is_ethereum {
                "Ethereum Mainnet".to_string()
            } else {
                review.chain_id.clone()
            };

            let nonce_display = format!("{}", review.nonce);

            let lines = vec![
                Line::from(vec![theme.muted("From:      "), theme.span(&from_address)]),
                Line::from(""),
                Line::from(vec![
                    theme.muted("To:        "),
                    theme.span(&review.to_address),
                ]),
                Line::from(""),
                Line::from(vec![
                    theme.muted("Amount:    "),
                    theme.span(&amount_display),
                ]),
                Line::from(vec![
                    theme.muted("Fee:       "),
                    theme.warning(&fee_display),
                ]),
                Line::from(vec![theme.muted("Nonce:     "), theme.span(&nonce_display)]),
                Line::from(vec![
                    theme.muted("Total:     "),
                    theme.accent(&total_display),
                ]),
                Line::from(""),
                Line::from(vec![theme.muted("Chain:     "), theme.span(&chain_display)]),
                Line::from(""),
                Line::from(vec![theme.muted("Enter password and press ENTER to send")]),
            ];
            let para = Paragraph::new(Text::from(lines)).style(Style::new().bg(ui::BG));
            frame.render_widget(
                para,
                inner.inner(Margin {
                    vertical: 2,
                    horizontal: 4,
                }),
            );

            self.password_field.set_focused(true);
            self.password_field.render(
                frame,
                inner.inner(Margin {
                    vertical: 14,
                    horizontal: 4,
                }),
            );
        }
    }

    fn render_sending(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let phase_label = if self.send_phase.is_empty() {
            "Processing..."
        } else {
            self.send_phase.as_str()
        };
        let block = theme.titled_block(phase_label);
        let inner = block.inner(area);
        frame.render_widget(block, area);

        let elapsed = self
            .spinner_start
            .map(|s| s.elapsed().as_millis())
            .unwrap_or(0);
        let spinner = match (elapsed / 80) % 8 {
            0 => "⠙",
            1 => "⠹",
            2 => "⠸",
            3 => "⠼",
            4 => "⠴",
            5 => "⠦",
            6 => "⠧",
            7 => "⠇",
            _ => "⠙",
        };

        let lines = vec![
            Line::from(vec![theme.accent(format!(" {} {} ", spinner, phase_label))]).centered(),
            Line::from(""),
            Line::from(vec![
                theme.muted("Please wait while your transaction is processed")
            ])
            .centered(),
            Line::from(""),
            Line::from(vec![theme.muted("This may take a moment...")]).centered(),
        ];
        let para = Paragraph::new(Text::from(lines)).style(Style::new().bg(ui::BG));
        frame.render_widget(
            para,
            inner.inner(Margin {
                vertical: 3,
                horizontal: 2,
            }),
        );
    }

    fn render_confirm(&self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let block = theme.titled_block("Transaction Sent");
        let inner = block.inner(area);
        frame.render_widget(block, area);

        if let Some(ref result) = self.result {
            let mut lines = vec![
                Line::from(vec![theme.success(" ✓ Transaction Broadcasted ")]),
                Line::from(""),
                Line::from(vec![theme.muted("TX Hash:")]),
                Line::from(vec![theme.accent(&result.tx_hash)]),
                Line::from(""),
                Line::from(vec![theme.muted("Status: "), theme.success(&result.status)]),
                Line::from(""),
                Line::from(vec![theme.muted("View on block explorer:")]),
                Line::from(vec![theme.span(&result.block_explorer_url)]),
                Line::from(""),
            ];
            if let Some(ref feedback) = self.copied_feedback {
                lines.push(Line::from(vec![theme.success(feedback)]));
                lines.push(Line::from(""));
            }
            lines.push(Line::from(vec![theme.muted("Press ENTER to return")]));
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
}

fn format_eth_amount(amount: &str, decimals: u8) -> String {
    let divisor = 10u128.pow(decimals as u32) as f64;
    let value = amount.parse::<f64>().unwrap_or(0.0) / divisor;
    format!("{:.6}", value)
}
