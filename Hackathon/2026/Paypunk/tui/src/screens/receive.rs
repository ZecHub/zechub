use crate::api::types::*;
use crate::api::WalletApi;
use crate::app::Nav;
use crate::screens::help::HelpScreen;
use crate::screens::Screen;
use crate::ui;
use async_trait::async_trait;
use qrcode::QrCode;
use ratatui::layout::{Constraint, Layout, Margin};
use ratatui::style::Style;
use ratatui::text::{Line, Span, Text};
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;
use ratatui_cheese::fieldset::{Fieldset, FieldsetFill};

pub struct ReceiveScreen {
    account_id: String,
    account_name: String,
    chain_id: String,
    copied_feedback: Option<String>,
    receive_data: ApiState<ReceiveData>,
}

impl ReceiveScreen {
    pub fn new(account: AccountInfo) -> Self {
        Self {
            account_id: account.account_id,
            account_name: account.name,
            chain_id: account.chain_id,
            copied_feedback: None,
            receive_data: ApiState::Loading,
        }
    }
}

#[async_trait(?Send)]
impl Screen for ReceiveScreen {
    fn name(&self) -> &str {
        "Receive"
    }

    async fn on_reactivate(&mut self, api: &mut dyn WalletApi) {
        api.refresh_receive(&self.account_id).await;
        self.receive_data = api.receive_state(&self.account_id).await;
    }

    async fn init(&mut self, api: &dyn WalletApi) {
        self.receive_data = api.receive_state(&self.account_id).await;
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

        let title = theme
            .title(format!(" Receive — {} ", self.account_name))
            .centered();
        frame.render_widget(Paragraph::new(title).style(Style::new().bg(ui::BG)), header);

        match &self.receive_data {
            ApiState::Loading => {
                let block = Block::new().style(Style::new().bg(ui::BG));
                frame.render_widget(block, body);
                let msg = Paragraph::new(Line::from(vec![theme.muted(" Loading...")]))
                    .centered()
                    .style(Style::new().bg(ui::BG));
                frame.render_widget(msg, body);
            }
            ApiState::Error(err) => {
                ui::render_error_banner(frame, body, err);
                let msg = Paragraph::new(Line::from(vec![
                    theme.error(" Could not load receive data. ")
                ]))
                .centered()
                .style(Style::new().bg(ui::BG));
                frame.render_widget(
                    msg,
                    body.inner(Margin {
                        vertical: 4,
                        horizontal: 2,
                    }),
                );
            }
            ApiState::Loaded(ref data) => {
                let fieldset = Fieldset::new()
                    .title("")
                    .fill(FieldsetFill::Dash)
                    .top_alignment(ratatui::layout::Alignment::Left);
                let inner = fieldset.inner(body);
                frame.render_widget(fieldset, body);

                let inner2 = inner.inner(Margin {
                    vertical: 2,
                    horizontal: 4,
                });

                let mut lines = Vec::new();
                lines.push(Line::from(vec![theme.muted("Address:")]));
                lines.push(Line::from(
                    vec![theme.accent(format!("  {}", data.address))],
                ));
                lines.push(Line::from(""));
                lines.push(Line::from(vec![
                    theme.muted("Format: "),
                    theme.span(&data.address_format),
                ]));
                lines.push(Line::from(""));
                if let Some(ref feedback) = self.copied_feedback {
                    lines.push(Line::from(vec![theme.success(feedback)]));
                    lines.push(Line::from(""));
                }
                lines.push(Line::from(""));

                let fg = ui::palette().foreground;
                match QrCode::new(data.qr_payload.as_bytes()) {
                    Ok(code) => {
                        let qr_str = code
                            .render::<qrcode::render::unicode::Dense1x2>()
                            .dark_color(qrcode::render::unicode::Dense1x2::Dark)
                            .light_color(qrcode::render::unicode::Dense1x2::Light)
                            .build();
                        for line in qr_str.lines() {
                            lines.push(Line::from(vec![Span::styled(
                                format!("  {}", line),
                                Style::new().fg(fg),
                            )]));
                        }
                    }
                    Err(_) => {
                        lines.push(Line::from(vec![theme.error("  QR generation failed")]));
                    }
                }

                let para = Paragraph::new(Text::from(lines)).style(Style::new().bg(ui::BG));
                frame.render_widget(para, inner2);
            }
        }

        let footer_text = theme.help_line([("c", "Copy Address"), ("Esc", "Back")]);
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
        _api: &mut dyn WalletApi,
    ) -> Nav {
        use crossterm::event::KeyCode;
        match key.code {
            KeyCode::Char('c') => {
                if let ApiState::Loaded(ref data) = &self.receive_data {
                    let mut cb = arboard::Clipboard::new().ok();
                    if let Some(ref mut clipboard) = cb {
                        let _ = clipboard.set_text(data.address.clone());
                    }
                    self.copied_feedback = Some("Copied!".into());
                }
            }
            KeyCode::Char('?') => return Nav::Push(Box::new(HelpScreen::new(self.name()))),
            KeyCode::Esc => return Nav::Pop,
            _ => {}
        }
        Nav::None
    }
}
