// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SetupFields } from "./setupFields";

export const ProjectSetup = () => (
  <>
    <Accordion type="single" collapsible>
      <AccordionItem value="project-setup">
        <AccordionTrigger>Project Details</AccordionTrigger>
        <AccordionContent>
          <SetupFields />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </>
);
