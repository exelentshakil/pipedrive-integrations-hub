import { IntentTier, AiConversationState } from "./types";

export interface AiQualificationResult {
  reply: string;
  intentTier: IntentTier;
  aiConversationState: AiConversationState;
  handoverNeeded: boolean;
  handoverReason?: string;
  reasoning: string;
  provider: "openai" | "gemini" | "deterministic-fallback";
  model: string;
  latencyMs: number;
}

interface GenerateAiSmsParams {
  customerName: string;
  dealTitle: string;
  customerMessage: string;
  conversationHistory?: Array<{ role: "customer" | "assistant"; text: string }>;
  assignedRep?: string;
}

const SYSTEM_PROMPT = `You are an enterprise AI Sales Qualification Assistant for a premium Australian commercial real estate and property group.
Your role is two-way conversational SMS qualification over Sinch Australian telco routes (+61).
The lead is assigned to account executive Shaun M. in Perth, WA.

CONVERSATION & COMPLIANCE RULES:
1. Answer the customer's query naturally, concisely, and professionally in SMS style (1 to 2 short sentences, under 160 characters if possible).
2. Evaluate customer intent and status:
   - SPAM ACT / TNZ COMPLIANCE: If the customer message is or contains "STOP", "UNSUBSCRIBE", "CANCEL", "QUIT", or "OPT OUT", set aiConversationState to "OPTED_OUT", intentTier to "COLD", handoverNeeded to false, and reply with: "You have been unsubscribed. No further messages will be sent."
   - SALESPERSON HANDOVER: If the customer expresses clear buying intent, asks for pricing/rates, requests a quote/proposal, asks to speak with someone, or wants to book an inspection/meeting, set:
     - aiConversationState: "HANDOVER_PENDING"
     - intentTier: "HOT"
     - handoverNeeded: true
     - handoverReason: specific summary of what customer requested
     - reply: acknowledge their request warmly and confirm Shaun M. is reviewing their details and will call or text them directly today.
   - GENERAL INQUIRY: If asking general questions (location, specifications, timeline), answer warmly, keep aiConversationState: "ACTIVE", intentTier: "WARM", and ask an engaging qualifying question.
3. You MUST respond with ONLY a valid JSON object matching this schema:
{
  "reply": "SMS response message text",
  "intentTier": "HOT" | "WARM" | "COLD",
  "aiConversationState": "ACTIVE" | "HANDOVER_PENDING" | "OPTED_OUT",
  "handoverNeeded": boolean,
  "handoverReason": "Brief reason if handoverNeeded is true, else empty string",
  "reasoning": "Brief 1-sentence technical explanation of intent classification"
}`;

