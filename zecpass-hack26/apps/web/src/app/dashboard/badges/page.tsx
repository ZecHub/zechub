'use client';

import { useState } from 'react';
import { BadgeCard } from '@/components/BadgeCard';
import { Award } from 'lucide-react';

export default function BadgesPage() {
  const [badges] = useState([
    { badge_id: 'demo-1', badge_type: 'early_adopter', badge_label: 'Early Adopter', issuer_app_name: 'ZecPass', issued_at: new Date().toISOString(), expires_at: null, status: 'active' as const },
    { badge_id: 'demo-2', badge_type: 'hackathon_builder', badge_label: 'Hackathon Builder', issuer_app_name: 'ZecHub', issued_at: new Date().toISOString(), expires_at: null, status: 'active' as const },
  ]);

  const handleVerify = async (badge_id: string) => {
    try {
      const res = await fetch('/api/badges/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badge_id }),
      });
      const data = await res.json();
      alert(data.valid ? 'Badge is valid!' : `Badge invalid: ${data.error}`);
    } catch { alert('Verification failed'); }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Award className="h-6 w-6 text-zec-gold" />ZK Identity Badges
        </h1>
        <p className="text-text-secondary mt-1">Privacy-preserving credentials and achievements</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <BadgeCard key={badge.badge_id} {...badge} onVerify={handleVerify} />
        ))}
      </div>
      {badges.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <Award className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No badges yet. Interact with ZecPass-integrated apps to earn badges.</p>
        </div>
      )}
    </div>
  );
}
