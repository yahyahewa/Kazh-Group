"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";

    return (
        <div className={`relative flex items-center gap-3 group ${isRtl ? "flex-row-reverse" : "flex-row"} ${className}`}>
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                <Image
                    src="/logo.jpg"
                    alt="Kazh Group Logo"
                    fill
                    className="object-cover rounded-xl shadow-lg border border-white/10"
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

