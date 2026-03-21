import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
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
                
                {/* --- Google Translate Setup --- */}
                <div id="google_translate_element" className="hidden"></div>
                <Script strategy="afterInteractive" id="google-translate-script">
                    {`
                        function googleTranslateElementInit() {
                            new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
                        }
                    `}
                </Script>
                <Script 
                    strategy="afterInteractive" 
                    src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                />

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
