import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (title: string, category: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Напиши продающее, привлекательное описание для товара на маркетплейсе.
    Товар: ${title}
    Категория: ${category}
    Особенность: Этот товар продается по долям (частичное владение). Упомяни выгоду совместной покупки или инвестиции.
    Длина: не более 3 предложений. На русском языке.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Описание недоступно.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Не удалось сгенерировать описание. Пожалуйста, попробуйте позже.";
  }
};