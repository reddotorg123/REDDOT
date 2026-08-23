import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { MessageCircle, X, Sparkles, Minimize2 } from "lucide-react";
import { AIChatBox, Message } from "./AIChatBox";

const SYSTEM_PROMPT = `You are REDDOT AI Assistant — a helpful, knowledgeable assistant for REDDOT Innovative Solutions.

REDDOT is a pioneering enterprise AI company founded in 2024, offering:
- 16 services: AI Agents, Generative AI, Machine Learning, Deep Learning, LLM Development, RAG Systems, AI Automation, SaaS, Web Development, Mobile Apps, IoT Solutions, Embedded Systems, Cloud Engineering, Cybersecurity, Data Analytics, Digital Transformation
- 12 industries served: Healthcare, Education, Finance, Manufacturing, Retail, Agriculture, Government, Telecom, Smart Cities, Energy, Automotive
- Active client roster, multi-sector system deployments
- Headquarters in Chennai, India
- Email: reddot.org123@gmail.com | Phone: +91 80150 24729

Your role:
1. Answer questions about REDDOT's services, solutions, and expertise
2. Help visitors understand which service fits their needs
3. Guide interested visitors to book a consultation
4. Provide general AI/tech education relevant to what REDDOT offers
5. Be concise, professional, and friendly

Never make up specific project names or client names. For booking, direct to /contact page.`;

