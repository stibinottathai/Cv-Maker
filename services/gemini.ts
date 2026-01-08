import { GoogleGenAI } from "@google/genai";

// Note: In Vite, `process.env.*` is statically replaced via `vite.config.ts`.
// Keep the fallback chain so local dev and builds behave consistently.
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

// Safely initialize the client only if the key exists to prevent immediate crashes
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateContent = async (prompt: string, context?: string): Promise<string> => {
  if (!ai) {
    throw new Error('Missing Gemini API key. Set GEMINI_API_KEY in .env.local and restart the dev server.');
  }

  try {
    // Use a broadly available model name to avoid "model not found" errors.
    const model = 'gemini-1.5-flash';
    const fullPrompt = `
      Context: ${context || 'Resume writing assistance'}.
      Task: ${prompt}
      Constraint: Keep it professional, concise, and action-oriented. Return ONLY the requested text, no explanations.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
    });

    return response.text || '';
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Gemini API Error:", error);
    throw new Error(message || 'Failed to generate content. Please try again.');
  }
};

export const improveText = async (currentText: string, type: 'summary' | 'experience' | 'skill'): Promise<string> => {
  let prompt = '';
  switch (type) {
    case 'summary':
      prompt = `Rewrite and improve this professional summary to be more impactful and engaging: "${currentText}"`;
      break;
    case 'experience':
      prompt = `Improve these job description bullet points to be more results-oriented and use strong action verbs: "${currentText}"`;
      break;
    case 'skill':
      prompt = `Suggest 5 related technical or soft skills based on this list (comma separated): "${currentText}"`;
      break;
  }
  return generateContent(prompt);
};