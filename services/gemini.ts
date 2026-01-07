import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize the client only if the key exists to prevent immediate crashes
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateContent = async (prompt: string, context?: string): Promise<string> => {
  if (!ai) {
    console.error("API Key not found");
    return "Error: API Key is missing. Please check your configuration.";
  }

  try {
    const model = 'gemini-3-flash-preview';
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
    console.error("Gemini API Error:", error);
    return "Failed to generate content. Please try again.";
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