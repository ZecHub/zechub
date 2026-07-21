use crate::app::Nav;
use crate::components::dropdown_picker::{DropdownAction, DropdownPicker, Searchable};
use crate::components::Component;
use crate::ui;
use crossterm::event::KeyEvent;
use ratatui::layout::{Constraint, Layout, Margin, Rect};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::Paragraph;
use ratatui::Frame;

struct SearchableLabel {
    label: String,
    focused: bool,
}

impl SearchableLabel {
    fn new(label: impl Into<String>) -> Self {
        Self {
            label: label.into(),
            focused: false,
        }
    }
}

impl Searchable for SearchableLabel {
    fn search_text(&self) -> String {
        self.label.clone()
    }
}

impl Component<()> for SearchableLabel {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let style = if self.focused {
            Style::new().fg(ui::palette().foreground).bold()
        } else {
            Style::new().fg(ui::palette().foreground)
        };
        let text = Paragraph::new(Line::from(vec![
            ui::theme().span(format!(" {}", self.label))
        ]))
        .style(style);
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

const FRUITS: &[&str] = &[
    "Apple",
    "Apricot",
    "Avocado",
    "Banana",
    "Blackberry",
    "Blueberry",
    "Cherry",
    "Coconut",
    "Cranberry",
    "Date",
    "Dragonfruit",
    "Elderberry",
    "Fig",
    "Grape",
    "Grapefruit",
    "Guava",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Lime",
    "Mango",
    "Mulberry",
    "Nectarine",
    "Orange",
    "Papaya",
    "Passionfruit",
    "Peach",
    "Pear",
    "Pineapple",
    "Plum",
    "Pomegranate",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Watermelon",
];

pub struct DropdownPickerDemo {
    picker: DropdownPicker<SearchableLabel, ()>,
    message: String,
    selection: Option<String>,
}

impl DropdownPickerDemo {
    pub fn new() -> Self {
        let items: Vec<SearchableLabel> = FRUITS
            .iter()
            .map(|&name| SearchableLabel::new(name))
            .collect();

        Self {
            picker: DropdownPicker::new("Fruit", "Type to search fruits...", items),
            message: String::new(),
            selection: None,
        }
    }
}

impl Component<Nav> for DropdownPickerDemo {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let theme = ui::theme();

        // Overlay demo: render "background" content first so the dropdown can sit on top
        let overlay_demo_area = Rect {
            x: area.x + 2,
            y: area.y + 6,
            width: area.width.saturating_sub(4),
            height: 4,
        };
        let masked_text = Paragraph::new(Line::from(vec![
            theme.muted("This content is masked by the dropdown overlay when open")
        ]))
        .style(Style::new().bg(ui::BG));
        frame.render_widget(masked_text, overlay_demo_area);

        let chunks = Layout::vertical([
            Constraint::Length(3),
            Constraint::Length(1),
            Constraint::Length(3),
        ])
        .split(area.inner(Margin {
            vertical: 1,
            horizontal: 2,
        }));

        self.picker.render(frame, chunks[0]);
        self.picker.render_overlay(frame, chunks[0]);

        if self.selection.is_some() {
            let msg = Paragraph::new(Line::from(vec![theme.success(&self.message)]))
                .style(Style::new().bg(ui::BG));
            frame.render_widget(msg, chunks[2]);
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<Nav> {
        if let Some(action) = self.picker.handle_event(key) {
            match action {
                DropdownAction::Selected(i) => {
                    let names: Vec<&str> = FRUITS.to_vec();
                    let name = names[i];
                    self.selection = Some(name.to_string());
                    self.message = format!("Selected: {}", name);
                }
                DropdownAction::Item(_, _) => {}
            }
        }
        None
    }

    fn set_focused(&mut self, focused: bool) {
        self.picker.set_focused(focused);
    }

    fn is_focused(&self) -> bool {
        self.picker.is_focused()
    }
}
