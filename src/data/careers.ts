// Careers page data (Kyle + Brandy, 2026-11-07..11-10, getrest email thread
// "Add a Careers page to crew3r.com"). Every word below is the client's own
// posting; add or close openings here, nothing else needs to change.
//
// applyEmail: where /api/apply sends applications (Brandy 11-08, Kyle 11-10:
// estimates@crewthatcares.com, NOT kyle@). textNumber: the office line
// applicants text (Kyle 11-10). It is written 605-965-2727 on the page, not
// "(605) 965-2727", so the sitewide call-tracking swap (DniSwap) leaves it
// alone: the tracking line must never receive the text-to-apply messages.
import { brand } from "~/lib/brand";

export type Opening = {
  slug: string;
  title: string;
  location: string;
  type: string;
  level: string;
  datePosted: string;
  summary: string;
  pay: string[];
  baseHourly?: number;
  requirements: string[];
  benefits: string[];
};

export const careers = {
  applyEmail: "estimates@crewthatcares.com",
  textNumber: "605-965-2727",
  textNumberRaw: "+16059652727",
  openings: [
    {
      slug: "production-apprentice",
      title: "Production Apprentice (Mitigation/Contents)",
      location: "Sioux Falls, SD",
      type: "Full time",
      level: "Entry level",
      datePosted: "2026-11-10",
      summary:
        "Work alongside a lead technician drying out homes damaged by water, fire and mold, and packing out, cleaning and protecting homeowners' belongings. No experience needed: we hire for character and teach the trade.",
      pay: [
        "$18/hour to start, plus overtime",
        "$100 bonus per tech for every emergency job secured while on call",
        "Monthly team incentive pay",
      ],
      baseHourly: 18,
      requirements: [
        "Valid driver's license",
        "Able to lift up to 70 lbs",
        "Comfortable working in attics and crawl spaces",
        "Live within about 20 minutes of our Sioux Falls office",
        "On call nights and weekends on a rotation",
      ],
      benefits: [
        "Health insurance",
        "IRA with company match",
        "80 hours of PTO a year (usable after 90 days)",
        "6 paid holidays",
        "Paid IICRC certifications",
        "PPE and uniforms provided",
        "Promote from within: Apprentice, then Specialist, then Lead",
      ],
    },
  ] as Opening[],
};

const li = (xs: string[]) => xs.map((x) => "<li>" + x + "</li>").join("");

/** One JobPosting JSON-LD script tag per opening ('<' escaped inside the JSON
    so no field can close the tag). The careers page renders it with set:html. */
export function jobPostingLd(): string {
  const site = `https://${brand.domain}`;
  return careers.openings
    .map((o) => ({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: o.title,
      description:
        "<p>" + o.summary + "</p>" +
        "<p><strong>Pay</strong></p><ul>" + li(o.pay) + "</ul>" +
        "<p><strong>Requirements</strong></p><ul>" + li(o.requirements) + "</ul>" +
        "<p><strong>Benefits</strong></p><ul>" + li(o.benefits) + "</ul>",
      datePosted: o.datePosted,
      employmentType: o.type.toLowerCase().includes("part") ? "PART_TIME" : "FULL_TIME",
      hiringOrganization: { "@type": "Organization", name: brand.displayName, sameAs: site,
                            ...(brand.logoUrl ? { logo: brand.logoUrl } : {}) },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: brand.streetAddress,
          addressLocality: brand.addressCity,
          addressRegion: brand.addressState,
          postalCode: brand.postalCode,
          addressCountry: "US",
        },
      },
      ...(o.baseHourly
        ? { baseSalary: { "@type": "MonetaryAmount", currency: "USD",
            value: { "@type": "QuantitativeValue", value: o.baseHourly, unitText: "HOUR" } } }
        : {}),
      directApply: true,
      url: `${site}/careers/#${o.slug}`,
    }))
    .map((s) => '<script type="application/ld+json">' + JSON.stringify(s).replace(/</g, "\\u003c") + "</script>")
    .join("");
}
