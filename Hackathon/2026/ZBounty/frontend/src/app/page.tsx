"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Coins, Users, Lock, Sparkles, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "@/components/LoginModal";

export default function Home() {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalInitialIsSignUp, setLoginModalInitialIsSignUp] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">

      <header className="px-6 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-primary" />
          <span className="font-space-grotesk font-bold text-2xl tracking-tight text-foreground">ZBounty</span>
        </div>
        {user ? (
          <>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <Link href="/explore" className="hover:text-primary transition-colors relative group">
                Explore
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/dashboard" className="hover:text-primary transition-colors relative group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              {user.walletAddress ? (
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline border border-border px-3 py-1.5 rounded-md bg-secondary">
                  Linked: {user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}
                </span>
              ) : (
                <Link 
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-md bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors border border-border focus-visible:ring-2 focus-visible:ring-ring outline-none"
                >
                  Connect Wallet
                </Link>
              )}
              {user.role === "Creator" && (
                <Link 
                  href="/create"
                  className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-ring outline-none hidden sm:block"
                >
                  Create Bounty
                </Link>
              )}
              
              <Link href="/dashboard" className="w-9 h-9 rounded-full border border-border overflow-hidden hover:opacity-80 transition-opacity shrink-0">
                <img
                  alt="User profile"
                  className="w-full h-full object-cover"
                  src={user.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDw39ScrxNa3ZgzehfSnq_YoRqJofZus71SLW3Bb7uZtGBzNwV55CayP5mje1Trt7rMVRtD5X-a74dAPHwUlq3MqhfX7flwAvqOgzv3ovfQJh_UZWcxifC0HJEMI5w9ijaNf9_U_9MlKEHHY85-PRy3DXq2P5WARiDSltoNf1_7QsxWWcaIevld4uD7XoV1Zhm581DkNtbo-FrRbPxihGvZVVlg-nUvq9FcP1tOkfAYu7gueTu3PRLBVBROwBxxllhyJ6i_0BhBGw"}
                />
              </Link>

              <button
                onClick={logout}
                className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setLoginModalInitialIsSignUp(false);
                setShowLoginModal(true);
              }}
              className="px-5 py-2.5 rounded-md bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors border border-border focus-visible:ring-2 focus-visible:ring-ring outline-none cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setLoginModalInitialIsSignUp(true);
                setShowLoginModal(true);
              }}
              className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-ring outline-none cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto space-y-10"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary-text text-sm font-bold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Premium Zcash Gig Economy</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-space-grotesk font-extrabold tracking-tighter leading-[1.1]">
            Private Work.<br />
            <span className="text-primary-text">
              Private Rewards.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            The privacy-first bounty marketplace where communities fund tasks in ZEC and contributors get paid through shielded transactions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            {user ? (
              <>
                <Link 
                  href="/explore"
                  className="group flex items-center gap-3 px-8 py-4 rounded-md bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Explore Bounties
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/create"
                  className="flex items-center gap-2 px-8 py-4 rounded-md bg-secondary text-secondary-foreground font-bold text-lg hover:bg-secondary/80 transition-all border border-border active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Post a Bounty
                </Link>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="group flex items-center gap-3 px-8 py-4 rounded-md bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                >
                  Explore Bounties
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 px-8 py-4 rounded-md bg-secondary text-secondary-foreground font-bold text-lg hover:bg-secondary/80 transition-all border border-border active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                >
                  Post a Bounty
                </button>
              </>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto mt-24 relative"
        >
          
          <div className="surface-card p-10 text-left group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
              <Coins className="w-7 h-7 text-primary-text" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-space-grotesk text-foreground">Shielded Payouts</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">Contributors receive rewards privately, protecting their financial history from the public eye.</p>
          </div>
          
          <div className="surface-card p-10 text-left group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
              <Lock className="w-7 h-7 text-primary-text" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-space-grotesk text-foreground">Privacy Score</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">Earn the "Privacy Champion" badge by utilizing Zcash shielded funding and payouts for your bounties.</p>
          </div>
          
          <div className="surface-card p-10 text-left group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
              <Users className="w-7 h-7 text-primary-text" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-space-grotesk text-foreground">Decentralized Talent</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">Discover and collaborate with world-class developers, designers, and contributors around the globe.</p>
          </div>
        </motion.div>
      </main>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        initialIsSignUp={loginModalInitialIsSignUp}
      />
    </div>
  );
}
