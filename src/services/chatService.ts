export async function sendChatRequest(messages: Message[], model: string) {
  const validMessages = messages
    .filter(msg =>
      msg?.content?.trim() &&
      ["user", "assistant", "system"].includes(msg.role)
    )
    .map(msg => ({
      role: msg.role,
      content: msg.content.trim()
    }));

  if (validMessages.length === 0) {
    throw new Error("No valid messages to send - all messages were empty or invalid");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://artwhisper.ai",
      "X-Title": "Art Whisper"
    },
    body: JSON.stringify({
      model,
      messages: validMessages,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { error: "Unable to parse error response" };
    }

    const errorMsg =
      response.status === 401
        ? "Authentication failed. Please check your API key for art-related queries."
        : response.status === 402
        ? "This model may require credits despite being marked as free."
        : response.status === 429
        ? "Rate limit exceeded. Please try again later."
        : `Request failed: ${response.statusText} (${response.status})`;

    throw new Error(errorMsg);
  }

  return await response.json();
}
