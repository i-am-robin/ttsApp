import { NextResponse } from "next/server";
import fs from "fs";

export async function PUT(req) {
  const body = await req.json();
  const { text } = body;

  await fs.writeFileSync("public/a.txt", text);

  const txt = fs.readFileSync("public/a.txt", "utf-8");
  console.log(txt);

  console.log("done");

  return NextResponse.json({ msg: txt });
}
