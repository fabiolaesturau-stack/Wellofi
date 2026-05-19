import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: "You are a friendly, knowledgeable financial advisor for WelloFI, a multi-agent wealth management platform. You help users with portfolio questions, tax optimization, retirement planning, and general financial advice. Keep responses concise (2-3 paragraphs max), warm, and actionable. Use simple language. You can reference WelloFI's agents: TaxShield (tax optimization), PortfolioSync (portfolio management), EstatePlan (estate planning), RiskGuard (risk management), GoalTracker (goal tracking), and CashFlow (cash management). Never give specific investment recommendations, always note that this is educational, not personalized financial advice.",
        messages,
      }),
    });

    const data = await res.json();
    const reply = data.content?.map((c: any) => c.text || "").join("") || "I'm having trouble right now. Please try again!";

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "Something went wrong. Please try again!" }, { status: 500 });
  }
}
