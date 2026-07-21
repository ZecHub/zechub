pub mod asset_item;
pub mod button;
pub mod demo;
pub mod dropdown_picker;
pub mod flex_box;
pub mod list;
pub mod text_field;

use crossterm::event::KeyEvent;
use ratatui::layout::Rect;
use ratatui::Frame;

pub trait Component<Action> {
    fn render(&mut self, frame: &mut Frame, area: Rect);
    fn handle_event(&mut self, key: KeyEvent) -> Option<Action>;
    fn set_focused(&mut self, focused: bool);
    fn is_focused(&self) -> bool;
}
