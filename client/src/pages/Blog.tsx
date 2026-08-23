import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  ChevronRight,
  Search,
  TrendingUp,
} from "lucide-react";
import { Link } from "wouter";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  coverGradient: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "future-of-enterprise-ai-agents",
    title: "The Future of Enterprise AI Agents: Autonomous Systems in 2025",
    excerpt:
      "Explore how autonomous AI agents are transforming enterprise workflows, from decision-making to complex multi-step task execution across organizations.",
    category: "AI",
    author: "Jaikeerthi",
    authorRole: "AI Specialist",
    date: "June 25, 2026",
    readTime: "8 min read",
    featured: true,
    tags: ["AI Agents", "Automation", "Enterprise"],
    coverGradient: "from-blue-600 to-purple-600",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    slug: "rag-systems-production-guide",
    title: "Building Production-Grade RAG Systems: A Complete Guide",
    excerpt:
      "Learn how to design and deploy Retrieval-Augmented Generation systems that scale to millions of queries with sub-second latency.",
    category: "ML",
    author: "Priya Patel",
    authorRole: "ML Research Lead",
    date: "June 20, 2026",
    readTime: "12 min read",
    featured: false,
    tags: ["RAG", "LLM", "Vector DB"],
    coverGradient: "from-purple-600 to-pink-600",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    slug: "llm-fine-tuning-enterprise",
    title: "Fine-tuning LLMs for Enterprise: Lessons from 50+ Deployments",
    excerpt:
      "Real-world insights from fine-tuning large language models for specific business domains, including cost optimization and safety considerations.",
    category: "Research",
    author: "Nathan Chen",
    authorRole: "Principal Engineer",
    date: "June 15, 2026",
    readTime: "10 min read",
    featured: false,
    tags: ["LLM", "Fine-tuning", "Enterprise AI"],
    coverGradient: "from-cyan-600 to-blue-600",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    slug: "iot-embedded-ai-edge",
    title: "AI at the Edge: Deploying Models on Embedded Systems",
    excerpt:
      "How to optimize and deploy machine learning models on resource-constrained IoT devices while maintaining accuracy and real-time performance.",
    category: "IoT",
    author: "Amara Osei",
    authorRole: "IoT Solutions Lead",
    date: "June 10, 2026",
    readTime: "7 min read",
    featured: false,
    tags: ["IoT", "Edge AI", "Embedded"],
    coverGradient: "from-green-600 to-teal-600",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    slug: "cybersecurity-ai-threat-detection",
    title: "AI-Powered Threat Detection: Zero-Day Attack Prevention",
    excerpt:
      "Discover how modern AI cybersecurity systems detect and neutralize threats in real-time, far outperforming traditional rule-based approaches.",
    category: "Cybersecurity",
    author: "Marcus Williams",
    authorRole: "Security Architect",
    date: "June 5, 2026",
    readTime: "9 min read",
    featured: false,
    tags: ["Cybersecurity", "Threat Detection", "AI"],
    coverGradient: "from-red-600 to-orange-600",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    slug: "automation-workflows-productivity",
    title: "Intelligent Automation: 10x Productivity Without the Headcount",
    excerpt:
      "Case studies on how enterprises use AI automation to eliminate repetitive tasks, reduce errors, and scale operations without proportional cost growth.",
    category: "Automation",
    author: "Sarah Thompson",
    authorRole: "Automation Strategist",
    date: "June 1, 2026",
    readTime: "6 min read",
    featured: false,
    tags: ["Automation", "Productivity", "RPA"],
    coverGradient: "from-amber-600 to-yellow-500",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    slug: "full-stack-ai-architecture-microservices",
    title: "Full-Stack AI Architecture: Scaling Distributed Agentic Microservices",
    excerpt:
      "A complete deep-dive into constructing resilient, sub-second microservices for autonomous agent swarms, async queue orchestration, and streaming event buses.",
    category: "Software",
    author: "Jagadish",
    authorRole: "Lead Software Architect",
    date: "May 28, 2026",
    readTime: "11 min read",
    featured: false,
    tags: ["Software", "Architecture", "Microservices", "TypeScript"],
    coverGradient: "from-indigo-600 to-cyan-600",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    slug: "realtime-websockets-multi-agent-systems",
    title: "High-Throughput WebSockets for Real-Time Multi-Agent Collaboration",
    excerpt:
      "Engineering event-driven WebSocket and RPC pipelines to coordinate concurrent swarms of specialized cognitive AI agents with zero latency.",
    category: "Software",
    author: "Jaikeerthi",
    authorRole: "AI Specialist",
    date: "May 20, 2026",
    readTime: "9 min read",
    featured: false,
    tags: ["Software", "WebSockets", "Multi-Agent", "Real-Time"],
    coverGradient: "from-blue-600 to-indigo-600",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  "All",
  "AI",
  "ML",
  "Research",
  "IoT",
  "Cybersecurity",
  "Automation",
  "Software",
];

