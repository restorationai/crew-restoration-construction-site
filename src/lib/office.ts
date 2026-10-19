// The secondary office (offices collection, scripts/office_pages.py) that
// serves a city page, by its served_area_slugs. Undefined for single-office
// clients and for cities the main office covers.
import { getCollection } from "astro:content";

export async function officeForArea(areaSlug: string) {
  let offices: Awaited<ReturnType<typeof getCollection<"offices">>> = [];
  try {
    offices = await getCollection("offices");
  } catch {
    return undefined;
  }
  return offices.find((o) => (o.data.served_area_slugs || []).includes(areaSlug))?.data;
}
