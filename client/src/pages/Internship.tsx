import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  DollarSign,
  ArrowRight,
  X,
  Send,
  Loader2,
  GraduationCap,
  Code2,
  Users,
  Rocket,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Link } from "wouter";
const internshipDomains = [
  "Artificial Intelligence (AI)",
  "Machine Learning (ML)",
  "Agentic AI",
  "Generative AI",
  "Full Stack Development",
  "Backend Development",
  "Data Science",
  "Data Analytics",
  "Cyber Security",
  "Embedded Systems",
];

export default function Internship() {
  const googleFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSc1Bb_nE6khUc-KyCuXYc2m3-HXxQsw7IwxIkeZD1RmSpweAA/viewform"; // User provided link

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any },
    },
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-white to-emerald-50 opacity-80 dark:from-indigo-950/40 dark:via-slate-950 dark:to-emerald-950/20" />

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30"
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-400 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30"
          animate={{ x: [0, 40, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />

        <motion.div
          style={{ y: parallaxY }}
          className="container text-center relative z-10 px-4"
        >

          <motion.h1
            className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            REDDOT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500 dark:from-indigo-400 dark:to-emerald-400">
              Internships
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Don't just fetch coffee. Build production-grade AI systems, learn
            from top engineers, and ship real code to thousands of users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl shadow-indigo-600/20 cursor-pointer"
              onClick={() =>
                document
                  .getElementById("openings")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Openings
            </Button>
            <Link href="/career">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 bg-white dark:bg-slate-900 shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                View Full-time Roles
              </Button>
            </Link>
          </motion.div>

          {/* Animated Tech Stack Ticker */}
          <motion.div
            className="mt-20 overflow-hidden relative max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
              Master these technologies
            </p>
            <div className="flex space-x-12 animate-[scroll_20s_linear_infinite] whitespace-nowrap opacity-60">
              {[
                "PyTorch",
                "TensorFlow",
                "LangChain",
                "OpenAI",
                "React",
                "Node.js",
                "PostgreSQL",
                "AWS",
                "Docker",
                "Kubernetes",
                "PyTorch",
                "TensorFlow",
                "LangChain",
              ].map((tech, i) => (
                <span
                  key={i}
                  className="text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Intern With Us */}
      <section className="py-32 relative bg-slate-50 dark:bg-slate-950">
        <div className="container">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Why Intern at REDDOT?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We treat our interns like full-time engineers. You'll get real
              responsibilities, mentorship, and the chance to make a massive
              impact.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "High-Impact Projects",
                desc: "Write code that actually ships. You will work on the core product, not isolated sandbox projects.",
                icon: <Code2 className="w-8 h-8 text-emerald-500" />,
              },
              {
                title: "1:1 Mentorship",
                desc: "Get paired with a senior engineer who will guide you, review your code, and accelerate your growth.",
                icon: <Users className="w-8 h-8 text-indigo-500" />,
              },
              {
                title: "Competitive Stipend",
                desc: "We value your work. Our internships are highly paid and come with great hardware and perks.",
                icon: <DollarSign className="w-8 h-8 text-amber-500" />,
              },
              {
                title: "Full-time Conversion",
                desc: "Our internship program is our primary pipeline for entry-level hiring. Excel here, and get a full-time offer.",
                icon: <GraduationCap className="w-8 h-8 text-rose-500" />,
              },
            ].map((perk, idx) => (
              <motion.div
                key={idx}
                className="relative group p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  {perk.icon}
                </div>
                <h3 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {perk.title}
                </h3>
                <p className="relative z-10 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {perk.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Internship Openings */}
      <section
        id="openings"
        className="py-32 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800"
      >
        <div className="container">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Open Internship Roles
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join the next cohort of builders.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {internshipDomains.map((domain, idx) => (
              <motion.div
                key={idx}
                className="group relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-transparent transition-all duration-500 p-8 flex flex-col justify-between h-full shadow-md"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                {/* Animated Border Gradient on Hover */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {domain}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Join our elite cohort and build next-generation solutions in
                    this domain.
                  </p>
                </div>

                <div className="relative z-10 mt-auto">
                  <a
                    href={googleFormLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-slate-900 dark:bg-blue-600 text-white hover:bg-indigo-600 dark:hover:bg-blue-700 rounded-xl py-6 text-base font-semibold transition-colors cursor-pointer">
                      Apply via Google Forms
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Custom Application Modal Removed - Handled via Google Forms now */}
    </div>
  );
}
