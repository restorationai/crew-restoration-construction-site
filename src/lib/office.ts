// The secondary office (offices collection, scripts/office_pages.py) that
// serves a city page, by its served_area_slugs. Undefined for single-office
// clients and for cities the main office covers.
import { getCollection } from "astro:content";
import { brand } from "./brand";

export async function officeForArea(areaSlug: string) {
  let offices: Awaited<ReturnType<typeof getCollection<"offices">>> = [];
  try {
    offices = await getCollection("offices");
  } catch {
    return undefined;
  }
  return offices.find((o) => (o.data.served_area_slugs || []).includes(areaSlug))?.data;
}

// The phone a page shows (Kyle/Crew 10-19): a page that belongs to a second
// office (its office page, or a city page it serves) sets
// Astro.locals.servingOffice, and every call button on that page dials the
// office's own line. Everywhere else: the main number.
export function pagePhone(locals: unknown): { phone: string; phoneRaw: string } {
  const o = (locals as { servingOffice?: { phone?: string; phone_display?: string } } | undefined)
    ?.servingOffice;
  return o?.phone && o?.phone_display
    ? { phone: o.phone_display, phoneRaw: o.phone }
    : { phone: String(brand.phone), phoneRaw: String(brand.phoneRaw) };
}
