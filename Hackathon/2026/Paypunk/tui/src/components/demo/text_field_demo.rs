use crate::app::Nav;
use crate::components::text_field::{TextField, TextFieldAction, TextFieldConfig};
use crate::components::Component;
use crate::ui;
use crossterm::event::{KeyCode, KeyEvent};
use ratatui::layout::{Constraint, Layout, Margin, Rect};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::Paragraph;
use ratatui::Frame;

pub struct TextFieldDemo {
    name_field: TextField,
    email_field: TextField,
    focus: usize,
    message: String,
}

impl TextFieldDemo {
    pub fn new() -> Self {
        Self {
            name_field: TextField::new(TextFieldConfig {
                label: "Name".into(),
                placeholder: "Enter your name...".into(),
                password_mode: false,
                initial_value: String::new(),
                feedback: None,
            }),
            email_field: TextField::new(TextFieldConfig {
                label: "Email".into(),
                placeholder: "user@example.com".into(),
                password_mode: false,
                initial_value: String::new(),
                feedback: None,
            }),
            focus: 0,
            message: String::new(),
        }
    }
}

impl Component<Nav> for TextFieldDemo {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let chunks = Layout::vertical([
            Constraint::Length(3),
            Constraint::Length(1),
            Constraint::Length(3),
            Constraint::Length(1),
        ])
        .split(area.inner(Margin {
            vertical: 1,
            horizontal: 2,
        }));

        self.name_field.set_focused(self.focus == 0);
        self.email_field.set_focused(self.focus == 1);

        self.name_field.render(frame, chunks[0]);
        self.email_field.render(frame, chunks[2]);

        if !self.message.is_empty() {
            let msg = Paragraph::new(Line::from(vec![theme.success(&self.message)]))
                .style(Style::new().bg(ui::BG));
            frame.render_widget(msg, chunks[3]);
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<Nav> {
        match key.code {
            KeyCode::Tab | KeyCode::Down => {
                self.focus = (self.focus + 1).min(1);
                return None;
            }
            KeyCode::Up => {
                self.focus = self.focus.saturating_sub(1);
                return None;
            }
            _ => {}
        }

        if let Some(action) = self.name_field.handle_event(key) {
            match action {
                TextFieldAction::Changed(v) => {
                    self.message = format!("Name: {}", v);
                }
                TextFieldAction::Submitted => {
                    self.message = format!("Hello, {}!", self.name_field.value());
                }
            }
        }
        if let Some(action) = self.email_field.handle_event(key) {
            match action {
                TextFieldAction::Changed(v) => {
                    self.message = format!("Email: {}", v);
                }
                TextFieldAction::Submitted => {
                    self.message = format!("Contact at: {}", self.email_field.value());
                }
            }
        }
        None
    }

    fn set_focused(&mut self, focused: bool) {
        if !focused {
            self.focus = 0;
        }
    }

    fn is_focused(&self) -> bool {
        true
    }
}
