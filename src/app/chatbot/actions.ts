"use server";

import { studentAssistant } from "@/ai/flows/student-assistant-flow";
import { z } from "zod";

const ChatResultSchema = z.object({
  answer: z.string().optional(),
  error: z.string().optional(),
});

export async function handleChat(
  query: string
): Promise<z.infer<typeof ChatResultSchema>> {
  if (!query) {
    return { error: "Query cannot be empty." };
  }

  try {
    const result = await studentAssistant({ query });
    return { answer: result.answer };
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      error: `Sorry, I encountered an issue. ${error}`,
    };
  }
}