const categoryColors: Record<string, string> = {
  AI: "bg-blue-100 text-blue-700",
  ML: "bg-purple-100 text-purple-700",
  Research: "bg-cyan-100 text-cyan-700",
  IoT: "bg-green-100 text-green-700",
  Cybersecurity: "bg-red-100 text-red-700",
  Automation: "bg-amber-100 text-amber-700",
  Software: "bg-indigo-100 text-indigo-700",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = BLOG_POSTS.find(p => p.featured);
  const isFeaturedView = activeCategory === "All" && searchQuery === "";
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const shouldHideBecauseFeatured = isFeaturedView && post.featured;
    return matchesCategory && matchesSearch && !shouldHideBecauseFeatured;
  });

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, -80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />

        <div className="container relative z-10 text-center">


          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            The REDDOT
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Intelligence Blog
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-white/60 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Deep dives into AI, machine learning, automation, and enterprise
            technology from our research team
          </motion.p>

          {/* Search bar */}
          <motion.div
            className="max-w-xl mx-auto relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container">
          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-3 mb-12 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Featured Post */}
          {featuredPost && activeCategory === "All" && searchQuery === "" && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-6 font-mono">
                Featured Article
              </p>
              <Link href={`/blog/${featuredPost.slug}`}>
                <motion.div
                  className="group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 shadow-2xl hover:border-slate-700 transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  {/* Grid Layout for Featured */}
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 items-center">
                    {/* Image display */}
                    <div className="lg:col-span-5 w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                        <span className="text-slate-400 text-sm font-medium">
                          Featured
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-400 text-base mb-8 max-w-2xl leading-relaxed">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-6 border-t border-slate-800/80 pt-6">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <User className="w-4 h-4 text-blue-400" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          {featuredPost.date}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Clock className="w-4 h-4 text-blue-400" />
                          {featuredPost.readTime}
                        </div>
                      </div>

                      <div className="mt-8">
                        <motion.div
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                          whileHover={{ x: 5 }}
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}

          {/* Articles Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory + searchQuery}
          >
            {filteredPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="flex">
                <motion.article
                  className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col w-full dark:bg-slate-900 dark:border-slate-800"
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                >
                  {/* Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-slate-800 dark:bg-slate-900 dark:text-slate-100 backdrop-blur-sm shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 relative">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-semibold rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors leading-snug flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {post.author}
                        </p>
                        <p className="text-xs text-slate-500">
                          {post.authorRole}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">{post.date}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                          {post.readTime}
                        </p>
                      </div>
                    </div>

                    {/* Read more arrow */}
                    <motion.div
                      className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No articles found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or category filter
              </p>
            </motion.div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-4">Stay Ahead of AI</h3>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for weekly insights on AI trends, case
              studies, and research breakthroughs.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
              />
              <motion.button
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold whitespace-nowrap hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
