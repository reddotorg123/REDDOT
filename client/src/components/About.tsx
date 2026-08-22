import { motion, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  Target,
  Users,
  Lightbulb,
  Rocket,
  Star,
  Shield,
  Globe,
  Briefcase,
  Lock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.7]);

  const timeline = [
    {
      year: "Q1 2026",
      title: "Founded",
      description:
        "REDDOT was established in India to design next-generation autonomous AI agents and custom SaaS integrations.",
      icon: Zap,
      color: "from-blue-600 to-blue-400",
    },
    {
      year: "Q3 2026",
      title: "Pilots",
      description:
        "Deployed initial cognitive agent pilots with leading Indian enterprise groups.",
      icon: Target,
      color: "from-purple-600 to-purple-400",
    },
    {
      year: "2027",
      title: "Expansion",
      description:
        "Expanding our reach to serve global companies across 12 major industrial sectors.",
      icon: Lightbulb,
      color: "from-cyan-600 to-cyan-400",
    },
    {
      year: "Future",
      title: "Vision",
      description:
        "Unlocking the full potential of human-AI collaboration via secure, zero-trust edge networks.",
      icon: Users,
      color: "from-pink-600 to-pink-400",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "Pushing boundaries with cutting-edge AI and technology solutions that redefine what is possible for modern businesses.",
      icon: Rocket,
      color: "from-blue-600 to-cyan-500",
      bg: "from-blue-50 to-cyan-50",
      border: "border-blue-200 hover:border-blue-500",
    },
    {
      title: "Excellence",
      description:
        "Delivering world-class quality in every project and interaction, backed by rigorous engineering standards.",
      icon: Star,
      color: "from-amber-500 to-orange-500",
      bg: "from-amber-50 to-orange-50",
      border: "border-amber-200 hover:border-amber-500",
    },
    {
      title: "Trust & Integrity",
      description:
        "Building long-term partnerships based on reliability, transparency, and unwavering commitment to our clients.",
      icon: Shield,
      color: "from-emerald-600 to-green-500",
      bg: "from-emerald-50 to-green-50",
      border: "border-emerald-200 hover:border-emerald-500",
    },
    {
      title: "Real Impact",
      description:
        "Creating measurable change through intelligent technology that delivers ROI and drives business transformation.",
      icon: TrendingUp,
      color: "from-purple-600 to-violet-500",
      bg: "from-purple-50 to-violet-50",
      border: "border-purple-200 hover:border-purple-500",
    },
  ];

  const stats = [
    {
      number: "Active",
      label: "Client Pilots Underway",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      number: "2026",
      label: "Founded in India",
      icon: Globe,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      number: "100%",
      label: "Zero-Trust Security",
      icon: Lock,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      number: "12+",
      label: "Industry Sectors Served",
      icon: Briefcase,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as any },
    },
  };

  return (
    <section
      id="about"
      className="py-32 bg-background relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-25"
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-25"
        />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-foreground mb-6">
            Engineering Intelligence
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              for the Future
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We are a team of innovators, engineers, and visionaries dedicated to
            building intelligent solutions that transform businesses and create
            lasting impact.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <div className="mb-32">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {timeline.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  {idx < timeline.length - 1 && (
                    <div className="hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-10" />
                  )}
                  <div className="relative p-8 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 transition-all duration-300 h-full shadow-sm hover:shadow-xl hover:shadow-blue-100">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                    />
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <p className="text-sm font-bold text-blue-600 mb-2 tracking-wide">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Core Values Section — Premium SaaS Design */}
        <div className="mb-32">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
              What Drives Us
            </p>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Core Values
            </h3>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              The principles that guide every decision, every line of code, and
              every client interaction.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  className={`group relative p-8 rounded-2xl border ${value.border} bg-white transition-all duration-300 overflow-hidden shadow-sm`}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 24px 48px rgba(37, 99, 235, 0.12)",
                  }}
                >
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`}
                  />

                  <div className="relative z-10 flex items-start gap-5">
                    {/* Icon Box */}
                    <motion.div
                      className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.12, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-2">
                        {value.title}
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats Section with Image */}
        <motion.div
          style={{ y: parallaxY, opacity }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[460px] rounded-3xl overflow-hidden shadow-2xl bg-slate-950"
          >
            <img
              src="/images/reddot_lab.png"
              alt="REDDOT Innovation Lab"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/20 to-transparent" />
            <motion.div
              className="absolute right-5 top-5 h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-2xl border border-cyan-200/30 shadow-2xl shadow-cyan-950/30"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" as any,
              }}
            >
              <img
                src="/images/ai-globe.webp"
                alt="AI neural intelligence visualization"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-cyan-500/10" />
            </motion.div>
            <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
              AI Systems Lab
            </div>
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <p className="text-white font-bold text-lg mb-1">
                  Building Tomorrow, Today
                </p>
                <p className="text-white/70 text-sm">
                  From Chennai, India — serving the world with intelligence.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle size={14} className="text-emerald-400" />
                  <span className="text-white/80 text-xs font-medium">
                    ISO-grade engineering processes
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">
                Our Growth
              </p>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                By The Numbers
              </h3>
              <p className="text-lg text-slate-600">
                Our impact and growth at a glance.
              </p>
            </div>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-sm group"
                    variants={itemVariants}
                    whileHover={{
                      x: 6,
                      boxShadow: "0 10px 25px rgba(37, 99, 235, 0.1)",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={22} className={stat.color} />
                    </div>
                    {/* Text */}
                    <div className="flex-1">
                      <p className={`text-2xl font-bold ${stat.color}`}>
                        {stat.number}
                      </p>
                      <p className="text-slate-600 text-sm">{stat.label}</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
