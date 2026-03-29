import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message, service, budget, timeline } = body;

        // --- Supabase Storage ---
        const { error: dbError } = await supabase
            .from('contacts')
            .insert([{ name, email, phone, service, budget, timeline, message }]);

        if (dbError) {
            console.error('Supabase error:', dbError);
            throw new Error('Failed to save to database');
        }

        // --- 3. Email Notification ---
        // Using a basic transporter (Gmail/SMTP requires proper env vars)
        // For development, we'll try to send and log any errors
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'keerthijai909@gmail.com', // Fallback for visibility
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER || 'keerthijai909@gmail.com',
            to: ['keerthijai909@gmail.com', 'jagadish2k2006@gmail.com'].join(','),
            subject: `New Contact Form Submission: ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Service: ${service}
                Budget: ${budget}
                Timeline: ${timeline}
                Message: ${message}
            `,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Budget:</strong> ${budget}</p>
                <p><strong>Timeline:</strong> ${timeline}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        try {
            if (process.env.EMAIL_PASS) {
                // 1. Send Notification to Admin
                await transporter.sendMail(mailOptions);
                console.log('Admin notification email sent');

                // 2. Send Welcome Message to Client (The Trigger)
                const clientMailOptions = {
                    from: process.env.EMAIL_USER || 'keerthijai909@gmail.com',
                    to: email,
                    subject: 'Welcome to REDDOT - We received your message!',
                    text: `Hi ${name},\n\nThank you for reaching out to REDDOT. We've received your inquiry about ${service || 'our services'} and our team will get back to you shortly.\n\nBest regards,\nThe REDDOT Team`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #A855F7;">Welcome to REDDOT!</h2>
                            <p>Hi <strong>${name}</strong>,</p>
                            <p>Thank you for reaching out to us. We have received your inquiry regarding <strong>${service || 'our services'}</strong>.</p>
                            <p>Our team is currently reviewing your message and will get back to you within 24 hours.</p>
                            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <p style="margin: 0;"><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
                                <p style="margin: 0;"><strong>Budget:</strong> ${budget || 'Not specified'}</p>
                            </div>
                            <p>In the meantime, feel free to check out our <a href="https://reddot.co.in#projects">latest projects</a>.</p>
                            <p style="margin-top: 15px;">Prefer to chat instantly? <a href="https://wa.me/918072163133?text=Hi%20REDDOT,%20I%20just%20submitted%20an%20inquiry%20on%20your%20website." style="color: #25D366; font-weight: bold; text-decoration: none;">Click here to reach us on WhatsApp!</a></p>
                            <br>
                            <p>Best regards,<br><strong>The REDDOT Team</strong></p>
                        </div>
                    `,
                };
                await transporter.sendMail(clientMailOptions);
                console.log('Welcome email sent to client');
            } else {
                console.warn('EMAIL_PASS not configured, skipping email notifications');
            }
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Details saved and stored successfully' 
        });

    } catch (error) {
        console.error('Error in contact API:', error);
        return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
    }
}
