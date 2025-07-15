// src/ai/flows/wellness-motivation.ts
'use server';
/**
 * @fileOverview A wellness motivation AI agent.
 *
 * - getWellnessMotivation - A function that handles the wellness motivation process.
 * - WellnessMotivationInput - The input type for the getWellnessMotivation function.
 * - WellnessMotivationOutput - The return type for the getWellnessMotivation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WellnessMotivationInputSchema = z.object({
  question1: z.string().describe('The first wellness question response.'),
  question2: z.string().describe('The second wellness question response.'),
  stressLevel: z.number().describe('The student\'s self-reported stress level on a scale of 0 to 10.'),
});
export type WellnessMotivationInput = z.infer<typeof WellnessMotivationInputSchema>;

const WellnessMotivationOutputSchema = z.object({
  motivation: z.string().describe('The personalized, motivational response.'),
});
export type WellnessMotivationOutput = z.infer<typeof WellnessMotivationOutputSchema>;

export async function getWellnessMotivation(input: WellnessMotivationInput): Promise<WellnessMotivationOutput> {
  return wellnessMotivationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wellnessMotivationPrompt',
  input: {schema: WellnessMotivationInputSchema},
  output: {schema: WellnessMotivationOutputSchema},
  prompt: `You are a wellness assistant that provides personalized, motivational responses to students based on their answers to wellness questions.

  Question 1: {{{question1}}}
  Question 2: {{{question2}}}
  Stress Level: {{{stressLevel}}}/10

  Provide a motivational response based on the student's answers and their reported stress level. 
  If the stress level is high, be more gentle and suggest seeking support resources. 
  If the stress level is low, be more encouraging and positive.
  Focus on encouragement and support.
  Response:`, 
});

const wellnessMotivationFlow = ai.defineFlow(
  {
    name: 'wellnessMotivationFlow',
    inputSchema: WellnessMotivationInputSchema,
    outputSchema: WellnessMotivationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
