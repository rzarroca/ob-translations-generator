// Vendors
import { writeFile, utils as xlsxUtils } from "xlsx";
// Constants
import { FIELD_NAMES } from "../constants";
// Types
import {
  DownloadTranslationFileProps,
  ExtractedFormData,
  GenerateJsonProps,
  JsonObject,
  PoDownloadProps,
  XlsxDownloadProps,
} from "./types";
// Utils
import { downloadFile } from "@/lib/utils";
import {
  newLineToBr,
  whiteSpaceToCamelCase,
  whiteSpaceToMiddleLine,
  witheSpacesToUnderLineAndUpperCase,
} from "./utils";

export function handleGeneration(e: React.FormEvent) {
  e.preventDefault();
  const { epic, jira, prefix, translations } = extractSetupAndTranslations(e);
  const json = generateJson({
    prefix,
    translations,
  });

  downloadPoEditorJson({ epic, json });
  downloadXLSXFile({
    epic,
    jira,
    json,
  });
  downloadTranslationIds({ epic, prefix, translations });
}

function extractSetupAndTranslations(e: React.FormEvent): ExtractedFormData {
  const formData = new FormData(e.target as HTMLFormElement);

  const epic = formData.get(FIELD_NAMES.EPIC)?.toString() as string;
  const prefix = formData
    .get(FIELD_NAMES.TRANSLATIONS_PREFIX)
    ?.toString()
    .concat(`.${whiteSpaceToCamelCase(epic)}`) as string;
  const jira = formData.get(FIELD_NAMES.JIRA)?.toString() as string;

  for (const fieldName of Object.values(FIELD_NAMES)) {
    formData.delete(fieldName);
  }

  const translations = Array.from(formData.entries());
  return { epic, jira, prefix, translations };
}

function generateJson({ prefix, translations }: GenerateJsonProps) {
  let currentKey = "";

  return translations.reduce<JsonObject>((acc, [key, value]) => {
    if (key.includes("id")) {
      currentKey = `${prefix}.${whiteSpaceToMiddleLine(value)}`;
    } else {
      acc[currentKey] = newLineToBr(value.toString());
    }

    return acc;
  }, {});
}

function downloadPoEditorJson({ json, epic }: PoDownloadProps) {
  downloadFile(
    [JSON.stringify(json, null, 2)],
    `${whiteSpaceToMiddleLine(epic)}-translations.json`
  );
}

function downloadXLSXFile({ json, jira, epic }: XlsxDownloadProps) {
  const data = Object.entries(json).map(([key, translation]) => ({
    jira,
    epic,
    key,
    translation,
  }));

  const worksheet = xlsxUtils.json_to_sheet(data);
  const workbook = xlsxUtils.book_new();
  xlsxUtils.book_append_sheet(workbook, worksheet, jira);

  writeFile(workbook, `${whiteSpaceToMiddleLine(epic)}-translations.xlsx`);
}

function downloadTranslationIds({
  epic,
  prefix,
  translations,
}: DownloadTranslationFileProps) {
  let contentFile =
    `const DOMAIN = '${prefix}.';\n\n` +
    `const ${witheSpacesToUnderLineAndUpperCase(
      epic
    ).toUpperCase()}_TRANSLATIONS = {\n`;

  for (const [key, value] of translations) {
    if (key.includes("id")) {
      contentFile += `\t${witheSpacesToUnderLineAndUpperCase(
        value
      )}: \`\${DOMAIN}${whiteSpaceToMiddleLine(value)}\`,\n`;
    }
  }

  contentFile += "}";
  downloadFile(
    [contentFile],
    `${whiteSpaceToMiddleLine(epic)}-translations.ts`
  );
}
