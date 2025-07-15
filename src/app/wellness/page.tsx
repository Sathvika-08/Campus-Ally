import WellnessForm from "./wellness-form";

export default function WellnessPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold">Wellness Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Take a moment for yourself. Your responses are private and used to provide you with a positive, motivational message.
        </p>
      </div>
      <WellnessForm />
    </div>
  );
}
