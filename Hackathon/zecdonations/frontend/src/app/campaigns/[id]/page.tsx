import { cookies } from "next/headers";
import CampaignClient, { CampaignDetail } from "./CampaignClient";

async function fetchCampaign(id: string): Promise<CampaignDetail | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const res = await fetch(`https://teslasdev.com/api/campaigns/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });
  try {
    const data = await res.json();
    const c = data?.campaign ?? data;
    if (!c) return null;
    console.log(c);
    return {
      id: String(c.id),
      title: c.title || `Campaign #${id}`,
      description: c.description || "",
      goalZec: Number(c.goalZec || c.target_amount || 0),
      receivedZec: Number(c.receivedZec || 0),
      address: c.address || "",
      status: c.status,
      discord_id: c.discord_id || c.discordId,
      creator: c.creator || null,
      transactions: Array.isArray(c.transactions) ? c.transactions : [],
      is_user: c.is_user,
      wallet_id: c.wallet_id,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchCampaign(id);
  const title = data?.title
    ? `${data.title} | ZECdonate`
    : `Campaign ${id} | ZECdonate`;
  const description = data?.description || "Donate privately with ZEC.";
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary", title, description },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchCampaign(id);
  if (!data) return null;
  return <CampaignClient data={data} />;
}
