'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, CheckCircle, XCircle } from 'lucide-react';

interface BadgeCardProps {
  badge_id: string;
  badge_type: string;
  badge_label: string;
  issuer_app_name?: string;
  issued_at: string;
  expires_at: string | null;
  status: 'active' | 'expired' | 'revoked';
  onVerify?: (badge_id: string) => void;
}

export function BadgeCard({ badge_id, badge_type, badge_label, issuer_app_name, issued_at, expires_at, status, onVerify }: BadgeCardProps) {
  const statusConfig = {
    active: { variant: 'success' as const, icon: CheckCircle, label: 'Active' },
    expired: { variant: 'warning' as const, icon: XCircle, label: 'Expired' },
    revoked: { variant: 'destructive' as const, icon: XCircle, label: 'Revoked' },
  };
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className="group hover:border-zec-gold/30 transition-all duration-300 hover:shadow-glow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-zec-gold-100">
              <Award className="h-5 w-5 text-zec-gold" />
            </div>
            <div>
              <CardTitle className="text-base">{badge_label}</CardTitle>
              <p className="text-xs text-text-muted mt-0.5">{badge_type}</p>
            </div>
          </div>
          <Badge variant={config.variant}>
            <StatusIcon className="h-3 w-3 mr-1" />{config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm text-text-secondary">
          {issuer_app_name && <p>Issued by: <span className="text-text-primary">{issuer_app_name}</span></p>}
          <p>Issued: {new Date(issued_at).toLocaleDateString()}</p>
          {expires_at && <p>Expires: {new Date(expires_at).toLocaleDateString()}</p>}
        </div>
        {onVerify && (
          <Button variant="outline" size="sm" className="mt-3" onClick={() => onVerify(badge_id)}>
            <CheckCircle className="h-3 w-3" /> Verify
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
