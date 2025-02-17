function witheSpacesToUnderLineAndUpperCase(value: FormDataEntryValue): string {
  return value.toString().trim().toUpperCase().replace(/\s/g, "_");
}

function whiteSpaceToMiddleLine(value: FormDataEntryValue): string {
  return value.toString().trim().replace(/\s/g, "-");
}

function newLineToBr(value: FormDataEntryValue): string {
  return value.toString().replace(/\n/g, "{br}");
}

export {
  newLineToBr,
  witheSpacesToUnderLineAndUpperCase,
  whiteSpaceToMiddleLine,
};
