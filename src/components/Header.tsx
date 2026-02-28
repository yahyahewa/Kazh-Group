"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import Logo from "./Logo";

export default function Header() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { label: t("home"), href: `/${locale}#hero` },
        { label: t("about"), href: `/${locale}#about` },
        { label: t("services"), href: `/${locale}#services` },
        { label: t("contact"), href: `/${locale}#contact` },
    ];

    const locales = [
        { code: "en", label: "EN" },
        { code: "ckb", label: "کوردی" },
        { code: "ar", label: "عربي" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isRtl = locale === "ar" || locale === "ckb";

    // Get current path without locale prefix
    const getLocalizedPath = (targetLocale: string) => {
        return `/${targetLocale}${pathname === "/" ? "" : pathname}`;
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href={`/${locale}`} className="group flex items-center">
                    <Logo />
                </Link>


                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 rounded-full group"
                        >
                            <span className="relative z-10">{link.label}</span>
                            <motion.div
                                className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                layoutId="navHover"
                            />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cobalt group-hover:w-6 transition-all duration-300 rounded-full" />
                        </motion.a>
                    ))}
                </div>

                {/* Desktop Right: Language Switcher + Dropdown */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Switcher Dropdown */}
                    <div className="relative group/lang">
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-sm font-medium text-white/70 hover:text-white"
                        >
                            <span className="uppercase">{locale}</span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                className="transition-transform duration-300 group-hover/lang:rotate-180"
                            >
                                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <div className={`absolute top-full ${isRtl ? "left-0" : "right-0"} pt-2 w-32 opacity-0 translate-y-2 pointer-events-none group-hover/lang:opacity-100 group-hover/lang:translate-y-0 group-hover/lang:pointer-events-auto transition-all duration-300 z-50`}>
                            <div className="glass-strong rounded-2xl border border-white/10 p-2 shadow-2xl overflow-hidden">
                                {locales.map((loc) => (
                                    <a
                                        key={loc.code}
                                        href={getLocalizedPath(loc.code)}
                                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${locale === loc.code
                                            ? "bg-cobalt/20 text-cobalt-glow"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        {loc.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.a
                        href={`/${locale}#contact`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="liquid-btn px-6 py-2.5 rounded-full border border-cobalt/30 text-sm font-medium text-cobalt-glow hover:text-white transition-all duration-300 inline-block"
                    >
                        <span className="relative z-10">{t("getInTouch")}</span>
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden relative w-10 h-10 flex items-center justify-center"
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col gap-1.5">
                        <motion.span
                            animate={
                                mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                            }
                            className="block w-6 h-0.5 bg-white transition-all origin-center"
                        />
                        <motion.span
                            animate={
                                mobileOpen
                                    ? { opacity: 0, x: isRtl ? 10 : -10 }
                                    : { opacity: 1, x: 0 }
                            }
                            className="block w-6 h-0.5 bg-white transition-all"
                        />
                        <motion.span
                            animate={
                                mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                            }
                            className="block w-6 h-0.5 bg-white transition-all origin-center"
                        />
                    </div>
                </motion.button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden glass-strong border-t border-white/5"
                    >
                        <div className="px-6 py-6 flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            {/* Mobile Language Switcher */}
                            <div className="flex items-center gap-2 px-4 py-3 mt-2">
                                {locales.map((loc) => (
                                    <a
                                        key={loc.code}
                                        href={getLocalizedPath(loc.code)}
                                        onClick={() => setMobileOpen(false)}
                                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${locale === loc.code
                                            ? "bg-cobalt/20 text-cobalt-glow border-cobalt/30"
                                            : "border-white/10 text-white/40 hover:text-white/70"
                                            }`}
                                    >
                                        {loc.label}
                                    </a>
                                ))}
                            </div>

                            <motion.a
                                href={`/${locale}#contact`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => setMobileOpen(false)}
                                className="mt-2 liquid-btn px-6 py-3 rounded-full border border-cobalt/30 text-center text-cobalt-glow font-medium"
                            >
                                <span className="relative z-10">{t("getInTouch")}</span>
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
