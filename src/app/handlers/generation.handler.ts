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
  downloadTranslationIds({ epic, prefix, translations });
}

function parseForm(e: React.FormEvent) {
  const formData = new FormData(e.target as HTMLFormElement);

  const epic = formData.get(FIELD_NAMES.EPIC)?.toString() as string;
  const prefix = formData
    .get(FIELD_NAMES.TRANSLATIONS_PREFIX)
    ?.toString()
    .concat(`.${epic}`) as string;

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
      currentKey = `${prefix}.${formatJsonId(value)}`;
    } else {
      acc[currentKey] = value.toString();
    }

    return acc;
  }, {});
}

function formatJsonId(value: FormDataEntryValue) {
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
  prefix: string;
  translations: Array<[string, FormDataEntryValue]>;
};

function downloadTranslationIds({
  epic,
  prefix,
  translations,
}: DownloadTranslationFileProps) {
  let contentFile =
    `const DOMAIN = '${prefix}.';\n\n` +
    `const ${epic.toUpperCase()}_TRANSLATIONS = {\n`;

  let currentTranslation = "";

  for (const [key, value] of translations) {
    if (key.includes("id")) {
      currentTranslation = formatTranslationId(value);
    } else {
      contentFile += `\t${currentTranslation}: \`\${DOMAIN}${value}\`,\n`;
    }
  }

  contentFile += "}";
  downloadFile([contentFile], `${epic}-translations.ts`);
}

function formatTranslationId(value: FormDataEntryValue): string {
  return value.toString().trim().toUpperCase().replace(/\s/g, "_");
}
