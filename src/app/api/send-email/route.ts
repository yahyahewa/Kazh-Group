import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Simple in-memory rate limiter
const cooldowns = new Map<string, number>();
const COOLDOWN_DURATION = 60 * 1000; // 60 seconds

export async function POST(req: Request) {
    try {
        const { name, email, middle_name, message, locale = 'en' } = await req.json();

        // Honeypot check
        if (middle_name) {
            console.log('Bot submission detected via honeypot');
            return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
        }

        // Rate limiting logic
        const ip = req.headers.get('x-forwarded-for') || 'anonymous';
        const now = Date.now();
        const lastSubmission = cooldowns.get(ip);

        if (lastSubmission && (now - lastSubmission < COOLDOWN_DURATION)) {
            const remaining = Math.ceil((COOLDOWN_DURATION - (now - lastSubmission)) / 1000);
            return NextResponse.json(
                { message: `Please wait ${remaining} seconds before sending another message.` },
                { status: 429 }
            );
        }

        // Update last submission time
        cooldowns.set(ip, now);

        // Load translations
        const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
        const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
        const t = messages.Emails;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const isRtl = locale === 'ar' || locale === 'ckb';
        const textAlign = isRtl ? 'right' : 'left';
        const dir = isRtl ? 'rtl' : 'ltr';

        const commonStyles = `
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #E0E0E8;
            background-color: #0A0A0F;
            padding: 40px;
            border-radius: 20px;
            direction: ${dir};
            text-align: ${textAlign};
        `;

        const brandHeader = `
            <div style="margin-bottom: 30px; text-align: center;">
                <h1 style="color: #3399FF; margin: 0; font-size: 28px; letter-spacing: 2px;">KAZH GROUP</h1>
                <div style="height: 2px; background: linear-gradient(to right, transparent, #3399FF, transparent); margin-top: 5px;"></div>
            </div>
        `;

        // 1. Admin Notification Email
        const adminMailOptions = {
            from: `"Kazh Group Web" <${process.env.EMAIL_USER}>`,
            to: 'kazhgr@gmail.com',
            subject: t.adminSubject.replace('{name}', name),
            html: `
                <div style="${commonStyles}">
                    ${brandHeader}
                    <h2 style="color: #FFFFFF; border-bottom: 1px solid #1E1E2E; padding-bottom: 10px;">${t.adminTitle}</h2>
                    <p style="margin-top: 20px;"><strong>Client Name:</strong> ${name}</p>
                    <p><strong>Client Email:</strong> <a href="mailto:${email}" style="color: #3399FF; text-decoration: none;">${email}</a></p>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; border: 1px solid #1E1E2E; margin-top: 20px;">
                        <p style="margin: 0; color: #FFFFFF;"><strong>Message:</strong></p>
                        <p style="margin: 10px 0 0 0; color: rgba(224, 224, 232, 0.8);">${message}</p>
                    </div>
                    <p style="margin-top: 30px; font-size: 11px; color: rgba(255, 255, 255, 0.3); text-align: center;">
                        © ${new Date().getFullYear()} KAZH GROUP. All rights reserved.<br>
                        This message was sent from the contact form on kazhgroup.com (${locale})
                    </p>
                </div>
            `,
        };

        // 2. Client Confirmation Email
        const clientMailOptions = {
            from: `"Kazh Group" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: t.clientSubject.replace('{name}', name),
            html: `
                <div style="${commonStyles}">
                    ${brandHeader}
                    <h2 style="color: #FFFFFF; text-align: center;">${t.clientTitle}</h2>
                    <p style="text-align: center; font-size: 18px; color: rgba(224, 224, 232, 0.9);">
                        ${t.clientGreeting.replace('{name}', name)}
                    </p>
                    <p style="margin-top: 20px;">
                        ${t.clientBody}
                    </p>
                    <div style="background: rgba(51, 153, 255, 0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(51, 153, 255, 0.2); margin-top: 25px;">
                        <p style="margin: 0; text-align: center;">${t.clientFooter}</p>
                    </div>
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1E1E2E; text-align: center;">
                        <p style="margin: 0; font-weight: bold; color: #FFFFFF;">${t.team}</p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; color: #3399FF;">${t.slogan}</p>
                        <p style="margin: 20px 0 0 0; font-size: 11px; color: rgba(255, 255, 255, 0.3);">
                            © ${new Date().getFullYear()} KAZH GROUP. All rights reserved.
                        </p>
                    </div>
                </div>
            `,
        };

        // Send both
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(clientMailOptions)
        ]);

        return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}


