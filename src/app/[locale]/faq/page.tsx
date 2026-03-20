"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

interface FAQItem {
    q: string;
    a: string;
}

export default function FAQPage() {
    const t = useTranslations("FAQ");
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";
    const items = t.raw("items") as FAQItem[];
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-obsidian pt-32 pb-20 overflow-hidden relative">
            {/* Background Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cobalt/5 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cobalt-glow/5 rounded-full blur-[180px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-cobalt/20 bg-cobalt/5 text-cobalt-glow text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
                    >
                        {t("badge")}
                    </motion.span>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-6xl font-black text-white mb-6 font-[family-name:var(--font-montserrat)] tracking-tight leading-tight"
                    >
                        {t("title")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-glow to-cobalt">
                            {t("titleAccent")}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`w-full text-left glass rounded-2xl border-ultra-thin transition-all duration-500 overflow-hidden ${
                                    activeIndex === index 
                                    ? "bg-white/10 border-cobalt/30 ring-1 ring-cobalt/20" 
                                    : "hover:bg-white/5 hover:border-white/20"
                                }`}
                                dir={isRtl ? "rtl" : "ltr"}
                            >
                                <div className="p-6 lg:p-8 flex items-center justify-between gap-6">
                                    <span className={`text-lg lg:text-xl font-bold transition-all duration-300 font-[family-name:var(--font-montserrat)] ${
                                        activeIndex === index ? "text-cobalt-glow translate-x-1" : "text-white"
                                    }`}>
                                        {item.q}
                                    </span>
                                    
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${
                                        activeIndex === index ? "bg-cobalt rotate-180 border-cobalt" : "bg-white/5"
                                    }`}>
                                        <svg 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                            className="text-white"
                                        >
                                            <path d="m6 9 6 6 6-6"/>
                                        </svg>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 lg:px-8 pb-8 pt-2">
                                                <div className="w-full h-px bg-gradient-to-r from-cobalt/20 via-cobalt/10 to-transparent mb-6" />
                                                <p className="text-white/50 text-base lg:text-lg leading-relaxed max-w-3xl">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Still Questions? */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-24 p-8 lg:p-12 glass rounded-[2.5rem] border-ultra-thin text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cobalt/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <h3 className="text-3xl font-bold text-white mb-4 relative z-10 font-[family-name:var(--font-montserrat)]">
                        Still have questions?
                    </h3>
                    <p className="text-white/40 mb-10 max-w-md mx-auto relative z-10 text-lg">
                        Can&apos;t find the answer you&apos;re looking for? Reach out to our specialist team.
                    </p>
                    
                    <Link href={`/${locale}#contact`} className="relative z-10">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="liquid-btn px-10 py-4 rounded-full border border-cobalt/30 bg-cobalt/5 text-cobalt-glow font-semibold tracking-wider uppercase text-sm"
                        >
                            Get in Touch
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
