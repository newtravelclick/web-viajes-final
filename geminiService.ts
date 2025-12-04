import { GoogleGenAI, Type } from "@google/genai";
import { ImageSize } from "../types";

// Helper to get client instance
const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// 1. Search & Maps Grounding (Gemini 2.5 Flash)
export const askTravelAssistant = async (query: string, userLocation?: { lat: number, lng: number }) => {
  const ai = getAiClient();
  const tools: any[] = [{ googleSearch: {} }, { googleMaps: {} }];
  
  const toolConfig = userLocation ? {
    retrievalConfig: {
      latLng: {
        latitude: userLocation.lat,
        longitude: userLocation.lng
      }
    }
  } : undefined;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: tools,
        toolConfig: toolConfig,
        systemInstruction: "Eres un experto asesor de viajes de 'New Travel Click'. Tu objetivo es ayudar a los usuarios a planificar viajes, encontrar rutas y recomendaciones. Sé breve, inspirador y útil. Usa formato Markdown.",
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources: groundingChunks };
  } catch (error) {
    console.error("Travel Assistant Error:", error);
    throw error;
  }
};

// 2. Image Generation (Gemini 3 Pro Image Preview)
export const generateDreamDestination = async (prompt: string, size: ImageSize) => {
  // NOTE: For Pro Image Preview, user must select their own key in some environments, 
  // but here we use the env key as standard practice unless Veo constraints apply.
  const ai = getAiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size
        }
      },
    });

    let imageUrl = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
    
    if (!imageUrl) throw new Error("No se generó ninguna imagen.");
    return imageUrl;
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

// 3. Image Editing (Gemini 2.5 Flash Image)
export const editTravelPhoto = async (imageBase64: string, mimeType: string, prompt: string) => {
  const ai = getAiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    let imageUrl = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
    
    if (!imageUrl) throw new Error("No se pudo editar la imagen.");
    return imageUrl;
  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};

// Helper for file handling
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g. "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};