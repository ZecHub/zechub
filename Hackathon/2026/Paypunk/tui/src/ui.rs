use ratatui::layout::{Margin, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::Line;
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;
use ratatui_bubbletea_theme::{BubbleTheme, Palette as BtPalette, Symbols, Theme};

/// Main background color — fully opaque black to prevent terminal transparency.
pub const BG: Color = Color::Black;

/// Surface color for footers, form fields, etc. — darker than the default palette.
pub const SURFACE: Color = Color::Indexed(233);

/// The default ratatui-cheese palette. Single source of truth for all colors.
#[must_use]
pub fn palette() -> ratatui_cheese::theme::Palette {
    ratatui_cheese::theme::Palette::dark()
}

const PALETTE: BtPalette = BtPalette {
    foreground: Color::Indexed(252),
    muted: Color::Indexed(245),
    accent: Color::Indexed(212),
    success: Color::Indexed(114),
    warning: Color::Indexed(214),
    error: Color::Indexed(203),
    border: Color::Indexed(238),
    focused_border: Color::Indexed(212),
    selected_background: SURFACE,
};

const SYMBOLS: Symbols = Symbols {
    bullet: "•",
    selected: "▸",
    check: "✓",
    cross: "✗",
    help_separator: " • ",
};

#[must_use]
pub fn theme() -> BubbleTheme {
    Theme::new(PALETTE, SYMBOLS)
}

pub fn selected_style() -> Style {
    Style::new()
        .fg(palette().primary)
        .bg(SURFACE)
        .add_modifier(Modifier::BOLD)
}

pub fn render_error_banner(frame: &mut Frame, area: Rect, message: &str) {
    let banner_area = Rect {
        x: area.x,
        y: area.y,
        width: area.width,
        height: 1,
    };
    let theme = theme();
    let line = Line::from(vec![theme.error(" ✗ "), theme.span(message.to_string())]);
    let block = Block::new().style(Style::new().bg(Color::Indexed(52)));
    frame.render_widget(block, banner_area);
    frame.render_widget(
        Paragraph::new(line).style(Style::new().bg(Color::Indexed(52))),
        banner_area.inner(Margin {
            vertical: 0,
            horizontal: 2,
        }),
    );
}
