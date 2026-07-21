use crate::components::text_field::{TextField, TextFieldAction, TextFieldConfig};
use crate::components::Component;
use crate::ui;
use crossterm::event::{KeyCode, KeyEvent};
use ratatui::layout::{Constraint, Layout, Rect};
use ratatui::style::Style;
use ratatui::widgets::Fill;
use ratatui::Frame;
use std::marker::PhantomData;

pub trait Searchable {
    fn search_text(&self) -> String;
}

impl Searchable for String {
    fn search_text(&self) -> String {
        self.clone()
    }
}

pub enum DropdownAction<A> {
    Selected(usize),
    Item(usize, A),
}

pub struct DropdownPicker<T, A> {
    text_field: TextField,
    items: Vec<T>,
    filtered: Vec<usize>,
    selected: usize,
    open: bool,
    max_visible: usize,
    focused: bool,
    _phantom: PhantomData<A>,
}

impl<T: Searchable + Component<A> + 'static, A> DropdownPicker<T, A> {
    pub fn new(label: impl Into<String>, placeholder: impl Into<String>, items: Vec<T>) -> Self {
        let text_field = TextField::new(TextFieldConfig {
            label: label.into(),
            placeholder: placeholder.into(),
            password_mode: false,
            initial_value: String::new(),
            feedback: None,
        });

        let filtered: Vec<usize> = (0..items.len()).collect();

        Self {
            text_field,
            items,
            filtered,
            selected: 0,
            open: false,
            max_visible: 7,
            focused: false,
            _phantom: PhantomData,
        }
    }

    pub fn is_focused(&self) -> bool {
        self.focused
    }

    pub fn is_open(&self) -> bool {
        self.open
    }

    pub fn has_items(&self) -> bool {
        !self.items.is_empty()
    }

    pub fn has_filtered(&self) -> bool {
        !self.filtered.is_empty()
    }

    pub fn close(&mut self) {
        self.open = false;
    }

    pub fn handle_paste(&mut self, text: &str) {
        self.text_field.handle_paste(text);
        if !self.items.is_empty() {
            self.open = true;
            self.selected = 0;
            self.filter();
        }
    }

    pub fn max_visible(mut self, n: usize) -> Self {
        self.max_visible = n;
        self
    }

    pub fn value(&self) -> &str {
        self.text_field.value()
    }

    pub fn set_value(&mut self, value: &str) {
        self.text_field.set_value(value);
        self.filter();
    }

    pub fn set_items(&mut self, items: Vec<T>) {
        self.items = items;
        self.filter();
        if self.selected >= self.filtered.len() {
            self.selected = self.filtered.len().saturating_sub(1);
        }
    }

    pub fn selected_index(&self) -> Option<usize> {
        self.filtered.get(self.selected).copied()
    }

    pub fn get_item(&self, index: usize) -> Option<&T> {
        self.items.get(index)
    }

    fn filter(&mut self) {
        let query = self.text_field.value().to_lowercase();
        self.filtered = self
            .items
            .iter()
            .enumerate()
            .filter(|(_, item)| {
                query.is_empty() || item.search_text().to_lowercase().contains(&query)
            })
            .map(|(i, _)| i)
            .collect();
        if self.selected >= self.filtered.len() {
            self.selected = self.filtered.len().saturating_sub(1);
        }
    }

    /// Renders the dropdown list overlay on top of everything else.
    /// Must be called **after** all other components in the same area have been
    /// rendered so the list appears above them.
    pub fn render_overlay(&mut self, frame: &mut Frame, area: Rect) {
        if !self.open || self.filtered.is_empty() {
            return;
        }

        let visible_count = self.filtered.len().min(self.max_visible);
        let dropdown_area = Rect {
            x: area.x,
            y: area.y + 3,
            width: area.width,
            height: visible_count as u16,
        };

        // Render background that extends to max_visible height to mask content below
        let mask_area = Rect {
            x: area.x,
            y: area.y + 3,
            width: area.width,
            height: self.max_visible as u16,
        };
        frame.render_widget(
            Fill::new(" ").style(Style::new().bg(ui::SURFACE)),
            mask_area,
        );

        let row_heights: Vec<Constraint> =
            (0..visible_count).map(|_| Constraint::Length(1)).collect();
        let rows = Layout::vertical(row_heights).split(dropdown_area);

        for (display_idx, &item_idx) in self.filtered.iter().enumerate().take(self.max_visible) {
            if let Some(&row_area) = rows.get(display_idx) {
                let is_selected = display_idx == self.selected;
                let item = &mut self.items[item_idx];
                item.set_focused(is_selected);

                let bg = if is_selected {
                    ui::palette().primary
                } else {
                    ui::SURFACE
                };
                frame.render_widget(Fill::new(" ").style(Style::new().bg(bg)), row_area);
                item.render(frame, row_area);
            }
        }
    }
}

impl<T: Searchable + Component<A> + 'static, A> Component<DropdownAction<A>>
    for DropdownPicker<T, A>
{
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        let text_field_area = Rect {
            x: area.x,
            y: area.y,
            width: area.width,
            height: 3,
        };

        self.text_field.render(frame, text_field_area);
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<DropdownAction<A>> {
        if !self.focused {
            return None;
        }

        if self.open {
            match key.code {
                KeyCode::Down | KeyCode::Tab => {
                    if self.filtered.is_empty() {
                        self.open = false;
                        return None;
                    }
                    if self.selected + 1 < self.filtered.len() {
                        self.selected += 1;
                    }
                    return None;
                }
                KeyCode::Up => {
                    if self.selected > 0 {
                        self.selected -= 1;
                    }
                    return None;
                }
                KeyCode::Enter => {
                    if !self.filtered.is_empty() {
                        let idx = self.filtered[self.selected];
                        let text = self.items[idx].search_text();
                        self.text_field.set_value(&text);
                        self.open = false;
                        return Some(DropdownAction::Selected(idx));
                    }
                    self.open = false;
                    return None;
                }
                KeyCode::Esc => {
                    self.open = false;
                    return None;
                }
                _ => {}
            }
        }

        if let Some(action) = self.text_field.handle_event(key) {
            match action {
                TextFieldAction::Changed(_) => {
                    if !self.items.is_empty() {
                        self.open = true;
                        self.selected = 0;
                        self.filter();
                    }
                    return None;
                }
                TextFieldAction::Submitted => {
                    if self.open && !self.filtered.is_empty() {
                        let idx = self.filtered[self.selected];
                        let text = self.items[idx].search_text();
                        self.text_field.set_value(&text);
                        self.open = false;
                        return Some(DropdownAction::Selected(idx));
                    }
                    return None;
                }
            }
        }

        if key.code == KeyCode::Down && !self.open && !self.items.is_empty() {
            self.open = true;
            self.filter();
        }

        None
    }

    fn set_focused(&mut self, focused: bool) {
        self.focused = focused;
        self.text_field.set_focused(focused);
    }

    fn is_focused(&self) -> bool {
        self.focused
    }
}
