use std::{
    io::{self, stdout},
    time::{Duration as StdDuration, Instant},
};

use paypunk_logo::{LOGO_H, LOGO_W, Logo, centered};
use ratatui::{
    crossterm::{
        event::{self, Event, KeyCode},
        execute,
        terminal::{EnterAlternateScreen, LeaveAlternateScreen, disable_raw_mode, enable_raw_mode},
    },
    prelude::*,
};
use tachyonfx::{Duration, Effect, EffectRenderer, Interpolation, Motion, fx};

fn build_effect() -> Effect {
    let pulse = fx::repeating(fx::ping_pong(fx::hsl_shift_fg(
        [0.0, 0.0, 14.0],
        (2600, Interpolation::SineInOut),
    )));

    fx::sequence(&[
        fx::sweep_in(
            Motion::UpToDown,
            12,
            0,
            Color::Black,
            (1400, Interpolation::QuadOut),
        ),
        fx::timed_never_complete(Duration::from_millis(3000), pulse),
        fx::fade_to_fg(Color::Black, (900, Interpolation::SineIn)),
    ])
}

fn main() -> io::Result<()> {
    enable_raw_mode()?;
    execute!(stdout(), EnterAlternateScreen)?;
    let mut terminal = Terminal::new(CrosstermBackend::new(stdout()))?;

    let mut effect = build_effect();
    let mut last = Instant::now();

    loop {
        let elapsed = last.elapsed();
        last = Instant::now();

        terminal.draw(|f| {
            let area = centered(f.area(), LOGO_W, LOGO_H);
            f.render_widget(Logo, area);
            f.render_effect(&mut effect, area, elapsed.into());
        })?;

        if event::poll(StdDuration::from_millis(16))? {
            if let Event::Key(key) = event::read()? {
                match key.code {
                    KeyCode::Char('q') | KeyCode::Esc => break,
                    KeyCode::Char('r') => effect = build_effect(),
                    _ => {}
                }
            }
        }
    }

    disable_raw_mode()?;
    execute!(terminal.backend_mut(), LeaveAlternateScreen)?;
    terminal.show_cursor()?;
    Ok(())
}
