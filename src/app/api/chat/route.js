import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request) {
  const { message } = await request.json();
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });
  return Response.json(response.text);
}

