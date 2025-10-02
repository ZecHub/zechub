"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Zap, Globe, ArrowRight, Sparkles, Rocket, Lock, Target } from "lucide-react";

const steps = [
  { 
    title: "Create & Share", 
    desc: "Launch your cause in minutes", 
    icon: Rocket, 
    color: "text-primary",
    details: ["Set your goal", "Add description", "Get unique QR code"]
  },
  { 
    title: "Private Donations", 
    desc: "ZEC ensures complete anonymity", 
    icon: Lock, 
    color: "text-secondary",
    details: ["Scan QR code", "Send ZEC privately", "Zero tracking"]
  },
  { 
    title: "Real Impact", 
    desc: "Watch your cause grow", 
    icon: Target, 
    color: "text-primary",
    details: ["Live progress", "Community support", "Celebrate milestones"]
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 relative overflow-hidden" id="how-it-works">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-left-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/network-security.jpg')" }}
      />
      <div className="max-w-6xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Simple • Private • Powerful</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From idea to impact in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, i) => (
            <motion.div 
              key={step.title} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: i * 0.15 }} 
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg">
                {i + 1}
              </div>

              {/* Connection arrow (except for last item) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-20">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 + 0.8 }}
                    viewport={{ once: true }}
                  >
                    <ArrowRight className="h-6 w-6 text-primary/60" />
                  </motion.div>
                </div>
              )}

              <Card className="glass-card h-full flex flex-col hover:shadow-lg transition-all duration-300 group-hover:border-primary/30">
                <CardHeader className="space-y-4 text-center">
                  {/* Icon */}
                  <motion.div 
                    className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <step.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  
                  <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {step.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Feature list */}
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 + idx * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-6">
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: "100%" }} 
                        transition={{ duration: 1.2, delay: i * 0.2 + 0.8, ease: "easeOut" }} 
                        viewport={{ once: true }} 
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
            <span>Ready to make a difference?</span>
            <Zap className="h-4 w-4 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
