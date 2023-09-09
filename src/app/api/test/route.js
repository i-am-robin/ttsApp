import { NextResponse } from "next/server";
import fs from "fs";

export async function GET(req) {
  await fs.writeFileSync("public/a.txt", Date.now());

  const txt = fs.readFileSync("public/a.txt", "utf-8");
  console.log(txt);

  console.log("done");

  return NextResponse.json({ msg: txt });
}
