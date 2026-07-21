'use client';

import { useState } from 'react';

interface TrustBadgeProps {
  compact?: boolean;
}

export function TrustBadge({ compact = false }: TrustBadgeProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (compact) {
    return (
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded"
        style={{
          background: 'rgba(0, 255, 136, 0.1)',
          border: '1px solid var(--accent-green)',
          color: 'var(--accent-green)',
        }}
        title="Click for privacy details"
      >
        <LockIcon size={12} />
        <span>Offline</span>
      </button>
    );
  }

  return (
    <div
      className="rounded p-3"
      style={{
        background: 'rgba(0, 255, 136, 0.05)',
        border: '1px solid var(--accent-green)',
      }}
    >
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 w-full text-left"
      >
        <LockIcon size={16} />
        <span
          className="font-bold"
          style={{ color: 'var(--accent-green)', fontSize: 'var(--font-size-button)' }}
        >
          OFFLINE MODE ACTIVE
        </span>
        <span
          className="ml-auto"
          style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-icon)' }}
        >
          {showDetails ? '▼' : '▶'}
        </span>
      </button>

      <p
        className="mt-2"
        style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-icon)' }}
      >
        Your data stays in your browser. We never see your addresses or transactions.
      </p>

      {showDetails && (
        <div
          className="mt-3 pt-3"
          style={{ borderTop: '1px solid var(--border-window)' }}
        >
          <h4
            className="mb-2 font-bold"
            style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-icon)' }}
          >
            How to verify:
          </h4>
          <ol
            className="list-decimal list-inside space-y-1"
            style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-icon)' }}
          >
            <li>Open your browser&apos;s DevTools (F12 or Cmd+Opt+I)</li>
            <li>Go to the Network tab</li>
            <li>Clear the network log</li>
            <li>Paste your data and run analysis</li>
            <li>Observe: zero network requests are made</li>
          </ol>

          <div
            className="mt-3 p-2 rounded"
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              fontSize: 'var(--font-size-icon)',
            }}
          >
            <h4
              className="mb-1 font-bold"
              style={{ color: 'var(--text-secondary)' }}
            >
              Technical details:
            </h4>
            <ul
              className="list-disc list-inside space-y-1"
              style={{ color: 'var(--text-muted)' }}
            >
              <li>Analysis runs entirely in browser JavaScript</li>
              <li>No fetch() or XMLHttpRequest calls for your data</li>
              <li>Data is not stored in localStorage or cookies</li>
              <li>Closing this window erases all input</li>
              <li>Source code is open for audit</li>
            </ul>
          </div>

          <p
            className="mt-3 italic"
            style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-icon)' }}
          >
            We believe privacy tools should be trustworthy by design,
            not just by promise.
          </p>
        </div>
      )}
    </div>
  );
}

function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: 'var(--accent-green)' }}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default TrustBadge;
