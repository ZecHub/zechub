export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-muted-foreground flex items-center justify-between">
        <span>© {new Date().getFullYear()} ZECdonate</span>
        <span>Built for privacy‑preserving giving</span>
      </div>
    </footer>
  );
}


