import { NextResponse } from "next/server";
import { generateJessiePromptPack, getJessieSystemPrompt } from "@/app/library/jessie/generate";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_input, page, premium } = body;

    if (!user_input || !page) {
      return NextResponse.json(
        { error: "Missing user_input or page" },
        { status: 400 }
      );
    }

    const system = getJessieSystemPrompt({
      user_input,
      page,
      premium,
    });

    const result = generateJessiePromptPack({
      user_input,
      page,
      premium,
    });

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
