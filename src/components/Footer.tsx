"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Logo from "./Logo";

export default function Footer() {
    const t = useTranslations("Footer");
    const locale = useLocale();
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const companyLinks = t.raw("companyLinks") as string[];
    const serviceLinks = t.raw("serviceLinks") as string[];
    const resourceLinks = t.raw("resourceLinks") as string[];

    // Flat list of navigation links for better organization
    const navLinks = [
        { label: companyLinks[0], href: `/${locale}#about` },    // About
        { label: serviceLinks[0], href: `/${locale}#services` }, // Consulting
        { label: t("faq"), href: `/${locale}/faq` },             // FAQ
        { label: resourceLinks[0], href: `/${locale}#contact` },  // Contact
    ];

    const socialLinks = [
        {
            name: "Facebook",
            href: "https://web.facebook.com/kazhGroup?locale=ku_TR&_rdc=1&_rdr#",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            )
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/kazhgroup?igsh=MW5uNnV3enN3eXM2Nw==",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
            )
        },
        {
            name: "TikTok",
            href: "https://www.tiktok.com/@kazhgr?_r=1&_t=ZS-94rIohHgaAu",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
            )
        }
    ];

    return (
        <footer className="relative border-t border-white/5">
            <div className="section-sep" />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center mb-6">
                            <Logo />
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                            {t("tagline")}
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white font-[family-name:var(--font-montserrat)] font-semibold text-sm tracking-wider uppercase mb-8">
                            {t("menu")}
                        </h4>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <motion.a
                                        href={link.href}
                                        whileHover={{ x: locale === "en" ? 4 : -4 }}
                                        className="text-white/40 hover:text-cobalt-glow text-base transition-colors duration-300 inline-block cursor-pointer flex items-center gap-2 group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-cobalt/40 group-hover:bg-cobalt-glow transition-colors" />
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Social Connect */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white font-[family-name:var(--font-montserrat)] font-semibold text-sm tracking-wider uppercase mb-8">
                            Connect
                        </h4>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-white/40 hover:text-cobalt-glow hover:border-cobalt/30 transition-all duration-300 bg-white/5 shadow-lg"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/20 text-xs tracking-wide uppercase font-medium" dir="ltr">
                        {t("copyright", { year: currentYear })}
                    </p>
                    
                    <div className="flex items-center gap-8">
                        <span className="text-white/10 text-[10px] tracking-widest uppercase">Kazh Group Group</span>
                        <div className="w-2 h-2 rounded-full bg-cobalt-glow blur-[2px] animate-pulse" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
