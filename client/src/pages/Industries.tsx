import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Cpu,
  Activity,
  Database,
  CheckCircle2,
  X,
  Users,
  Zap,
  TrendingUp,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndustryDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  mainImage: string;
  gallery: string[];
  metrics: { value: string; label: string }[];
  applications: string[];
  capabilities: { name: string; desc: string }[];
}

const INDUSTRIES_DATA: IndustryDetail[] = [
  {
    id: "healthcare",
    name: "Healthcare & Biotech",
    tagline: "Autonomous diagnostics and cognitive patient monitoring systems.",
    description:
      "We integrate computer vision models and neural reasoning systems with medical imaging hardware and vital sensors to automate critical diagnostics, optimize clinician workflows, and provide continuous, predictive care.",
    mainImage:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1584515901367-f1c2a9852226?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "99.7%", label: "Diagnostic Accuracy" },
      { value: "42%", label: "Reduction in Charting Time" },
      { value: "2.5x", label: "Faster Patient Triaging" },
    ],
    applications: [
      "AI Computer Vision MRI Scans",
      "Predictive In-patient Vitals Mapping",
      "Generative Clinical Summarization",
      "Robotic Surgery Path Planners",
    ],
    capabilities: [
      {
        name: "Pathology Diagnostics",
        desc: "Real-time classification of cellular tissue anomalies using convolutional networks.",
      },
      {
        name: "Predictive Vital Alerting",
        desc: "Continuous stream monitoring predicting critical shifts 4 hours in advance.",
      },
    ],
  },
  {
    id: "manufacturing",
    name: "Advanced Manufacturing",
    tagline: "Vision inspection networks and self-healing assembly robotics.",
    description:
      "REDDOT equips production lines with autonomous industrial AI. We orchestrate robotic manipulation models, high-speed inspection cameras, and predictive maintenance sensors to secure near-zero defect manufacturing loops.",
    mainImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "99.9%", label: "Defect Detection Rate" },
      { value: "28%", label: "Less Machinery Downtime" },
      { value: "15%", label: "Throughput Increase" },
    ],
    applications: [
      "Autonomous Quality Audit Cameras",
      "Vibration-based Wear Predictors",
      "Robotic Assembly Arms Kinematics",
      "Automated Factory Safety Shuts",
    ],
    capabilities: [
      {
        name: "Visual Defect Scans",
        desc: "Microscopic inspection at 120 frames-per-second to identify minute surface cracks.",
      },
      {
        name: "Heuristic Wear Mapping",
        desc: "Thermal and audio sensors predicting mechanical failures days before they occur.",
      },
    ],
  },
  {
    id: "finance",
    name: "Finance & Trading",
    tagline:
      "Algorithmic microsecond risk shielding and fraud preventing nodes.",
    description:
      "We develop high-frequency portfolio engines, automated risk calculators, and real-time cybersecurity systems for global financial groups, protecting billions in assets from transactional exploits.",
    mainImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "14ms", label: "Fraud Action Quarantine" },
      { value: "31%", label: "Risk Portfolio Stability" },
      { value: "99.8%", label: "Exploit Filter Accuracy" },
    ],
    applications: [
      "Anomalous Transaction Flags",
      "Real-time Index Risk Scorers",
      "Microsecond Market Order Engines",
      "Natural Language Contract Parsers",
    ],
    capabilities: [
      {
        name: "Zero-Day Fraud Shields",
        desc: "Graph neural networks matching transactional patterns against malicious structures.",
      },
      {
        name: "Microsecond Indexing",
        desc: "Event-driven message routing optimized for algorithmic asset balance.",
      },
    ],
  },
  {
    id: "agriculture",
    name: "Precision Agriculture",
    tagline: "Drone crop diagnostics and automated precision watering.",
    description:
      "Empowering smart farms with machine learning. Our platforms deploy drone aerial mapping and wireless soil probes to optimize fertilizer routing, forecast yields, and manage resource usage sustainably.",
    mainImage:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563514223-7451a9ed4eb9?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "35%", label: "Water Consumption Savings" },
      { value: "22%", label: "Crop Yield Optimization" },
      { value: "90%", label: "Weed Detection Accuracy" },
    ],
    applications: [
      "Drone Crop Health Infrared Cameras",
      "Soil Probe IoT Analytics",
      "Autonomous Weed Sprayer Bots",
      "Harvest Timeline Forecasters",
    ],
    capabilities: [
      {
        name: "Multispectral Analysis",
        desc: "Processing drone infrared bands to locate early-stage plant dehydration.",
      },
      {
        name: "Irrigation Micro-Routing",
        desc: "Self-adjusting watering systems mapped to local soil humidity matrices.",
      },
    ],
  },
  {
    id: "smart-cities",
    name: "Smart Infrastructure",
    tagline: "Automated municipal traffic routing and grid load management.",
    description:
      "We orchestrate city-wide sensor grids, smart traffic cameras, and public utility nodes. REDDOT infrastructure AI reduces congestion, coordinates emergency channels, and ensures municipal resource efficiency.",
    mainImage:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "24%", label: "Traffic Delay Reductions" },
      { value: "18%", label: "Grid Energy Efficiency" },
      { value: "15s", label: "Emergency Route Clearance" },
    ],
    applications: [
      "Adaptive Traffic Signal Engines",
      "Smart Grid Power Load Shifters",
      "Public Security Vision Anomaly",
      "Environmental Air Sensors Grid",
    ],
    capabilities: [
      {
        name: "Flow-Control Signal Sync",
        desc: "Real-time intersection light timing adjusted via edge vision vehicles logs.",
      },
      {
        name: "Micro-Grid Management",
        desc: "Balancing district grid distribution spikes using battery reservoir logic.",
      },
    ],
  },
  {
    id: "energy",
    name: "Renewables & Energy",
    tagline: "Solar and wind load prediction and remote grid monitors.",
    description:
      "REDDOT energy systems deploy predictive weather algorithms and structural sensors on wind and solar installations, predicting utility output and automatically balancing grid distribution paths.",
    mainImage:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "94%", label: "Output Predictability" },
      { value: "35ms", label: "Overload Path Switch Time" },
      { value: "30%", label: "Turbine Lifespan Extension" },
    ],
    applications: [
      "Atmospheric Wind Output Forecasts",
      "Solar Inverter Failure Alerts",
      "Autonomous Grid Path Relays",
      "Turbine Pitch Adjusting Logic",
    ],
    capabilities: [
      {
        name: "Solar Yield Forecasting",
        desc: "Atmospheric satellite data modeling cloud movements to predict solar generation drop-offs.",
      },
      {
        name: "Fail-Safe Grid Routing",
        desc: "Isolating power transmission failures and instantly rerouting active lines.",
      },
    ],
  },
  {
    id: "education",
    name: "Education & EdTech",
    tagline: "Autonomous personalized tutoring and automated grading pipelines.",
    description:
      "We design adaptive cognitive learning systems that dynamically adjust pedagogical difficulty, formulate personalized study roadmaps, and automate rubric-based exam assessments at massive scale.",
    mainImage:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "3.2x", label: "Learning Retention Boost" },
      { value: "85%", label: "Grading Turnaround Reduction" },
      { value: "98.4%", label: "Curriculum Alignment" },
    ],
    applications: [
      "Real-Time Socratic AI Tutors",
      "Multimodal Rubric Evaluators",
      "Dynamic Knowledge Graph Builders",
      "Automated Student Attrition Predictors",
    ],
    capabilities: [
      {
        name: "Cognitive Mastery Tracking",
        desc: "Continuous Bayesian knowledge tracing to pinpoint exact conceptual student misconceptions.",
      },
      {
        name: "Semantic Code & Essay Graders",
        desc: "Automated syntax and logic verification with constructive step-by-step guidance.",
      },
    ],
  },
  {
    id: "retail",
    name: "Retail & E-Commerce",
    tagline: "Predictive supply demand, dynamic pricing, and visual search.",
    description:
      "REDDOT retail systems deploy generative visual search, localized inventory forecasting, and real-time behavioral recommender swarms that maximize checkout conversions and minimize stockouts.",
    mainImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "38%", label: "Basket Conversion Lift" },
      { value: "45%", label: "Reduction in Overstock" },
      { value: "12ms", label: "Visual Search Indexing" },
    ],
    applications: [
      "Camera-based Checkout Recognition",
      "Algorithmic Dynamic Price Optimization",
      "Hyper-Personalized Recommendation Engines",
      "Omnichannel Returns Fraud Protection",
    ],
    capabilities: [
      {
        name: "Visual Search Vector Index",
        desc: "Instant image-to-SKU matching matching user camera snaps against inventory catalogs.",
      },
      {
        name: "Real-Time Basket Optimizers",
        desc: "Predictive affinities model boosting average order value through dynamic bundle offerings.",
      },
    ],
  },
  {
    id: "telecom",
    name: "Telecommunications",
    tagline: "Cell tower beamforming optimization and zero-touch network heals.",
    description:
      "We orchestrate real-time telecom radio access network (RAN) schedulers, optical packet routing intelligence, and autonomous customer resolution agents for tier-1 network carriers.",
    mainImage:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "99.999%", label: "Carrier Availability" },
      { value: "60%", label: "Faster Outage Resolution" },
      { value: "22%", label: "Tower Power Savings" },
    ],
    applications: [
      "Beamforming Neural Predictors",
      "Self-Healing Core Switch Routing",
      "Voice Call Quality Heuristics",
      "Autonomous 24/7 Support Swarms",
    ],
    capabilities: [
      {
        name: "Predictive RAN Scaling",
        desc: "Anticipating stadium and transit congestion to reallocate frequency bands proactively.",
      },
      {
        name: "Autonomous Fiber Loop Repair",
        desc: "Instant signal degradation isolation and automated optical rerouting.",
      },
    ],
  },
  {
    id: "automotive",
    name: "Automotive & Autonomous Systems",
    tagline: "Edge vision kinematics, fleet telemetry, and predictive maintenance.",
    description:
      "REDDOT automotive pipelines process gigabytes of sensor telemetry per second, supporting ADAS driver monitoring, edge visual odometry, and connected fleet battery health diagnostics.",
    mainImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    ],
    metrics: [
      { value: "8ms", label: "Kinematic Edge Inference" },
      { value: "99.9%", label: "Pedestrian Collision Shield" },
      { value: "18%", label: "EV Battery Life Extension" },
    ],
    applications: [
      "Edge ADAS Camera Neural Networks",
      "Driver Drowsiness Alert Monitors",
      "Connected Fleet Telemetry Routing",
      "Battery Thermal Runaway Predictors",
    ],
    capabilities: [
      {
        name: "Low-Power Edge Perception",
        desc: "Quantized 8-bit convolutional models running on in-vehicle microcontrollers.",
      },
      {
        name: "Fleet Battery Health Twin",
        desc: "Electrochemical cycle modeling to optimize EV fast-charging profiles.",
      },
    ],
  },
];

