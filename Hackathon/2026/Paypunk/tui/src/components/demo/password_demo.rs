use crate::app::Nav;
use crate::components::text_field::{Feedback, TextField, TextFieldAction, TextFieldConfig};
use crate::components::Component;
use crate::ui;
use crossterm::event::KeyEvent;
use ratatui::layout::{Constraint, Layout, Margin, Rect};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::Paragraph;
use ratatui::Frame;

pub struct PasswordDemo {
    password_field: TextField,
    message: String,
}

impl PasswordDemo {
    pub fn new() -> Self {
        Self {
            password_field: TextField::new(TextFieldConfig {
                label: "Password".into(),
                placeholder: "Min 8 characters".into(),
                password_mode: true,
                initial_value: String::new(),
                feedback: None,
            }),
            message: String::new(),
        }
    }
}

impl Component<Nav> for PasswordDemo {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let chunks = Layout::vertical([
            Constraint::Length(3),
            Constraint::Length(1),
            Constraint::Length(2),
        ])
        .split(area.inner(Margin {
            vertical: 1,
            horizontal: 2,
        }));

        self.password_field.set_focused(true);
        self.password_field.render(frame, chunks[0]);

        let hint = Paragraph::new(Line::from(vec![
            theme.muted("Characters are masked. Press Enter to validate.")
        ]))
        .style(Style::new().bg(ui::BG));
        frame.render_widget(hint, chunks[1]);

        if !self.message.is_empty() {
            let span = if self.message == "Valid" {
                theme.success(&self.message)
            } else {
                theme.error(&self.message)
            };
            let msg = Paragraph::new(Line::from(vec![span])).style(Style::new().bg(ui::BG));
            frame.render_widget(msg, chunks[2]);
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<Nav> {
        if let Some(action) = self.password_field.handle_event(key) {
            match action {
                TextFieldAction::Changed(v) => {
                    if v.len() >= 8 {
                        self.password_field
                            .set_feedback(Some(Feedback::Success("Strong password".into())));
                    } else if !v.is_empty() {
                        self.password_field.set_feedback(Some(Feedback::Warning(
                            "At least 8 characters needed".into(),
                        )));
                    } else {
                        self.password_field.set_feedback(None);
                    }
                }
                TextFieldAction::Submitted => {
                    let pw = self.password_field.value();
                    self.message = if pw.len() >= 8 {
                        "Valid".into()
                    } else {
                        "Too short!".into()
                    };
                }
            }
        }
        None
    }

    fn set_focused(&mut self, _focused: bool) {}

    fn is_focused(&self) -> bool {
        true
    }
}
