// src/api/deepseek.ts
import axios from "axios";

const deepseek = axios.create({
  baseURL: "https://api.deepseek.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
  },
});

export const getChatCompletion = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await deepseek.post("/chat/completions", {
      model: "deepseek-chat", // or "deepseek-coder"
      messages,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get response from DeepSeek");
  }
};
