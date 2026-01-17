import { z } from "zod";

export const CreatePolicyRequest = z.object({
  policyId: z.string(),
  coverage: z.number().positive(),
  premium: z.number().positive(),
  startDate: z.string(),
  endDate: z.string(),
});
