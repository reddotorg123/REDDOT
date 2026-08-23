import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  Briefcase,
  Globe,
  Award,
  Heart,
} from "lucide-react";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  gradient: string;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: v => {
          setDisplayValue(Math.round(v));
        },
      });
      return controls.stop;
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);

  const stats: StatItem[] = [
    {
      icon: Users,
      value: 50,
      suffix: "+",
      label: "Clients",
      description: "Trusted by global enterprises and innovative startups",
      color: "text-blue-600",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Briefcase,
      value: 2024,
      suffix: "",
      label: "Established",
      description: "Founded in India as a pioneering AI company",
      color: "text-purple-600",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Globe,
      value: 12,
      suffix: "",
      label: "Sectors Served",
      description: "Custom setups across major industries in India",
      color: "text-cyan-600",
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Award,
      value: 20,
      suffix: "+",
      label: "Projects",
      description: "Successful AI implementations delivered worldwide",
      color: "text-amber-600",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      icon: TrendingUp,
      value: 100,
      suffix: "%",
      label: "Commitment Rate",
      description: "Ensuring zero-trust security and data privacy",
      color: "text-emerald-600",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Heart,
      value: 15,
      suffix: "+",
      label: "AI Builders",
      description: "Talented engineers and researchers based in India",
      color: "text-rose-600",
      gradient: "from-rose-500 to-rose-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-10 blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full opacity-10 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600 rounded-full opacity-5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Powering Global
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Innovation
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Numbers that reflect our commitment to delivering transformative AI
            solutions across every industry
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ willChange: "opacity" }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="group relative"
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Card */}
                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:border-white/20 transition-all duration-500">
                  {/* Glow on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Top shine */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} mb-6`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-bold text-white/90 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/50">{stat.description}</p>

                  {/* Bottom accent bar */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.gradient} rounded-b-2xl`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: idx * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-white/60 mb-6 text-lg">
            Become our next success story
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
