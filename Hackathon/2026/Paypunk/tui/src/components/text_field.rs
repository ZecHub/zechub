use crate::components::Component;
use crate::ui;
use crossterm::event::{KeyCode, KeyEvent, KeyModifiers};
use ratatui::layout::{Constraint, Layout, Margin, Rect};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::Paragraph;
use ratatui::Frame;
use ratatui_cheese::input::{Input, InputState};

#[derive(Clone)]
pub enum Feedback {
    Error(String),
    Warning(String),
    Success(String),
    Info(String),
}

pub struct TextFieldConfig {
    pub label: String,
    pub placeholder: String,
    pub password_mode: bool,
    pub initial_value: String,
    pub feedback: Option<Feedback>,
}

pub enum TextFieldAction {
    Changed(String),
    Submitted,
}

pub struct TextField {
    config: TextFieldConfig,
    input_state: InputState,
    focused: bool,
}

impl TextField {
    pub fn new(config: TextFieldConfig) -> Self {
        let mut input_state = InputState::new();
        input_state.set_value(config.initial_value.clone());
        Self {
            config,
            input_state,
            focused: false,
        }
    }

    pub fn value(&self) -> &str {
        self.input_state.value()
    }

    pub fn set_value(&mut self, value: &str) {
        self.input_state.set_value(value.to_string());
        self.input_state.end();
    }

    pub fn set_feedback(&mut self, feedback: Option<Feedback>) {
        self.config.feedback = feedback;
    }

    pub fn set_placeholder(&mut self, placeholder: &str) {
        self.config.placeholder = placeholder.to_string();
    }

    pub fn handle_paste(&mut self, text: &str) {
        for c in text.chars() {
            self.input_state.insert_char(c);
        }
    }
}

impl Component<TextFieldAction> for TextField {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();

        let has_feedback = self.config.feedback.is_some();
        let chunks = if has_feedback {
            Layout::vertical([Constraint::Length(3), Constraint::Length(1)]).split(area)
        } else {
            Layout::vertical([Constraint::Length(3)]).split(area)
        };

        let input_area = chunks[0];

        let input = Input::new(&self.config.label).placeholder(&self.config.placeholder);

        let input = if self.config.password_mode {
            input.password_mode(true)
        } else {
            input
        };

        self.input_state.set_focused(self.focused);
        frame.render_stateful_widget(input, input_area, &mut self.input_state);

        if let Some(ref feedback) = self.config.feedback {
            let feedback_area = chunks[1].inner(Margin {
                vertical: 0,
                horizontal: 2,
            });
            let span = match feedback {
                Feedback::Error(m) => theme.error(m.as_str()),
                Feedback::Warning(m) => theme.warning(m.as_str()),
                Feedback::Success(m) => theme.success(m.as_str()),
                Feedback::Info(m) => theme.muted(m.as_str()),
            };
            let feedback_para =
                Paragraph::new(Line::from(vec![span])).style(Style::new().bg(ui::BG));
            frame.render_widget(feedback_para, feedback_area);
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<TextFieldAction> {
        if !self.focused {
            return None;
        }
        if key.modifiers.contains(KeyModifiers::CONTROL)
            && key.modifiers.contains(KeyModifiers::SHIFT)
            && key.code == KeyCode::Char('V')
        {
            if let Ok(mut clipboard) = arboard::Clipboard::new() {
                if let Ok(text) = clipboard.get_text() {
                    self.handle_paste(&text);
                    return Some(TextFieldAction::Changed(
                        self.input_state.value().to_string(),
                    ));
                }
            }
            return None;
        }
        match key.code {
            KeyCode::Char(c) => {
                self.input_state.insert_char(c);
                Some(TextFieldAction::Changed(
                    self.input_state.value().to_string(),
                ))
            }
            KeyCode::Backspace => {
                self.input_state.delete_before();
                Some(TextFieldAction::Changed(
                    self.input_state.value().to_string(),
                ))
            }
            KeyCode::Enter => Some(TextFieldAction::Submitted),
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
