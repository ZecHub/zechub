use ratatui::{
    crossterm::event::KeyEvent,
    layout::{Constraint, Direction, Layout, Rect},
    style::{Color, Style},
    widgets::{Block, Padding},
    Frame,
};

use crate::components::Component;

pub struct FlexBox<Action> {
    direction: Direction,
    gap: u16,
    padding: Padding,
    margin: Padding,
    style: Style,
    focused: bool,
    children: Vec<(Constraint, Box<dyn Component<Action>>)>,
}

impl<Action> FlexBox<Action> {
    pub fn new(direction: Direction) -> Self {
        Self {
            direction,
            gap: 0,
            padding: Padding::ZERO,
            margin: Padding::ZERO,
            style: Style::default(),
            focused: false,
            children: Vec::new(),
        }
    }

    pub fn horizontal() -> Self {
        Self::new(Direction::Horizontal)
    }
    pub fn vertical() -> Self {
        Self::new(Direction::Vertical)
    }

    pub fn gap(mut self, gap: u16) -> Self {
        self.gap = gap;
        self
    }
    pub fn padding(mut self, p: Padding) -> Self {
        self.padding = p;
        self
    }
    pub fn margin(mut self, m: Padding) -> Self {
        self.margin = m;
        self
    }
    pub fn style(mut self, style: Style) -> Self {
        self.style = style;
        self
    }
    pub fn bg(mut self, color: Color) -> Self {
        self.style = self.style.bg(color);
        self
    }

    /// Child that flex-grows to share leftover space equally.
    pub fn child(mut self, child: impl Component<Action> + 'static) -> Self {
        self.children.push((Constraint::Fill(1), Box::new(child)));
        self
    }

    /// Child with an explicit constraint (fixed size, percentage, grow weight…).
    pub fn child_with(
        mut self,
        constraint: Constraint,
        child: impl Component<Action> + 'static,
    ) -> Self {
        self.children.push((constraint, Box::new(child)));
        self
    }
}

fn apply_margin(area: Rect, m: Padding) -> Rect {
    Rect {
        x: area.x.saturating_add(m.left),
        y: area.y.saturating_add(m.top),
        width: area.width.saturating_sub(m.left.saturating_add(m.right)),
        height: area.height.saturating_sub(m.top.saturating_add(m.bottom)),
    }
}

impl<Action> Component<Action> for FlexBox<Action> {
    fn render(&mut self, frame: &mut Frame, area: Rect) {
        // margin: transparent space around the box (parent's bg shows through)
        let outer = apply_margin(area, self.margin);

        // background + padding, both handled by a borderless Block
        let block = Block::default().style(self.style).padding(self.padding);
        let content = block.inner(outer);
        frame.render_widget(block, outer);

        if self.children.is_empty() || content.width == 0 || content.height == 0 {
            return;
        }

        let constraints: Vec<Constraint> = self.children.iter().map(|(c, _)| *c).collect();
        let areas = Layout::default()
            .direction(self.direction)
            .constraints(constraints)
            .spacing(self.gap)
            .split(content);

        for ((_, child), slot) in self.children.iter_mut().zip(areas.iter()) {
            child.render(frame, *slot);
        }
    }

    fn handle_event(&mut self, key: KeyEvent) -> Option<Action> {
        // forward to whichever child currently reports focus
        self.children
            .iter_mut()
            .find(|(_, c)| c.is_focused())
            .and_then(|(_, c)| c.handle_event(key))
    }

    fn set_focused(&mut self, focused: bool) {
        self.focused = focused;
    }

    fn is_focused(&self) -> bool {
        self.focused
    }
}
