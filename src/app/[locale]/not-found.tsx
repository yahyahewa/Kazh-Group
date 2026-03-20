"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function NotFound() {
    const t = useTranslations("NotFound");
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-obsidian py-20">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cobalt/5 rounded-full blur-[180px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cobalt-dim/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" 
                    style={{ 
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }} 
                />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                {/* Big 404 with Shadow/Glow */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative inline-block mb-12"
                >
                    <h1 className="font-[family-name:var(--font-montserrat)] text-[12rem] lg:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-white/[0.02] select-none">
                        {t("title")}
                    </h1>
                    
                    {/* Floating Glow Overlay */}
                    <motion.div 
                        animate={{ 
                            y: [0, -10, 0],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span className="text-4xl lg:text-6xl font-black text-cobalt-glow blur-[1px] text-glow opacity-60">
                            {t("title")}
                        </span>
                    </motion.div>
                </motion.div>

                {/* Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass rounded-3xl p-8 lg:p-12 border-ultra-thin shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cobalt/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <h2 className="font-[family-name:var(--font-montserrat)] text-3xl lg:text-4xl font-bold text-white mb-4 relative z-10">
                        {t("heading")}
                    </h2>
                    
                    <p className="text-white/40 text-lg mb-10 leading-relaxed max-w-md mx-auto relative z-10">
                        {t("subheading")}
                    </p>

                    <Link href={`/${locale}`} className="inline-block relative z-10">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="liquid-btn px-10 py-4 rounded-full border border-cobalt/30 bg-cobalt/5 text-cobalt-glow font-semibold tracking-wider uppercase text-sm transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isRtl && (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                )}
                                {!isRtl && (
                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                )}
                                {t("cta")}
                            </span>
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Ambient floating geometry */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 w-40 h-40 border border-white/5 rounded-full flex items-center justify-center pointer-events-none opacity-20"
                >
                    <div className="w-20 h-20 border border-cobalt/20 rounded-full animate-pulse" />
                </motion.div>
                
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-10 -left-10 w-32 h-32 border border-white/5 rotate-45 pointer-events-none opacity-20"
                >
                    <div className="absolute inset-0 border border-cobalt/10 origin-center scale-75" />
                </motion.div>
            </div>
        </div>
    );
}
