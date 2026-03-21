"use client";

/**
 * ============================================================================
 * @module AboutSection
 * @description The About section of the REDDOT website. Displays founder 
 *              information, mission/vision statements, team details, and 
 *              key achievements.
 * 
 * @structure
 * 1. Constants (Founders, Achievements, Stats)
 * 2. Main Component Wrapper
 *    ├── Background Elements
 *    ├── Header (Title & Subtitle)
 *    ├── Grid 1: Founders List & Mission/Vision Cards
 *    └── Grid 2: Team Description, Contact Info & Stats/Achievements
 * ============================================================================
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Eye, Mail, Phone, MapPin, Linkedin, Award, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// ============================================================================
// DATA CONFIGURATION
// ============================================================================

/** 
 * Founder profiles displayed in the first grid block
 * Edit these attributes to update the founder cards throughout the UI.
 */
const founders = [
    {
        name: 'Jai Keerthi',
        role: 'Founder & AI Engineer',
        description: 'Specialized in Agentic AI, Generative AI, and intelligent automation.',
        image: '/images/founder/jai_latest_v4.png',
        portfolio: 'https://ether-dream-recreate.vercel.app/'
    },
    {
        name: 'Jagadish K',
        role: 'Founder & Embedded Systems Engineer',
        description: 'Expert in VLSI Design and hardware-software integration.',
        image: '/images/founder/jagadish_new_v2.jpg',
        portfolio: 'https://golden-canvas-remix.vercel.app/'
    }
];

/** List of key milestones and successes shown in the stats panel */
const achievements = [
    "Built and deployed 15 AI-powered applications",
    "Helped startups achieve 300% ROI through AI automation",
    "Specialized in LLM API for lightning-fast AI responses",
    "Expert in multi-agent systems and intelligent automation",
    "Featured speaker at AI conferences and tech meetups"
];

/** Numerical statistics shown below the contact section */
const stats = [
    { label: "AI Projects Delivered", value: "15", icon: Award },
    { label: "Average ROI Increase", value: "300%", icon: TrendingUp },
    { label: "Years of Experience", value: "1", icon: Target },
];

// ============================================================================
// MAIN COMPONENT EXPORT
// ============================================================================

