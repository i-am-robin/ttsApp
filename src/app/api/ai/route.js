import { NextResponse } from "next/server";
const fs = require("fs");

export async function POST(req) {
  const body = await req.json();
  const prompt = await body.promt;
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const resultArrayBuffer = await response.arrayBuffer(); // Use response.arrayBuffer() to get an ArrayBuffer

    return Buffer.from(resultArrayBuffer); // Convert ArrayBuffer to Node.js Buffer
  }

  try {
    const dataBuffer = await query({ inputs: prompt });
    const imageName = `${prompt}.jpeg`;
    const imagePath = `public/images/${imageName}`;

    fs.writeFileSync(imagePath, dataBuffer);

    console.log("Image saved:", imageName);

    function removePublicFromPath(path) {
      return path.replace(/^public\//, ""); // Remove "public/" from the beginning of the path
    }
    const link = removePublicFromPath(imagePath);

    return NextResponse.json({
      imgUrl: `http://localhost:3000/${link}`,
      name: prompt,
    });
  } catch (err) {
    console.error("Error:", err.message);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
