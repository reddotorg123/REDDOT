import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

const groq = process.env.GROQ_API_KEY
    ? new Groq({ apiKey: process.env.GROQ_API_KEY })
    : null;

const KNOWLEDGE_BASE = {
    company: {
        name: "RED DOT",
        mission: "Leading AI automation and software solutions company specializing in custom AI agents, SaaS, and cutting-edge digital transformation.",
        website: "reddot.co.in",
        contactEmail: "jai@reddot.co.in",
        location: "Chennai, India"
    },
    founders: [
        { name: "Jaikeerthi", role: "Founder & Lead Developer", expertise: "AI Agents, LLMs, Full-stack Development" },
        { name: "Jagadish", role: "Founder & Technical Lead", expertise: "IoT, Embedded Systems, Machine Learning" }
    ],
    services: [
        { title: "Generative AI", description: "Intelligent content generation for multiple formats using advanced models like GPT-4." },
        { title: "Machine Learning and Deep Learning", description: "Tailored AI solutions including computer vision, speech recognition, and object detection." },
        { title: "Data Science and Data Analytics", description: "Transforming raw data into actionable insights using predictive modeling and visualization." },
        { title: "SaaS Applications", description: "Scalable, AI-powered cloud applications built for rapid growth." },
        { title: "Websites and Mobile Applications", description: "Modern, responsive apps enhanced with AI capabilities and intuitive UI/UX." },
        { title: "Internship Program", description: "Hands-on experience with cutting-edge AI technologies and mentorship from experts." },
        { title: "AI Agents & Automations", description: "Custom AI agents that automate complex business workflows and exclude human error." },
        { title: "Embedded Systems with IoT", description: "Connecting physical devices to intelligent cloud platforms for smart automation." },
        { title: "AI Education & Mentorship", description: "Comprehensive training programs to master AI technologies from zero to hero." }
    ],
    chatbot: {
        name: "Ben",
        description: "I am Ben, the official AI Support Agent for RED DOT. I am designed to help visitors understand our services, learn about our founders, and guide them through their AI journey."
    }
};

const DEMO_RESPONSES = [
    "I can certainly help you with that! RED DOT specializes in creating custom AI solutions tailored to your business needs. Could you tell me more about your specific requirements?",
    "Our team of experts, led by our founders Jaikeerthi and Jagadish, is ready to assist you. Whether it's a chatbot, a web app, or an IoT solution, we have the skills to bring your vision to life.",
    "RED DOT offers a wide range of services including Generative AI, SaaS development, and our popular Internship Program. Which area are you most interested in?",
    "I am Ben, your AI assistant. I'm here to provide information about our company and how our AI automations can help your business grow. Would you like to schedule a consultation?"
];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;
        const lastUserMessage = messages[messages.length - 1];
        const userContent = lastUserMessage?.content || "";

        const conversationId = "demo-session-" + Date.now();

        store.addMessageToConversation(conversationId, {
            role: 'user',
            content: userContent,
            timestamp: Date.now()
        });

        const lowerContent = userContent.toLowerCase();
        if (lowerContent.includes("quote") ||
            lowerContent.includes("price") ||
            lowerContent.includes("cost") ||
            lowerContent.includes("help") ||
            lowerContent.includes("contact")) {
            store.addLead(userContent);
        }

        let reply = "";

        if (groq) {
            try {
                const knowledgeContext = `
                    Company Name: ${KNOWLEDGE_BASE.company.name}
                    Mission: ${KNOWLEDGE_BASE.company.mission}
                    Founders: ${KNOWLEDGE_BASE.founders.map(f => `${f.name} (${f.role})`).join(', ')}
                    Services Provided: ${KNOWLEDGE_BASE.services.map(s => s.title).join(', ')}
                    Full Services Details: ${JSON.stringify(KNOWLEDGE_BASE.services)}
                    Chatbot Info: ${KNOWLEDGE_BASE.chatbot.description}
                `;

                const systemMessage = {
                    role: "system",
                    content: `You are Ben, a friendly and professional customer support AI agent for RED DOT. 
                    Use the following KNOWLEDGE BASE to answer user questions accurately. 
                    If a question is outside this scope, politely suggest contacting the team.
                    
                    KNOWLEDGE BASE:
                    ${knowledgeContext}
                    
                    Respond concisely and professionally.`
                };

                const chatCompletion = await groq.chat.completions.create({
                    messages: [systemMessage, ...messages],
                    model: "llama3-8b-8192",
                    temperature: 0.7,
                    max_tokens: 1024,
                });

                reply = chatCompletion.choices[0]?.message?.content || "I apologize, but I'm unable to process your request at the moment.";
            } catch (error) {
                console.error("Groq API Error:", error);
                reply = getKeywordResponse(lowerContent);
            }
        } else {
            // Enhanced Demo Mode with Keyword Detection
            await new Promise(resolve => setTimeout(resolve, 800));
            reply = getKeywordResponse(lowerContent);
            reply += " [KNOWLEDGE-ENHANCED DEMO]";
        }

        store.addMessageToConversation(conversationId, {
            role: 'assistant',
            content: reply,
            timestamp: Date.now()
        });

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

function getKeywordResponse(input: string): string {
    if (input.includes("founder") || input.includes("who started") || input.includes("boss")) {
        return `RED DOT was founded by ${KNOWLEDGE_BASE.founders[0].name} (${KNOWLEDGE_BASE.founders[0].expertise}) and ${KNOWLEDGE_BASE.founders[1].name} (${KNOWLEDGE_BASE.founders[1].expertise}). They lead our mission to deliver world-class AI solutions.`;
    }
    if (input.includes("service") || input.includes("do you do") || input.includes("provide")) {
        return `We provide a comprehensive range of AI services, including ${KNOWLEDGE_BASE.services.slice(0, 3).map(s => s.title).join(', ')}, and many more. You can see the full list in our Services section!`;
    }
    if (input.includes("who are you") || input.includes("your name") || input.includes("what are you")) {
        return KNOWLEDGE_BASE.chatbot.description;
    }
    if (input.includes("internship")) {
        const internship = KNOWLEDGE_BASE.services.find(s => s.title === "Internship Program");
        return `Yes! We offer an ${internship?.title}. ${internship?.description} It's a great way to gain hands-on AI experience.`;
    }
    return DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
}
