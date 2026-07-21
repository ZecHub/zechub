#![allow(dead_code)]
mod api;
mod app;
mod components;
mod screens;
mod ui;

use crate::api::WalletApi;
use api::real::RealWalletApi;
use app::App;
use screens::connect_signer::ConnectSignerScreen;
use screens::greeting::GreetingScreen;
use screens::home::HomeScreen;
use screens::setup::SetupScreen;
use screens::splash::SplashScreen;
use screens::Screen;

use crossterm::event::{self, KeyCode, KeyEventKind, KeyModifiers};
use crossterm::event::{DisableBracketedPaste, EnableBracketedPaste};
use ratatui::layout::Rect;
use ratatui::style::Style;
use ratatui::text::Line;
use ratatui::widgets::{Block, Paragraph};
use ratatui::Frame;
use std::io;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::mpsc;

/// Events that drive the TUI event loop.
enum AppEvent {
    Tick,
    Key(crossterm::event::KeyEvent),
    Paste(String),
    Resize(u16, u16),
}

pub async fn run_tui(
    socket_path: &str,
    shutdown: Option<Arc<AtomicBool>>,
    signer_mode: bool,
) -> io::Result<()> {
    let api: Box<dyn WalletApi> =
        connect_with_retry(socket_path, shutdown.as_ref(), signer_mode).await?;

    let mut app = App::new(api);
    println!("app has instantiated!");

    println!("checking wallet exists...");
    let wallet_exists = app.api.check_wallet_exists().await;
    println!("wallet exists = {}", wallet_exists);

    let next: Box<dyn Screen> = if wallet_exists {
        if signer_mode {
            Box::new(HomeScreen::new())
        } else {
            Box::new(GreetingScreen::new())
        }
    } else if signer_mode {
        Box::new(ConnectSignerScreen::new())
    } else {
        Box::new(SetupScreen::new())
    };

    app.push_screen(Box::new(SplashScreen::new(next)));
    println!("taking hook...");

    let prev_hook = std::panic::take_hook();
    std::panic::set_hook(Box::new(move |info| {
        let _ = ratatui::restore();
        prev_hook(info);
    }));

    println!("about to init ratatui...");
    let mut terminal = ratatui::init();
    println!("ABOUT TO RUN TERMINAL CLEAR...");
    terminal.clear()?;
    crossterm::execute!(std::io::stdout(), EnableBracketedPaste)?;

    let (event_tx, mut event_rx) = mpsc::channel::<AppEvent>(256);
    let event_tx_clone = event_tx.clone();

    tokio::task::spawn_blocking(move || loop {
        if event::poll(std::time::Duration::from_millis(50)).unwrap_or(false) {
            let evt = event::read().unwrap_or(crossterm::event::Event::Resize(0, 0));
            let app_evt = match evt {
                crossterm::event::Event::Key(key) => AppEvent::Key(key),
                crossterm::event::Event::Paste(text) => AppEvent::Paste(text),
                crossterm::event::Event::Resize(w, h) => AppEvent::Resize(w, h),
                _ => continue,
            };
            if event_tx_clone.blocking_send(app_evt).is_err() {
                break;
            }
        } else {
            if event_tx_clone.blocking_send(AppEvent::Tick).is_err() {
                break;
            }
        }
    });

    while !app.should_quit {
        if let Some(ref flag) = shutdown {
            if flag.load(Ordering::SeqCst) {
                app.should_quit = true;
                break;
            }
        }

        if let Some(evt) = event_rx.recv().await {
            match evt {
                AppEvent::Tick => {
                    app.tick().await;
                }
                AppEvent::Key(key) if key.kind == KeyEventKind::Press => {
                    if key.modifiers.contains(KeyModifiers::CONTROL)
                        && key.code == KeyCode::Char('c')
                    {
                        app.should_quit = true;
                    } else {
                        app.handle_input(key).await?;
                        if app.screen_stack.is_empty() {
                            app.should_quit = true;
                        }
                    }
                }
                AppEvent::Paste(text) => {
                    app.handle_paste(&text).await;
                }
                // ratatui handles window resize automatically via frame.area()
                AppEvent::Resize(_, _) => {}
                AppEvent::Key(_) => {}
            }
        }

        terminal.draw(|frame| render(frame, &mut app))?;
    }

    crossterm::execute!(std::io::stdout(), DisableBracketedPaste)?;
    ratatui::restore();
    terminal.show_cursor()?;

    Ok(())
}

async fn connect_with_retry(
    socket_path: &str,
    shutdown: Option<&Arc<AtomicBool>>,
    signer_mode: bool,
) -> io::Result<Box<dyn WalletApi>> {
    let deadline = Duration::from_secs(30);
    let poll_interval = Duration::from_millis(500);
    let start = std::time::Instant::now();

    loop {
        if let Some(ref flag) = shutdown {
            if flag.load(Ordering::SeqCst) {
                return Err(io::Error::new(
                    io::ErrorKind::Interrupted,
                    "shutdown requested before paypunkd connection",
                ));
            }
        }

        match RealWalletApi::connect(socket_path, signer_mode).await {
            Ok(real) => return Ok(Box::new(real)),
            Err(e) => {
                if start.elapsed() >= deadline {
                    return Err(io::Error::new(
                        io::ErrorKind::TimedOut,
                        format!("Timed out waiting for paypunkd at {socket_path} after 30s: {e}"),
                    ));
                }
                tokio::time::sleep(poll_interval).await;
            }
        }
    }
}

fn render(frame: &mut Frame, app: &mut App) {
    let api: &dyn WalletApi = &*app.api;

    let bg_block = Block::new().style(Style::new().bg(ui::BG));
    frame.render_widget(bg_block, frame.area());

    if let Some(screen) = app.screen_stack.last_mut() {
        screen.render(frame, api);

        // Render sync status bar at bottom
        if app.sync_status.is_syncing {
            let area = frame.area();
            let status_area = Rect {
                x: area.x,
                y: area.y + area.height.saturating_sub(1),
                width: area.width,
                height: 1,
            };
            let status_text = format!(
                " Syncing Zcash: {} / {} blocks ",
                app.sync_status.current_height, app.sync_status.target_height,
            );
            let status_line = Paragraph::new(Line::from(vec![ui::theme().warning(&status_text)]));
            let status_block = Block::new().style(Style::new().bg(ui::SURFACE));
            frame.render_widget(status_block, status_area);
            frame.render_widget(status_line, status_area);
        }
    } else {
        let block = Block::new().style(Style::new().bg(ui::BG));
        frame.render_widget(block, frame.area());
        let msg = Paragraph::new(Line::from("No screen loaded").centered())
            .style(Style::new().fg(ui::palette().error));
        frame.render_widget(msg, frame.area());
    }
}
