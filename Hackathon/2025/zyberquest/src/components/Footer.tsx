export function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 border-t border-zx-green/20 bg-zx-ink/75 backdrop-blur-md">
      <div className="container-zx h-12 flex items-center justify-between text-xs text-zinc-400">
        <p>© {new Date().getFullYear()} BlockBears · ZyberQuest</p>
        <nav aria-label="Footer" className="flex items-center gap-4">
          <a
            href="https://github.com/Soymaferlopezp/zyberquest"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zx-cyan"
          >
            Repo
          </a>
          <a
            href="/#donate"
            className="hover:text-zx-cyan"
          >
            Donation
          </a>
        </nav>
      </div>
    </footer>
  );
}
