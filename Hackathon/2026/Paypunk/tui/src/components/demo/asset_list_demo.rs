use crate::api::types::AssetRow;
use crate::app::Nav;
use crate::components::asset_item::{AssetAction, AssetItem};
use crate::components::list::{List, ListAction};
use crate::components::Component;
use crate::ui;
use crossterm::event::KeyEvent;
use ratatui::layout::{Margin, Rect};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::Paragraph;
use ratatui::Frame;

pub struct AssetListDemo {
    list: List<AssetAction>,
    message: String,
}

impl AssetListDemo {
    pub fn new() -> Self {
        let assets = vec![
            AssetRow {
                name: "Ethereum".into(),
                ticker: "ETH".into(),
                price: "$2,000.00".into(),
                price_change: "▲ 5.45%".into(),
                price_change_up: true,
                holdings_value: "$4,000.00".into(),
                holdings_amount: "2 ETH".into(),
                chain_id: "eip155:1".into(),
            },
            AssetRow {
                name: "Wrapped Bitcoin".into(),
                ticker: "WBTC".into(),
                price: "$60,000.00".into(),
                price_change: "▼ 0.15%".into(),
                price_change_up: false,
                holdings_value: "$1,000.00".into(),
                holdings_amount: "0.0001 WBTC".into(),
                chain_id: "eip155:1".into(),
            },
            AssetRow {
                name: "USD Coin".into(),
                ticker: "USDC".into(),
                price: "$1.00".into(),
                price_change: "▲ 0.01%".into(),
                price_change_up: true,
                holdings_value: "$500.00".into(),
                holdings_amount: "500 USDC".into(),
                chain_id: "eip155:1".into(),
            },
            AssetRow {
                name: "Chainlink".into(),
                ticker: "LINK".into(),
                price: "$14.25".into(),
                price_change: "▼ 2.10%".into(),
                price_change_up: false,
                holdings_value: "$285.00".into(),
                holdings_amount: "20 LINK".into(),
                chain_id: "eip155:1".into(),
            },
            AssetRow {
                name: "Uniswap".into(),
                ticker: "UNI".into(),
                price: "$7.80".into(),
                price_change: "▲ 1.20%".into(),
                price_change_up: true,
                holdings_value: "$156.00".into(),
                holdings_amount: "20 UNI".into(),
                chain_id: "eip155:1".into(),
            },
        ];
        let components: Vec<Box<dyn Component<AssetAction>>> = assets
            .into_iter()
            .map(|a| Box::new(AssetItem::new(a)) as Box<dyn Component<AssetAction>>)
            .collect();
        Self {
            list: List::new(components).row_height(2),
            message: String::new(),
        }
    }
}

impl Component<Nav> for AssetListDemo {
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
                self.message = format!("Selected asset #{}", i);
                None
            }
            Some(ListAction::Item(_, AssetAction::Send)) => {
                self.message = "Send action triggered!".into();
                None
            }
            Some(ListAction::Item(_, AssetAction::Receive)) => {
                self.message = "Receive action triggered!".into();
                None
            }
            Some(ListAction::Item(_, AssetAction::History)) => {
                self.message = "History action triggered!".into();
                None
            }
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
