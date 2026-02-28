"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const milestoneYears = ["2020", "2021", "2022", "2023", "2024", "2025"] as const;

function TimelineNode({
    year,
    index,
    t,
}: {
    year: string;
    index: number;
    t: ReturnType<typeof useTranslations>;
}) {
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isItemStart = index % 2 === 0;

    // Define entry animation x offset
    // LTR: Left item comes from -60, Right item from 60
    // RTL: Right item (start) comes from 60, Left item (end) from -60
    const xOffset = isItemStart ? -60 : 60;
    const initialX = isRtl ? -xOffset : xOffset;

    return (
        <div
            ref={ref}
            className={`relative flex items-center w-full ${isItemStart ? "justify-start" : "justify-end"
                } mb-16 last:mb-0`}
        >
            {/* Content Card */}
            <motion.div
                initial={{
                    opacity: 0,
                    x: initialX,
                    rotateY: isItemStart ? (isRtl ? 15 : -15) : (isRtl ? -15 : 15),
                }}
                animate={
                    isInView
                        ? { opacity: 1, x: 0, rotateY: 0 }
                        : {
                            opacity: 0,
                            x: initialX,
                            rotateY: isItemStart ? (isRtl ? 15 : -15) : (isRtl ? -15 : 15),
                        }
                }
                transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                    scale: 1.02,
                    rotateY: isItemStart ? (isRtl ? -3 : 3) : (isRtl ? 3 : -3),
                    z: 30,
                }}
                className={`w-full md:w-[calc(50%-40px)] glass rounded-2xl p-6 lg:p-8 cursor-default group
          hover:glow-cobalt transition-shadow duration-500
          ${isItemStart ? "md:me-auto" : "md:ms-auto"}`}
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
                {/* Year Badge */}
                <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cobalt to-cobalt-glow glow-cobalt" />
                    <span className="font-[family-name:var(--font-montserrat)] text-cobalt-glow font-bold text-sm tracking-wider">
                        {year}
                    </span>
                </div>

                <h3 className="font-[family-name:var(--font-montserrat)] text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-cobalt-glow transition-colors duration-300">
                    {t(`milestones.${year}.title`)}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                    {t(`milestones.${year}.description`)}
                </p>
            </motion.div>

            {/* Center Dot */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={
                    isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                }
                transition={{ duration: 0.4, delay: 0.3 }}
                className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10"
            >
                <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-cobalt glow-cobalt-strong" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-cobalt animate-ping opacity-30" />
                </div>
            </motion.div>
        </div>
    );
}

export default function Timeline() {
    const t = useTranslations("About");
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-8">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5">
                <motion.div
                    style={{ height: lineHeight }}
                    className="w-full timeline-line"
                />
            </div>

            {/* Milestones */}
            {milestoneYears.map((year, index) => (
                <TimelineNode key={year} year={year} index={index} t={t} />
            ))}
        </div>
    );
}
