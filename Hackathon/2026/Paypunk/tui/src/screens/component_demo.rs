use crate::api::WalletApi;
use crate::app::Nav;
use crate::components::demo::asset_list_demo::AssetListDemo;
use crate::components::demo::button_demo::ButtonDemo;
use crate::components::demo::dropdown_picker_demo::DropdownPickerDemo;
use crate::components::demo::feedback_demo::FeedbackDemo;
use crate::components::demo::list_demo::ListDemo;
use crate::components::demo::password_demo::PasswordDemo;
use crate::components::demo::text_field_demo::TextFieldDemo;
use crate::components::Component;
use crate::screens::help::HelpScreen;
use crate::screens::Screen;
use crate::ui;
use async_trait::async_trait;
use crossterm::event::KeyCode;
use ratatui::layout::{Constraint, Layout, Margin};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;

const DEMO_LABELS: &[&str] = &[
    "Text Fields",
    "Password",
    "Feedback",
    "Button",
    "List",
    "Asset List",
    "Dropdown Picker",
];

enum DemoVariant {
    TextField(TextFieldDemo),
    Password(PasswordDemo),
    Feedback(FeedbackDemo),
    Button(ButtonDemo),
    List(ListDemo),
    AssetList(AssetListDemo),
    DropdownPicker(DropdownPickerDemo),
}

pub struct ComponentDemoScreen {
    demos: Vec<DemoVariant>,
    active: usize,
}

impl ComponentDemoScreen {
    pub fn new() -> Self {
        Self {
            demos: vec![
                DemoVariant::TextField(TextFieldDemo::new()),
                DemoVariant::Password(PasswordDemo::new()),
                DemoVariant::Feedback(FeedbackDemo::new()),
                DemoVariant::Button(ButtonDemo::new()),
                DemoVariant::List(ListDemo::new()),
                DemoVariant::AssetList(AssetListDemo::new()),
                DemoVariant::DropdownPicker(DropdownPickerDemo::new()),
            ],
            active: 0,
        }
    }

    fn with_active<T>(&mut self, f: impl FnOnce(&mut dyn Component<Nav>) -> T) -> T {
        match &mut self.demos[self.active] {
            DemoVariant::TextField(d) => f(d),
            DemoVariant::Password(d) => f(d),
            DemoVariant::Feedback(d) => f(d),
            DemoVariant::Button(d) => f(d),
            DemoVariant::List(d) => f(d),
            DemoVariant::AssetList(d) => f(d),
            DemoVariant::DropdownPicker(d) => f(d),
        }
    }

    fn step_name(&self) -> &str {
        DEMO_LABELS[self.active]
    }
}

#[async_trait(?Send)]
impl Screen for ComponentDemoScreen {
    fn name(&self) -> &str {
        "ComponentDemo"
    }

    async fn init(&mut self, _api: &dyn WalletApi) {
        self.with_active(|d| d.set_focused(true));
    }

    fn render(&mut self, frame: &mut Frame, _api: &dyn WalletApi) {
        let theme = ui::theme();
        let area = frame.area();
        let chunks = Layout::vertical([
            Constraint::Length(3),
            Constraint::Length(2),
            Constraint::Min(5),
            Constraint::Length(3),
        ])
        .split(area);
        let header = chunks[0];
        let nav_area = chunks[1];
        let body = chunks[2];
        let footer = chunks[3];

        let title = theme
            .title(format!(" Demo: {} ", self.step_name()))
            .centered();
        frame.render_widget(Paragraph::new(title).style(Style::new().bg(ui::BG)), header);

        let nav_spans: Vec<_> = DEMO_LABELS
            .iter()
            .enumerate()
            .map(|(i, label)| {
                if i == self.active {
                    theme.accent(format!(" ▸{}◂ ", label))
                } else {
                    theme.muted(format!(" {} ", label))
                }
            })
            .collect();
        let nav_bg = Block::new().style(Style::new().bg(ui::SURFACE));
        frame.render_widget(nav_bg, nav_area);
        frame.render_widget(
            Paragraph::new(Line::from(nav_spans)).style(Style::new().bg(ui::SURFACE)),
            nav_area.inner(Margin {
                vertical: 0,
                horizontal: 1,
            }),
        );

        let block = theme.titled_block(self.step_name());
        let inner = block.inner(body);
        frame.render_widget(block, body);

        self.with_active(|d| d.render(frame, inner));

        let footer_text = theme.help_line([
            ("←/→", "Switch Demo"),
            ("Tab/↓", "Next Field"),
            ("Enter", "Submit"),
            ("?", "Help"),
            ("Esc", "Back"),
        ]);
        let fb = Block::new().style(Style::new().bg(ui::SURFACE));
        frame.render_widget(fb, footer);
        frame.render_widget(
            Paragraph::new(footer_text).style(Style::new().bg(ui::SURFACE)),
            footer.inner(Margin {
                vertical: 0,
                horizontal: 1,
            }),
        );
    }

    async fn handle_input(
        &mut self,
        key: crossterm::event::KeyEvent,
        _api: &mut dyn WalletApi,
    ) -> Nav {
        match key.code {
            KeyCode::Char('?') => return Nav::Push(Box::new(HelpScreen::new(self.name()))),
            KeyCode::Left => {
                let total = self.demos.len();
                let prev = self.active;
                self.active = if self.active == 0 {
                    total - 1
                } else {
                    self.active - 1
                };
                if self.active != prev {
                    self.with_active(|d| d.set_focused(true));
                }
                return Nav::None;
            }
            KeyCode::Right => {
                let prev = self.active;
                self.active = (self.active + 1) % self.demos.len();
                if self.active != prev {
                    self.with_active(|d| d.set_focused(true));
                }
                return Nav::None;
            }
            KeyCode::Esc => return Nav::Pop,
            _ => {}
        }

        self.with_active(|d| d.handle_event(key))
            .unwrap_or(Nav::None)
    }
}
