import { z } from "zod";

export const PolicySchema = z.object({
  policyId: z.string(),
  coverage: z.number(),
  premium: z.number(),
  startDate: z.string(),
  endDate: z.string(),
});

export const PolicyListResponseSchema = z.array(PolicySchema);

export type PolicyDto = z.infer<typeof PolicySchema>;