export async function generateAiSmsReply(params: {
  customerName: string;
  dealTitle: string;
  customerMessage: string;
  conversationHistory?: Array<{ role: "customer" | "assistant"; text: string }>;
  assignedRep?: string;
}): Promise<AiQualificationResult> {
  const startTime = Date.now();
  const lowerMsg = params.customerMessage.trim().toLowerCase();

  // Instant local rule for regulatory STOP / OPT OUT compliance
  if (
    lowerMsg === "stop" ||
    lowerMsg === "unsubscribe" ||
    lowerMsg === "cancel" ||
    lowerMsg === "quit" ||
    lowerMsg.startsWith("stop ")
  ) {
    return {
      reply: "You have been unsubscribed. No further messages will be sent from this number.",
      intentTier: "COLD",
      aiConversationState: "OPTED_OUT",
      handoverNeeded: false,
      handoverReason: "Australian Spam Act 2003 / TNZ STOP keyword received",
      reasoning: "Immediate regulatory opt-out suppression triggered without LLM latency.",
      provider: "deterministic-fallback",
      model: "system-compliance-rule",
      latencyMs: Date.now() - startTime
    };
  }

  // 1. Try OpenAI if key is present
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey && openaiKey.startsWith("sk-")) {
    try {
      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...(params.conversationHistory || []).map((h) => ({
          role: h.role === "customer" ? "user" : "assistant",
          content: h.text
        })),
        {
          role: "user",
          content: `Customer Name: ${params.customerName}\nDeal: ${params.dealTitle}\nAssigned Rep: ${params.assignedRep || "Shaun M."}\nNew Customer Message: "${params.customerMessage}"`
        }
      ];

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.2,
          response_format: { type: "json_object" },
          max_tokens: 250
        })
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return {
            reply: parsed.reply || "Thank you for reaching out. Shaun M. will follow up shortly.",
            intentTier: (["HOT", "WARM", "COLD"].includes(parsed.intentTier) ? parsed.intentTier : "WARM") as IntentTier,
            aiConversationState: (["ACTIVE", "HANDOVER_PENDING", "OPTED_OUT"].includes(parsed.aiConversationState)
              ? parsed.aiConversationState
              : parsed.handoverNeeded ? "HANDOVER_PENDING" : "ACTIVE") as AiConversationState,
            handoverNeeded: Boolean(parsed.handoverNeeded),
            handoverReason: parsed.handoverReason || (parsed.handoverNeeded ? "Customer requested consultation" : undefined),
            reasoning: parsed.reasoning || "OpenAI GPT-4o-mini real-time intent analysis",
            provider: "openai",
            model: "gpt-4o-mini",
            latencyMs: Date.now() - startTime
          };
        }
      }
    } catch (err) {
      console.warn("OpenAI API call failed, attempting Gemini fallback:", err);
    }
  }

  // 2. Try Gemini Fallback if key is present
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const promptText = `${SYSTEM_PROMPT}\n\nCustomer: ${params.customerName}\nDeal: ${params.dealTitle}\nCustomer Message: "${params.customerMessage}"\nRespond strictly with JSON.`;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2
            }
          })
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            reply: parsed.reply || "Thank you for your message. Shaun M. will be in touch shortly.",
            intentTier: (["HOT", "WARM", "COLD"].includes(parsed.intentTier) ? parsed.intentTier : "WARM") as IntentTier,
            aiConversationState: (["ACTIVE", "HANDOVER_PENDING", "OPTED_OUT"].includes(parsed.aiConversationState)
              ? parsed.aiConversationState
              : parsed.handoverNeeded ? "HANDOVER_PENDING" : "ACTIVE") as AiConversationState,
            handoverNeeded: Boolean(parsed.handoverNeeded),
            handoverReason: parsed.handoverReason,
            reasoning: parsed.reasoning || "Gemini 2.0 Flash intent evaluation",
            provider: "gemini",
            model: "gemini-2.0-flash",
            latencyMs: Date.now() - startTime
          };
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to deterministic:", err);
    }
  }

  // 3. Deterministic Local Fallback (Guarantees zero downtime)
  const isHighIntent =
    lowerMsg.includes("quote") ||
    lowerMsg.includes("price") ||
    lowerMsg.includes("cost") ||
    lowerMsg.includes("call me") ||
    lowerMsg.includes("speak to") ||
    lowerMsg.includes("meet") ||
    lowerMsg.includes("tour") ||
    lowerMsg.includes("inspection") ||
    lowerMsg.includes("consultation") ||
    lowerMsg.includes("contract") ||
    lowerMsg.includes("available");

  if (isHighIntent) {
    return {
      reply: `Hi ${params.customerName.split(" ")[0]}, absolutely! I've flagged this priority for Shaun M. He's reviewing the ${params.dealTitle} specs and will call you shortly.`,
      intentTier: "HOT",
      aiConversationState: "HANDOVER_PENDING",
      handoverNeeded: true,
      handoverReason: "Customer expressed explicit interest in pricing / inspection",
      reasoning: "High-intent commercial keywords identified; assigned immediate call task to Shaun M.",
      provider: "deterministic-fallback",
      model: "intent-state-machine-v1",
      latencyMs: Date.now() - startTime
    };
  }

  return {
    reply: `Hi ${params.customerName.split(" ")[0]}, thanks for reaching out regarding ${params.dealTitle}! Are you looking to acquire within the current quarter or reviewing options?`,
    intentTier: "WARM",
    aiConversationState: "ACTIVE",
    handoverNeeded: false,
    reasoning: "Standard lead inquiry; qualifying timeline and purchase window.",
    provider: "deterministic-fallback",
    model: "intent-state-machine-v1",
    latencyMs: Date.now() - startTime
  };
}
