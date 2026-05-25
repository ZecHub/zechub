"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getCreatorAvatarUrl } from "@/lib/utils";

export default function FeaturedCampaigns() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    fetch(`/api/campaigns`).then(r => r.json()).then(d => setItems(d.campaigns ?? []));
  }, []);
  const sample = useMemo(() => {
    if (!items?.length) return [] as any[];
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [items]);
  const avatarFor = (c: any) => getCreatorAvatarUrl({
    discordId: c.discord_id,
    avatar: c.creator?.avatar,
    creatorName: c.creator?.name,
    creatorHandle: c.creator?.handle,
    seedFallback: c.id,
  });
  return (
    <section className="px-6 py-20 bg-card/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Featured Campaigns</h2>
          <p className="text-xl text-muted-foreground">Support verified causes making real impact</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {sample.map((c, idx) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: (idx+1) * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }}>
              <Card className="glass-card overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary/30 to-secondary/30">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">Verified</div>
                  </div>
                  <div className="absolute top-4 left-4 text-white flex items-center gap-2">
                    <Image src={avatarFor(c)} alt={c.creator?.name || 'Creator'} width={32} height={32} className="rounded-full border-2 border-white/20" />
                    <div>
                      <div className="text-sm font-medium">{c.creator?.name || 'Anonymous'}</div>
                      {(c.creator?.handle && !c.creator?.handle.includes('undefined')) && (
                        <div className="text-xs text-white/70">{c.creator?.handle}</div>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{Math.max(50, Math.floor(c.receivedZec * 20))} supporters</span>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{c.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{c.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="text-primary font-medium">{c.receivedZec?.toFixed(1)} ZEC</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.min(100, Math.round((c.receivedZec / Math.max(1, c.goalZec)) * 100))}%` }} transition={{ duration: 1, delay: (idx+1) * 0.2 }} viewport={{ once: true }} className="h-full bg-gradient-to-r from-primary to-secondary" />
                    </div>
                    <Link href={`/campaigns/${c.id}`}>
                      <Button className="w-full mt-3"><Heart className="mr-2 h-4 w-4" />Donate Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


