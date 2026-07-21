use crate::api::types::*;
use crate::api::WalletApi;
use crate::app::Nav;
use crate::components::asset_item::{AssetAction, AssetItem};
use crate::components::button::{Button, ButtonSize};
use crate::components::flex_box::FlexBox;
use crate::components::list::{List, ListAction};
use crate::components::Component;
use crate::screens::help::HelpScreen;
use crate::screens::history::HistoryScreen;
use crate::screens::receive::ReceiveScreen;
use crate::screens::send::SendScreen;
use crate::screens::Screen;
use crate::ui;
use async_trait::async_trait;
use ratatui::layout::{Constraint, Layout, Margin, Rect};
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::{Block, Padding, Paragraph};
use ratatui::Frame;

enum AssetsFocus {
    Back,
    Table,
}

pub struct AssetsScreen {
    account: AccountInfo,
    data: Option<AssetsData>,
    list: List<AssetAction>,
    focus: AssetsFocus,
    protocol: String,
    sync_status: SyncStatus,
}

impl AssetsScreen {
    pub fn new(account: AccountInfo) -> Self {
        let protocol = if account.chain_id.contains("eip155") {
            "Ethereum".to_string()
        } else {
            "Zcash".to_string()
        };
        Self {
            account,
            data: None,
            list: List::new(vec![]).row_height(5),
            focus: AssetsFocus::Back,
            protocol,
            sync_status: SyncStatus::default(),
        }
    }
}

#[async_trait(?Send)]
impl Screen for AssetsScreen {
    fn name(&self) -> &str {
        "Assets"
    }

    async fn init(&mut self, api: &dyn WalletApi) {
        let data = api.get_assets(&self.account.account_id).await;
        let items: Vec<Box<dyn Component<AssetAction>>> = data
            .assets
            .iter()
            .map(|a| Box::new(AssetItem::new(a.clone())) as Box<dyn Component<AssetAction>>)
            .collect();
        self.list = List::new(items).row_height(5);
        self.data = Some(data);
    }

    async fn on_reactivate(&mut self, api: &mut dyn WalletApi) {
        let data = api.get_assets(&self.account.account_id).await;

        let items: Vec<Box<dyn Component<AssetAction>>> = data
            .assets
            .iter()
            .map(|a| Box::new(AssetItem::new(a.clone())) as Box<dyn Component<AssetAction>>)
            .collect();
        self.list = List::new(items).row_height(5);
        self.data = Some(data);
    }

    async fn tick(&mut self, api: &mut dyn WalletApi) -> Nav {
        let prev = self.sync_status.is_syncing;
        self.sync_status = api.get_sync_status(&self.protocol).await;
        if prev && !self.sync_status.is_syncing {
            let data = api.get_assets(&self.account.account_id).await;
            let items: Vec<Box<dyn Component<AssetAction>>> = data
                .assets
                .iter()
                .map(|a| Box::new(AssetItem::new(a.clone())) as Box<dyn Component<AssetAction>>)
                .collect();
            self.list = List::new(items).row_height(5);
            self.data = Some(data);
        }
        Nav::None
    }

