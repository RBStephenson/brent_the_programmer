// Cloudflare Pages Function — POST /api/subscribe
// Adds an email to the Buttondown mailing list server-side, so the API key
// never reaches the browser. Buttondown defaults new subscribers to
// double opt-in (a confirmation email), which is left as-is here on purpose.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  let email = "";
  try {
    const body = await request.json();
    email = (body.email || "").trim();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: "Enter a valid email address." }, 400);
  }

  const res = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${env.BUTTONDOWN_API_KEY}`,
    },
    body: JSON.stringify({ email_address: email }),
  });

  if (res.status === 201) {
    return json({ message: "Check your inbox to confirm." });
  }

  if (res.status === 400) {
    const data = await res.json().catch(() => ({}));
    const alreadyOnList = JSON.stringify(data).toLowerCase().includes("already");
    if (alreadyOnList) {
      return json({ message: "You're already on the list." });
    }
    return json({ error: "Couldn't add that email. Double-check it and try again." }, 400);
  }

  if (res.status === 429) {
    return json({ error: "Too many attempts right now. Try again in a bit." }, 429);
  }

  return json({ error: "Something went wrong. Try again later." }, 502);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
