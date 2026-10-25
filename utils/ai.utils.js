import axios from "axios";

const OPENROUTER_API_URL =
    "https://openrouter.ai/api/v1/chat/completions";

export const extractWithNvidia = async (prompt, imageData = null) => {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();

    if (!apiKey) {
        throw new Error(
            "OPENROUTER_API_KEY is missing. Check your .env file."
        );
    }

    const content = [{ type: "text", text: prompt }];

    if (imageData) {
        content.push({
            type: "image_url",
            image_url: { url: imageData }
        });
    }

    try {
        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
                messages: [{ role: "user", content }],
                temperature: 0.2,
                max_tokens: 2000,
                stream: false
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                timeout: 120000
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("OpenRouter status:", error.response?.status);
        console.error(
            "OpenRouter response:",
            error.response?.data || error.message
        );
        throw error;
    }
};