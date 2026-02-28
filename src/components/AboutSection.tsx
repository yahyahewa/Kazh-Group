"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Timeline from "./Timeline";

export default function AboutSection() {
    const t = useTranslations("About");
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";
    const ref = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(titleRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <section
            ref={ref}
            id="about"
            className="relative py-32 lg:py-40 overflow-hidden"
        >
            {/* Background elements */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className={`absolute top-1/4 ${isRtl ? "left-0" : "right-0"} w-[500px] h-[500px] bg-cobalt/3 rounded-full blur-[180px]`} />
                <div className={`absolute bottom-1/4 ${isRtl ? "right-0" : "left-0"} w-[300px] h-[300px] bg-cobalt-dim/5 rounded-full blur-[120px]`} />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div ref={titleRef} className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cobalt/20 bg-cobalt/5 mb-6"
                    >
                        <span className="text-xs font-medium text-cobalt-glow tracking-wider uppercase">
                            {t("badge")}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-[family-name:var(--font-montserrat)] text-4xl lg:text-6xl font-black text-white mb-6"
                    >
                        {t("title")}{" "}
                        <span className={`text-transparent bg-clip-text ${isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-cobalt to-cobalt-glow`}>
                            {t("titleAccent")}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                {/* Interactive Timeline */}
                <Timeline />
            </div>

            {/* Bottom separator */}
            <div className="absolute bottom-0 left-0 right-0 section-sep" />
        </section>
    );
}
