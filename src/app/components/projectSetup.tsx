// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldSet } from "@/components/fieldset";
import { FieldWrapper } from "@/components/fieldWrapper";
// Constants
import { FIELD_NAMES, FORBID_SEPARATORS_REGEX } from "../constants";
// Translations
import { APP_TRANSLATIONS } from "../translations";

export const ProjectSetup = () => (
  <FieldSet legend="Project Setup">
    <FieldWrapper>
      <Label htmlFor={FIELD_NAMES.TRANSLATIONS_PREFIX}>Project Prefix</Label>
      <Input
        id={FIELD_NAMES.TRANSLATIONS_PREFIX}
        name={FIELD_NAMES.TRANSLATIONS_PREFIX}
        placeholder="Enter project prefix"
        required
        pattern={FORBID_SEPARATORS_REGEX}
        title={APP_TRANSLATIONS.SEPARATORS_NOT_ALLOWED}
      />
    </FieldWrapper>
    <FieldWrapper>
      <Label htmlFor={FIELD_NAMES.EPIC}>Epic</Label>
      <Input
        id={FIELD_NAMES.EPIC}
        name={FIELD_NAMES.EPIC}
        placeholder="Enter epic"
        required
        pattern={FORBID_SEPARATORS_REGEX}
        title={APP_TRANSLATIONS.SEPARATORS_NOT_ALLOWED}
      />
    </FieldWrapper>
  </FieldSet>
);
