use crate::components::Component;
use crate::ui;
use crossterm::event::{KeyCode, KeyEvent};
use ratatui::layout::{Margin, Rect};
use ratatui::style::Modifier;
use ratatui::style::Style;
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;

pub enum ButtonAction {
    Pressed,
}

pub enum ButtonSize {
    Sm,
    Md,
    Lg,
}

pub struct Button {
    label: String,
    size: ButtonSize,
    focused: bool,
    primary: bool,
}

impl Button {
    pub fn new(label: impl Into<String>) -> Self {
        Self {
            label: label.into(),
            size: ButtonSize::Md,
            focused: false,
            primary: false,
        }
    }

    pub fn size(mut self, size: ButtonSize) -> Self {
        self.size = size;
        self
    }

    pub fn button_size(&self) -> &ButtonSize {
        &self.size
    }

    pub fn primary(mut self, primary: bool) -> Self {
        self.primary = primary;
        self
    }
}

impl Component<ButtonAction> for Button {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let focused = self.focused;

        let (content_area, bg_area) = match self.size {
            ButtonSize::Sm => {
                let w = self.label.len() + 2;
                let inner = Rect {
                    x: area.x,
                    width: w as u16,
                    ..area
                };
                (inner, inner)
            }
            ButtonSize::Md => {
                let padded = area.inner(Margin {
                    vertical: 1,
                    horizontal: 0,
                });
                let w = self.label.len() + 6;
                let inner = Rect {
                    x: padded.x,
                    width: w as u16,
                    ..padded
                };
                let bg = Rect {
                    x: padded.x,
                    width: w as u16,
                    y: area.y,
                    height: area.height,
                };
                (
                    inner.inner(Margin {
                        vertical: 0,
                        horizontal: 1,
                    }),
                    bg,
                )
            }
            ButtonSize::Lg => {
                let padded = area.inner(Margin {
                    vertical: 1,
                    horizontal: 0,
                });
                (
                    padded.inner(Margin {
                        vertical: 0,
                        horizontal: 2,
                    }),
                    area,
                )
            }
        };

        let (bg_style, fg_style) = if self.primary {
            let bg = Style::new().bg(ui::palette().primary);
            let fg = Style::new().fg(ui::SURFACE);
            if focused {
                (bg, fg.add_modifier(Modifier::UNDERLINED))
            } else {
                (bg, fg.add_modifier(Modifier::BOLD))
            }
        } else if focused {
            (
                Style::new().bg(ui::palette().primary),
                Style::new().fg(ui::SURFACE),
            )
        } else {
            (
                Style::new().bg(ui::SURFACE),
                Style::new().fg(ui::palette().primary),
            )
        };

        let bg = Block::new().style(bg_style);
        frame.render_widget(bg, bg_area);

        let para = Paragraph::new(Line::from(vec![Span::styled(&self.label, fg_style)]))
            .style(bg_style)
            .centered();
        frame.render_widget(para, content_area);
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<ButtonAction> {
        if !self.focused {
            return None;
        }
        match key.code {
            KeyCode::Enter | KeyCode::Char(' ') => Some(ButtonAction::Pressed),
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
