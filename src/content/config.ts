import { defineCollection, z } from "astro:content";

const seoFields = z.object({
  title: z.string(),
  h1: z.string(),
  meta_description: z.string(),
  primary_keyword: z.string(),
  secondary_keywords: z.array(z.string()).default([]),
  search_intent: z.string().optional(),
  canonical_url: z.string().url().optional(),
});

const imageFields = z.object({
  hero: z.string().optional(),
  og: z.string().optional(),
  inline: z.array(z.string()).default([]),
});

const planFields = z.object({
  plan_hash: z.string().optional(),
  archetype: z.string(),
  priority: z.number().default(0),
  generated_at: z.string().optional(),
  manual_override: z.boolean().default(false),
});

const internalLinks = z.array(z.string()).default([]);

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const breadcrumb = z.array(z.object({ name: z.string(), url: z.string().optional() }));

const pages = defineCollection({
  type: "content",
  schema: seoFields.merge(imageFields).merge(planFields).extend({
    internal_links: internalLinks,
    breadcrumb: breadcrumb.optional(),
    faq: z.array(faqItem).default([]),
  }),
});

const services = defineCollection({
  type: "content",
  schema: seoFields.merge(imageFields).merge(planFields).extend({
    service_slug: z.string(),
    service_display: z.string(),
    internal_links: internalLinks,
    breadcrumb: breadcrumb.optional(),
    faq: z.array(faqItem).default([]),
  }),
});

const serviceAreas = defineCollection({
  type: "content",
  schema: seoFields.merge(imageFields).merge(planFields).extend({
    area_slug: z.string(),
    city: z.string(),
    state: z.string(),
    primary: z.boolean().default(false),
    internal_links: internalLinks,
    breadcrumb: breadcrumb.optional(),
    faq: z.array(faqItem).default([]),
  }),
});

const locations = defineCollection({
  type: "content",
  schema: seoFields.merge(imageFields).merge(planFields).extend({
    area_slug: z.string(),
    service_slug: z.string(),
    city: z.string(),
    state: z.string(),
    service_display: z.string(),
    internal_links: internalLinks,
    breadcrumb: breadcrumb.optional(),
    faq: z.array(faqItem).default([]),
    content_guardrails: z.enum(["sensitive"]).optional(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: seoFields.merge(imageFields).merge(planFields).extend({
    published_at: z.string(),
    updated_at: z.string().optional(),
    // named author on file (byline + BlogPosting Person), optional
    author: z.string().optional(),
    services: z.array(z.string()).default([]),
    internal_links: internalLinks,
    breadcrumb: breadcrumb.optional(),
    faq: z.array(faqItem).default([]),
    youtube_id: z.string().optional(),
    video_transcript: z.string().optional().default(""),
  }),
});

// Case studies (Santino 2026-09-05): real jobs from the crew hub's Job
// Story card + client-emailed write-ups, published under /case-studies/
// instead of the blog — a browsable proof section with its own breadcrumbs
// and CollectionPage schema. Shape mirrors blog so case_study_intake's
// rendering conventions carry over unchanged.
const caseStudies = defineCollection({
  type: "content",
  schema: seoFields.merge(imageFields).merge(planFields).extend({
    published_at: z.string(),
    updated_at: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    services: z.array(z.string()).default([]),
    internal_links: internalLinks,
    breadcrumb: breadcrumb.optional(),
    faq: z.array(faqItem).default([]),
  }),
});

// Office pages (multi-location Build 3, 2026-10-19): one entry per real
// SECONDARY office, written by scripts/office_pages.py from the
// company_locations row (the single source of truth; never hand-edit the
// facts here). Rendered at /locations/{office_slug}/ with that office's own
// name, address, phone, hours and LocalBusiness schema, so its Google
// Business Profile links to a page that matches it. Separate from
// `locations` above (that collection is the city x service pages under
// /service-areas/). Empty for single-office clients: no page, no output.
const offices = defineCollection({
  type: "content",
  schema: seoFields.merge(imageFields).merge(planFields).extend({
    office_id: z.string(),
    office_slug: z.string(),
    label: z.string(),
    display_name: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string().nullable().optional(),
    phone: z.string(),
    phone_display: z.string(),
    lat: z.number().nullable().optional(),
    lng: z.number().nullable().optional(),
    gbp_url: z.string().nullable().optional(),
    hours_text: z.string().nullable().optional(),
    is_247: z.boolean().default(false),
    hours_spec: z
      .array(z.object({ days: z.array(z.string()), opens: z.string(), closes: z.string() }))
      .default([]),
    main_city: z.string().nullable().optional(),
    main_state: z.string().nullable().optional(),
    services: z.array(z.string()).default([]),
    nearby_areas: z
      .array(z.object({ slug: z.string(), city: z.string(), state: z.string(), miles: z.number() }))
      .default([]),
    internal_links: internalLinks,
    breadcrumb: breadcrumb.optional(),
    faq: z.array(faqItem).default([]),
  }),
});

const legal = defineCollection({
  type: "content",
  schema: seoFields.merge(imageFields).merge(planFields).extend({
    ref: z.enum(["privacy", "terms", "accessibility"]),
    internal_links: internalLinks,
    breadcrumb: breadcrumb.optional(),
  }),
});

export const collections = { pages, services, serviceAreas, locations, offices, blog, caseStudies, legal };
