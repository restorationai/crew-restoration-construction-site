// POST /api/apply — Careers page job application handler (Cloudflare Pages
// Function, Crew 2026-11-10).
//
// Deliberately NOT /api/estimate: an application is not a customer lead, so
// it never files a CRM contact, never texts the owner and never lands in
// marketing_form_submissions. One job: email the application to the
// hiring inbox the client named (src/data/careers.ts applyEmail), reply-to
// the applicant when they gave an email.
//
// Spam gates match estimate.ts: honeypot `company_website` + min-render-time
// token `fets` (>= 3s old). Bots get a silent 200.
//
// Env: SENDGRID_API_KEY (already set on the Pages project for estimate.ts).
import { brand } from "../../src/lib/brand";
import { careers } from "../../src/data/careers";

type Env = { SENDGRID_API_KEY?: string };

const FROM_EMAIL = "no-reply@restorationai.io"; // verified SendGrid sender
const MIN_RENDER_MS = 3000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const clean = (v: unknown, max: number) =>
  String(v ?? "").replace(/[^\S\n]+/g, " ").trim().slice(0, max);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "invalid-json" }, 400);
  }

  if (clean(data.company_website, 200)) return json({ ok: true });
  const fets = Number(data.fets || 0);
  if (!fets || Date.now() - fets < MIN_RENDER_MS) return json({ ok: true });

  const app = {
    name: clean(data.name, 120),
    phone: clean(data.phone, 30),
    email: clean(data.email, 160),
    position: clean(data.position, 120) || "General application",
    note: clean(data.note, 2000),
  };
  if (!app.name || !app.phone) return json({ ok: false, error: "missing-required-fields" }, 400);
  if (!env.SENDGRID_API_KEY) return json({ ok: false, error: "email-not-configured" }, 502);

  // Our own end-to-end check (note contains RANKAI-TEST) goes to the agency
  // inbox, so verifying the form never puts a fake applicant in theirs.
  const isOurTest = app.note.includes("RANKAI-TEST");
  const to = isOurTest ? "contact@restorationai.io" : careers.applyEmail;
  const text = [
    `New job application from ${brand.domain}/careers`,
    "",
    `Position: ${app.position}`,
    `Name:     ${app.name}`,
    `Phone:    ${app.phone}`,
    `Email:    ${app.email || "(not provided)"}`,
    "",
    "Note:",
    app.note || "(none)",
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const payload: Record<string, unknown> = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: FROM_EMAIL, name: `${brand.displayName} Careers` },
    subject: `Job application: ${app.position} - ${app.name}`,
    content: [{ type: "text/plain", value: text }],
  };
  if (app.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(app.email)) {
    payload.reply_to = { email: app.email, name: app.name };
  }

  const r = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.SENDGRID_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => null);

  const ok = !!r && r.status >= 200 && r.status < 300;
  const body: Record<string, unknown> = { ok, email: ok ? "sent" : `error:${r ? r.status : "fetch"}` };
  if (isOurTest) body.to = to;
  return json(body, ok ? 200 : 502);
};