export default function About() {
    return (
        <section id="about" className="py-24 bg-black relative overflow-hidden">
            
            {/* --- VISUAL EFFECTS --- */}
            {/* Ambient background glows for the premium aesthetic feeling */}
            <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[128px] -z-10 pointer-events-none" />
            <div className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[128px] -z-10 pointer-events-none" />

            {/* --- MAIN CONTAINER --- */}
            <div className="container max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
                
                {/* 
                 * ==========================================
                 * SECTION HEADER
                 * ==========================================
                 */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">
                        About <span className="text-[rgb(var(--primary-color))]">REDDOT</span>
                    </h2>
                    <p className="text-gray-400 max-w-5xl mx-auto text-lg md:text-xl leading-relaxed mb-6">
                        AI Engineers, Entrepreneurs, and Mentors passionate about transforming
                        businesses through intelligent automation and cutting-edge AI solutions.
                    </p>
                    <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gray-900/50 border border-gray-800/50 text-left">
                        <h3 className="text-2xl font-bold text-white mb-4 text-center">About Our Team</h3>
                        <p className="text-gray-400 leading-relaxed mb-4 text-center">
                            We are a team of passionate professionals with expertise in <span className="text-[rgb(var(--primary-color))] font-bold">AI, Automation, Multimodal Engineering, Generative AI, and Technology Innovation</span>. We specialize in building intelligent systems and leveraging cutting-edge tools to solve real-world business challenges.
                        </p>
                        <p className="text-gray-400 leading-relaxed text-center">
                            With a strong foundation in <span className="text-[rgb(var(--primary-color))] font-bold">prompt engineering, machine learning, agentic AI, multimodal systems, and AI automation</span>, our mission is to deliver impactful solutions that drive efficiency, scalability, and innovation for businesses and individuals.
                        </p>
                    </div>
                </div>

                {/* 
                 * ==========================================
                 * BLOCK 1: FOUNDERS & MISSION/VISION
                 * ==========================================
                 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    
                    {/* --- LEFT COL: FOUNDERS (Span 7) --- */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {founders.map((founder, idx) => (
                            <motion.div
                                key={founder.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                {/* Founder Card Image */}
                                <Link
                                    href={founder.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-lg border border-gray-800 group cursor-pointer block"
                                >
                                    <Image
                                        src={founder.image}
                                        alt={founder.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Hover Gradients & Tooltip Indicator */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <span className="inline-flex items-center gap-2 text-white font-medium bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-[rgb(var(--primary-color))]/30">
                                            View Portfolio <ArrowRight className="w-4 h-4 text-[rgb(var(--primary-color))]" />
                                        </span>
                                    </div>
                                </Link>

                                {/* Founder Card Details */}
                                <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                                <p className="text-[rgb(var(--primary-color))] font-bold text-sm mb-2">{founder.role}</p>
                                <p className="text-gray-400 text-sm xl:text-base text-center max-w-[320px]">{founder.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* --- RIGHT COL: MISSION / VISION (Span 5) --- */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-[rgb(var(--primary-color))]/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-full bg-[rgb(var(--primary-color))]/20 text-[rgb(var(--primary-color))]">
                                    <Target className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Mission</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                To democratize AI technology by creating intelligent, accessible, and
                                transformative solutions that empower businesses to achieve
                                unprecedented growth and efficiency.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-[rgb(var(--primary-color))]/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-full bg-gray-800 text-gray-300">
                                    <Eye className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Vision</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                To be the leading force in AI innovation, creating a future where intelligent
                                automation enhances human potential and drives positive global impact.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* 
                 * ==========================================
                 * BLOCK 2: TEAM EXP & ACHIEVEMENTS
                 * ==========================================
                 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT COL: CONTACT (Span 6) --- */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                        {/* Contact Form Links Panel */}
                        <div className="p-8 rounded-3xl border border-[rgb(var(--primary-color))]/30 bg-[rgb(var(--primary-color))]/10 shadow-sm">
                            <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                    <Mail className="w-5 h-5 text-[rgb(var(--primary-color))] group-hover:scale-110 transition-transform" />
                                    <a href="mailto:keerthijai909@gmail.com" className="font-medium">keerthijai909@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                    <Phone className="w-5 h-5 text-[rgb(var(--primary-color))] group-hover:scale-110 transition-transform" />
                                    <a href="tel:+918072163133" className="font-medium">+91 8072163133</a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <MapPin className="w-5 h-5 text-[rgb(var(--primary-color))]" />
                                    <span className="font-medium">Chennai, India</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                    <Linkedin className="w-5 h-5 text-[rgb(var(--primary-color))] group-hover:scale-110 transition-transform" />
                                    <a href="https://linkedin.com/in/jai-keerthi-03931b341" target="_blank" rel="noopener noreferrer" className="font-medium">
                                        linkedin.com/in/jai-keerthi-03931b341
                                    </a>
                                </div>
                            </div>
                            <Link
                                href="#contact"
                                className="block w-full py-4 text-center bg-[rgb(var(--primary-color))] text-white font-bold rounded-xl hover:opacity-80 transition-opacity shadow-lg"
                            >
                                Let's Discuss Your Project
                            </Link>
                        </div>
                    </div>

                    {/* --- RIGHT COL: STATS & ACHIEVEMENTS (Span 6) --- */}
                    <div className="lg:col-span-6 space-y-8">
                        {/* Dynamic Mini Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className={`p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-sm flex flex-col items-center text-center ${i === 2 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}>
                                    <stat.icon className="w-8 h-8 text-[rgb(var(--primary-color))] mb-3" />
                                    <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Achievements Summary List */}
                        <div className="p-8 rounded-3xl border border-gray-800 bg-gray-900 shadow-sm h-full relative overflow-hidden">
                            <h3 className="text-xl font-bold text-white mb-6 relative z-10">Key Achievements</h3>
                            <ul className="space-y-4 relative z-10">
                                {achievements.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-[rgb(var(--primary-color))] shadow-sm" />
                                        <span className="text-gray-300 text-sm leading-relaxed font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
