// Vendors
import { writeFile, utils as xlsxUtils } from "xlsx";
// Constants
import { FIELD_NAMES } from "../constants";
// Utils
import { downloadFile } from "@/lib/utils";

type JsonObject = Record<string, string>;

type DownloadProps = { json: JsonObject; epic: string };

export function handleGeneration(e: React.FormEvent) {
  e.preventDefault();
  const { prefix, epic, translations } = parseForm(e);
  const json = extractJsonObject({
    prefix,
    translations,
  });
  downloadPoEditorJson({ json, epic });
  downloadXLSXFile({
    json,
    epic,
  });
  downloadTranslationIds({ epic, translations });
}

function parseForm(e: React.FormEvent) {
  const formData = new FormData(e.target as HTMLFormElement);

  const prefix = formData
    .get(FIELD_NAMES.TRANSLATIONS_PREFIX)
    ?.toString() as string;
  const epic = formData.get(FIELD_NAMES.EPIC)?.toString() as string;

  formData.delete(FIELD_NAMES.TRANSLATIONS_PREFIX);
  formData.delete(FIELD_NAMES.EPIC);

  const translations = Array.from(formData.entries());

  return { prefix, epic, translations };
}

function extractJsonObject({
  prefix,
  translations,
}: {
  prefix: string;
  translations: Array<[string, FormDataEntryValue]>;
}) {
  let currentKey = "";

  return translations.reduce<JsonObject>((acc, [key, value]) => {
    if (key.includes("id")) {
      currentKey = `${prefix}.${formatId(value)}`;
    } else {
      acc[currentKey] = value.toString();
    }

    return acc;
  }, {});
}

function formatId(value: FormDataEntryValue) {
  return value.toString().trim().replace(/\s/g, ".");
}

function downloadPoEditorJson({ json, epic }: DownloadProps) {
  downloadFile([JSON.stringify(json, null, 2)], `${epic}-translations.json`);
}

function downloadXLSXFile({ json, epic }: DownloadProps) {
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

type DownloadTranslationFileProps = {
  epic: string;
  translations: Array<[string, FormDataEntryValue]>;
};

function downloadTranslationIds({
  epic,
  translations,
}: DownloadTranslationFileProps) {
  const filteredTranslations = translations
    .filter(([key]) => key.includes("id"))
    .map(([, value]) => formatTranslation(value));

  const contentFile = `export const ${epic.toUpperCase()}_TRANSLATIONS = {
  ${filteredTranslations.map((translation) => `\t${translation}`).join(",\n")}
  }`;

  downloadFile([contentFile], `${epic}-translations.ts`);
}

function formatTranslation(value: FormDataEntryValue) {
  return value.toString().trim().toUpperCase().replace(/\s/g, "_");
}
