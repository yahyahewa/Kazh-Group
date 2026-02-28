"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const serviceKeys = [
    "webDev",
    "mobileApp",
    "databaseDesign",
    "windowsForm",
    "itTraining",
    "itConsulting",
    "uiUxDesign",
    "cyberSecurity",
    "support",
] as const;

const serviceIcons: Record<string, React.ReactNode> = {
    webDev: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 12H28" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="9" r="1" fill="currentColor" />
            <circle cx="11" cy="9" r="1" fill="currentColor" />
            <circle cx="14" cy="9" r="1" fill="currentColor" />
        </svg>
    ),
    mobileApp: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="9" y="4" width="14" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 24H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="6" r="0.5" fill="currentColor" />
        </svg>
    ),
    databaseDesign: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <ellipse cx="16" cy="8" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 8V24C6 26.21 10.48 28 16 28C21.52 28 26 26.21 26 24V8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 16C6 18.21 10.48 20 16 20C21.52 20 26 18.21 26 16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    windowsForm: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 14H28" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 4V28" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    itTraining: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4 12L16 6L28 12L16 18L4 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 14V22C8 22 12 26 16 26C20 26 24 22 24 22V14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M28 12V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    itConsulting: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 22C4 18.69 6.69 16 10 16H12C15.31 16 18 18.69 18 22V26H4V22Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="22" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M18 22C18 20.34 19.34 19 21 19H23C24.66 19 26 20.34 26 22V24H18V22Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    uiUxDesign: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M26 10L10 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="26" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="6" cy="26" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 14C6 9.58 9.58 6 14 6H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    cyberSecurity: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 3L6 7V14C6 20.38 10.27 26.31 16 28.5C21.73 26.31 26 20.38 26 14V7L16 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 17V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    support: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7.5 7.5L11.75 11.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.25 20.25L24.5 24.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7.5 24.5L11.75 20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.25 11.75L24.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
};

function ServiceCard({
    serviceKey,
    index,
    t,
}: {
    serviceKey: string;
    index: number;
    t: ReturnType<typeof useTranslations>;
}) {
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ y: -8, scale: 1.01 }}
            className={`glass rounded-2xl p-8 group cursor-default h-full flex flex-col
        hover:glow-cobalt transition-all duration-500 hover:border-cobalt/20 ${index === 0 ? "lg:col-span-2 lg:row-span-2" :
                    index === 6 ? "lg:col-span-2" :
                        ""
                }`}
        >
            <motion.div
                whileHover={{ rotate: isRtl ? -5 : 5, scale: 1.1 }}
                className="text-cobalt-glow mb-6 transition-transform duration-300"
            >
                {serviceIcons[serviceKey]}
            </motion.div>
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-cobalt-glow transition-colors duration-300">
                {t(`${serviceKey}.title`)}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">
                {t(`${serviceKey}.description`)}
            </p>
            <div className={`mt-6 h-px w-0 group-hover:w-16 ${isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-cobalt to-cobalt-glow transition-all duration-500`} />
        </motion.div>
    );
}

export default function BentoGrid() {
    const t = useTranslations("Services");
    const titleRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(titleRef, { once: true, margin: "-100px" });

    return (
        <section id="services" className="relative py-32 lg:py-40 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cobalt/3 rounded-full blur-[150px]" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div ref={titleRef} className="text-center mb-16">
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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-cobalt-glow">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr">
                    {serviceKeys.map((key, index) => (
                        <ServiceCard
                            key={key}
                            serviceKey={key}
                            index={index}
                            t={t}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 section-sep" />
        </section>
    );
}
