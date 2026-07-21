// Optional. Silent when DISCORD_WEBHOOK_URL is unset; failures never block payouts.

const URL_RE = /^https:\/\/(discord|discordapp)\.com\/api\/webhooks\//;

function webhookUrl(): string | undefined {
  const raw = process.env.DISCORD_WEBHOOK_URL?.trim();
  if (!raw) return undefined;
  if (!URL_RE.test(raw)) {
    console.warn("[discord] DISCORD_WEBHOOK_URL set but doesn't look like a webhook URL");
    return undefined;
  }
  return raw;
}

async function send(content: string): Promise<void> {
  const url = webhookUrl();
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      // parse: [] suppresses @everyone and user pings sneaking out of approver comments.
      body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
    });
    if (!res.ok) {
      console.warn(`[discord] webhook returned ${res.status}: ${await res.text().catch(() => "")}`);
    }
  } catch (err) {
    console.warn("[discord] webhook send failed:", err);
  }
}

export async function notifyRunNeedsApproval(input: {
  runId: string;
  title: string;
  required: number;
  approverCount: number;
  origin?: string;
}): Promise<void> {
  const link = input.origin ? `${input.origin}/payouts/${input.runId}` : `/payouts/${input.runId}`;
  const msg =
    `**Payout run needs approval** · ${input.title}\n` +
    `Requires ${input.required} of ${Math.max(input.approverCount, input.required)} approvals before payment.\n` +
    `Review: ${link}`;
  await send(msg);
}

export async function notifyRunApproved(input: {
  runId: string;
  title: string;
  approver: string;
  validCount: number;
  required: number;
  origin?: string;
}): Promise<void> {
  const link = input.origin ? `${input.origin}/payouts/${input.runId}` : `/payouts/${input.runId}`;
  const remaining = Math.max(0, input.required - input.validCount);
  const head =
    remaining === 0
      ? `**Payout run cleared (${input.validCount}/${input.required})** · ${input.title}`
      : `**Payout approval recorded (${input.validCount}/${input.required})** · ${input.title}`;
  const shortApprover = input.approver.length > 16
    ? `${input.approver.slice(0, 10)}…${input.approver.slice(-6)}`
    : input.approver;
  await send(`${head}\nApproved by \`${shortApprover}\`. ${remaining > 0 ? `${remaining} more to go.` : "Ready to pay."}\n${link}`);
}
