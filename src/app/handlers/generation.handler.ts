// Vendors
import { writeFile, utils as xlsxUtils } from "xlsx";
// Constants
import { FIELD_NAMES } from "../constants";

type JsonObject = Record<string, string>;

export function handleGeneration(e: React.FormEvent) {
  e.preventDefault();
  const { prefix, epic, translations } = parseForm(e);
  const json = extractJsonObject({
    prefix,
    translations,
  });
  downloadJson({ json, epic });
  downloadXLSXFile({
    json,
    epic,
  });
}

function parseForm(e: React.FormEvent) {
  const formData = new FormData(e.target as HTMLFormElement);

  const prefix = formData
    .get(FIELD_NAMES.TRANSLATIONS_PREFIX)
    ?.toString() as string;
  const epic = formData.get(FIELD_NAMES.EPIC)?.toString() as string;

  formData.delete(FIELD_NAMES.TRANSLATIONS_PREFIX);
  formData.delete(FIELD_NAMES.EPIC);

  const translations = formData.entries();
  debugger;
  return { prefix, epic, translations };
}

function extractJsonObject({
  prefix,
  translations,
}: {
  prefix: string;
  translations: FormDataIterator<[string, FormDataEntryValue]>;
}) {
  let currentKey = "";

  return translations.reduce<JsonObject>((acc, [key, value]) => {
    if (key.includes("id")) {
      currentKey = `${prefix}.${value}`;
    } else {
      acc[currentKey] = value.toString();
    }

    return acc;
  }, {});
}

function downloadJson({ json, epic }: { json: JsonObject; epic: string }) {
  const blob = new Blob([JSON.stringify(json, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${epic}-translations.json`;
  a.click();
}

function downloadXLSXFile({ json, epic }: { json: JsonObject; epic: string }) {
  const data = Object.entries(json).map(([key, translation]) => ({
    epic,
    key,
    translation,
  }));
  const worksheet = xlsxUtils.json_to_sheet(data);
  const workbook = xlsxUtils.book_new();
  xlsxUtils.book_append_sheet(workbook, worksheet, epic);
  writeFile(workbook, `${epic}-translations.xlsx`);
}
