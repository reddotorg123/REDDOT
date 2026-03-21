"use client";

import { motion } from 'framer-motion';
import DevOpsAnimation from '@/components/ui/DevOpsAnimation';
import { Briefcase, MapPin, Clock, ArrowUpRight } from 'lucide-react';

const jobs = [
    {
        title: 'AI Engineer',
        location: 'Chennai / Remote',
        type: 'Full-time',
        description: 'Lead the development of autonomous agent systems and custom LLM implementations.'
    },
    {
        title: 'Full Stack Developer',
        location: 'Chennai / Remote',
        type: 'Full-time',
        description: 'Build robust SaaS platforms and internal tools powered by AI backends.'
    },
    {
        title: 'AI Research Intern',
        location: 'Remote',
        type: 'Internship',
        description: 'Explore the latest in multimodal AI and advanced prompt engineering.'
    }
];

export default function Careers() {
    return (
        <section id="careers" className="py-24 bg-black relative overflow-hidden">
            <DevOpsAnimation />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[rgb(var(--primary-color))]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            
            <div className="container max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase">Careers at <span className="text-[rgb(var(--primary-color))]">REDDOT</span></h2>
                    <p className="text-white opacity-95 max-w-5xl mx-auto text-lg md:text-xl leading-relaxed">
                        We are always looking for passionate individuals who want to build the future of AI. Join our mission to automate the world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-3xl bg-gray-900/95 border border-white/10 hover:border-[rgb(var(--primary-color))]/50 transition-all group shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-2xl bg-[rgb(var(--primary-color))]/20 text-[rgb(var(--primary-color))] group-hover:bg-[rgb(var(--primary-color))] group-hover:text-white transition-colors duration-300">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <ArrowUpRight className="w-6 h-6 text-white opacity-40 group-hover:text-[rgb(var(--primary-color))] transition-colors" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                            <p className="text-white opacity-80 text-sm mb-6 leading-relaxed">
                                {job.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 mt-auto">
                                <div className="flex items-center gap-2 text-xs text-white opacity-60">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white opacity-60">
                                    <Clock className="w-3.5 h-3.5" />
                                    {job.type}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-16 text-center">
                    <p className="text-white opacity-60 mb-6">Don't see a role that fits? Send us your CV anyway!</p>
                    <a 
                        href="mailto:keerthijai909@gmail.com"
                        className="inline-flex items-center px-8 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all"
                    >
                        General Application
                    </a>
                </div>
            </div>
        </section>
    );
}
