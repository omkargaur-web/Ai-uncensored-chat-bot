import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "nousresearch/hermes-3-llama-3.1-405b", // Aap yaha model change kar sakte hain
        "messages": messages,
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch AI" }, { status: 500 });
  }
}
