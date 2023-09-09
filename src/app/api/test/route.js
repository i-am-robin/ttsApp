import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  //   const body = await req.json();
  //   const { text, voiceId } = await body;

  const text = "Hey how are you";
  const voiceId = "21m00Tcm4TlvDq8ikWAM";

  const apiKey = process.env.API_KEY;

  console.log(text, voiceId);

  const CHUNK_SIZE = 1024;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const headers = {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": apiKey,
  };

  const data = {
    text: text,
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.5,
    },
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return NextResponse.json({ Error: "unkinow" });
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString("base64");

  return NextResponse.json({ base64String });
}
