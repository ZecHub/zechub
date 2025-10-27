"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CampaignMarquee() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/campaigns?sort=trending&limit=12`).then(r => r.json()).then(d => setItems(d.campaigns ?? [])).finally(() => setLoading(false));
  }, []);
  const left = items;
  const right = [...items].reverse();
  const discordAvatarUrl = (discordId?: string, avatar?: string) => {
    if (!avatar) return "/default-avatar.png";
    if (avatar.startsWith("http")) return avatar;
    if (!discordId) return "/default-avatar.png";
    const ext = avatar.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.${ext}?size=64`;
  };
  const fallbackAvatar = (seed: string) => `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(seed)}`;
  const resolveAvatar = (c: any) => {
    const isAnonymous = (c.creator?.name || '').toLowerCase() === 'anonymous';
    const isUndefined = (c.creator?.handle || '').includes('undefined');
    
    if (isAnonymous && isUndefined) {
      return "/default-avatar.svg";
    }
    
    const isDefault = c.creator?.avatar === '/default-avatar.svg' || isUndefined;
    if (isAnonymous || isDefault) {
      return fallbackAvatar(String(c.discord_id || c.id || c.creator?.name || 'anon'));
    }
    return discordAvatarUrl(c.discord_id, c.creator?.avatar);
  };
  const formatHandle = (handle?: string) => {
    const h = handle || "";
    if (!h || h.includes("undefined")) return "";
    return h;
  };
  return (
    <section className="py-16 bg-gradient-to-r from-card/20 to-card/40 backdrop-blur-sm">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Active Campaigns Making Impact</h2>
        <p className="text-muted-foreground">Join thousands supporting causes worldwide with private ZEC donations</p>
      </div>
      <Marquee gradient={false} speed={50} className="py-4" pauseOnHover>
        {(loading ? Array.from({ length: 6 }).map((_, i) => ({ __skeleton: true, id: `s1-${i}` })) : left).map((c: any) => (
          <motion.div key={c.id} whileHover={{ scale: 1.05, y: -5 }} className="mx-4 w-80">
            <Card className="glass-card overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {c.__skeleton ? (
                  <div className="absolute inset-0 p-4 animate-pulse">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-white/20" />
                      <div className="h-4 w-28 bg-white/20 rounded" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="h-5 w-40 bg-white/20 rounded mb-3" />
                      <div className="h-3 w-56 bg-white/10 rounded" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Image
                        src={resolveAvatar(c)}
                        alt={c.creator?.name || "Creator"}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white/20"
                      />
                      <div className="text-white">
                        <div className="text-sm font-medium">{c.creator?.name || 'Anonymous'}</div>
                        {formatHandle(c.creator?.handle) && (
                          <div className="text-xs text-white/70">{formatHandle(c.creator?.handle)}</div>
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{c.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {Math.max(50, Math.floor(c.receivedZec * 20))}
                        </span>
                        <span className="text-primary font-medium">{c.receivedZec?.toFixed(1)} ZEC</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  {c.__skeleton ? (
                    <div className="h-9 w-full bg-muted/30 rounded animate-pulse" />
                  ) : (
                    <Link href={`/campaigns/${c.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">View Campaign</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Marquee>
      <Marquee gradient={false} speed={40} direction="right" className="py-4" pauseOnHover>
        {(loading ? Array.from({ length: 6 }).map((_, i) => ({ __skeleton: true, id: `s2-${i}` })) : right).map((c: any) => (
          <motion.div key={`reverse-${c.id}`} whileHover={{ scale: 1.05, y: -5 }} className="mx-4 w-80">
            <Card className="glass-card overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-secondary/20 to-primary/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {c.__skeleton ? (
                  <div className="absolute inset-0 p-4 animate-pulse">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-white/20" />
                      <div className="h-4 w-28 bg-white/20 rounded" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="h-5 w-40 bg-white/20 rounded mb-3" />
                      <div className="h-3 w-56 bg-white/10 rounded" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Image
                        src={resolveAvatar(c)}
                        alt={c.creator?.name || "Creator"}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white/20"
                      />
                      <div className="text-white">
                        <div className="text-sm font-medium">{c.creator?.name || 'Anonymous'}</div>
                        {formatHandle(c.creator?.handle) && (
                          <div className="text-xs text-white/70">{formatHandle(c.creator?.handle)}</div>
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{c.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {Math.max(50, Math.floor(c.receivedZec * 20))}
                        </span>
                        <span className="text-primary font-medium">{c.receivedZec?.toFixed(1)} ZEC</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  {c.__skeleton ? (
                    <div className="h-9 w-full bg-muted/30 rounded animate-pulse" />
                  ) : (
                    <Link href={`/campaigns/${c.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">View Campaign</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Marquee>
    </section>
  );
}
