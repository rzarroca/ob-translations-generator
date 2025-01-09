// Vendors
import { useLayoutEffect } from "react";
// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldSet } from "@/components/fieldset";
import { FieldWrapper } from "@/components/fieldWrapper";
// Constants
import { FIELD_NAMES, FORBID_SEPARATORS_REGEX } from "../constants";
// Handlers
import { handleLoadFields, handleStoreField } from "../handlers";
// Translations
import { APP_TRANSLATIONS } from "../translations";

export const ProjectSetup = () => {
  useLayoutEffect(() => {
    handleLoadFields(["translationPrefix", "epic"]);
  }, []);

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="project-setup">
          <AccordionTrigger>Project Details</AccordionTrigger>
          <AccordionContent>
            <FieldSet legend="Customize Project Data">
              <FieldWrapper>
                <Label htmlFor={FIELD_NAMES.TRANSLATIONS_PREFIX}>
                  Project Prefix
                </Label>
                <Input
                  id={FIELD_NAMES.TRANSLATIONS_PREFIX}
                  name={FIELD_NAMES.TRANSLATIONS_PREFIX}
                  onBlur={handleStoreField}
                  pattern={FORBID_SEPARATORS_REGEX}
                  placeholder="Enter project prefix"
                  required
                  title={APP_TRANSLATIONS.SEPARATORS_NOT_ALLOWED}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Label htmlFor={FIELD_NAMES.EPIC}>Epic</Label>
                <Input
                  id={FIELD_NAMES.EPIC}
                  name={FIELD_NAMES.EPIC}
                  onBlur={handleStoreField}
                  pattern={FORBID_SEPARATORS_REGEX}
                  placeholder="Enter epic"
                  required
                  title={APP_TRANSLATIONS.SEPARATORS_NOT_ALLOWED}
                />
              </FieldWrapper>
            </FieldSet>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
