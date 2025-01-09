// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldSet } from "@/components/fieldset";
import { FieldWrapper } from "@/components/fieldWrapper";
// Constants
import { FORBID_SEPARATORS_REGEX } from "../constants";
// Translations
import { APP_TRANSLATIONS } from "../translations";

export const TranslationFields = ({ counter }: { counter: number }) => (
  <>
    {Array.from({ length: counter }).map((_, index) => (
      <FieldSet key={index} legend={`Translation ${index + 1}`}>
        <FieldWrapper>
          <Label htmlFor={`id${index}`}>ID</Label>
          <Input
            id={`id${index}`}
            name={`id${index}`}
            placeholder="Enter translation ID"
            pattern={FORBID_SEPARATORS_REGEX}
            title={APP_TRANSLATIONS.SEPARATORS_NOT_ALLOWED}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Label htmlFor={`translation${index}`}>Translation {index + 1}</Label>
          <Textarea
            id={`translation${index}`}
            name={`translation${index}`}
            placeholder="Enter translation"
            rows={2}
          />
        </FieldWrapper>
      </FieldSet>
    ))}
  </>
);
