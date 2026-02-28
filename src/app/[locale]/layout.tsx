import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter, Montserrat, Vazirmatn, IBM_Plex_Sans_Arabic } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700", "800", "900"],
});

const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazirmatn",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
    subsets: ["arabic"],
    variable: "--font-ibm-plex-arabic",
    weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming locale is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    // Determine text direction
    const dir = locale === "ar" || locale === "ckb" ? "rtl" : "ltr";

    return (
        <html
            lang={locale}
            dir={dir}
            className={`${inter.variable} ${montserrat.variable} ${vazirmatn.variable} ${ibmPlexArabic.variable}`}
        >
            <body className="antialiased">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div className="grain-overlay" />
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
