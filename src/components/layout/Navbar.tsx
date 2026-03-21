"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { navigation, languages } from '@/data';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(languages[0]);

    useEffect(() => {
        const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
        if (match && match[1]) {
            const code = match[1].toUpperCase();
            const lang = languages.find(l => l.code === code);
            if (lang) {
                setSelectedLang(lang);
            }
        }
    }, []);

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-black/60 backdrop-blur-xl transition-all duration-300">
            <div className="max-w-[1400px] flex flex-wrap items-center justify-between mx-auto p-4 md:px-12">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="flex items-center group transition-all duration-500 hover:scale-105 h-14">
                        {/* The Stylized 'R' with theme color and glowing pulse animation */}
                        <div className="relative flex items-center justify-center">
                            <span className="text-4xl font-black tracking-tighter text-[rgb(var(--primary-color))] uppercase relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5">
                                R
                            </span>
                            <span className="absolute inset-0 bg-[rgb(var(--primary-color))] blur-lg opacity-40 animate-pulse transition-opacity duration-300 group-hover:opacity-80"></span>
                        </div>
                        {/* The 'EDDOT' text in white */}
                        <span className="text-4xl font-bold tracking-tight text-white uppercase ml-[1px] transition-transform duration-500 group-hover:translate-x-0.5">
                            EDDOT
                        </span>
                    </div>
                </Link>
                
                <div className="flex md:order-2 items-center space-x-8 rtl:space-x-reverse">
                    {/* Language Selector */}
                    <div className="hidden md:block relative group">
                        <div className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer py-2">
                            <Globe className="w-5 h-5 text-gray-500 group-hover:text-[rgb(var(--primary-color))] transition-colors" />
                            <span className="font-bold text-[14px] uppercase tracking-wider">{selectedLang.code}</span>
                            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-transform group-hover:rotate-180 duration-300" />
                        </div>
                        
                        {/* Language Dropdown */}
                        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl">
                            <ul className="py-2">
                                {languages.map((lang) => (
                                    <li key={lang.code}>
                                        <button
                                            onClick={() => {
                                                setSelectedLang(lang);
                                                const gLang = lang.code.toLowerCase();
                                                if (gLang === 'en') {
                                                    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                                                } else {
                                                    document.cookie = `googtrans=/en/${gLang}; path=/;`;
                                                }
                                                window.location.reload();
                                            }}
                                            className={cn(
                                                "w-full text-left px-5 py-3 text-sm font-medium transition-colors hover:bg-white/5",
                                                selectedLang.code === lang.code ? "text-[rgb(var(--primary-color))]" : "text-gray-300"
                                            )}
                                        >
                                            <span className="font-bold mr-2">{lang.code}</span>
                                            <span className="text-gray-500">{lang.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-white/5 focus:outline-none"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                <div className="hidden w-full md:block md:w-auto md:order-1">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-bold md:space-x-12 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent tracking-tight">
                        {navigation.map((item) => (
                            <li key={item.name} className="relative group py-2">
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1.5 text-[16px] text-gray-300 hover:text-white transition-all duration-300"
                                >
                                    {item.name}
                                    {(item as any).hasDropdown && (
                                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[rgb(var(--primary-color))] transition-transform group-hover:rotate-180 duration-300" />
                                    )}
                                </Link>
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(var(--primary-color))] group-hover:w-full transition-all duration-500 rounded-full" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden shadow-2xl"
                    >
                        <ul className="flex flex-col p-6 space-y-6">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center justify-between text-gray-200 font-bold text-xl group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                        {(item as any).hasDropdown && <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-[rgb(var(--primary-color))]" />}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-6 border-t border-white/10">
                                <span className="text-gray-400 font-bold block mb-4 px-2">Select Language</span>
                                <div className="grid grid-cols-2 gap-4">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setSelectedLang(lang);
                                                setIsOpen(false);
                                                const gLang = lang.code.toLowerCase();
                                                if (gLang === 'en') {
                                                    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                                                } else {
                                                    document.cookie = `googtrans=/en/${gLang}; path=/;`;
                                                }
                                                window.location.reload();
                                            }}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-xl border transition-all",
                                                selectedLang.code === lang.code 
                                                    ? "border-[rgb(var(--primary-color))] bg-orange-950/20 text-white" 
                                                    : "border-white/5 bg-white/5 text-gray-400"
                                            )}
                                        >
                                            <span className="font-bold">{lang.code}</span>
                                            <span className="text-[10px] uppercase opacity-50">{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
