// Vendors
import { useLayoutEffect } from "react";
// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldSet } from "@/components/fieldset";
import { FieldWrapper } from "@/components/fieldWrapper";
// Constants
import { FIELD_NAMES, FORBID_SEPARATORS_REGEX } from "../constants";
// Handlers
import { handleLoadFields, handleStoreField } from "../handlers";
// Translations
import { TRANSLATIONS } from "../translations";

export const SetupFields = () => {
  useLayoutEffect(() => {
    handleLoadFields(Object.values(FIELD_NAMES));
  }, []);

  return (
    <FieldSet legend="Customize Project Data">
      <FieldWrapper>
        <Label htmlFor={FIELD_NAMES.JIRA}>{TRANSLATIONS.JIRA_LABEL}</Label>
        <Input
          id={FIELD_NAMES.JIRA}
          name={FIELD_NAMES.JIRA}
          onBlur={handleStoreField}
          placeholder={TRANSLATIONS.JIRA_PLACEHOLDER}
          required
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor={FIELD_NAMES.TRANSLATIONS_PREFIX}>
          {TRANSLATIONS.PREFIX_LABEL}
        </Label>
        <Input
          id={FIELD_NAMES.TRANSLATIONS_PREFIX}
          name={FIELD_NAMES.TRANSLATIONS_PREFIX}
          onBlur={handleStoreField}
          pattern={FORBID_SEPARATORS_REGEX}
          placeholder={TRANSLATIONS.PREFIX_PLACEHOLDER}
          required
          title={TRANSLATIONS.SEPARATORS_NOT_ALLOWED}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor={FIELD_NAMES.EPIC}>{TRANSLATIONS.EPIC_LABEL}</Label>
        <Input
          id={FIELD_NAMES.EPIC}
          name={FIELD_NAMES.EPIC}
          onBlur={handleStoreField}
          pattern={FORBID_SEPARATORS_REGEX}
          placeholder={TRANSLATIONS.EPIC_PLACEHOLDER}
          required
          title={TRANSLATIONS.SEPARATORS_NOT_ALLOWED}
        />
      </FieldWrapper>
    </FieldSet>
  );
};
