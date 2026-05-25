# ZEC Donations Frontend

A Next.js application with TypeScript and shadcn/ui for the ZEC Donations platform.

## Features

-  Next.js 15 with App Router
-  TypeScript for type safety
-  Tailwind CSS for styling
-  shadcn/ui components
-  Responsive design
-  ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with the following content:
```
NEXT_PUBLIC_API_URL=http://64.23.230.199:3000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
 app/                 # Next.js App Router
    globals.css     # Global styles
    layout.tsx      # Root layout
    page.tsx        # Home page
 components/         # React components
    ui/            # shadcn/ui components
 lib/               # Utility functions
     utils.ts       # Utility functions
```

## Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add table
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Lucide React** - Icon library
- **ESLint** - Code linting

