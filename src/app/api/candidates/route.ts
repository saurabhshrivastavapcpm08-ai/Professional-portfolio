import { createCandidate, listCandidates } from "@/lib/tara-store";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(listCandidates());
}

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string; role?: string };
  const name = body.name?.trim() ?? "";
  const role = body.role?.trim() ?? "";
  if (!name || !role || name.length > 120 || role.length > 120) {
    return Response.json({ error: "Invalid name or role" }, { status: 400 });
  }
  const candidate = createCandidate(name, role);
  return Response.json(candidate, { status: 201 });
}
