// src/app/admin/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddEventForm from "./add-event-form";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome, Admin! Use this page to manage campus events.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
            <CardDescription>
              Fill out the form below to add a new event to the events page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddEventForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
