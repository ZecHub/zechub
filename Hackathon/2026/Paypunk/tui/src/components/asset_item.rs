use crate::api::types::AssetRow;
use crate::components::Component;
use crate::ui;
use crossterm::event::{KeyCode, KeyEvent};
use ratatui::layout::{Constraint, Layout, Rect};
use ratatui::style::Style;
use ratatui::text::{Line, Span};
use ratatui::widgets::Paragraph;
use ratatui::Frame;

pub enum AssetAction {
    Send,
    Receive,
    History,
}

pub struct AssetItem {
    asset: AssetRow,
    focused: bool,
    button_focus: usize,
}

impl AssetItem {
    pub fn new(asset: AssetRow) -> Self {
        Self {
            asset,
            focused: false,
            button_focus: 0,
        }
    }
}

impl Component<AssetAction> for AssetItem {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let row_bg = if self.focused { ui::SURFACE } else { ui::BG };

        let name_style = if self.focused {
            Style::new().fg(ui::palette().foreground).bold()
        } else {
            Style::new().fg(ui::palette().foreground)
        };
        let amount_style = Style::new().fg(ui::palette().foreground);

        let rows = Layout::vertical([
            Constraint::Length(1),
            Constraint::Length(1),
            Constraint::Length(1),
            Constraint::Length(1),
            Constraint::Length(1),
        ])
        .split(area);

        let balance_str = &self.asset.holdings_amount;
        let gap =
            (area.width as usize).saturating_sub(self.asset.name.len() + balance_str.len() + 5);
        let line = Line::from(vec![
            Span::styled(format!("  {}", self.asset.name), name_style),
            Span::styled(" ".repeat(gap), Style::new()),
            Span::styled(format!("  {} ", balance_str), amount_style),
        ]);
        frame.render_widget(Paragraph::new(line).style(Style::new().bg(row_bg)), rows[1]);

        let btn_labels = [" Send ", " Receive ", " History "];
        let mut x_offset = 2u16;
        for (i, label) in btn_labels.iter().enumerate() {
            let w = label.len() as u16 + 2;
            let btn_rect = Rect {
                x: area.x + x_offset,
                y: rows[3].y,
                width: w,
                height: 1,
            };
            x_offset += w + 1;

            let is_btn_focused = self.focused && i == self.button_focus;
            let (bg, fg) = if is_btn_focused {
                (ui::palette().primary, ui::SURFACE)
            } else if self.focused {
                (ui::SURFACE, ui::palette().foreground)
            } else {
                (ui::BG, ui::palette().muted)
            };
            let btn_style = Style::new().bg(bg).fg(fg);
            let btn_line = Line::from(vec![Span::styled(format!(" {} ", label), btn_style)]);
            frame.render_widget(Paragraph::new(btn_line).style(btn_style), btn_rect);
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<AssetAction> {
        if !self.focused {
            return None;
        }
        match key.code {
            KeyCode::Left => {
                self.button_focus = if self.button_focus == 0 {
                    2
                } else {
                    self.button_focus - 1
                };
                None
            }
            KeyCode::Right => {
                self.button_focus = (self.button_focus + 1) % 3;
                None
            }
            KeyCode::Enter | KeyCode::Char(' ') => Some(match self.button_focus {
                0 => AssetAction::Send,
                1 => AssetAction::Receive,
                _ => AssetAction::History,
            }),
            _ => None,
        }
    }

    fn set_focused(&mut self, focused: bool) {
        self.focused = focused;
    }

    fn is_focused(&self) -> bool {
        self.focused
    }
}
