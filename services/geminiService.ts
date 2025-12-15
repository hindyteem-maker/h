import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuizMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuestions = async (mode: QuizMode, count: number = 5): Promise<Question[]> => {
  const modelId = "gemini-2.5-flash"; // Using Flash for speed and efficiency for this task

  let promptTopic = "";
  if (mode === 'synonyms') {
    promptTopic = "Arabic synonyms (المرادفات)";
  } else if (mode === 'antonyms') {
    promptTopic = "Arabic antonyms (الأضداد)";
  } else {
    promptTopic = "Mixed Arabic synonyms (المرادفات) and antonyms (الأضداد)";
  }

  const prompt = `
    Generate ${count} multiple-choice questions for an Arabic language quiz focused on ${promptTopic}.
    The difficulty should be moderate to advanced (suitable for native speakers or advanced learners).
    Ensure the words are from standard Arabic (Fusha).
    
    For 'synonym' type, ask for the synonym of the word.
    For 'antonym' type, ask for the opposite of the word.
    
    Provide 4 distinct options for each question. Only one is correct.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING, description: "The main word to be tested" },
              type: { type: Type.STRING, enum: ["synonym", "antonym"], description: "Whether the user needs to find the synonym or antonym" },
              questionText: { type: Type.STRING, description: "The question in Arabic, e.g., 'ما هو مرادف كلمة...'" },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 4 possible answers in Arabic"
              },
              correctAnswer: { type: Type.STRING, description: "The correct answer from the options" },
              explanation: { type: Type.STRING, description: "A brief explanation in Arabic of why this is the correct answer" }
            },
            required: ["word", "type", "questionText", "options", "correctAnswer"],
          },
        },
      },
    });

    const data = JSON.parse(response.text || "[]");
    
    // Add unique IDs
    return data.map((q: any, index: number) => ({
      ...q,
      id: `q-${Date.now()}-${index}`,
    }));

  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("فشل في إنشاء الأسئلة. يرجى المحاولة مرة أخرى.");
  }
};