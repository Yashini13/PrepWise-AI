import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { feedback } = await req.json();

  const prompt = `
You are an expert career mentor. Based on this interview feedback, generate a cpmpact personalized skill improvement roadmap with weekly milestones and actionable steps. Be concise and helpful.

Interview Feedback:
${feedback}
`;
  console.log(feedback);
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  const data = await response.json();
  const roadmap = data.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\*\*/g, '').replace(/\*/g, '') || "Unable to generate roadmap.";

  return NextResponse.json({ roadmap });
}
