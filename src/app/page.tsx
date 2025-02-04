"use client";
// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Header } from "./components/header";
import { ProjectSetup } from "./components/projectSetup";
import { TranslationFields } from "./components/translationFields";
// Handlers
import { handleGeneration } from "./handlers";
// Hooks
import { useCounter } from "./hook/useCounter";
// Translations
import { TRANSLATIONS } from "./translations";

export default function Home() {
  const { counter, handleAddTranslation } = useCounter();

  return (
    <main className="flex min-h-screen items-start p-4">
      <Card className="w-full">
        <Header />
        <form onSubmit={handleGeneration}>
          <CardContent>
            <div className="grid gap-4">
              <ProjectSetup />
              <TranslationFields counter={counter} />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddTranslation}
              >
                {TRANSLATIONS.ADD}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">{TRANSLATIONS.DOWNLOAD}</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
