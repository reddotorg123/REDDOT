import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message, service, budget, timeline } = body;

        const dataDir = path.join(process.cwd(), 'data');
        const excelPath = path.join(dataDir, 'contacts.xlsx');
        const csvPath = path.join(dataDir, 'contacts.csv');

        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }

        const date = new Date().toLocaleString();
        const newRowArray = [date, name, email, phone, service, budget, timeline, message];

        // --- 1. Excel Storage ---
        let workbook;
        let worksheet;

        if (fs.existsSync(excelPath)) {
            const fileBuffer = fs.readFileSync(excelPath);
            workbook = XLSX.read(fileBuffer, { type: 'buffer' });
            worksheet = workbook.Sheets[workbook.SheetNames[0]];
        } else {
            workbook = XLSX.utils.book_new();
            worksheet = XLSX.utils.aoa_to_sheet([['Date', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Timeline', 'Message']]);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
        }

        const newRowObj = {
            Date: date,
            Name: name,
            Email: email,
            Phone: phone,
            Service: service,
            Budget: budget,
            Timeline: timeline,
            Message: message
        };

        XLSX.utils.sheet_add_json(worksheet, [newRowObj], { skipHeader: true, origin: -1 });
        const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        fs.writeFileSync(excelPath, xlsxData);

        // --- 2. CSV Storage ---
        const csvRow = newRowArray.map(field => `"${(field || '').toString().replace(/"/g, '""')}"`).join(',') + '\n';
        if (!fs.existsSync(csvPath)) {
            const header = ['Date', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Timeline', 'Message'].map(f => `"${f}"`).join(',') + '\n';
            fs.writeFileSync(csvPath, header + csvRow);
        } else {
            fs.appendFileSync(csvPath, csvRow);
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
