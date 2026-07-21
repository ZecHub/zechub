'use client';

import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}
interface State {
  error: Error | null;
}

// Isolates a single window's content: a crashing app shows an inline error
// instead of white-screening the entire OS.
export class WindowErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Surface it for debugging; the inline panel shows the message to the user.
    console.error(`[window:${this.props.title}] crashed:`, error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="h-full overflow-auto p-4"
          style={{ background: 'var(--bg-window)', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '12px' }}
        >
          <div style={{ color: 'var(--accent-orange)', marginBottom: 8 }}>
            ⚠ {this.props.title} hit an error and could not render.
          </div>
          <div style={{ color: 'var(--text-muted)', marginBottom: 12, whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}
          </div>
          <button
            onClick={() => this.setState({ error: null })}
            className="window-border px-3 py-1"
            style={{ color: 'var(--accent-gold)', cursor: 'pointer' }}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
