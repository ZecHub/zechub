import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Code, Award, ArrowRight, Lock, Zap, Eye } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zec-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-zec-gold/3 rounded-full blur-[80px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border-primary">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <span className="text-black font-bold text-sm">Z</span>
            </div>
            <span className="text-lg font-semibold">ZecPass</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/developer/apps">
              <Button variant="ghost" size="sm">Developers</Button>
            </Link>
            <Link href="/auth/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zec-gold-50 border border-zec-gold/20 text-zec-gold text-sm mb-8">
            <Lock className="h-3.5 w-3.5" />
            ZecHub 2026 Hackathon — Track 4: Zcash Login
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
            Sign in with Zcash.
            <br />
            <span className="gradient-gold-text">Your identity, your privacy.</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 text-balance">
            ZecPass lets any web app add &ldquo;Sign in with Zcash&rdquo; — users prove ownership
            of a shielded address without ever exposing it. A ZK proof hash serves as the
            stable, address-free user identifier.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/developer/apps">
              <Button size="lg" className="group">
                Start Building
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Try Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Protocol preview */}
        <div className="mt-16 p-6 rounded-2xl glass-gold max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="font-mono text-sm text-text-secondary space-y-1 text-left">
            <p className="text-text-muted">{'// User sends shielded memo to ZecPass'}</p>
            <p><span className="text-zec-gold">ZECPASS</span>:v1:<span className="text-success">challenge_id</span>:<span className="text-info">nonce</span>:<span className="text-warning">timestamp</span></p>
            <p className="text-text-muted mt-2">{'// ZecPass returns address-free identity'}</p>
            <p><span className="text-zec-gold">zk_proof_hash</span> = SHA256(challenge:tx:nonce:app)</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Eye,
              title: 'No Address Exposure',
              description: 'Your Zcash address is never stored or shared with any app. ZK proof hashes are app-scoped — no cross-app tracking.',
            },
            {
              icon: Code,
              title: 'Drop-in SDK',
              description: 'Add <ZecPassButton /> to your React app and integrate in under 10 minutes. Node.js SDK for server-side verification.',
            },
            {
              icon: Award,
              title: 'ZK Identity Badges',
              description: 'Issue and verify privacy-preserving credentials. Prove memberships, contributions, and achievements without revealing identity.',
            },
          ].map((feature, i) => (
            <Card key={feature.title} className="group hover:border-zec-gold/30 transition-all duration-300 hover:shadow-glow animate-fade-in-up" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-zec-gold-100 flex items-center justify-center mb-4 group-hover:bg-zec-gold-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-zec-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 border-t border-border-primary">
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="space-y-8">
          {[
            { step: '01', title: 'App requests challenge', desc: 'Your app calls ZecPass API with app_id and requested scopes.' },
            { step: '02', title: 'User sends shielded memo', desc: 'User scans QR code with Zcash wallet — sends challenge memo to ZecPass address.' },
            { step: '03', title: 'ZecPass verifies', desc: 'Memo watcher detects the memo, verifies nonce, timing, and replay protection.' },
            { step: '04', title: 'App receives JWT', desc: 'A signed JWT with zk_proof_hash is issued. The user\'s address is never stored.' },
          ].map((item, i) => (
            <div key={item.step} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-black font-bold text-sm">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-text-secondary">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border-primary py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-text-muted">
          <p>ZecPass — Built for ZecHub 2026 Hackathon</p>
          <p>Open-source · Privacy-first · MIT License</p>
        </div>
      </footer>
    </div>
  );
}
