import { useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = memo(function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    // Reduced particle count for better CPU performance
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    // Throttled animation loop — target ~30fps to cut CPU usage
    let animationId: number;
    let lastTime = 0;
    const FPS = 30;
    const INTERVAL = 1000 / FPS;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;
      if (timestamp - lastTime < INTERVAL) return;
      lastTime = timestamp;

      // Clear canvas with slight fade
      ctx.fillStyle = "rgba(250, 251, 252, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections (only check close neighbors for performance)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 150 * 150) {
            const distance = Math.sqrt(distSq);
            const opacity = (1 - distance / 150) * 0.25;
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden pt-32 pb-20 md:pt-20 md:pb-0">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-[#070b14]"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-secondary/50" />

      {/* Content */}
      <motion.div
        className="relative z-10 container max-w-4xl mx-auto px-4 text-center mt-12 md:mt-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ willChange: "opacity" }}
      >
        {/* Main Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          variants={itemVariants as any}
          style={{ willChange: "transform, opacity" }}
        >
          Architecting <span className="text-gradient">Intelligence</span> for
          the Modern Enterprise
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl text-foreground-tertiary mb-8 leading-relaxed max-w-3xl mx-auto"
          variants={itemVariants as any}
          style={{ willChange: "transform, opacity" }}
        >
          Deploying mission-critical AI systems, intelligent automation, and
          scalable software architectures to accelerate digital transformation
          for global industry leaders.
        </motion.p>

        {/* CTA Buttons — Always Visible with High Contrast */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center relative z-20"
          variants={itemVariants as any}
        >
          <motion.div
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto px-9 py-7 text-lg bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-extrabold rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-3 border border-blue-400/40 cursor-pointer tracking-wide"
              onClick={() =>
                document
                  .getElementById("projects-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight size={22} className="relative z-10 animate-pulse" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              className="w-full sm:w-auto px-9 py-7 text-lg border-2 border-blue-600/40 text-blue-600 dark:text-cyan-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:bg-blue-50 dark:hover:bg-slate-800 font-bold rounded-xl shadow-md transition-all cursor-pointer"
              onClick={() =>
                document
                  .getElementById("services-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Services
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-foreground-quaternary rounded-full flex items-center justify-center">
            <motion.div
              className="w-1 h-2 bg-foreground-quaternary rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default Hero;
