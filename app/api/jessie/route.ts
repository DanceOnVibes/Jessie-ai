import { NextResponse } from "next/server";
import {
  generateJessiePromptPack,
  getJessieSystemPrompt,
} from "@/lib/jessie-core/generate";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { capability, message, biologyDepth, allowMemory } = body;

    if (!capability || !message) {
      return NextResponse.json(
        { error: "Missing capability or message" },
        { status: 400 }
      );
    }

    const requestData = {
      capability,
      message,
      biologyDepth,
      allowMemory,
    };

    const system = getJessieSystemPrompt(requestData);
    const result = generateJessiePromptPack(requestData);

    return NextResponse.json({
      success: true,
      system,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
