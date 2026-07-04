import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  info: string | null;
}

/**
 * Top-level crash guard.
 *
 * Before this existed, any uncaught render error anywhere in the app
 * (JourneyHUD, ChapterHub, MissionScreen, WorldRenderer, etc.) unmounted
 * the whole React tree with zero visible feedback — the WorldRenderer's
 * background gradient underneath is dark, so a crash looked exactly like
 * a plain black screen, indistinguishable from "still loading" or
 * "frozen". This is almost certainly what's behind the "чёрный экран
 * между переходами" reports: something throws during a state transition
 * (mission complete -> next node, or chapter advance), React unmounts,
 * and only backgrounding/foregrounding the app forces Capacitor to
 * reload the WebView from scratch, which "fixes" it by restarting with
 * fresh (already-saved) state — masking the crash instead of avoiding it.
 *
 * This component catches that crash and shows the actual error message
 * and stack instead, with a button to reset back to the world screen.
 * Screenshot/copy of that text is exactly what's needed to find and fix
 * the real bug, instead of guessing blind.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null, info: null };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] caught render crash:', error, errorInfo.componentStack);
    this.setState({ info: errorInfo.componentStack ?? null });
  }

  handleReset = () => {
    this.setState({ error: null, info: null });
    try {
      window.location.reload();
    } catch {
      // ignore — state reset above already unblocks the UI tree
    }
  };

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#1a0f0f',
            color: '#f5e9e9',
            padding: '24px',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: 1.5,
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#ff8a8a' }}>
            Что-то сломалось на экране
          </div>
          <div style={{ marginBottom: '12px', whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}
          </div>
          {this.state.error.stack && (
            <details style={{ marginBottom: '16px' }}>
              <summary style={{ cursor: 'pointer', color: '#f5e9e9' }}>Stack trace</summary>
              <pre style={{ whiteSpace: 'pre-wrap', opacity: 0.8 }}>{this.state.error.stack}</pre>
            </details>
          )}
          {this.state.info && (
            <details style={{ marginBottom: '16px' }}>
              <summary style={{ cursor: 'pointer', color: '#f5e9e9' }}>Component stack</summary>
              <pre style={{ whiteSpace: 'pre-wrap', opacity: 0.8 }}>{this.state.info}</pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            style={{
              padding: '10px 20px',
              background: '#ff8a8a',
              color: '#1a0f0f',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            Перезагрузить
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
