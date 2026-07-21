use ratatui::layout::Rect;
use ratatui::prelude::*;
use ratatui::widgets::Widget;
use tachyonfx::{Effect, Interpolation, Motion, fx};

const MAUVE: Color = Color::Rgb(0xA9, 0x99, 0xAF);
const PURPLE: Color = Color::Rgb(0x95, 0x53, 0x9A);
const PAPER: Color = Color::Rgb(0xFF, 0xFF, 0xFF);

const GRID: [[u8; 5]; 6] = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 2, 1],
    [0, 2, 1, 2, 1],
    [0, 2, 2, 2, 1],
    [0, 2, 1, 1, 1],
    [1, 1, 1, 1, 1],
];

const CELL_W: u16 = 6;
const CELL_H: u16 = 3;
const BLOCK: &str = "█";

pub const LOGO_W: u16 = 5 * CELL_W;
pub const LOGO_H: u16 = 6 * CELL_H;

pub struct Logo;

impl Widget for Logo {
    fn render(self, area: Rect, buf: &mut Buffer) {
        for (gy, row) in GRID.iter().enumerate() {
            for (gx, code) in row.iter().enumerate() {
                let color = match code {
                    0 => MAUVE,
                    1 => PURPLE,
                    _ => PAPER,
                };

                let x0 = area.x + gx as u16 * CELL_W;
                let y0 = area.y + gy as u16 * CELL_H;

                for dy in 0..CELL_H {
                    for dx in 0..CELL_W {
                        let (x, y) = (x0 + dx, y0 + dy);
                        if x < area.right() && y < area.bottom() {
                            buf[(x, y)]
                                .set_symbol(BLOCK)
                                .set_fg(color)
                                .set_bg(Color::Reset);
                        }
                    }
                }
            }
        }
    }
}

pub fn centered(area: Rect, w: u16, h: u16) -> Rect {
    let x = area.x + area.width.saturating_sub(w) / 2;
    let y = area.y + area.height.saturating_sub(h) / 2;
    Rect::new(x, y, w.min(area.width), h.min(area.height))
}

pub fn splash_effect() -> Effect {
    fx::sequence(&[
        fx::sweep_in(
            Motion::UpToDown,
            12,
            0,
            Color::Black,
            (1000, Interpolation::QuadOut),
        ),
        fx::fade_to_fg(Color::Black, (900, Interpolation::SineIn)),
    ])
}
