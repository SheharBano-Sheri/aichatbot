import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request) {
  const { message, messages = [] } = await request.json();
  
  const history = messages.map(msg => ({
    role: msg.isUser ? "user" : "model",
    parts: [{ text: msg.content }]
  }));
  
  history.push({ role: "user", parts: [{ text: message }] });
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
  });
  
  const aiResponse = response.text;
  
  return Response.json(aiResponse);
}