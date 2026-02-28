"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
    const t = useTranslations("Contact");
    const locale = useLocale();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [cooldown, setCooldown] = useState(0);

    // Load cooldown from localStorage on mount
    useEffect(() => { // Changed from useState to useEffect
        if (typeof window !== "undefined") {
            const lastSub = localStorage.getItem("lastContactSubmission");
            if (lastSub) {
                const elapsed = Date.now() - parseInt(lastSub);
                const remaining = Math.max(0, 60 - Math.floor(elapsed / 1000));
                if (remaining > 0) {
                    setCooldown(remaining);
                }
            }
        }
    }, []); // Empty dependency array to run only on mount

    // Cooldown timer effect
    useEffect(() => { // Changed from useState to useEffect
        let timer: NodeJS.Timeout;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]); // Dependency array includes cooldown to re-run effect when cooldown changes

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (status === "loading" || cooldown > 0) return; // Added cooldown check

        setStatus("loading");

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formState, locale }),
            });

            if (response.ok) {
                setStatus("success");
                setFormState({ name: "", email: "", message: "" });

                // Set 60s cooldown
                const now = Date.now();
                localStorage.setItem("lastContactSubmission", now.toString());
                setCooldown(60);

                setTimeout(() => setStatus("idle"), 5000);
            } else if (response.status === 429) {
                const data = await response.json();
                setStatus("error");
                // If backend says wait, sync frontend
                if (data.message.includes("wait")) {
                    setCooldown(60);
                    localStorage.setItem("lastContactSubmission", Date.now().toString());
                }
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="relative py-32 lg:py-40 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cobalt/5 rounded-full blur-[180px]" />
            </div>

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left - Info */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cobalt/20 bg-cobalt/5"
                        >
                            <span className="text-xs font-medium text-cobalt-glow tracking-wider uppercase">
                                {t("badge")}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-[family-name:var(--font-montserrat)] text-4xl lg:text-6xl font-black text-white"
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
                            className="text-white/40 text-lg leading-relaxed max-w-md"
                        >
                            {t("subtitle")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-4 pt-4"
                        >
                            {[
                                { label: t("emailLabel"), value: t("emailValue") },
                                { label: t("phoneLabel"), value: t("phoneValue") },
                                { label: t("locationLabel"), value: t("locationValue") },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-cobalt/10 border border-cobalt/20 flex items-center justify-center shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-cobalt-glow" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/30 tracking-wider uppercase">
                                            {item.label}
                                        </div>
                                        <div className="text-white/70 text-sm" dir="ltr">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="glass rounded-2xl p-8 lg:p-10 space-y-6">
                            <div>
                                <label className="block text-xs text-white/40 tracking-wider uppercase mb-2">
                                    {t("formName")}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formState.name}
                                    onChange={handleChange}
                                    placeholder={t("formNamePlaceholder")}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cobalt/40 focus:ring-1 focus:ring-cobalt/20 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/40 tracking-wider uppercase mb-2">
                                    {t("formEmail")}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formState.email}
                                    onChange={handleChange}
                                    placeholder={t("formEmailPlaceholder")}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cobalt/40 focus:ring-1 focus:ring-cobalt/20 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/40 tracking-wider uppercase mb-2">
                                    {t("formMessage")}
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    value={formState.message}
                                    onChange={handleChange}
                                    placeholder={t("formMessagePlaceholder")}
                                    rows={5}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cobalt/40 focus:ring-1 focus:ring-cobalt/20 transition-all duration-300 resize-none"
                                />
                            </div>

                            {status === "success" && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-green-400 text-sm font-medium text-center"
                                >
                                    Message sent successfully!
                                </motion.p>
                            )}

                            {status === "error" && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-400 text-sm font-medium text-center"
                                >
                                    Failed to send message. Please try again.
                                </motion.p>
                            )}

                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={status === "loading" || cooldown > 0}
                                    className="liquid-btn w-full justify-center px-6 py-3.5 rounded-full border border-cobalt/30 text-sm font-medium text-cobalt-glow hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10">
                                        {status === "loading"
                                            ? "Sending..."
                                            : cooldown > 0
                                                ? `Wait (${cooldown}s)`
                                                : t("formSubmit")}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
