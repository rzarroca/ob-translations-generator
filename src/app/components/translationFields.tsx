// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldSet } from "@/components/fieldset";
import { FieldWrapper } from "@/components/fieldWrapper";
// Translations
import { TRANSLATIONS } from "../translations";

export const TranslationFields = ({ counter }: { counter: number }) => (
  <div className="grid grid-cols-96 gap-4">
    {Array.from({ length: counter }).map((_, index) => (
      <FieldSet key={index} legend={`Translation ${index + 1}`}>
        <FieldWrapper>
          <Label htmlFor={`id${index}`}>{TRANSLATIONS.ID}</Label>
          <Input
            id={`id${index}`}
            name={`id${index}`}
            placeholder="Enter translation ID"
            title={TRANSLATIONS.PARSE_INDICATION}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Label htmlFor={`translation${index}`}>
            {TRANSLATIONS.TRANSLATION}
          </Label>
          <Textarea
            id={`translation${index}`}
            name={`translation${index}`}
            placeholder="Enter translation"
            rows={2}
          />
        </FieldWrapper>
      </FieldSet>
    ))}
  </div>
);
