const axios = require("axios");
require("dotenv").config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL =
  process.env.SITE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  "http://localhost:3000";
const SITE_NAME = "AI Doubt Solver";

// List of available free models
const FREE_MODELS = [
  { id: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free", name: "Nemotron 3 Reasoning" },
  { id: "poolside/laguna-xs.2:free", name: "Laguna XS.2" },
  { id: "poolside/laguna-m.1:free", name: "Laguna M.1" },
  { id: "inclusionai/ling-2.6-1t:free", name: "Ling 2.6" },
  { id: "tencent/hy3-preview:free", name: "Tencent HY3" },
  { id: "baidu/qianfan-ocr-fast:free", name: "Qianfan OCR" },
  { id: "google/gemma-4-26b-a4b-it:free", name: "Gemma 4 26B" },
  { id: "google/gemma-4-31b-it:free", name: "Gemma 4 31B" },
  { id: "nvidia/nemotron-3-super-120b-a12b:free", name: "Nemotron 3 Super" },
  { id: "minimax/minimax-m2.5:free", name: "Minimax M2.5" },
  { id: "liquid/lfm-2.5-1.2b-thinking:free", name: "LFM 2.5 Thinking" },
  { id: "liquid/lfm-2.5-1.2b-instruct:free", name: "LFM 2.5 Instruct" },
  { id: "nvidia/nemotron-3-nano-30b-a3b:free", name: "Nemotron 3 Nano" },
  { id: "nvidia/nemotron-nano-12b-v2-vl:free", name: "Nemotron Nano VL" },
  { id: "qwen/qwen3-next-80b-a3b-instruct:free", name: "Qwen 3 Next" },
  { id: "nvidia/nemotron-nano-9b-v2:free", name: "Nemotron Nano 9B" },
  { id: "openai/gpt-oss-120b:free", name: "GPT OSS 120B" },
  { id: "openai/gpt-oss-20b:free", name: "GPT OSS 20B" },
  { id: "z-ai/glm-4.5-air:free", name: "GLM 4.5 Air" },
  { id: "qwen/qwen3-coder:free", name: "Qwen 3 Coder" },
  { id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free", name: "Dolphin Mistral" },
  { id: "google/gemma-3n-e2b-it:free", name: "Gemma 3N E2B" },
  { id: "google/gemma-3n-e4b-it:free", name: "Gemma 3N E4B" },
  { id: "google/gemma-3-4b-it:free", name: "Gemma 3 4B" },
  { id: "google/gemma-3-12b-it:free", name: "Gemma 3 12B" },
  { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B" },
  { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B" },
  { id: "meta-llama/llama-3.2-3b-instruct:free", name: "Llama 3.2 3B" },
  { id: "nousresearch/hermes-3-llama-3.1-405b:free", name: "Hermes 3 405B" },
  { id: "openrouter/owl-alpha", name: "Owl Alpha" }
];

const askAI = async (question, subject = "General", preferredModelId) => {
  // Reorder models to put preferred one first
  let modelsToTry = FREE_MODELS.map((m) => m.id);
  if (preferredModelId && modelsToTry.includes(preferredModelId)) {
    modelsToTry = [
      preferredModelId,
      ...modelsToTry.filter((id) => id !== preferredModelId),
    ];
  }

  let lastError = null;

  for (const modelId of modelsToTry) {
    try {
      console.log(`Attempting AI response with model: ${modelId}`);
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: modelId,
          messages: [
            {
              role: "system",
              content: `You are an expert ${subject} teacher. Provide clear, concise, and accurate explanations for student doubts. Use markdown for formatting.`,
            },
            {
              role: "user",
              content: question,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": SITE_URL,
            "X-Title": SITE_NAME,
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 second timeout
        },
      );

      if (response.data?.choices?.[0]?.message?.content) {
        return {
          content: response.data.choices[0].message.content,
          modelUsed: modelId,
        };
      }
    } catch (error) {
      console.error(
        `Model ${modelId} failed:`,
        error.response?.data || error.message,
      );
      lastError = error;
      // Continue to next model
    }
  }

  throw new Error(
    lastError?.response?.data?.error?.message ||
      "All AI models failed to respond. Please try again later.",
  );
};

module.exports = { askAI, FREE_MODELS };
