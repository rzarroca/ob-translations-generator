// Constants
import { FIELD_NAMES } from "../constants";

export function handleGeneration(e: React.FormEvent) {
  e.preventDefault();
  const data = new FormData(e.target as HTMLFormElement);
  downloadJson(extractJsonObject(data));
}

function extractJsonObject(formData: FormData) {
  const prefix =
    formData.get(FIELD_NAMES.PROJECT_PREFIX) ??
    "" + formData.get(FIELD_NAMES.SECTION) ??
    "";

  formData.delete(FIELD_NAMES.PROJECT_PREFIX);
  formData.delete(FIELD_NAMES.SECTION);
  formData.delete(FIELD_NAMES.EPIC);

  let currentKey = "";

  return formData
    .entries()
    .reduce<Record<string, string>>((acc, [key, value]) => {
      if (key.includes("id")) {
        currentKey = `${prefix}.${value}`;
      } else {
        acc[currentKey] = value.toString();
      }

      return acc;
    }, {});
}

function downloadJson(json: Record<string, string>) {
  const blob = new Blob([JSON.stringify(json, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "translations.json";
  a.click();
}
