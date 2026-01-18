import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

const groq = process.env.GROQ_API_KEY
    ? new Groq({ apiKey: process.env.GROQ_API_KEY })
    : null;

const DEMO_RESPONSES = [
    "I can certainly help you with that! RED DOT specializes in creating custom AI solutions tailored to your business needs. Could you tell me more about your specific requirements?",
    "That's a great question. At RED DOT, we focus on delivering high-quality software and AI automation. We'd love to discuss how we can accelerate your digital transformation.",
    "Our team of experts is ready to assist you. Whether it's a chatbot, a web app, or an IoT solution, we have the skills to bring your vision to life. Shall we schedule a quick call?",
    "I understand you're looking for information. For detailed quotes and project breakdowns, it's best to speak with one of our specialized consultants. Would you like me to have someone reach out?"
];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;
        const lastUserMessage = messages[messages.length - 1];
        const userContent = lastUserMessage?.content || "";

        // 1. Store User Message
        // specific ID logic would ideally allow continuing sessions, 
        // but for this simple demo we'll just treat each request's full history as context 
        // or just log the new message. 
        // To keep it simple and stateless for the client (which sends full history), 
        // we'll just log the "conversation" as this interaction or append to a conceptual session.
        // For the purpose of "stats", let's just count *requests* or *messages* as activity 
        // or try to group by some ID if we had one. 
        // We'll treat the whole 'messages' array as the conversation state for the store for now,
        // effectively updating the "latest" view of it.
        const conversationId = "demo-session-" + Date.now(); // simplified ID

        // Store the incoming user message
        store.addMessageToConversation(conversationId, {
            role: 'user',
            content: userContent,
            timestamp: Date.now()
        });

        // 2. Check for leads
        const lowerContent = userContent.toLowerCase();
        if (lowerContent.includes("quote") ||
            lowerContent.includes("price") ||
            lowerContent.includes("cost") ||
            lowerContent.includes("help") ||
            lowerContent.includes("contact")) {
            store.addLead(userContent);
        }

        let reply = "";

        // 3. Generate Response (Groq or Demo)
        if (groq) {
            try {
                const systemMessage = {
                    role: "system",
                    content: "You are Ben, a friendly and professional customer support AI agent for RED DOT, a leading AI automation and software solutions company. Your goal is to assist visitors by answering questions about RED DOT's services (AI Agents, SaaS, App Dev, IoT, etc.), projects, and company details. Be concise, helpful, and polite. If you don't know an answer, suggest they contact the team via the contact form or email jai@reddot.co.in."
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
                // Fallback to demo if API fails
                reply = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
            }
        } else {
            // Demo Mode
            // Simulate network delay for realism
            await new Promise(resolve => setTimeout(resolve, 1000));
            reply = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
            reply += " [DEMO MODE]";
        }

        // 4. Store Assistant Response
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
