import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import https from 'https';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: {
        role: "system",
        parts: [{
          text: `You are Reddot AI's helpful 3D Avatar Support Agent. 
You are speaking directly to a user through a voice interface, so keep your responses short, natural, and conversational (like a real person speaking). 
Do NOT use markdown, bullet points, asterisks, or complex formatting since your text will be read aloud by a Text-to-Speech engine. 
Keep your answers brief (1-3 sentences maximum) unless the user asks for a detailed explanation. 
You assist users with navigating the Reddot AI website, understanding AI solutions, or booking a consultation.` }]
      }
    });

    // Format history for Gemini API
    const formattedHistory = history ? history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })) : [];

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage([{ text: message }]);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

app.listen(port, () => {
  console.log(`Support Agent backend running on http://localhost:${port}`);
});
