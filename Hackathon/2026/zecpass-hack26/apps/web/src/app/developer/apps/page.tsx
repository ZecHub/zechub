'use client';

import { useState, useEffect } from 'react';
import { AppCard } from '@/components/AppCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Plus, Copy, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function DeveloperAppsPage() {
  const [apps, setApps] = useState<Array<{ app_id: string; name: string; description: string; website_url: string; scopes_allowed: string[]; active: boolean; created_at: string }>>([]);
  const [showForm, setShowForm] = useState(false);
  const [newApp, setNewApp] = useState({ name: '', description: '', website_url: '', redirect_uris: '', scopes: 'identity' });
  const [createdApp, setCreatedApp] = useState<{ app_id: string; app_secret: string; name: string } | null>(null);
  const [showCode, setShowCode] = useState<string | null>(null);
  const [secretCopied, setSecretCopied] = useState(false);

  const handleRegister = async () => {
    try {
      const res = await fetch('/api/apps/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newApp.name, description: newApp.description, website_url: newApp.website_url,
          redirect_uris: newApp.redirect_uris.split(',').map((u) => u.trim()),
          scopes_allowed: newApp.scopes.split(',').map((s) => s.trim()),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCreatedApp(data);
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  const copySecret = () => {
    if (createdApp) {
      navigator.clipboard.writeText(createdApp.app_secret);
      setSecretCopied(true);
      setTimeout(() => setSecretCopied(false), 2000);
    }
  };

  const getSnippet = (appId: string) => `import { ZecPassProvider, ZecPassButton } from '@zecpass/sdk-react';

function App() {
  return (
    <ZecPassProvider
      appId="${appId}"
      redirectUri="https://yourapp.com/auth/callback"
      scope={['identity']}
    >
      <ZecPassButton
        onSuccess={(session) => console.log(session.zk_proof_hash)}
      />
    </ZecPassProvider>
  );
}`;

  return (
    <div className="min-h-screen bg-bg-primary">
      <nav className="border-b border-border-primary">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-gold flex items-center justify-center">
            <span className="text-black font-bold text-xs">Z</span>
          </div>
          <span className="font-semibold">ZecPass</span>
          <span className="text-text-muted mx-2">/</span>
          <span className="text-text-secondary">Developer Portal</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Code className="h-6 w-6 text-zec-gold" />Your Apps
            </h1>
            <p className="text-text-secondary mt-1">Register and manage your ZecPass integrations</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4" />Register App
          </Button>
        </div>

        {/* New app created — show secret */}
        {createdApp && (
          <Card className="glow-border">
            <CardHeader><CardTitle className="text-success">App Registered Successfully!</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-text-secondary">Save your app secret now — it will not be shown again.</p>
              <div className="space-y-2">
                <div><span className="text-xs text-text-muted">App ID:</span><code className="ml-2 text-sm font-mono text-text-primary">{createdApp.app_id}</code></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted">Secret:</span>
                  <code className="flex-1 p-2 rounded bg-bg-secondary border border-border-primary text-sm font-mono text-warning truncate">{createdApp.app_secret}</code>
                  <Button variant="outline" size="icon" onClick={copySecret}>
                    {secretCopied ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setCreatedApp(null)}>Dismiss</Button>
            </CardContent>
          </Card>
        )}

        {/* Registration form */}
        {showForm && (
          <Card>
            <CardHeader><CardTitle>Register New App</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'App Name', key: 'name' as const, placeholder: 'My DApp' },
                { label: 'Description', key: 'description' as const, placeholder: 'A Zcash-powered app' },
                { label: 'Website URL', key: 'website_url' as const, placeholder: 'https://mydapp.xyz' },
                { label: 'Redirect URIs (comma-separated)', key: 'redirect_uris' as const, placeholder: 'https://mydapp.xyz/auth/callback' },
                { label: 'Scopes (comma-separated)', key: 'scopes' as const, placeholder: 'identity, badges:read' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-sm text-text-secondary block mb-1">{label}</label>
                  <input type="text" value={newApp[key]} onChange={(e) => setNewApp((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-primary text-sm focus:outline-none focus:border-zec-gold/50" />
                </div>
              ))}
              <div className="flex gap-2">
                <Button onClick={handleRegister}>Register</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* App list */}
        <div className="grid md:grid-cols-2 gap-4">
          {apps.map((app) => (
            <div key={app.app_id}>
              <AppCard {...app} />
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowCode(showCode === app.app_id ? null : app.app_id)}>
                {showCode === app.app_id ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                {showCode === app.app_id ? 'Hide' : 'Show'} Integration Code
              </Button>
              {showCode === app.app_id && (
                <pre className="mt-2 p-4 rounded-lg bg-bg-secondary border border-border-primary text-xs font-mono text-text-secondary overflow-x-auto">{getSnippet(app.app_id)}</pre>
              )}
            </div>
          ))}
        </div>

        {apps.length === 0 && !showForm && (
          <div className="text-center py-16 text-text-muted">
            <Code className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No apps registered yet. Click &ldquo;Register App&rdquo; to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}
