use crate::api::types::HistoryRow as ApiHistoryRow;
use crate::api::WalletApi;
use crate::app::Nav;
use crate::screens::help::HelpScreen;
use crate::screens::Screen;
use crate::ui;
use async_trait::async_trait;
use ratatui::layout::{Constraint, Layout, Margin};
use ratatui::style::Style;
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;

fn format_unix_utc(ts: u64) -> String {
    let days = (ts / 86400) as i64;
    let secs_of_day = (ts % 86400) as i64;
    let hour = secs_of_day / 3600;
    let min = (secs_of_day % 3600) / 60;
    let (y, m, d) = days_to_ymd(days);
    format!("{y:04}-{m:02}-{d:02} {hour:02}:{min:02}")
}

fn days_to_ymd(days_since_epoch: i64) -> (i64, u32, u32) {
    let mut days = days_since_epoch;
    let mut year: i64 = 1970;
    loop {
        let leap = is_leap(year);
        let yd = if leap { 366 } else { 365 };
        if days < yd {
            break;
        }
        days -= yd;
        year += 1;
    }
    let leap = is_leap(year);
    let mdays = [
        31,
        if leap { 29 } else { 28 },
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    let mut month = 0u32;
    for (i, &md) in mdays.iter().enumerate() {
        if days < md as i64 {
            month = i as u32 + 1;
            break;
        }
        days -= md as i64;
    }
    (year, month, days as u32 + 1)
}

fn is_leap(y: i64) -> bool {
    (y % 4 == 0 && y % 100 != 0) || y % 400 == 0
}

/// A single entry in the transaction history.
#[derive(Debug, Clone)]
struct HistoryRow {
    date: String,
    tx_type: String, // "Sent" or "Received"
    amount: String,
    status: String,
}

pub struct HistoryScreen {
    account_id: String,
    account_name: String,
    rows: Vec<HistoryRow>,
    selected: usize,
}

impl HistoryScreen {
    pub fn new(account_id: String, account_name: String) -> Self {
        Self {
            account_id,
            account_name,
            rows: Vec::new(),
            selected: 0,
        }
    }
}

#[async_trait(?Send)]
impl Screen for HistoryScreen {
    fn name(&self) -> &str {
        "History"
    }

    async fn init(&mut self, api: &dyn WalletApi) {
        let data = api.get_history(&self.account_id).await;
        self.rows = data
            .rows
            .into_iter()
            .map(|r: ApiHistoryRow| {
                let date = r
                    .timestamp
                    .map(|ts| format_unix_utc(ts))
                    .unwrap_or_else(|| "—".to_string());
                HistoryRow {
                    date,
                    tx_type: r.direction,
                    amount: r.amount,
                    status: r.status,
                }
            })
            .collect();
    }

    async fn on_reactivate(&mut self, api: &mut dyn WalletApi) {
        self.init(api).await;
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

        // Header
        let title_text = format!(" Transaction History — {} ", self.account_name);
        let title = theme.title(&title_text).centered();
        frame.render_widget(Paragraph::new(title).style(Style::new().bg(ui::BG)), header);

        // Body
        let block = theme.titled_block("History");
        let inner = block.inner(body);
        frame.render_widget(block, body);

        if self.rows.is_empty() {
            let empty_msg = Paragraph::new(Line::from(vec![theme.muted(" No transactions yet ")]))
                .centered()
                .style(Style::new().bg(ui::BG));
            frame.render_widget(
                empty_msg,
                inner.inner(Margin {
                    vertical: 3,
                    horizontal: 2,
                }),
            );
        } else {
            // Column headers
            let header_style = Style::new().fg(ui::palette().muted);
            let header_line = Line::from(vec![
                Span::styled(" Date          ", header_style),
                Span::styled(" Type     ", header_style),
                Span::styled(" Amount           ", header_style),
                Span::styled(" Status    ", header_style),
            ]);
            frame.render_widget(
                Paragraph::new(header_line).style(Style::new().bg(ui::BG)),
                inner.inner(Margin {
                    vertical: 1,
                    horizontal: 2,
                }),
            );

            // Rows
            for (i, row) in self.rows.iter().enumerate() {
                let y = 3 + i as u16;
                if y > inner.height.saturating_sub(2) {
                    break;
                }
                let row_style = if i == self.selected {
                    ui::selected_style()
                } else {
                    Style::new().fg(ui::palette().foreground).bg(ui::BG)
                };
                let row_line = Line::from(vec![
                    Span::styled(format!(" {:<13} ", row.date), row_style),
                    Span::styled(format!(" {:<8} ", row.tx_type), row_style),
                    Span::styled(format!(" {:<16} ", row.amount), row_style),
                    Span::styled(format!(" {:<8} ", row.status), row_style),
                ]);
                frame.render_widget(
                    Paragraph::new(row_line).style(Style::new().bg(ui::BG)),
                    inner.inner(Margin {
                        vertical: y,
                        horizontal: 2,
                    }),
                );
            }
        }

        // Footer
        let footer_text = theme.help_line([("↑↓", "Navigate"), ("Esc", "Back"), ("?", "Help")]);
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
            KeyCode::Char('?') => return Nav::Push(Box::new(HelpScreen::new(self.name()))),
            KeyCode::Up => {
                self.selected = self.selected.saturating_sub(1);
            }
            KeyCode::Down => {
                if !self.rows.is_empty() {
                    self.selected = (self.selected + 1).min(self.rows.len() - 1);
                }
            }
            KeyCode::Esc => return Nav::Pop,
            _ => {}
        }
        Nav::None
    }
}