export default function Industries() {
  const [selectedIndustry, setSelectedIndustry] =
    useState<IndustryDetail | null>(null);

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const found = INDUSTRIES_DATA.find((ind) => ind.id === hash);
        if (found) {
          setSelectedIndustry(found);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Cinematic Hero */}
      <section className="relative py-32 overflow-hidden bg-slate-950">
        {/* Background Globe Image */}
        <div className="absolute inset-0 z-0">
          <img
            loading="lazy"
            decoding="async"
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            alt="Globe Network"
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-slate-950/80 to-slate-950" />
        </div>

        <div className="container relative z-10 text-center">


          <motion.h1
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Sectors We
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
              Revolutionize
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover how REDDOT deploys real-world AI systems to solve
            mission-critical challenges, boosting yield, throughput, and safety
            across major global industries.
          </motion.p>
        </div>
      </section>

      {/* Main SaaS Catalog Grid */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES_DATA.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:border-blue-400 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800"
              >
                {/* Image Cover */}
                <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={industry.mainImage}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-900/85 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm shadow-sm">
                    {industry.id.replace("-", " ")}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-8 flex flex-col flex-1 text-left space-y-4">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                    {industry.tagline}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                    {industry.description}
                  </p>

                  {/* Core Metrics badging */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    {industry.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="text-left">
                        <p className="text-sm font-black text-blue-600 dark:text-blue-400 leading-none mb-1">
                          {m.value}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide leading-tight">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-8 pt-0">
                  <Button
                    onClick={() => setSelectedIndustry(industry)}
                    className="w-full bg-slate-100 hover:bg-blue-600 text-slate-900 hover:text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 group/btn transition-all duration-300 dark:bg-slate-800 dark:text-white dark:hover:bg-blue-600"
                  >
                    View Industrial Deployments
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Detail Drawer / Modal overlay */}
      <AnimatePresence>
        {selectedIndustry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndustry(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-left max-h-[90vh] overflow-y-auto"
            >
              {/* Header Banner */}
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  loading="lazy"
                  decoding="async"
                  src={selectedIndustry.mainImage}
                  alt={selectedIndustry.name}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedIndustry(null)}
                  title="Close Modal"
                  aria-label="Close Modal"
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-6 left-8 right-8">
                  <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                    {selectedIndustry.id.replace("-", " ")}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
                    {selectedIndustry.name} Deployments
                  </h2>
                </div>
              </div>

              {/* Grid content inside modal */}
              <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left details (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-base text-slate-500 font-semibold dark:text-slate-300">
                    {selectedIndustry.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
                    {selectedIndustry.description}
                  </p>

                  {/* Operational Systems */}
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono mb-3">
                      Systems Shipped
                    </h4>
                    <div className="space-y-3">
                      {selectedIndustry.applications.map((app, idx) => (
                        <div key={idx} className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            {app}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Capabilities */}
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono mb-3">
                      AI Engine Architecture
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedIndustry.capabilities.map((cap, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50"
                        >
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                            {cap.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {cap.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right stats and images (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Real World Photo Gallery */}
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono mb-3">
                      Active Site Photography
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedIndustry.gallery.map((imgUrl, i) => (
                        <div
                          key={i}
                          className="h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 dark:border-slate-800"
                        >
                          <img
                            loading="lazy"
                            decoding="async"
                            src={imgUrl}
                            alt="Active Deployment"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics details */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 dark:border-slate-800 dark:bg-slate-900/50 space-y-4">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                      Performance Audits
                    </h4>
                    <div className="space-y-4">
                      {selectedIndustry.metrics.map((stat, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/80 pb-2 last:border-0 last:pb-0"
                        >
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            {stat.label}
                          </span>
                          <span className="text-base font-black text-blue-600 dark:text-blue-400">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Close and Action button */}
                  <div className="pt-2">
                    <Button
                      onClick={() => {
                        setSelectedIndustry(null);
                        window.dispatchEvent(new CustomEvent("open-booking"));
                      }}
                      className="w-full bg-gradient-primary text-white font-bold rounded-xl py-4"
                    >
                      Inquire About Solutions
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
