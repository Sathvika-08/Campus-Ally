import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { db } from "@/firebase";
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, Timestamp } from "firebase/firestore";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

async function getEvents(): Promise<Event[]> {
    const eventsCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventsCollection);
    const eventList = eventSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        
        let eventDate = "Date not specified";
        if (data.date && data.date instanceof Timestamp) {
            eventDate = data.date.toDate().toLocaleDateString();
        } else if (data.date) {
            eventDate = String(data.date);
        }

        return {
            id: doc.id,
            title: data.title || "No Title",
            date: eventDate,
            location: data.location || "No Location",
            description: data.description || "No Description",
        };
    });
    return eventList;
}


export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Campus Events</h1>
        <p className="text-muted-foreground mt-2">
          Stay in the loop with what's happening around campus.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{event.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 text-sm text-muted-foreground border-t pt-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
         <div className="text-center text-muted-foreground">
            <p>No events found. Check back later!</p>
        </div>
      )}
    </div>
  );
}
