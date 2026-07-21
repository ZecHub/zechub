'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Clock, X } from 'lucide-react';

interface SessionCardProps {
  session_id: string;
  app_id: string;
  app_name?: string;
  scope: string[];
  issued_at: string;
  expires_at: string;
  onRevoke?: (session_id: string) => void;
}

export function SessionCard({ session_id, app_name, scope, issued_at, expires_at, onRevoke }: SessionCardProps) {
  const isExpired = new Date(expires_at) <= new Date();
  return (
    <Card className="group hover:border-border-secondary transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-zec-gold" />
            {app_name || 'Unknown App'}
          </CardTitle>
          <Badge variant={isExpired ? 'destructive' : 'success'}>
            {isExpired ? 'Expired' : 'Active'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Issued: {new Date(issued_at).toLocaleDateString()}</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {scope.map((s) => (<Badge key={s} variant="outline" className="text-xs">{s}</Badge>))}
          </div>
          <p className="font-mono text-xs text-text-muted truncate">ID: {session_id.slice(0, 8)}...</p>
        </div>
        {onRevoke && !isExpired && (
          <Button variant="ghost" size="sm" className="mt-3 text-error hover:text-error" onClick={() => onRevoke(session_id)}>
            <X className="h-3 w-3" /> Revoke
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
