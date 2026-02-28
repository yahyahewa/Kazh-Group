"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

    const footerSections = [
        {
            title: t("company"),
            links: [
                { label: companyLinks[0], href: `/${locale}#about` },
                { label: companyLinks[1], href: "#" }, // Careers (stay placeholder)
                { label: companyLinks[2], href: "#" }, // Partners (stay placeholder)
                { label: companyLinks[3], href: "#" }, // Press (stay placeholder)
            ]
        },
        {
            title: t("services"),
            links: [
                { label: serviceLinks[0], href: `/${locale}#services` }, // Technology
                { label: serviceLinks[1], href: `/${locale}#services` }, // Infrastructure
                { label: serviceLinks[2], href: `/${locale}#services` }, // Consulting
                { label: serviceLinks[3], href: `/${locale}#services` }, // Digital
            ]
        },
        {
            title: t("resources"),
            links: [
                { label: resourceLinks[0], href: "#" }, // Blog
                { label: resourceLinks[1], href: "#" }, // Documentation
                { label: resourceLinks[2], href: "#" }, // Support
                { label: resourceLinks[3], href: `/${locale}#contact` }, // Contact
            ]
        },
    ];

    return (
        <footer className="relative border-t border-white/5">
            <div className="section-sep" />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center mb-6">
                            <Logo />
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                            {t("tagline")}
                        </p>
                    </div>


                    {/* Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white font-[family-name:var(--font-montserrat)] font-semibold text-sm tracking-wider uppercase mb-4">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <motion.a
                                            href={link.href}
                                            whileHover={{ x: locale === "en" ? 4 : -4 }}
                                            className="text-white/40 hover:text-cobalt-glow text-sm transition-colors duration-300 inline-block"
                                        >
                                            {link.label}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center">
                    <p className="text-white/30 text-xs text-center" dir="ltr">
                        {t("copyright", { year: currentYear })}
                    </p>
                </div>
            </div>
        </footer>
    );
}
