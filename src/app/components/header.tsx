// Components
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// Translations
import { TRANSLATIONS } from "../translations";

export const Header = () => (
  <CardHeader>
    <header>
      <CardTitle>
        <h1>{TRANSLATIONS.TITLE}</h1>
      </CardTitle>
      <CardDescription>
        <h2>{TRANSLATIONS.SUBTITLE}</h2>
      </CardDescription>
    </header>
  </CardHeader>
);
