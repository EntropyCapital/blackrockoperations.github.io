import { Resend } from "resend";

export async function POST(req) {
  try {
    const body = await req.json();

    const name = String(body?.name || "");
    const company = String(body?.company || "");
    const email = String(body?.email || "");
    const phone = String(body?.phone || "");
    const details = String(body?.details || "");

    if (!email || !details) {
      return Response.json(
        { ok: false, error: "Email and brief are required." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!to) {
      return Response.json(
        { ok: false, error: "CONTACT_TO_EMAIL is not set." },
        { status: 500 }
      );
    }

    const subject =
      `BRO Intake: ${name ? name : "New request"}` + (company ? ` (${company})` : "");

    const text = `NEW INTAKE REQUEST

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}

Brief:
${details}
`;

    const { error } = await resend.emails.send({
      from,
      to,
      reply_to: email,
      subject,
      text,
    });

    if (error) {
      return Response.json({ ok: false, error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: "Server error sending message." },
      { status: 500 }
    );
  }
}
