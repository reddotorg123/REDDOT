import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Industries() {
  const industries = [
    {
      id: "healthcare",
      name: "Healthcare",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
      description:
        "AI-driven diagnostics, predictive patient care, and streamlined hospital operations.",
    },
    {
      id: "education",
      name: "Education",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
      description:
        "Personalized learning pathways, automated grading, and intelligent tutoring systems.",
    },
    {
      id: "finance",
      name: "Finance",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
      description:
        "Algorithmic trading, fraud detection, and automated risk assessment algorithms.",
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      description:
        "Robotic automation, predictive maintenance, and intelligent supply chain routing.",
    },
    {
      id: "retail",
      name: "Retail",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      description:
        "Inventory forecasting, personalized recommendations, and dynamic pricing models.",
    },
    {
      id: "agriculture",
      name: "Agriculture",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800",
      description:
        "Drone-assisted crop monitoring, yield prediction, and automated precision farming.",
    },
    {
      id: "telecom",
      name: "Telecommunications",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
      description:
        "Network optimization, predictive fault detection, and automated customer support.",
    },
    {
      id: "smart-cities",
      name: "Smart Cities",
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800",
      description:
        "Traffic optimization, automated grid management, and public safety analytics.",
    },
    {
      id: "energy",
      name: "Energy",
      image:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
      description:
        "Smart grid load balancing, renewable energy forecasting, and infrastructure monitoring.",
    },
    {
      id: "automotive",
      name: "Automotive",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800",
      description:
        "Autonomous driving algorithms, advanced driver-assistance systems, and fleet logistics.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as any },
    },
  };

  return (
    <section
      id="industries"
      className="py-32 bg-[#050B14] relative overflow-hidden border-t border-b border-white/5"
    >
      {/* Cinematic Deep Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B14] via-[#050B14]/90 to-[#050B14]" />

        {/* Animated Glow Orbs */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen"
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Transforming{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Every Sector
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            We partner with visionary organizations across diverse industries to
            deploy mission-critical AI systems that redefine what's possible.
          </p>
        </motion.div>

        {/* Cinematic Industries Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {industries.map((industry, idx) => (
            <Link key={idx} href={`/industries#${industry.id}`} className="block">
              <motion.div
                variants={itemVariants}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[0.25,0.4,0.25,1]"
                  />
                  {/* Dual Gradient Overlay for Cinematic Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay group-hover:bg-blue-500/20 transition-colors duration-700" />
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                      {industry.name}
                    </h3>

                    <div className="overflow-hidden">
                      <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {industry.description}
                      </p>
                    </div>

                    {/* Explore Button */}
                    <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150">
                      <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                        Explore Capabilities
                      </span>
                      <ArrowRight className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-3xl transition-colors duration-500 pointer-events-none" />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { number: "500+", label: "Enterprise Deployments" },
            { number: "12+", label: "Sectors Transformed" },
            { number: "99.9%", label: "System Reliability" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="relative group text-center p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-colors duration-500" />
              <p className="relative z-10 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                {stat.number}
              </p>
              <p className="relative z-10 text-slate-400 font-medium tracking-wide uppercase text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
