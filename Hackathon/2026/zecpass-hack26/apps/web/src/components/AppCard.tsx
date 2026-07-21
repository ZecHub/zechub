'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Trash2 } from 'lucide-react';

interface AppCardProps {
  app_id: string;
  name: string;
  description: string;
  website_url: string;
  scopes_allowed: string[];
  active: boolean;
  created_at: string;
  onDeactivate?: (app_id: string) => void;
}

export function AppCard({ app_id, name, description, website_url, scopes_allowed, active, created_at, onDeactivate }: AppCardProps) {
  return (
    <Card className="group hover:border-border-secondary transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="h-4 w-4 text-zec-gold" />
            {name}
          </CardTitle>
          <Badge variant={active ? 'success' : 'destructive'}>
            {active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-secondary mb-2">{description}</p>
        <div className="space-y-2 text-xs text-text-muted">
          <p>Website: <a href={website_url} className="text-zec-gold hover:underline" target="_blank" rel="noopener noreferrer">{website_url}</a></p>
          <p className="font-mono">App ID: {app_id.slice(0, 8)}...</p>
          <p>Created: {new Date(created_at).toLocaleDateString()}</p>
          <div className="flex gap-1 flex-wrap">
            {scopes_allowed.map((s) => (<Badge key={s} variant="outline" className="text-xs">{s}</Badge>))}
          </div>
        </div>
        {onDeactivate && active && (
          <Button variant="ghost" size="sm" className="mt-3 text-error hover:text-error" onClick={() => onDeactivate(app_id)}>
            <Trash2 className="h-3 w-3" /> Deactivate
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
