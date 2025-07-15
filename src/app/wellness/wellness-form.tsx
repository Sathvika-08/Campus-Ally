"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getMotivation } from "./actions";

const formSchema = z.object({
  question1: z.string().min(10, "Please share a bit more."),
  question2: z.string().min(10, "Please share a bit more."),
  stressLevel: z.array(z.number()).default([5]),
});

type FormData = z.infer<typeof formSchema>;

export default function WellnessForm() {
  const [isPending, startTransition] = useTransition();
  const [motivation, setMotivation] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question1: "",
      question2: "",
      stressLevel: [5],
    },
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      setMotivation(null);
      const result = await getMotivation({
        ...data,
        stressLevel: data.stressLevel[0],
      });
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else if (result.motivation) {
        setMotivation(result.motivation);
        form.reset();
      }
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="question1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is one thing that brought you joy recently?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe a moment, a conversation, or an activity..."
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is one challenge you're currently facing?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="It could be academic, personal, or anything on your mind..."
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="stressLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>On a scale of 0 to 10, how would you rate your current stress level?</FormLabel>
                   <FormControl>
                    <div>
                      <Slider
                        min={0}
                        max={10}
                        step={1}
                        value={field.value}
                        onValueChange={field.onChange}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Not stressed</span>
                        <span>{field.value[0]}</span>
                        <span>Very stressed</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Getting Motivation..." : "Get Motivation"}
            </Button>
          </form>
        </Form>

        {(isPending || motivation) && (
          <div className="mt-8">
            <Card className="bg-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Sparkles className="text-accent" />
                  Your Motivational Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPending ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                  </div>
                ) : (
                  <p className="text-primary-foreground/80">{motivation}</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
