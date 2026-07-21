use crate::app::Nav;
use crate::components::button::{Button, ButtonAction, ButtonSize};
use crate::components::Component;
use crate::ui;
use crossterm::event::{KeyCode, KeyEvent};
use ratatui::layout::{Constraint, Layout, Margin, Rect};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::Paragraph;
use ratatui::Frame;

pub struct ButtonDemo {
    small_buttons: [Button; 2],
    medium_buttons: [Button; 2],
    large_button: Button,
    focus: usize,
    message: String,
}

impl ButtonDemo {
    pub fn new() -> Self {
        Self {
            small_buttons: [
                Button::new("Cancel").size(ButtonSize::Sm),
                Button::new("Ok").size(ButtonSize::Sm).primary(true),
            ],
            medium_buttons: [
                Button::new("Cancel").size(ButtonSize::Md),
                Button::new("Ok").size(ButtonSize::Md).primary(true),
            ],
            large_button: Button::new("Large Button").size(ButtonSize::Lg),
            focus: 0,
            message: String::new(),
        }
    }
}

impl Component<Nav> for ButtonDemo {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();

        let rows = Layout::vertical([
            Constraint::Length(2),
            Constraint::Length(1),
            Constraint::Length(1),
            Constraint::Length(2),
            Constraint::Length(3),
            Constraint::Length(1),
            Constraint::Length(2),
            Constraint::Length(3),
        ])
        .split(area.inner(Margin {
            vertical: 1,
            horizontal: 2,
        }));

        let label_line =
            Paragraph::new(Line::from(vec![theme.muted("Small:")])).style(Style::new().bg(ui::BG));
        frame.render_widget(label_line, rows[0]);

        let sm_areas = Layout::horizontal([
            Constraint::Length(8),
            Constraint::Length(1),
            Constraint::Length(8),
        ])
        .split(rows[1]);
        for (i, btn) in self.small_buttons.iter_mut().enumerate() {
            btn.set_focused(self.focus == i);
            btn.render(frame, sm_areas[i * 2]);
        }

        let label_line =
            Paragraph::new(Line::from(vec![theme.muted("Medium:")])).style(Style::new().bg(ui::BG));
        frame.render_widget(label_line, rows[3]);

        let md_areas = Layout::horizontal([
            Constraint::Length(12),
            Constraint::Length(1),
            Constraint::Length(12),
        ])
        .split(rows[4]);
        for (i, btn) in self.medium_buttons.iter_mut().enumerate() {
            btn.set_focused(self.focus == i + 2);
            btn.render(frame, md_areas[i * 2]);
        }

        let label_line =
            Paragraph::new(Line::from(vec![theme.muted("Large:")])).style(Style::new().bg(ui::BG));
        frame.render_widget(label_line, rows[6]);

        self.large_button.set_focused(self.focus == 4);
        self.large_button.render(frame, rows[7]);

        if !self.message.is_empty() {
            let msg_y = 16;
            let msg = Paragraph::new(Line::from(vec![theme.success(&self.message)]))
                .style(Style::new().bg(ui::BG));
            frame.render_widget(
                msg,
                Rect {
                    x: area.x + 2,
                    y: area.y + msg_y,
                    width: area.width.saturating_sub(4),
                    height: 1,
                },
            );
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<Nav> {
        match key.code {
            KeyCode::Tab | KeyCode::Down => {
                self.focus = (self.focus + 1).min(4);
                return None;
            }
            KeyCode::Up => {
                self.focus = self.focus.saturating_sub(1);
                return None;
            }
            _ => {}
        }

        let btn: Option<&mut Button> = match self.focus {
            0 | 1 => Some(&mut self.small_buttons[self.focus]),
            2 | 3 => Some(&mut self.medium_buttons[self.focus - 2]),
            4 => Some(&mut self.large_button),
            _ => None,
        };

        if let Some(btn) = btn {
            if let Some(ButtonAction::Pressed) = btn.handle_event(key) {
                let names = ["Sm 1", "Sm 2", "Cancel", "Ok", "Large Button"];
                self.message = format!("\"{}\" button pressed!", names[self.focus]);
            }
        }
        None
    }

    fn set_focused(&mut self, _focused: bool) {}

    fn is_focused(&self) -> bool {
        true
    }
}
