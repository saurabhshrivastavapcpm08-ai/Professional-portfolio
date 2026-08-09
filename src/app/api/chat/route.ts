import { chatReply } from "@/lib/tara-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string };
  const message = body.message?.trim() ?? "";
  if (!message || message.length > 2000) {
    return Response.json({ error: "Invalid message" }, { status: 400 });
  }
  return Response.json(chatReply(message));
}
