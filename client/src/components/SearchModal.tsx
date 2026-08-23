import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  BookOpen,
  Briefcase,
  Layers,
  Cpu,
  Shield,
  FileText,
  Home,
  Mail,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useLocation } from "wouter";

interface SearchResult {
  id: string;
  title: string;
  category: "Page" | "Product" | "Industry" | "Article" | "Career";
  description: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SEARCH_DATABASE: SearchResult[] = [
  // Pages
  {
    id: "page-home",
    title: "Home",
    category: "Page",
    description: "Welcome to REDDOT AI - Engineering Intelligence for the Future",
    url: "/",
    icon: Home,
  },
  {
    id: "page-products",
    title: "Products & Platforms",
    category: "Page",
    description: "Explore HAPP Agentic AI Manager, SEM Platform, and AI Systems",
    url: "/products",
    icon: Layers,
  },
  {
    id: "page-industries",
    title: "Industries & Solutions",
    category: "Page",
    description: "Enterprise AI solutions for Healthcare, Finance, Manufacturing & more",
    url: "/industries",
    icon: Cpu,
  },
  {
    id: "page-blog",
    title: "AI Research & Blog",
    category: "Page",
    description: "Technical articles on LLMs, RAG, fine-tuning, and software engineering",
    url: "/blog",
    icon: BookOpen,
  },
  {
    id: "page-career",
    title: "Careers & Open Positions",
    category: "Page",
    description: "Join REDDOT's engineering, research, and product teams in India",
    url: "/career",
    icon: Briefcase,
  },
  {
    id: "page-internships",
    title: "Internship Programs",
    category: "Page",
    description: "High-impact AI, ML, Data, and Full Stack development internships",
    url: "/internship",
    icon: GraduationCap,
  },
  {
    id: "page-contact",
    title: "Contact & Headquarters",
    category: "Page",
    description: "Get in touch with our team in Chennai, India or book a consultation",
    url: "/contact",
    icon: Mail,
  },
  {
    id: "page-privacy",
    title: "Privacy Policy",
    category: "Page",
    description: "Our commitment to data privacy, GDPR compliance, and zero-trust storage",
    url: "/privacy",
    icon: Shield,
  },
  {
    id: "page-terms",
    title: "Terms of Service",
    category: "Page",
    description: "Terms and conditions governing the use of REDDOT products and services",
    url: "/terms",
    icon: FileText,
  },
  {
    id: "page-cookies",
    title: "Cookie Policy",
    category: "Page",
    description: "Information regarding cookie usage, telemetry, and visitor preferences",
    url: "/cookies",
    icon: FileText,
  },
  {
    id: "page-security",
    title: "Enterprise Security & Compliance",
    category: "Page",
    description: "SOC2, ISO 27001 readiness, sandboxed execution, and data encryption",
    url: "/security",
    icon: Shield,
  },

  // Products
  {
    id: "product-happ",
    title: "HAPP — Agentic AI Manager",
    category: "Product",
    description: "Autonomous cognitive swarm orchestration, tool execution & real-time monitoring",
    url: "/products#happ",
    icon: Sparkles,
  },
  {
    id: "product-sem",
    title: "SEM — Student Event Management",
    category: "Product",
    description: "Campus orchestration hub, space reservation, and club coordination",
    url: "/products#sem",
    icon: GraduationCap,
  },
  {
    id: "product-evalora",
    title: "Evalora — AI Evaluation Platform",
    category: "Product",
    description: "Benchmark testing, hallucination detection, and prompt regression analysis",
    url: "/products#evalora",
    icon: Layers,
  },
  {
    id: "product-avatar",
    title: "AI Receptionist & Voice Avatar",
    category: "Product",
    description: "Interactive real-time 3D AI assistant with conversational intelligence",
    url: "/products#avatar",
    icon: Sparkles,
  },

  // Industries
  {
    id: "ind-healthcare",
    title: "Healthcare & Biotech AI",
    category: "Industry",
    description: "Autonomous pathology diagnostics, MRI analysis, and patient triage",
    url: "/industries#healthcare",
    icon: Cpu,
  },
  {
    id: "ind-education",
    title: "Education & EdTech AI",
    category: "Industry",
    description: "Personalized tutoring, automated grading, and intelligent curriculum paths",
    url: "/industries#education",
    icon: GraduationCap,
  },
  {
    id: "ind-finance",
    title: "Finance & Algorithmic Trading",
    category: "Industry",
    description: "Microsecond risk shields, graph fraud detection, and portfolio optimization",
    url: "/industries#finance",
    icon: Cpu,
  },
  {
    id: "ind-manufacturing",
    title: "Advanced Manufacturing",
    category: "Industry",
    description: "High-speed 120fps vision inspection and predictive wear heuristics",
    url: "/industries#manufacturing",
    icon: Cpu,
  },
  {
    id: "ind-retail",
    title: "Retail & E-Commerce AI",
    category: "Industry",
    description: "Demand forecasting, dynamic real-time pricing, and visual search",
    url: "/industries#retail",
    icon: Cpu,
  },
  {
    id: "ind-agriculture",
    title: "Precision Agriculture",
    category: "Industry",
    description: "Drone crop diagnostics, multispectral mapping, and automated watering",
    url: "/industries#agriculture",
    icon: Cpu,
  },

  // Blog Articles
  {
    id: "blog-future-agents",
    title: "The Future of Enterprise AI Agents: Autonomous Systems in 2025",
    category: "Article",
    description: "Explore how autonomous AI agents are transforming enterprise workflows",
    url: "/blog/future-of-enterprise-ai-agents",
    icon: BookOpen,
  },
  {
    id: "blog-rag-guide",
    title: "Building Production-Grade RAG Systems: A Complete Guide",
    category: "Article",
    description: "Sub-second latency RAG architectures with semantic chunking and cross-encoders",
    url: "/blog/rag-systems-production-guide",
    icon: BookOpen,
  },
  {
    id: "blog-fine-tuning",
    title: "Fine-tuning LLMs for Enterprise: Lessons from 50+ Deployments",
    category: "Article",
    description: "Real-world domain fine-tuning insights, LoRA quantization, and cost control",
    url: "/blog/llm-fine-tuning-enterprise",
    icon: BookOpen,
  },
  {
    id: "blog-edge-ai",
    title: "AI at the Edge: Deploying Models on Embedded Systems",
    category: "Article",
    description: "Optimize and deploy ML models on resource-constrained IoT devices",
    url: "/blog/iot-embedded-ai-edge",
    icon: BookOpen,
  },
  {
    id: "blog-cybersecurity",
    title: "AI-Powered Threat Detection: Zero-Day Attack Prevention",
    category: "Article",
    description: "Detect and neutralize cyber threats in real-time with neural graph analysis",
    url: "/blog/cybersecurity-ai-threat-detection",
    icon: BookOpen,
  },
  {
    id: "blog-software-architecture",
    title: "Full-Stack AI Architecture: Scaling Distributed Agentic Microservices",
    category: "Article",
    description: "Architectural blueprint for ultra-low latency streaming AI web services",
    url: "/blog/full-stack-ai-architecture-microservices",
    icon: BookOpen,
  },
  {
    id: "blog-software-websockets",
    title: "High-Throughput WebSockets for Real-Time Multi-Agent Collaboration",
    category: "Article",
    description: "Engineering event-driven pipelines for multi-agent swarm telemetry",
    url: "/blog/realtime-websockets-multi-agent-systems",
    icon: BookOpen,
  },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-search", handleOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-search", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return SEARCH_DATABASE.slice(0, 6);
    }
    const q = query.toLowerCase();
    return SEARCH_DATABASE.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery("");
    setLocation(url);
    // If there's an anchor, trigger scroll
    if (url.includes("#")) {
      const hash = url.split("#")[1];
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, products, industries, open positions..."
                className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                ESC
              </kbd>
            </div>

            {/* Results Container */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {query.trim() ? `Results (${filteredResults.length})` : "Quick Links & Suggested"}
              </div>

              {filteredResults.length === 0 ? (
                <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                  <p className="font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    No matching results found for "{query}"
                  </p>
                  <p className="text-xs">
                    Try searching for "HAPP", "Healthcare", "Agents", or "Engineering"
                  </p>
                </div>
              ) : (
                filteredResults.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.url)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/50">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-sm truncate">
                              {item.title}
                            </span>
                            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Press <strong className="text-slate-700 dark:text-slate-300">Ctrl + K</strong> anytime to search</span>
              <span>REDDOT Intelligence</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
