// Vendors
import Image from "next/image";
// Components
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// Images
import Logo from "@/app/github.svg";
// Translations
import { TRANSLATIONS } from "../translations";

export const Header = () => (
  <CardHeader className="flex flex-row justify-between items-center">
    <header>
      <CardTitle>
        <h1>{TRANSLATIONS.TITLE}</h1>
      </CardTitle>
      <CardDescription>
        <h2>{TRANSLATIONS.SUBTITLE}</h2>
      </CardDescription>
    </header>
    <a
      href="https://github.com/rzarroca/ob-translations-generator"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={Logo} alt={TRANSLATIONS.GITHUB_LINK_ALT} />
    </a>
  </CardHeader>
);
