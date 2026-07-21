'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, Award, Code, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/badges', label: 'Badges', icon: Award },
  { href: '/developer/apps', label: 'Developer', icon: Code },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    document.cookie = 'zecpass_token=; path=/; max-age=0';
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top nav */}
      <nav className="border-b border-border-primary sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-gold flex items-center justify-center">
              <span className="text-black font-bold text-xs">Z</span>
            </div>
            <span className="font-semibold">ZecPass</span>
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button variant={pathname === href ? 'secondary' : 'ghost'} size="sm" className="gap-1.5">
                  <Icon className="h-3.5 w-3.5" />{label}
                </Button>
              </Link>
            ))}
            <Button variant="ghost" size="sm" className="text-error ml-2" onClick={handleLogout}>
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
