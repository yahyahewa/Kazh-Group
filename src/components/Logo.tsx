"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function Logo({ className = "" }: { className?: string }) {
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";

    return (
        <div className={`relative flex items-center gap-3 group ${isRtl ? "flex-row-reverse" : "flex-row"} ${className}`}>
            <div className="relative w-10 h-10">
                <motion.svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full transform-gpu"
                >
                    <defs>
                        <linearGradient id="logo-accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0066FF" />
                            <stop offset="100%" stopColor="#3399FF" />
                        </linearGradient>
                        <filter id="logo-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                        </filter>
                    </defs>

                    {/* Minimalist Geometric Symbol */}
                    <motion.rect
                        x="20"
                        y="20"
                        width="60"
                        height="60"
                        rx="12"
                        stroke="url(#logo-accent-grad)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    <motion.path
                        d={isRtl ? "M60 35 L40 50 L60 65" : "M40 35 L60 50 L40 65"}
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    />

                    <motion.circle
                        cx="50"
                        cy="50"
                        r="30"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="1"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                </motion.svg>

                {/* Ambient Glow */}
                <motion.div
                    className="absolute inset-0 bg-cobalt/20 blur-[15px] rounded-full -z-10"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className={`flex flex-col ${isRtl ? "items-end" : "items-start"}`}>
                <motion.span
                    initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-[family-name:var(--font-montserrat)] font-bold text-xl tracking-tighter text-white"
                >
                    KAZH<span className="text-cobalt-glow">GROUP</span>
                </motion.span>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className={`h-[1px] bg-gradient-to-r ${isRtl ? "from-transparent to-cobalt-glow" : "from-cobalt-glow to-transparent"} ${isRtl ? "origin-right" : "origin-left"} w-full mt-[-2px]`}
                />
            </div>

            {/* Hover State Background Highlight */}
            <div className="absolute -inset-x-4 -inset-y-2 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20" />
        </div>
    );
}

