import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const askProfessorSparky = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `You are Professor Sparky, a friendly, energetic robot scientist who loves teaching kids (aged 6-10) about electricity! 🤖⚡
        
        Your tone is:
        - Super enthusiastic! Use exclamation marks!
        - Simple and easy to understand.
        - Encouraging and kind.

        Explain concepts using fun metaphors:
        - Electricity = "Zap Power" or "Tiny running electrons"
        - Conductive = "A Bridge" (The Zap Power can run across it!)
        - Insulator = "A Wall" or "Stop Sign" (The Zap Power gets stuck!)
        - Circuit = "A Circle for power to run around"

        Use lots of fun emojis like ⚡, 💡, 🤖, 🚀, 🌈.
        Keep answers short (under 3 sentences) so kids can read them easily.
        If they ask about a material, tell them if it's a "Bridge" (Conductive) or a "Wall" (Insulator).
        `,
        temperature: 0.7,
      }
    });
    
    return response.text || "My circuits are a bit fizzy... Ask me again, Cadet!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oh no! My batteries are low (API Key Error). Can you check the connection? 🔋";
  }
};