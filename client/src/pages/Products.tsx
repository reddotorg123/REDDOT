import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Layers,
  Activity,
  Sparkles,
  Shield,
  ArrowRight,
  Database,
  Users,
  GraduationCap,
  Bot,
  Cpu,
  Workflow,
  Zap,
  Terminal,
  X,
  CheckCircle2,
  Play,
  Settings,
  BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [activeTab, setActiveTab] = useState<"happ" | "sem" | "evalora" | "avatar">("happ");
  const [isHappModalOpen, setIsHappModalOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "happ" || hash === "sem" || hash === "evalora" || hash === "avatar") {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const semFeatures = [
    {
      title: "Smart Academic Scheduler",
      description:
        "Automatically aligns student club meetings, academic calendars, guest lectures, and space allocations with zero scheduling conflicts.",
      icon: Calendar,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Dynamic Resource & Venue Booker",
      description:
        "Streamline reservations for lecture halls, laboratories, audio-visual equipment, and campus grounds with real-time availability tracking.",
      icon: Database,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      title: "Engagement & Ticketing Engine",
      description:
        "Manage RSVPs, issue digital QR-code tickets, analyze attendee feedback, and track real-time participation statistics.",
      icon: Users,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Administrative Approval Pipeline",
      description:
        "A transparent visual workflow for event proposals, budget requests, and administrative sign-offs for student organizations.",
      icon: Layers,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Campus Safety & Compliance Audit",
      description:
        "Ensure compliance with venue capacity guidelines, local safety regulations, and automated campus security notifications.",
      icon: Shield,
      gradient: "from-teal-500 to-emerald-600",
    },
    {
      title: "Club Analytics Dashboard",
      description:
        "Provide student clubs and societies with a single dashboard to track membership growth, historical attendance, and budget burn rates.",
      icon: Activity,
      gradient: "from-emerald-500 to-blue-600",
    },
  ];

  const happFeatures = [
    {
      title: "Autonomous Swarm Orchestration",
      description: "Coordinate specialist subagents (researchers, coders, auditors) to decompose and solve multi-step enterprise workflows.",
      icon: BrainCircuit,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Sandboxed Tool & API Execution",
      description: "Secure ephemeral Docker/Wasm sandboxes allowing agents to execute Python, SQL queries, and REST APIs with zero data leaks.",
      icon: Terminal,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      title: "Persistent Long-Term Memory",
      description: "Vector-indexed episodic and semantic memory keeping context across months of enterprise tasks and user interactions.",
      icon: Database,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Human-in-the-Loop Checkpoints",
      description: "Configurable approval gates for high-stakes decisions like database writes, financial transactions, or external emails.",
      icon: Shield,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Self-Reflection & Error Correction",
      description: "Autonomous test-and-repair loops where agents review compiler errors or API timeouts and self-correct their reasoning.",
      icon: Workflow,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Real-Time Telemetry & Tracing",
      description: "OpenTelemetry tracing showing exact thoughts, tool latencies, token consumption, and audit trails for compliance.",
      icon: Activity,
      gradient: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen pt-24 pb-20 overflow-hidden transition-colors duration-300">
      {/* Decorative Background Glows */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <section className="container relative z-10 pt-12 pb-8 text-center max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            REDDOT Product Suite
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Autonomous AI &
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-400">
              Enterprise Platforms
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            From autonomous cognitive swarm managers to campus orchestration suites, our platforms empower enterprises and institutions with intelligence that executes.
          </p>

          {/* Product Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/50 dark:border-slate-800 max-w-2xl mx-auto">
            {[
              { id: "happ", label: "HAPP (Agentic AI Manager)", icon: Bot },
              { id: "sem", label: "SEM (Campus Hub)", icon: GraduationCap },
              { id: "evalora", label: "Evalora (AI Evaluation)", icon: Layers },
              { id: "avatar", label: "AI Avatar & Voice", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    window.location.hash = tab.id;
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── HAPP (AGENTIC AI MANAGER) SHOWCASE ─────────────────────────── */}
      {activeTab === "happ" && (
        <motion.div
          id="happ"
          key="happ"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-7xl mx-auto px-4 py-8"
        >
          {/* HAPP Hero Banner */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 p-8 sm:p-14 shadow-2xl relative overflow-hidden mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-wider">
                  Flagship Platform
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  HAPP — Autonomous Agentic AI Manager
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  HAPP is REDDOT's enterprise orchestration framework for cognitive AI agents. It orchestrates autonomous swarms, coordinates tool invocations across databases and APIs, and executes complex multi-step enterprise workflows with human-in-the-loop checkpoints.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button
                    onClick={() => setIsHappModalOpen(true)}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-6 rounded-xl shadow-xl shadow-blue-500/20 hover:scale-105 transition-all text-base cursor-pointer"
                  >
                    Explore HAPP Platform
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
                    variant="outline"
                    size="lg"
                    className="border-slate-300 dark:border-slate-700 font-bold px-8 py-6 rounded-xl text-base cursor-pointer"
                  >
                    Request Enterprise Pilot
                  </Button>
                </div>
              </div>

              {/* HAPP Image / Swarm Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-2xl relative group bg-slate-950">
                  <img
                    src="/images/happ_agent_hero.webp"
                    alt="HAPP Agentic AI Manager"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/happ_agent_manager.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Swarm Active</span>
                    </div>
                    <p className="text-sm font-bold">12 Agents Concurrently Orchestrating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HAPP Features */}
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              HAPP Core Architecture
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Engineered for production resilience, zero-trust sandbox execution, and millisecond tool dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {happFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:border-blue-500/50 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feat.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ─── SEM PLATFORM SHOWCASE ────────────────────────────────────────── */}
      {activeTab === "sem" && (
        <motion.div
          id="sem"
          key="sem"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-7xl mx-auto px-4 py-8"
        >
          {/* SEM Hero */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 p-8 sm:p-14 shadow-2xl relative overflow-hidden mb-16">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black uppercase tracking-wider">
                Higher Education Hub
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                SEM — Student Event Management
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                The premier campus orchestration hub. SEM unifies space booking, student club coordination, digital ticketing, and administrative workflows into a single high-performance workspace.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-6 rounded-xl shadow-xl hover:scale-105 transition-all text-base cursor-pointer"
                >
                  Request Campus Demo <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Poster container */}
            <div className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl">
              <img
                src="/images/sem%20poster.webp"
                alt="SEM Poster"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/sem poster.png";
                }}
              />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {semFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:border-indigo-500/50 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feat.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ─── EVALORA PLATFORM SHOWCASE ─────────────────────────────────────── */}
      {activeTab === "evalora" && (
        <motion.div
          id="evalora"
          key="evalora"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-7xl mx-auto px-4 py-8"
        >
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-14 shadow-2xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="px-3.5 py-1.5 rounded-full bg-cyan-600 text-white text-xs font-black uppercase tracking-wider">
                  Model Verification
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  Evalora — AI Evaluation & Benchmark Suite
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Automated adversarial evaluation, hallucination detection, and domain regression testing. Ensure your custom fine-tuned LLMs and RAG pipelines satisfy 99.9% factual accuracy thresholds before pushing to production.
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-8 py-6 rounded-xl text-base cursor-pointer"
                  >
                    Request Evaluation Benchmark
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950">
                <img
                  src="/images/evalora_platform.png"
                  alt="Evalora Platform"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── AI RECEPTIONIST & AVATAR SHOWCASE ────────────────────────────── */}
      {activeTab === "avatar" && (
        <motion.div
          id="avatar"
          key="avatar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-7xl mx-auto px-4 py-8"
        >
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-14 shadow-2xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="px-3.5 py-1.5 rounded-full bg-purple-600 text-white text-xs font-black uppercase tracking-wider">
                  Real-Time Voice AI
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  AI Receptionist & 3D Interactive Avatar
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Sub-second latency conversational avatars with lip-synced audio generation, multi-lingual understanding, and live calendar integration for front-desk and customer support kiosks.
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-6 rounded-xl text-base cursor-pointer"
                  >
                    Test Voice Avatar Demo
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950">
                <img
                  src="/images/receptionist_ai_avatar.png"
                  alt="AI Receptionist Avatar"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── HAPP PLATFORM EXPLORER MODAL ─────────────────────────────────── */}
      <AnimatePresence>
        {isHappModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHappModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto z-10 p-6 sm:p-10 text-left"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Platform Deep Dive
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                    HAPP Platform Architecture & Capabilities
                  </h3>
                </div>
                <button
                  onClick={() => setIsHappModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-8 text-slate-600 dark:text-slate-300">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    1. Swarm Multi-Agent Reasoning Loop
                  </h4>
                  <p className="text-sm leading-relaxed mb-4">
                    HAPP uses an event-driven orchestrator that decomposes top-level corporate directives into a directed acyclic graph (DAG) of actionable sub-tasks. Each sub-task is handed to domain-specialized agents (e.g. SQL Query Specialist, Python Math Engine, Document Summarizer).
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
                    <code>
                      {"[User Goal] ➔ [Planner Agent] ➔ { ResearchAgent, DatabaseAgent, ComplianceAgent }\n"}
                      {"      ↳ Concurrent Sandbox Execution ➔ [Synthesizer Agent] ➔ [Verified Response]"}
                    </code>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Zero-Data Leakage Sandboxing
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Every tool call executes inside isolated micro-containers with non-root privileges and strict network egress whitelisting.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Sub-15ms Vector Lookups
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Hybrid HNSW vector indexes combined with pgvector for instant semantic recall across enterprise repositories.
                    </p>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    onClick={() => {
                      setIsHappModalOpen(false);
                      window.dispatchEvent(new CustomEvent("open-booking"));
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl cursor-pointer"
                  >
                    Schedule a HAPP Live Technical Demo
                  </Button>
                  <Button
                    onClick={() => setIsHappModalOpen(false)}
                    variant="outline"
                    className="px-6 py-3.5 rounded-xl border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    Close Preview
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
