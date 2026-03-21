import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chat/Chatbot';
import { ChatProvider } from '@/components/chat/ChatContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'REDDOT | AI Powered Solutions',
    description: 'REDDOT - Leading provider of Autonomous Agents, Multi-Agent Systems, and Custom LLM solutions for modern business.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <ChatProvider>
                    <Navbar />
                    {children}
                    <Chatbot />
                    <Footer />
                </ChatProvider>
            </body>
        </html>
    );
}
