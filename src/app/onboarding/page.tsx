import { CardContent } from "~/components/ui/card";
import { Card } from "~/components/ui/card";

export default function OnboardingPage() {
  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardContent className="p-6">
          <div className="mt-8">
            <h1 className="text-2xl font-bold">Onboarding</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
