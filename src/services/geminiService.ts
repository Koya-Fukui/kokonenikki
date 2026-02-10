import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, MusicCategory } from "../types";

// Initialize Gemini Client
// Note: process.env.API_KEY is available via next.config.js
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    emotions: {
      type: Type.OBJECT,
      properties: {
        joy: { type: Type.NUMBER, description: "Value between 0.0 and 1.0" },
        sad: { type: Type.NUMBER, description: "Value between 0.0 and 1.0" },
        energy: { type: Type.NUMBER, description: "Value between 0.0 and 1.0" },
        calm: { type: Type.NUMBER, description: "Value between 0.0 and 1.0" },
        stress: { type: Type.NUMBER, description: "Value between 0.0 and 1.0" },
      },
      required: ["joy", "sad", "energy", "calm", "stress"],
    },
    colors: {
      type: Type.ARRAY,
      items: { type: Type.STRING, description: "Hex color code e.g. #FF5500" },
      description: "An array of 2-3 hex colors that represent the detected mood. Use soft, pastel, or deep colors depending on emotion.",
    },
    spotify_query: {
      type: Type.STRING,
      description: "A specific search query for Spotify. Format: 'Artist - Song Title'.",
    },
    youtube_query: {
      type: Type.STRING,
      description: "A specific search query for YouTube. Format: 'Artist - Song Title'.",
    },
    comment: {
      type: Type.STRING,
      description: "A short, empathetic, 1-sentence comment to the user based on their diary entry. In Japanese.",
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 hashtags relevant to the content and mood (without # symbol).",
    },
  },
  required: ["emotions", "colors", "spotify_query", "youtube_query", "comment", "hashtags"],
};

export const analyzeDiaryEntry = async (text: string, category: MusicCategory): Promise<AnalysisResult> => {
  try {
    const musicInstruction = category === 'J-Pop' 
      ? "Suggest Japanese artists (J-Pop/J-Rock/etc) that match the mood. The song must be by a Japanese artist."
      : "Suggest Western artists (US/UK/etc). Strictly exclude Japanese artists.";

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `
        Analyze the following diary entry. 
        Determine the emotional state. 
        Select a color palette that matches the mood.
        Suggest a song based on the user's preference: ${category}.
        ${musicInstruction}
        Provide a short empathetic comment in Japanese.
        Generate hashtags.
        
        Diary Entry:
        """
        ${text}
        """
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an empathetic emotional analysis AI. Your goal is to help the user understand their feelings through data and music.",
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from Gemini");

    const data = JSON.parse(jsonText) as AnalysisResult;
    return data;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};