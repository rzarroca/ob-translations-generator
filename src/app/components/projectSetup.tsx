// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SetupFields } from "./setupFields";
// Translations
import { TRANSLATIONS } from "../translations";

export const ProjectSetup = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="project-setup">
      <AccordionTrigger>{TRANSLATIONS.PROJECT_DETAILS}</AccordionTrigger>
      <AccordionContent>
        <SetupFields />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
