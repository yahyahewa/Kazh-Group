"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const projectKeys = ["project1", "project2", "project3", "project4", "project5", "project6"];

export default function ProjectsPage() {
    const t = useTranslations("Projects");
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";

    const [activeFilter, setActiveFilter] = useState("All");

    const filters = [
        { id: "All", label: t("allProjects") },
        { id: t("filterTech"), label: t("filterTech") },
        { id: t("filterInfra"), label: t("filterInfra") },
        { id: t("filterDigital"), label: t("filterDigital") },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const filteredProjects = projectKeys.filter(key => {
        if (activeFilter === "All") return true;
        return t(`${key}.category`) === activeFilter;
    });

    return (
        <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-obsidian">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-cobalt/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-cobalt-glow/3 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cobalt/20 bg-cobalt/5 mb-6"
                    >
                        <span className="text-xs font-medium text-cobalt-glow tracking-wider uppercase">
                            {t("badge")}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-[family-name:var(--font-montserrat)] text-5xl lg:text-7xl font-black text-white mb-8"
                    >
                        {t("title")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-cobalt-glow">
                            {t("titleAccent")}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/40 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border-ultra-thin
                                ${activeFilter === filter.id
                                    ? "bg-cobalt text-white shadow-lg shadow-cobalt/20 border-cobalt"
                                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"}`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((key, index) => (
                            <ProjectCard
                                key={key}
                                projectKey={key}
                                index={index}
                                t={t}
                                isRtl={isRtl}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}

function ProjectCard({ projectKey, index, t, isRtl }: {
    projectKey: string;
    index: number;
    t: ReturnType<typeof useTranslations>;
    isRtl: boolean;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative glass rounded-3xl p-8 flex flex-col h-full hover:glow-cobalt transition-all duration-500"
        >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full bg-cobalt/10 flex items-center justify-center text-cobalt-glow blur-sm group-hover:blur-none transition-all duration-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={isRtl ? "rotate-180" : ""}>
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <div className="mb-8">
                <span className="text-xs font-bold text-cobalt-glow tracking-[0.2em] uppercase">
                    {t(`${projectKey}.category`)}
                </span>
            </div>

            <h3 className="font-[family-name:var(--font-montserrat)] text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-cobalt-glow transition-colors duration-300">
                {t(`${projectKey}.title`)}
            </h3>

            <p className="text-white/40 text-sm lg:text-base leading-relaxed mb-8 flex-grow">
                {t(`${projectKey}.description`)}
            </p>

            <div className="pt-6 border-t border-white/5 mt-auto">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                    {t("viewProject")}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`}>
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cobalt/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </motion.div>
    );
}
