import { z } from "zod";

export const healthSchema = z.object({
  database: z.string(),
  status: z.string(),
  service: z.string(),
});

export type Health = z.infer<typeof healthSchema>;