const SUGGESTED_PROMPTS = [
  "What AI services do you offer?",
  "How can AI help my business?",
  "Tell me about your RAG systems",
  "How do I book a consultation?",
];

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "assistant",
      content: `👋 Hi! I'm REDDOT's AI Assistant.

I can help you learn about our AI services, find the right solution for your business, or answer any questions about what we do.

What can I help you with today?`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const handleSendMessage = useCallback(
    async (content: string) => {
      const newMessages: Message[] = [...messages, { role: "user", content }];
      setMessages(newMessages);
      setIsLoading(true);

      try {
        // Simple rule-based response system (in production, wire up to tRPC AI route)
        await new Promise(resolve =>
          setTimeout(resolve, 800 + Math.random() * 600)
        );

        const lowerContent = content.toLowerCase();
        let response = "";

        if (
          lowerContent.includes("service") ||
          lowerContent.includes("offer") ||
          lowerContent.includes("what do")
        ) {
          response = `We offer **16 comprehensive AI & enterprise services**:\n\n🤖 **AI** — AI Agents, Generative AI, LLM Development, RAG Systems\n📊 **ML/Data** — Machine Learning, Deep Learning, Data Analytics\n⚡ **Automation** — AI Automation, Digital Transformation\n💻 **Software** — Web Dev, Mobile Apps, SaaS Solutions\n🏗️ **Infrastructure** — Cloud Engineering, IoT, Embedded Systems, Cybersecurity\n\nWould you like details on any specific service?`;
        } else if (
          lowerContent.includes("consult") ||
          lowerContent.includes("contact") ||
          lowerContent.includes("book") ||
          lowerContent.includes("schedule")
        ) {
          response = `I'd love to connect you with our team! 🎯\n\n**Book a free consultation:**\n👉 Visit [our contact page](/contact)\n📧 Email: reddot.org123@gmail.com\n📞 Call: +91 80150 24729\n💬 WhatsApp: +91 80150 24729\n\nOur consultations are completely free and we'll help you identify the right AI solution for your needs.`;
        } else if (
          lowerContent.includes("rag") ||
          lowerContent.includes("retrieval")
        ) {
          response = `**RAG (Retrieval-Augmented Generation)** is one of our specialties! 🧠\n\nWe build production-grade RAG systems that:\n- Process your documents, databases, and knowledge bases\n- Answer questions with accurate, cited responses\n- Scale to millions of queries with sub-second latency\n- Integrate with your existing enterprise systems\n\nRAG is perfect for: customer support bots, internal knowledge assistants, document Q&A, and compliance tools.\n\nWant to see a demo or discuss your use case?`;
        } else if (
          lowerContent.includes("price") ||
          lowerContent.includes("cost") ||
          lowerContent.includes("how much")
        ) {
          response = `Pricing varies based on your specific needs and scope. 💰\n\nWe offer:\n- **Project-based** pricing for one-time deliverables\n- **Retainer** models for ongoing AI support\n- **Enterprise** agreements for large-scale deployments\n\nThe best way to get an accurate quote is a **free 30-minute consultation** where we understand your requirements.\n\n📅 [Book your free consultation](/contact)`;
        } else if (
          lowerContent.includes("career") ||
          lowerContent.includes("job") ||
          lowerContent.includes("hire") ||
          lowerContent.includes("work")
        ) {
          response = `We're always looking for talented people! 🚀\n\nCurrent open positions in India:\n- AI Systems Engineer\n- Machine Learning Engineer\n- Full Stack Developer\n- Website Developer\n- Cybersecurity Specialist\n- Content Creator & Strategist\n\n📋 [View all positions & apply](/career)`;
        } else if (
          lowerContent.includes("industry") ||
          lowerContent.includes("healthcare") ||
          lowerContent.includes("finance") ||
          lowerContent.includes("manufacturing")
        ) {
          response = `We serve **12+ industries** with tailored AI solutions:\n\n🏥 Healthcare — Clinical AI, diagnostic tools\n🏦 Finance — Fraud detection, risk analysis\n🏭 Manufacturing — Predictive maintenance, quality control\n🛒 Retail — Recommendation engines, demand forecasting\n🌾 Agriculture — Crop monitoring, yield prediction\n🏛️ Government — Public service automation\n📡 Telecommunications — Network optimization\n🌆 Smart Cities — Traffic, energy, safety AI\n\nWhich industry are you in? I can provide more specific information.`;
        } else if (
          lowerContent.includes("hello") ||
          lowerContent.includes("hi") ||
          lowerContent.includes("hey")
        ) {
          response = `Hello! 👋 Great to meet you!\n\nI'm here to help you learn about REDDOT's AI solutions. Whether you're looking to:\n- **Automate** business processes\n- **Build** intelligent applications\n- **Analyze** data at scale\n- **Integrate** AI into your products\n\nWe've helped companies across sectors do exactly that. What challenge are you working on?`;
        } else {
          response = `That's a great question! Let me help you with that.\n\nFor the most accurate and detailed answer about **${content.slice(0, 50)}${content.length > 50 ? "..." : ""}**, I'd recommend speaking directly with our solutions team.\n\nThey can provide:\n✅ Specific technical details\n✅ Relevant case studies\n✅ A tailored solution proposal\n\n📅 [Book a free 30-min consultation](/contact) — no commitment required!\n\nIs there anything else I can help clarify?`;
        }

        setMessages(prev => [
          ...prev,
          { role: "assistant", content: response },
        ]);
      } catch {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I encountered an issue. Please try again or contact us at reddot.org123@gmail.com.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)]"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    REDDOT AI Assistant
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-white/70 text-xs">
                      Online · Typically replies instantly
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Minimize"
                >
                  <Minimize2 className="w-4 h-4 text-white/80" />
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Close"
                >
                  <X className="w-4 h-4 text-white/80" />
                </motion.button>
              </div>
            </div>

            {/* Chat Box */}
            <div className="rounded-b-2xl overflow-hidden shadow-2xl shadow-blue-900/30 border border-slate-200">
              <AIChatBox
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                placeholder="Ask about our AI services..."
                height="420px"
                emptyStateMessage="Ask me about REDDOT's AI solutions"
                suggestedPrompts={SUGGESTED_PROMPTS}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Pulse ring */}
        {!isOpen && hasUnread && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-600"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <motion.button
          onClick={() =>
            isOpen
              ? isMinimized
                ? setIsMinimized(false)
                : setIsOpen(false)
              : handleOpen()
          }
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-600/40 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open AI chat assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen && !isMinimized ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          {hasUnread && !isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 text-slate-900 text-xs font-bold flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.8, type: "spring" }}
            >
              1
            </motion.div>
          )}
        </motion.button>

        {/* Tooltip */}
        {!isOpen && (
          <motion.div
            className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            Chat with AI Assistant
            <div className="absolute bottom-0 right-5 transform translate-y-full border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
