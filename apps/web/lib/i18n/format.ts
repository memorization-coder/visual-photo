export function formatDateForLocale(input: Date | string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium"
  }).format(typeof input === "string" ? new Date(input) : input);
}

export function formatTimeForLocale(input: Date | string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    timeStyle: "short"
  }).format(typeof input === "string" ? new Date(input) : input);
}

