export function formatDate(dateString: string | null): string {
  if (!dateString) return "Fecha desconocida";

  const date = new Date(dateString);

  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatYear(dateString: string | null): string {
  if (!dateString) return "—";
  return new Date(dateString).getFullYear().toString();
}