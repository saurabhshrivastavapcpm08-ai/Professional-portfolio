import { listJobs } from "@/lib/tara-store";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(listJobs());
}
