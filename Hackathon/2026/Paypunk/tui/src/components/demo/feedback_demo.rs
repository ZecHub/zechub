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

pub struct FeedbackDemo {
    field: TextField,
    message: String,
}

impl FeedbackDemo {
    pub fn new() -> Self {
        Self {
            field: TextField::new(TextFieldConfig {
                label: "Username".into(),
                placeholder: "Choose a username...".into(),
                password_mode: false,
                initial_value: String::new(),
                feedback: None,
            }),
            message: String::new(),
        }
    }
}

impl Component<Nav> for FeedbackDemo {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();
        let chunks = Layout::vertical([Constraint::Length(4), Constraint::Length(2)]).split(
            area.inner(Margin {
                vertical: 1,
                horizontal: 2,
            }),
        );

        self.field.set_focused(true);
        self.field.render(frame, chunks[0]);

        if !self.message.is_empty() {
            let msg = Paragraph::new(Line::from(vec![theme.success(&self.message)]))
                .style(Style::new().bg(ui::BG));
            frame.render_widget(msg, chunks[1]);
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<Nav> {
        if let Some(action) = self.field.handle_event(key) {
            match action {
                TextFieldAction::Changed(v) => {
                    let fb = if v.len() < 3 && !v.is_empty() {
                        Some(Feedback::Error("Too short (min 3 chars)".into()))
                    } else if v.contains(' ') {
                        Some(Feedback::Warning("Spaces not allowed".into()))
                    } else if v.len() >= 6 {
                        Some(Feedback::Success("Username available!".into()))
                    } else if !v.is_empty() {
                        Some(Feedback::Info("Getting better...".into()))
                    } else {
                        None
                    };
                    self.field.set_feedback(fb);
                    self.message.clear();
                }
                TextFieldAction::Submitted => {
                    self.message = format!("Username '{}' submitted!", self.field.value());
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
