export function handleLoadFields(fields: string[]): void {
  fields.forEach((field) => {
    const input = document.getElementById(field) as HTMLInputElement;
    if (input) {
      input.value = localStorage.getItem(field) ?? "";
    }
  });
}

export function handleStoreField(
  e: React.FocusEvent<HTMLInputElement, Element>
): void {
  localStorage.setItem(e.target.id, e.target.value);
}