    fn render(&mut self, frame: &mut Frame, _api: &dyn WalletApi) {
        let theme = ui::theme();
        let area = frame.area();
        let chunks = Layout::vertical([
            Constraint::Length(5),
            Constraint::Length(3),
            Constraint::Min(5),
            Constraint::Length(3),
        ])
        .split(area);
        let header = chunks[0];
        let buttons = chunks[1];
        let body = chunks[2];
        let footer = chunks[3];

        let title = theme.title(" PayPunk Wallet ").centered();
        frame.render_widget(Paragraph::new(title).style(Style::new().bg(ui::BG)), header);

        let chain_label = if self.account.chain_id.contains("eip155") {
            "Ethereum"
        } else {
            "Zcash"
        };
        let subtitle = Paragraph::new(
            Line::from(format!(
                "{} — {} ({})",
                self.account.name, chain_label, self.account.chain_id
            ))
            .centered(),
        )
        .style(theme.text);
        frame.render_widget(
            subtitle,
            header.inner(Margin {
                vertical: 2,
                horizontal: 0,
            }),
        );

        let addr_line =
            Paragraph::new(Line::from(vec![theme.muted(&self.account.address)]).centered())
                .style(Style::new().bg(ui::BG));
        frame.render_widget(
            addr_line,
            Rect {
                x: header.x,
                y: header.y + 3,
                width: header.width,
                height: 1,
            },
        );

        if self.sync_status.is_syncing {
            let sync_line = Paragraph::new(Line::from(vec![theme.warning(format!(
                " Syncing: {} / {} blocks ",
                self.sync_status.current_height, self.sync_status.target_height,
            ))]))
            .style(Style::new().bg(ui::BG));
            frame.render_widget(
                sync_line,
                Rect {
                    x: header.x,
                    y: header.y + 4,
                    width: header.width,
                    height: 1,
                },
            );
        }

        let on_back = matches!(self.focus, AssetsFocus::Back);
        let mut back_btn = Button::new(" \u{2190} Back ").size(ButtonSize::Sm);
        back_btn.set_focused(on_back);

        let mut btn_bar = FlexBox::horizontal()
            .bg(ui::BG)
            .margin(Padding {
                top: 1,
                bottom: 1,
                left: 2,
                right: 2,
            })
            .gap(2)
            .child_with(Constraint::Length(10), back_btn);
        btn_bar.render(frame, buttons);

        let block = theme.titled_block("");
        let inner = block.inner(body);
        frame.render_widget(block, body);

        let on_table = matches!(self.focus, AssetsFocus::Table);
        self.list.set_focused(on_table);

        let table_area = inner.inner(Margin {
            vertical: 0,
            horizontal: 2,
        });
        let header_style = Style::new().fg(ui::palette().muted);
        let name_width = (table_area.width as usize).saturating_sub(10);
        let header_line = Line::from(vec![
            ratatui::text::Span::styled(
                format!(" {:width$} ", "Asset", width = name_width),
                header_style,
            ),
            ratatui::text::Span::styled(format!(" {:>7}", "Balance"), header_style),
        ]);
        frame.render_widget(
            Paragraph::new(header_line).style(Style::new().bg(ui::BG)),
            table_area.inner(Margin {
                vertical: 0,
                horizontal: 0,
            }),
        );

        let sep_style = Style::new().fg(ui::palette().border);
        let sep_line = Line::from(vec![
            ratatui::text::Span::styled(
                format!(" {:-<width$} ", "", width = name_width),
                sep_style,
            ),
            ratatui::text::Span::styled(format!(" {:->7}", ""), sep_style),
        ]);
        frame.render_widget(
            Paragraph::new(sep_line).style(Style::new().bg(ui::BG)),
            table_area.inner(Margin {
                vertical: 1,
                horizontal: 0,
            }),
        );

        self.list.render(
            frame,
            table_area.inner(Margin {
                vertical: 2,
                horizontal: 0,
            }),
        );

        let footer_text = theme.help_line([
            ("\u{2191}\u{2193}", "Navigate"),
            ("\u{2190}/\u{2192}", "Select button"),
            ("Enter", "Select action"),
            ("r", "Refresh/Sync"),
            ("Esc", "Back to wallets"),
            ("?", "Help"),
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
        use crossterm::event::KeyCode;
        match key.code {
            KeyCode::Char('?') => return Nav::Push(Box::new(HelpScreen::new(self.name()))),
            _ => {}
        }

        match self.focus {
            AssetsFocus::Back => match key.code {
                KeyCode::Down => {
                    if self.data.as_ref().map_or(false, |d| !d.assets.is_empty()) {
                        self.focus = AssetsFocus::Table;
                        self.list.set_focused(true);
                    }
                }
                KeyCode::Enter | KeyCode::Esc => return Nav::Pop,
                _ => {}
            },
            AssetsFocus::Table => match key.code {
                KeyCode::Up => {
                    if self.list.selected().map_or(true, |i| i == 0) {
                        self.focus = AssetsFocus::Back;
                        self.list.set_focused(false);
                    } else {
                        let _ = self.list.handle_event(key);
                    }
                }
                KeyCode::Down => {
                    let _ = self.list.handle_event(key);
                }
                KeyCode::Left | KeyCode::Right => {
                    let _ = self.list.handle_event(key);
                }
                KeyCode::Enter | KeyCode::Char(' ') => {
                    if let Some(action) = self.list.handle_event(key) {
                        match action {
                            ListAction::Item(_, AssetAction::Send) => {
                                return Nav::Push(Box::new(SendScreen::new(self.account.clone())));
                            }
                            ListAction::Item(_, AssetAction::Receive) => {
                                return Nav::Push(Box::new(ReceiveScreen::new(
                                    self.account.clone(),
                                )));
                            }
                            ListAction::Item(_, AssetAction::History) => {
                                return Nav::Push(Box::new(HistoryScreen::new(
                                    self.account.account_id.clone(),
                                    self.account.name.clone(),
                                )));
                            }
                            _ => {}
                        }
                    }
                }
                KeyCode::Esc => return Nav::Pop,
                _ => {}
            },
        }
        Nav::None
    }
}
