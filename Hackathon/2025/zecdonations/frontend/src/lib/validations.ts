import { z } from "zod";

export const createCampaignSchema = z.object({
  title: z.string().min(3),
  goal: z.number().positive(),
  address: z.string().startsWith("zs", { message: "Use a shielded address (zs...)" }),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;


