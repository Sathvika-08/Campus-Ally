// src/app/admin/actions.ts
"use server";

import { z } from "zod";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { db } from "@/firebase";

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  location: z.string().min(1, "Location is required."),
  date: z.date({ required_error: "A date is required." }),
});

type FormData = z.infer<typeof formSchema>;

export async function addEvent(data: FormData) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Invalid form data.",
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    await addDoc(collection(db, "events"), {
      title: parsedData.data.title,
      description: parsedData.data.description,
      location: parsedData.data.location,
      date: Timestamp.fromDate(parsedData.data.date),
    });

    revalidatePath("/events");

    return {
      success: true,
      message: "Event added successfully!",
    };
  } catch (error: any) {
    console.error("Error adding event:", error);
    return {
      success: false,
      message: error.message || "Failed to add event.",
    };
  }
}
