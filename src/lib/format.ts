const frenchDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function formatDate(date: string): string {
  return frenchDateFormatter.format(new Date(date));
}
