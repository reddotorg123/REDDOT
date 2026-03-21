"use client";

import { motion } from 'framer-motion';
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
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            
            <div className="container max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase">Careers at <span className="text-[rgb(var(--primary-color))]">REDDOT</span></h2>
                    <p className="text-gray-400 max-w-5xl mx-auto text-lg md:text-xl leading-relaxed">
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
                            className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 hover:border-orange-500/50 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-2xl bg-orange-900/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-orange-500 transition-colors" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                {job.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 mt-auto">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    {job.type}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-16 text-center">
                    <p className="text-gray-500 mb-6">Don't see a role that fits? Send us your CV anyway!</p>
                    <a 
                        href="mailto:keerthijai909@gmail.com"
                        className="inline-flex items-center px-8 py-3 rounded-full border border-gray-700 text-white font-bold hover:bg-white hover:text-black transition-all"
                    >
                        General Application
                    </a>
                </div>
            </div>
        </section>
    );
}
