use crate::api::WalletApi;
use crate::app::Nav;
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

pub struct ConnectSignerScreen {
    error_msg: Option<String>,
    connecting: bool,
    spinner_frame: u32,
}

impl ConnectSignerScreen {
    pub fn new() -> Self {
        Self {
            error_msg: None,
            connecting: false,
            spinner_frame: 0,
        }
    }
}

#[async_trait(?Send)]
impl Screen for ConnectSignerScreen {
    fn name(&self) -> &str {
        "ConnectSigner"
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
            .muted("Connect to your offline signer")
            .into_centered_line();
        frame.render_widget(
            Paragraph::new(subtitle).style(Style::new().bg(ui::BG)),
            header.inner(Margin {
                vertical: 2,
                horizontal: 0,
            }),
        );

        let block = theme.titled_block("Connect to Signer");
        let inner = block.inner(body);
        frame.render_widget(block, body);

        if self.connecting {
            self.spinner_frame += 1;
            let spinner = match self.spinner_frame % 4 {
                0 => "◐",
                1 => "◓",
                2 => "◑",
                3 => "◒",
                _ => "◐",
            };
            let msg = Paragraph::new(Line::from(vec![
                theme.accent(format!(" {} Connecting to signer... ", spinner))
            ]));
            frame.render_widget(
                msg,
                inner.inner(Margin {
                    vertical: 3,
                    horizontal: 4,
                }),
            );
        } else {
            let instruction = Paragraph::new(Line::from(vec![
                theme.span("Set up the PayPunk Signer app on your mobile device,")
            ]));
            frame.render_widget(
                instruction,
                inner.inner(Margin {
                    vertical: 1,
                    horizontal: 4,
                }),
            );

            let instruction2 =
                Paragraph::new(Line::from(vec![theme.span("then press Enter to connect.")]));
            frame.render_widget(
                instruction2,
                inner.inner(Margin {
                    vertical: 2,
                    horizontal: 4,
                }),
            );

            let connect_hint =
                Paragraph::new(Line::from(vec![theme.accent(" Press Enter to connect ")]));
            frame.render_widget(
                connect_hint,
                inner.inner(Margin {
                    vertical: 5,
                    horizontal: 4,
                }),
            );

            if let Some(ref err) = self.error_msg {
                let err_para = Paragraph::new(Line::from(vec![theme.error(err)]))
                    .style(Style::new().bg(ui::BG));
                frame.render_widget(
                    err_para,
                    inner.inner(Margin {
                        vertical: 7,
                        horizontal: 4,
                    }),
                );
            }
        }

        let footer_text = theme.help_line([("Enter", "Connect"), ("Ctrl+C", "Quit")]);
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

        if self.connecting {
            return Nav::None;
        }

        match key.code {
            KeyCode::Char('?') => return Nav::Push(Box::new(HelpScreen::new(self.name()))),
            KeyCode::Enter => {
                self.connecting = true;
                self.error_msg = None;
                match api.unlock(String::new()).await {
                    Ok(_data) => {
                        return Nav::Replace(Box::new(HomeScreen::new()));
                    }
                    Err(e) => {
                        self.connecting = false;
                        self.error_msg = Some(e.0);
                    }
                }
            }
            _ => {}
        }
        Nav::None
    }
}
