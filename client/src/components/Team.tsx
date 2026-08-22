import { motion } from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  ArrowRight,
  Globe,
  Instagram,
} from "lucide-react";

export default function Team() {
  interface TeamMember {
    name: string;
    role: string;
    bio: string;
    expertise: string[];
    image: string;
    portfolio?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    mail?: string;
  }

  const team: TeamMember[] = [
    {
      name: "Jagadish",
      role: "Co-Founder & System Architect",
      bio: "Architect specialized in Web Development, Cybersecurity, Embedded Systems & IoT, and VLSI Design.",
      expertise: ["Web Dev", "Cybersecurity", "Embedded/IoT", "VLSI Design"],
      image: "/images/jagadish.jpg",
      portfolio: "https://jd-arc.vercel.app/",
      linkedin: "https://www.linkedin.com/in/jagadish-k-583996351",
    },
    {
      name: "Jaikeerthi",
      role: "Founder & AI Specialist",
      bio: "Expert in building AI/ML solutions, specialized in Generative AI, Agentic AI, and Data Science systems.",
      expertise: ["GenAI", "Agentic AI", "Data Science", "AI/ML"],
      image: "/images/jai.png",
      portfolio: "https://jai-portfolio07.vercel.app/",
      linkedin: "https://www.linkedin.com/in/jaikeerthi-r-03931b341",
      instagram: "#",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
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
    <section className="py-32 bg-background-secondary relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ willChange: "transform, opacity" }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut" as any,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ willChange: "transform, opacity" }}
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut" as any,
          }}
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
            Meet the
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Founders
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A team of visionary engineers with deep domain expertise in AI
            systems, secure infrastructure, and embedded hardware.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="group relative rounded-2xl overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -12 }}
            >
              {/* Card Container */}
              <div className="relative h-full rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl">
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden bg-[#b4b7ba] flex items-center justify-center">
                  {/* Fallback Initials/Icon in case image hasn't loaded */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400 select-none">
                    <span className="text-6xl font-extrabold tracking-widest text-slate-300">
                      {member.name.substring(0, 2).toUpperCase()}
                    </span>
                    <span className="text-xs mt-2 text-slate-400">
                      (Photo Pending)
                    </span>
                  </div>

                  <img
                    loading="lazy"
                    decoding="async"
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain relative z-10 group-hover:scale-102 transition-transform duration-300"
                    onError={e => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                  {/* Hover Social Links */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity z-30"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    {member.portfolio && (
                      <motion.a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-md"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Globe size={20} />
                      </motion.a>
                    )}
                    {member.linkedin && (
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-md"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin size={20} />
                      </motion.a>
                    )}
                    {member.instagram && (
                      <motion.a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white text-slate-600 hover:bg-pink-600 hover:text-white transition-all shadow-md"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Instagram size={20} />
                      </motion.a>
                    )}
                    {member.github && (
                      <motion.a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-md"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                    {member.mail && (
                      <motion.a
                        href={`mailto:${member.mail}`}
                        className="p-3 rounded-full bg-white text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-md"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Mail size={20} />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-base text-slate-600 mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map(skill => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-blue-100"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Arrow Indicator */}
                <motion.div
                  className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Team CTA */}
        <motion.div
          className="relative rounded-2xl overflow-hidden p-12 md:p-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear" as any,
            }}
          />

          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Growing Team
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl">
              We're always looking for talented engineers, designers, and
              innovators to join our mission of building the future of AI.
            </p>
            <motion.button
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-slate-100 font-semibold transition-all inline-flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
