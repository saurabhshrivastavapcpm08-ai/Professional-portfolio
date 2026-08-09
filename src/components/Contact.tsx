"use client";

import { FormEvent, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/content";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setError("Please fill in name, email, and message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; mailto?: string };

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Unable to send right now.");
      }

      if (json.mailto) {
        window.location.href = json.mailto;
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)]">
            Contact
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--paper)] sm:text-4xl">
            {site.openTo}
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Prefer a direct channel? Reach out on email or LinkedIn — or download the resume
            and share it with your hiring team.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="block text-[var(--paper)] transition-colors hover:text-[var(--accent)]"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="block text-[var(--muted-strong)] transition-colors hover:text-[var(--paper)]"
            >
              {site.phone}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[var(--muted-strong)] transition-colors hover:text-[var(--paper)]"
            >
              linkedin.com/in/connectwithsaurabh
            </a>
            <a
              href={site.resumePath}
              download
              className="mt-4 inline-flex rounded-md border border-white/20 px-4 py-2.5 text-sm font-medium text-[var(--paper)] transition-colors hover:border-white/40"
            >
              Download Resume (PDF)
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={onSubmit}
            className="space-y-4 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-[var(--muted)]">
                Name
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-md border border-white/15 bg-white/[0.03] px-3 py-2.5 text-[var(--paper)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(45,122,138,0.25)]"
                />
              </label>
              <label className="block text-sm text-[var(--muted)]">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-md border border-white/15 bg-white/[0.03] px-3 py-2.5 text-[var(--paper)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(45,122,138,0.25)]"
                />
              </label>
            </div>
            <label className="block text-sm text-[var(--muted)]">
              Company
              <input
                name="company"
                autoComplete="organization"
                className="mt-2 w-full rounded-md border border-white/15 bg-white/[0.03] px-3 py-2.5 text-[var(--paper)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(45,122,138,0.25)]"
              />
            </label>
            <label className="block text-sm text-[var(--muted)]">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-y rounded-md border border-white/15 bg-white/[0.03] px-3 py-2.5 text-[var(--paper)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(45,122,138,0.25)]"
              />
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-[transform,filter] duration-150 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>

            {status === "success" && (
              <p className="text-sm text-[var(--accent-soft)]" role="status">
                Thanks — your message is ready. If your mail client opened, hit send. You can
                also email me directly anytime.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-300" role="alert">
                {error}
              </p>
            )}
            <p className="pt-2 text-xs text-[var(--muted)]">{site.copyright}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
