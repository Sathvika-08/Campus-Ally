"use server";

import { getWellnessMotivation } from "@/ai/flows/wellness-motivation";
import { z } from "zod";

const FormSchema = z.object({
  question1: z.string(),
  question2: z.string(),
  stressLevel: z.number(),
});

const MotivationResultSchema = z.object({
  motivation: z.string().optional(),
  error: z.string().optional(),
});

export async function getMotivation(
  data: z.infer<typeof FormSchema>
): Promise<z.infer<typeof MotivationResultSchema>> {
  const parsedData = FormSchema.safeParse(data);
  if (!parsedData.success) {
    return { error: "Invalid form data." };
  }

  try {
    const result = await getWellnessMotivation(parsedData.data);
    return { motivation: result.motivation };
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      error: `Sorry, I encountered an issue while generating your message. ${error}`,
    };
  }
}
