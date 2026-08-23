import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, FileText, CheckCircle2, AlertCircle, Globe, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

type LegalTab = "privacy" | "terms" | "cookies" | "security";

export default function Legal() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState<LegalTab>("privacy");

  useEffect(() => {
    if (location.includes("terms")) {
      setActiveTab("terms");
    } else if (location.includes("cookies")) {
      setActiveTab("cookies");
    } else if (location.includes("security")) {
      setActiveTab("security");
    } else {
      setActiveTab("privacy");
    }
  }, [location]);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 text-slate-900 dark:text-white transition-colors">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Shield className="w-4 h-4" />
            Trust & Compliance
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
          >
            Legal & Privacy Framework
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Our governance policies, terms of service, cookie practices, and zero-trust security standards.
          </motion.p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 justify-center p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300/50 dark:border-slate-800 mb-12 max-w-2xl mx-auto">
          {[
            { id: "privacy", label: "Privacy Policy", icon: Shield },
            { id: "terms", label: "Terms of Service", icon: FileText },
            { id: "cookies", label: "Cookie Policy", icon: Globe },
            { id: "security", label: "Security & Trust", icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as LegalTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
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

        {/* Tab Content Box */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl"
        >
          {activeTab === "privacy" && (
            <div className="space-y-8 leading-relaxed text-slate-600 dark:text-slate-300">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  Privacy Policy
                </h2>
                <p className="text-xs text-slate-400 font-mono">Last Updated: June 2026</p>
              </div>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">1. Information We Collect</h3>
                <p>
                  REDDOT ("we", "us", or "our") collects information provided directly by users when you register for consultations, submit job or internship applications, subscribe to technical publications, or utilize our proprietary AI platforms (including HAPP and SEM).
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm">
                  <li><strong>Personal Identifiers:</strong> Name, work email address, telephone number, and company name.</li>
                  <li><strong>Application Materials:</strong> Resumes, portfolio links, and LinkedIn profiles for prospective team members.</li>
                  <li><strong>Telemetry & Usage Data:</strong> Technical logs, IP addresses, browser specifications, and user interaction signals.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">2. How We Use Your Data</h3>
                <p>
                  We process data strictly for providing and improving our AI systems, responding to enterprise inquiries, scheduling consultations, screening candidates, and maintaining zero-trust system integrity. We do not sell or rent personal information to third-party data brokers.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">3. Zero-Data Retention for AI Models</h3>
                <p>
                  Proprietary client telemetry and enterprise payloads processed through REDDOT AI agents and LLM inference endpoints are governed by strict confidentiality. Enterprise customer data is never used to train generalized foundation models without explicit contractual permission.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">4. Contact Our Data Protection Officer</h3>
                <p>
                  For privacy queries or deletion requests, contact us at{" "}
                  <a href="mailto:jaikeerthi156@gmail.com" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                    jaikeerthi156@gmail.com
                  </a>{" "}
                  or{" "}
                  <a href="mailto:reddot.org123@gmail.com" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                    reddot.org123@gmail.com
                  </a>.
                </p>
              </section>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-8 leading-relaxed text-slate-600 dark:text-slate-300">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  Terms of Service
                </h2>
                <p className="text-xs text-slate-400 font-mono">Last Updated: June 2026</p>
              </div>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h3>
                <p>
                  By accessing REDDOT websites, software products, AI portals, or consulting services, you agree to comply with these terms, our acceptable use guidelines, and applicable statutory regulations.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">2. Acceptable Use of AI Systems</h3>
                <p>
                  You agree not to reverse engineer, decompile, or probe vulnerabilities of the REDDOT infrastructure. Automated API consumption must adhere to provisioned rate limits and safety filters. Prohibited actions include attempting adversarial jailbreaks, deploying malicious automated swarms, or utilizing our systems for illegal activities.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">3. Intellectual Property</h3>
                <p>
                  All proprietary codebases, neural architecture designs, documentation, logos, and custom implementations developed by REDDOT remain exclusive intellectual property of REDDOT and its licensors.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">4. Limitation of Liability</h3>
                <p>
                  Services are provided on an "as is" and "as available" basis. REDDOT is not liable for indirect, incidental, or consequential damages resulting from algorithmic outputs without human-in-the-loop validation in critical workflows.
                </p>
              </section>
            </div>
          )}

          {activeTab === "cookies" && (
            <div className="space-y-8 leading-relaxed text-slate-600 dark:text-slate-300">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  Cookie Policy
                </h2>
                <p className="text-xs text-slate-400 font-mono">Last Updated: June 2026</p>
              </div>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">1. What Are Cookies?</h3>
                <p>
                  Cookies and local storage tokens are small text data elements placed on your device to maintain your user preferences (such as Light/Dark theme selection and session security).
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">2. How We Use Cookies</h3>
                <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
                  <li><strong>Essential Storage:</strong> Used to maintain authentication states, theme preferences, and security csrf tokens.</li>
                  <li><strong>Performance & Analytics:</strong> Aggregate statistics on page visits and latency metrics to optimize web delivery.</li>
                  <li><strong>Functional Elements:</strong> Remembering open filters on job boards, blog search queries, and interactive dialogs.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">3. Managing Your Preferences</h3>
                <p>
                  You can configure or clear your browser's cookie storage at any time through your browser settings. Note that disabling essential cookies may impact certain interactive capabilities of the portal.
                </p>
              </section>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-8 leading-relaxed text-slate-600 dark:text-slate-300">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  Enterprise Security & Compliance
                </h2>
                <p className="text-xs text-slate-400 font-mono">Zero-Trust Enterprise Standard</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {[
                  { title: "End-to-End Encryption", desc: "TLS 1.3 in transit and AES-256 for all stored artifacts." },
                  { title: "Sandboxed AI Runtimes", desc: "Agent tool calls execute in isolated ephemeral micro-containers." },
                  { title: "Role-Based Access Control", desc: "Granular permission scopes and audited access tokens." },
                  { title: "Continuous Vulnerability Scans", desc: "Automated penetration testing and container image scanning." },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Infrastructure & Data Sovereignty</h3>
                <p>
                  Our server topologies and AI inference nodes are hosted in top-tier tier-4 data centers with 99.9% uptime SLA, redundant power distribution, and multi-region failover.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Responsible Vulnerability Disclosure</h3>
                <p>
                  If you believe you have found a security vulnerability in REDDOT systems, please disclose it responsibly by emailing our security team at{" "}
                  <a href="mailto:jagadish2k2006@gmail.com" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                    jagadish2k2006@gmail.com
                  </a>.
                </p>
              </section>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
