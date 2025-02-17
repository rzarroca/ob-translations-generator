export type ExtractedFormData = {
  epic: string;
  jira: string;
  prefix: string;
  translations: Array<[string, FormDataEntryValue]>;
};

export type GenerateJsonProps = Pick<
  ExtractedFormData,
  "prefix" | "translations"
>;

export type JsonObject = Record<string, string>;
type ExtractJsonData = { json: JsonObject };

export type PoDownloadProps = Pick<ExtractedFormData, "epic"> & ExtractJsonData;

export type XlsxDownloadProps = Pick<ExtractedFormData, "epic" | "jira"> &
  ExtractJsonData;

export type DownloadTranslationFileProps = Pick<
  ExtractedFormData,
  "epic" | "prefix" | "translations"
>;
