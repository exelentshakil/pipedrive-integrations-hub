import { NextRequest, NextResponse } from "next/server";
import { generateAiSmsReply } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName = "Customer",
      dealTitle = "Property Inquiry",
      customerMessage,
      conversationHistory = [],
      assignedRep = "Shaun M."
    } = body;

    if (!customerMessage || typeof customerMessage !== "string") {
      return NextResponse.json(
        { error: "customerMessage string is required" },
        { status: 400 }
      );
    }

    const result = await generateAiSmsReply({
      customerName,
      dealTitle,
      customerMessage,
      conversationHistory,
      assignedRep
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: result
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const hasOpenAi = Boolean(process.env.OPENAI_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);

  return NextResponse.json({
    status: "ACTIVE",
    service: "Two-Way AI SMS Qualification Engine",
    providers: {
      openai: {
        configured: hasOpenAi,
        model: "gpt-4o-mini"
      },
      gemini: {
        configured: hasGemini,
        model: "gemini-2.0-flash"
      },
      fallback: {
        configured: true,
        model: "deterministic-intent-rule-v1"
      }
    },
    activeProvider: hasOpenAi ? "OpenAI (GPT-4o-mini)" : hasGemini ? "Google Gemini (2.0 Flash)" : "Deterministic Rule Engine",
    regulatoryGuards: ["Australian Spam Act 2003", "TNZ STOP Interception", "Salesperson Handover to Shaun M."]
  });
}
