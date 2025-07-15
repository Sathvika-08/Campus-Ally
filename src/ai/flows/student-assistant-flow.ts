// This is an AI-powered chatbot that helps students with their questions about campus life.
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudentAssistantInputSchema = z.object({
  query: z.string().describe('The question asked by the student.'),
});
export type StudentAssistantInput = z.infer<typeof StudentAssistantInputSchema>;

const StudentAssistantOutputSchema = z.object({
  answer: z
    .string()
    .describe('The answer to the question. You can also suggest URLs to campus resources if relevant.'),
});
export type StudentAssistantOutput = z.infer<typeof StudentAssistantOutputSchema>;

export async function studentAssistant(
  input: StudentAssistantInput
): Promise<StudentAssistantOutput> {
  return studentAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studentAssistantPrompt',
  input: {schema: StudentAssistantInputSchema},
  output: {schema: StudentAssistantOutputSchema},
  prompt: `You are a friendly and helpful AI assistant for university students. Your name is Campus Ally.
Your goal is to answer student questions about campus life, academics, resources, and events.
Provide clear, concise, and helpful answers. If you know of a relevant URL on a university website, you can include it in your answer.

Question: {{{query}}}

Answer:`,
});

const studentAssistantFlow = ai.defineFlow(
  {
    name: 'studentAssistantFlow',
    inputSchema: StudentAssistantInputSchema,
    outputSchema: StudentAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
