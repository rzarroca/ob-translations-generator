function witheSpacesToUnderLineAndUpperCase(value: FormDataEntryValue): string {
  return value.toString().trim().toUpperCase().replace(/\s/g, "_");
}

function whiteSpaceToMiddleLine(value: FormDataEntryValue): string {
  return value.toString().trim().toLowerCase().replace(/\s/g, "-");
}

function whiteSpaceToCamelCase(value: FormDataEntryValue): string {
  return value
    .toString()
    .trim()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, "");
}

function newLineToBr(value: FormDataEntryValue): string {
  return value.toString().replace(/\n/g, "{br}");
}

export {
  newLineToBr,
  whiteSpaceToCamelCase,
  witheSpacesToUnderLineAndUpperCase,
  whiteSpaceToMiddleLine,
};
