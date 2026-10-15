import { submitForm } from "@/lib/server/form-mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return submitForm(request, "careers");
}
