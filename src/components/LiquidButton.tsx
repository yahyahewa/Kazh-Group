"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocale } from "next-intl";

interface LiquidButtonProps {
    children: ReactNode;
    href?: string;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
}

export default function LiquidButton({
    children,
    href = "#",
    variant = "primary",
    className = "",
    onClick,
}: LiquidButtonProps) {
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";

    const baseStyles =
        "liquid-btn relative inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase overflow-hidden transition-all duration-500";

    const variants = {
        primary: `border border-cobalt/40 text-white ${isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"
            } from-cobalt/20 to-transparent hover:from-cobalt/30`,
        secondary:
            "border border-white/10 text-white/80 hover:text-white hover:border-white/20",
    };

    return (
        <motion.a
            href={href}
            onClick={onClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {/* Liquid shimmer effect */}
            <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700"
                style={{
                    background:
                        "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(51, 153, 255, 0.15) 0%, transparent 60%)",
                }}
            />
            {/* Moving shine */}
            <motion.div
                className="absolute inset-0"
                initial={{ x: isRtl ? "100%" : "-100%" }}
                whileHover={{ x: isRtl ? "-100%" : "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <div className={`w-1/3 h-full ${isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-transparent via-white/10 to-transparent ${isRtl ? "-skew-x-12" : "skew-x-12"}`} />
            </motion.div>
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {variant === "primary" && (
                    <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`ms-1 ${isRtl ? "rotate-180" : ""}`}
                        whileHover={{ x: isRtl ? -3 : 3 }}
                    >
                        <path
                            d="M3 8H13M13 8L9 4M13 8L9 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </motion.svg>
                )}
            </span>
        </motion.a>
    );
}
