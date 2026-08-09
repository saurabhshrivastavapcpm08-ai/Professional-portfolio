import { NextResponse } from "next/server";
import { site } from "@/data/content";

type ContactBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
  }

  // Optional Formspree endpoint — set FORMSPREE_ENDPOINT in env to enable server-side delivery.
  // Example: https://formspree.io/f/xxxxxxxx
  const formspree = process.env.FORMSPREE_ENDPOINT;

  if (formspree) {
    try {
      const res = await fetch(formspree, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          _subject: `Portfolio inquiry from ${name}`,
        }),
      });

      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Form service rejected the message." },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Unable to reach form service." },
        { status: 502 },
      );
    }
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const bodyText = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n${message}`,
  );

  return NextResponse.json({
    ok: true,
    mailto: `mailto:${site.email}?subject=${subject}&body=${bodyText}`,
  });
}
