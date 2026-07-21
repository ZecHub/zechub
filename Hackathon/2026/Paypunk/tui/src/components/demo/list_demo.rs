use crate::app::Nav;
use crate::components::list::{LabelItem, List, ListAction};
use crate::components::Component;
use crate::ui;
use crossterm::event::KeyEvent;
use ratatui::layout::{Margin, Rect};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::Paragraph;
use ratatui::Frame;

pub struct ListDemo {
    list: List<()>,
    message: String,
}

impl ListDemo {
    pub fn new() -> Self {
        let items = vec![
            "Apple",
            "Banana",
            "Cherry",
            "Dragonfruit",
            "Elderberry",
            "Fig",
            "Grape",
            "Honeydew",
        ];
        let components: Vec<Box<dyn Component<()>>> = items
            .iter()
            .map(|&name| Box::new(LabelItem::new(name)) as Box<dyn Component<()>>)
            .collect();
        Self {
            list: List::new(components).row_height(1),
            message: String::new(),
        }
    }
}

impl Component<Nav> for ListDemo {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let inner = area.inner(Margin {
            vertical: 1,
            horizontal: 2,
        });
        self.list.render(frame, inner);

        if !self.message.is_empty() {
            let msg = Paragraph::new(Line::from(vec![ui::theme().success(&self.message)]))
                .style(Style::new().bg(ui::BG));
            frame.render_widget(
                msg,
                Rect {
                    x: area.x + 2,
                    y: area.y + area.height.saturating_sub(2),
                    width: area.width.saturating_sub(4),
                    height: 1,
                },
            );
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<Nav> {
        match self.list.handle_event(key) {
            Some(ListAction::Selected(i)) => {
                let labels = [
                    "Apple",
                    "Banana",
                    "Cherry",
                    "Dragonfruit",
                    "Elderberry",
                    "Fig",
                    "Grape",
                    "Honeydew",
                ];
                self.message = format!("Selected: {}", labels[i]);
                None
            }
            Some(ListAction::Item(_, ())) => None,
            None => None,
        }
    }

    fn set_focused(&mut self, focused: bool) {
        self.list.set_focused(focused);
    }

    fn is_focused(&self) -> bool {
        self.list.is_focused()
    }
}
