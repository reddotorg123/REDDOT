import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import TrustedCompanies from "@/components/TrustedCompanies";
import { motion } from "framer-motion";

// Lazy load components below the fold to improve initial load performance
const Services = lazy(() => import("@/components/Services"));
const Industries = lazy(() => import("@/components/Industries"));
const CaseStudies = lazy(() => import("@/components/CaseStudies"));

const About = lazy(() => import("@/components/About"));
const Team = lazy(() => import("@/components/Team"));
const AITimeline = lazy(() => import("@/components/AITimeline"));
const Statistics = lazy(() => import("@/components/Statistics"));
const TechStack = lazy(() => import("@/components/TechStack"));

function DeferredSection({
  children,
  minHeight = 420,
  id,
}: {
  children: React.ReactNode;
  minHeight?: number;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      id={id}
      ref={ref}
      style={{ minHeight: shouldRender ? undefined : minHeight }}
    >
      {shouldRender ? (
        <Suspense fallback={<div className="h-32" />}>{children}</Suspense>
      ) : null}
    </div>
  );
}

/**
 * Home page showcasing REDDOT's services, solutions, and innovations
 */
export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Trusted Companies */}
      <TrustedCompanies />

      <DeferredSection id="services" minHeight={760}>
        <Services />
      </DeferredSection>
      <DeferredSection id="timeline" minHeight={760}>
        <AITimeline />
      </DeferredSection>
      <DeferredSection minHeight={420}>
        <Statistics />
      </DeferredSection>
      <DeferredSection id="industries" minHeight={680}>
        <Industries />
      </DeferredSection>
      <DeferredSection id="projects" minHeight={700}>
        <CaseStudies />
      </DeferredSection>
      <DeferredSection id="about" minHeight={760}>
        <About />
      </DeferredSection>
      <DeferredSection id="team" minHeight={600}>
        <Team />
      </DeferredSection>
      <DeferredSection minHeight={640}>
        <TechStack />
      </DeferredSection>

      {/* Final CTA Section */}
      <motion.section
        className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background effects */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{ willChange: "transform" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
          style={{ willChange: "transform" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4">
              Get Started Today
            </p>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Transform
              <br />
              Your Business?
            </h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how REDDOT's AI solutions can accelerate your
              growth, reduce costs, and unlock new possibilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
                className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-xl cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Free Consultation
              </motion.button>
              <motion.a
                href="/career#open-positions"
                className="px-10 py-4 border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors inline-flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Open Positions
              </motion.a>
            </div>

            {/* Social proof */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-8 text-white/60 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                500+ enterprise clients
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                98% client retention rate
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Free initial consultation
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
