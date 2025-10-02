"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ShieldCheck, QrCode, Users, Target, Heart, Zap, Globe, Lock } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { buildZecUri } from "@/lib/zec";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative px-6 pt-20 pb-16 overflow-hidden">
      {/* Background image */}

      
      <div className="max-w-6xl mx-auto">
 
        <div className="flex flex-col lg:flex-row items-center gap-12">
        <div 
        className="absolute inset-0 bg-cover bg-left-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/network-security.jpg')" }}
      />
 {/*        <Image
          src="/donation-bg.webp"
          alt="Web3 Community Background"
          fill
          className="object-cover opacity-20"
          priority
        /> */}
          {/* Left side - Text content */}
          <div className="flex-1 text-center  z-10 lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm text-primary mb-6"
            >
              <Zap className="h-4 w-4" />
              <span>Powered by Zcash Privacy Technology</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Private Donations
              </span>
              <br />
              <span className="text-foreground">Reimagined</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-none leading-relaxed mb-8"
            >
              Create impactful campaigns or donate anonymously using shielded ZEC addresses. 
              Complete privacy, instant transactions, global reach.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }} 
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-8"
            >
              <Link href="/dashboard/create">
                <Button size="lg" className="px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Target className="mr-2 h-5 w-5" />
                  Launch Campaign
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button variant="outline" size="lg" className="px-6 py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  Explore Campaigns
                </Button>
              </Link>
            </motion.div>
            <div>

        </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }} 
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-sm"
            >
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border/50">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border/50">
                <QrCode className="h-4 w-4 text-secondary" />
                <span>QR Payments</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border/50">
                <Globe className="h-4 w-4 text-primary" />
                <span>Global Access</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border/50">
                <Lock className="h-4 w-4 text-secondary" />
                <span>Zero Tracking</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Campaign Preview */}
    
        </div>
      </div>
    </section>
  );
}
