# ZecRotor

Private, scheduled cryptocurrency rotations via Zcash.

## Overview

ZecRotor enables users to create rotation requests that move assets from one blockchain through Zcash's shielded pool to another destination chain, with scheduled release times.

## Setup

1. Install dependencies (handled automatically by Next.js)
2. Set environment variable:
   - `NEXT_PUBLIC_API_BASE` - API endpoint (default: http://localhost:3000)

## Development

This project uses:
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS v4
- shadcn/ui components

## Architecture

- `/app` - Next.js pages and layout
- `/components` - Modular UI components
  - `/layout` - Header, Footer, NetworkBadge
  - `/ui` - Themed shadcn wrappers
  - `/rotation` - Rotation-specific components
- `/hooks` - Custom React hooks for API and polling
- `/lib` - Utility functions
- `/types` - TypeScript type definitions

## Theme

Zcash × NEAR aesthetic with:
- Zcash Gold (#F4B728) for primary actions
- NEAR Ink/Gray for backgrounds
- Subtle translucency and smooth animations
