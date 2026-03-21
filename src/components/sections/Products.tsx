"use client";

import { motion } from 'framer-motion';
import SoftwareAnimation from '@/components/ui/SoftwareAnimation';
import BlockchainLedgerAnimation from '@/components/ui/BlockchainLedgerAnimation';
import { products } from '@/data';
import Image from 'next/image';
import { ArrowUpRight, Box } from 'lucide-react';
import Link from 'next/link';

export default function Products() {
    return (
        <section id="products" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            <SoftwareAnimation />
            <BlockchainLedgerAnimation />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[rgb(var(--primary-color))]/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
            
            <div className="container max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">Our <span className="text-[rgb(var(--primary-color))]">Products</span></h2>
                    <p className="text-white opacity-90 max-w-5xl mx-auto text-lg md:text-xl leading-relaxed">
                        Discover our suite of proprietary AI applications designed to scale your performance and automate your success.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-16 md:gap-20 max-w-6xl mx-auto">
                    {products.map((product, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link 
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center group"
                            >
                                {/* App Icon */}
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[24px] md:rounded-[32px] bg-gray-900 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:border-orange-400 group-hover:shadow-[0_0_30px_-5px_rgba(255,140,0,0.5)] transition-all duration-500 overflow-hidden relative">
                                    <Box className="w-10 h-10 md:w-14 md:h-14 text-orange-500 group-hover:text-white transition-colors" />
                                    {/* <Image src={product.icon} alt={product.name} fill className="object-cover opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                                </div>

                                {/* App Name */}
                                <h3 className="text-lg md:text-xl font-bold text-white/70 group-hover:text-white transition-colors text-center uppercase tracking-widest">{product.name}</h3>
                                
                                {/* Subtle Hover Indicator */}
                                <span className="text-[10px] font-bold text-[rgb(var(--primary-color))] opacity-0 group-hover:opacity-100 transition-opacity mt-2 uppercase tracking-tighter">Launch App</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
