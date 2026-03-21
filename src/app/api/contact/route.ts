import { NextResponse } from 'next/server';
import { query } from '../../../lib/mysql';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message, service, budget, timeline } = body;

        // --- MySQL Storage ---
        const insertQuery = `
          INSERT INTO contacts (name, email, phone, service, budget, timeline, message)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [name, email, phone, service, budget, timeline, message];
        await query(insertQuery, values);

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
                await transporter.sendMail(mailOptions);
                console.log('Notification email sent successfully');
            } else {
                console.warn('EMAIL_PASS not configured, skipping email notification');
            }
        } catch (emailError) {
            console.error('Error sending notification email:', emailError);
            // We don't fail the whole request if email fails, as files are saved
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
