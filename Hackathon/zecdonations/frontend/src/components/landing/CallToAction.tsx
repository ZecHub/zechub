"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Heart } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="px-6 py-24 text-center relative overflow-hidden">
    <div 
        className="absolute inset-0 bg-cover bg-left-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/donation-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-900/5" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-950/5" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(34,197,94,0.2)]" />
      <div className="relative max-w-4xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-5xl font-display font-bold mb-6 text-white">
          Ready to Make an Impact?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }} className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Join the privacy-first donation revolution. Create your campaign or support causes that matter to you.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
          <Link href="/dashboard/create">
            <Button size="lg" className="text-lg px-8 py-4 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <Target className="mr-2 h-5 w-5" />
              Launch Your Campaign
            </Button>
          </Link>
          <Link href="/campaigns">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
              <Heart className="mr-2 h-5 w-5" />
              Browse All Campaigns
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
