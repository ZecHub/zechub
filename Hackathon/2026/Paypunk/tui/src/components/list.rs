use crate::components::Component;
use crate::ui;
use crossterm::event::{KeyCode, KeyEvent};
use ratatui::layout::{Constraint, Layout, Rect};
use ratatui::style::{Color, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;

pub enum ListAction<A> {
    Selected(usize),
    Item(usize, A),
}

pub struct List<A> {
    components: Vec<Box<dyn Component<A>>>,
    focus: usize,
    focused: bool,
    row_height: u16,
}

impl<A> List<A> {
    pub fn new(components: Vec<Box<dyn Component<A>>>) -> Self {
        Self {
            components,
            focus: 0,
            focused: false,
            row_height: 1,
        }
    }

    pub fn row_height(mut self, height: u16) -> Self {
        self.row_height = height;
        self
    }

    pub fn selected(&self) -> Option<usize> {
        if self.components.is_empty() {
            None
        } else {
            Some(self.focus)
        }
    }
}

impl<A> Component<ListAction<A>> for List<A> {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let row_heights: Vec<Constraint> = (0..self.components.len())
            .map(|_| Constraint::Length(self.row_height))
            .collect();
        let rows = Layout::vertical(row_heights).split(area);

        for (i, component) in self.components.iter_mut().enumerate() {
            if let Some(&row_area) = rows.get(i) {
                let is_selected = self.focused && i == self.focus;
                component.set_focused(is_selected);

                let bg = if is_selected { ui::SURFACE } else { ui::BG };
                frame.render_widget(Block::new().style(Style::new().bg(bg)), row_area);

                let gutter_color = if is_selected {
                    Color::Indexed(212)
                } else {
                    ui::BG
                };
                let gutter = Block::new().style(Style::new().bg(gutter_color));
                let col_chunks =
                    Layout::horizontal([Constraint::Length(1), Constraint::Min(0)]).split(row_area);
                frame.render_widget(gutter, col_chunks[0]);
                component.render(frame, col_chunks[1]);
            }
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<ListAction<A>> {
        if !self.focused {
            return None;
        }
        match key.code {
            KeyCode::Up | KeyCode::Char('k') => {
                if self.focus > 0 {
                    self.focus -= 1;
                }
                None
            }
            KeyCode::Down | KeyCode::Char('j') => {
                if self.focus + 1 < self.components.len() {
                    self.focus += 1;
                }
                None
            }
            KeyCode::Enter | KeyCode::Char(' ') => {
                if let Some(component) = self.components.get_mut(self.focus) {
                    component
                        .handle_event(key)
                        .map(|action| ListAction::Item(self.focus, action))
                } else {
                    None
                }
            }
            _ => {
                if let Some(component) = self.components.get_mut(self.focus) {
                    component
                        .handle_event(key)
                        .map(|action| ListAction::Item(self.focus, action))
                } else {
                    None
                }
            }
        }
    }

    fn set_focused(&mut self, focused: bool) {
        self.focused = focused;
    }

    fn is_focused(&self) -> bool {
        self.focused
    }
}

/// Example row component: renders a simple label string.
/// Demonstrates that any Component can be used as a row in a List.
pub struct LabelItem {
    label: String,
    focused: bool,
}

impl LabelItem {
    pub fn new(label: impl Into<String>) -> Self {
        Self {
            label: label.into(),
            focused: false,
        }
    }
}

impl Component<()> for LabelItem {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let style = if self.focused {
            Style::new().fg(ui::palette().foreground).bold()
        } else {
            Style::new().fg(ui::palette().foreground)
        };
        let text = Paragraph::new(Line::from(vec![Span::styled(
            format!(" {}", self.label),
            style,
        )]));
        frame.render_widget(text, area);
    }

    fn handle_event(&mut self, _key: KeyEvent) -> Option<()> {
        None
    }

    fn set_focused(&mut self, focused: bool) {
        self.focused = focused;
    }

    fn is_focused(&self) -> bool {
        self.focused
    }
}
