"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import LiquidButton from "./LiquidButton";

const KineticSculpture = dynamic(() => import("./KineticSculpture"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-cobalt/30 animate-pulse" />
        </div>
    ),
});

export default function HeroSection() {
    const t = useTranslations("Hero");
    const locale = useLocale();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);

    return (
        <section
            ref={ref}
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden"
        >

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-32">
                    {/* Left - Typography */}
                    <motion.div style={{ y: y1 }} className="space-y-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cobalt/20 bg-cobalt/5"
                        >
                            <div className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
                            <span className="text-xs font-medium text-cobalt-glow tracking-wider uppercase">
                                {t("badge")}
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <div className="space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 0.8,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="font-[family-name:var(--font-montserrat)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-white"
                            >
                                {t("line1")}
                            </motion.h1>
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.65,
                                    duration: 0.8,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="font-[family-name:var(--font-montserrat)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight"
                            >
                                <span className={`text-transparent bg-clip-text ${locale === "ckb" || locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-cobalt via-cobalt-glow to-cobalt text-glow`}>
                                    {t("line2")}
                                </span>
                            </motion.h1>
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.8,
                                    duration: 0.8,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="font-[family-name:var(--font-montserrat)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-white"
                            >
                                {t("line3")}
                            </motion.h1>
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="text-white/50 text-lg lg:text-xl max-w-lg leading-relaxed"
                        >
                            {t("subtitle")}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <LiquidButton href={`/${locale}#services`} variant="primary">
                                {t("ctaPrimary")}
                            </LiquidButton>
                            <LiquidButton href={`/${locale}#about`} variant="secondary">
                                {t("ctaSecondary")}
                            </LiquidButton>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.6 }}
                            className="flex gap-12 pt-8"
                        >
                            {[
                                {
                                    value: t("stat1Value"),
                                    label: t("stat1Label")
                                },
                                {
                                    value: t("stat3Value"),
                                    label: t("stat3Label")
                                },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="font-[family-name:var(--font-montserrat)] text-3xl font-bold text-white" dir="ltr">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-white/40 mt-1 tracking-wider uppercase">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right - 3D Sculpture */}
                    <motion.div
                        style={{ y: y2 }}
                        className="relative h-[400px] sm:h-[500px] lg:h-[600px]"
                    >
                        <KineticSculpture />
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                style={{ y: y3 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">
                        {t("scroll")}
                    </span>
                    <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
                        <motion.div
                            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-1 h-1 rounded-full bg-cobalt-glow"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
