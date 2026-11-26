// Brand config — hydrated at scaffold time by build_site.py from
// plan-input.json and the client record. All {{TOKENS}} are replaced
// by the scaffold step; this file should not be hand-edited after that.

export const brand = {
  slug: "crew-restoration-construction",
  displayName: "Crew Restoration & Construction",
  shortName: "Crew",
  legalName: "Crew Restoration & Construction",
  // Registered DBA / trade name — filled by rename_site_sync.py the moment
  // the state approves the client's DBA filing (empty until then). When set,
  // the footer carries the "[legal] doing business as [DBA]" line and schema
  // declares it as the business name, so Google/BrightLocal find the new
  // name corroborated on the site before and during the GBP rename.
  dbaName: "",
  domain: "crew3r.com",
  canonicalUrl: "https://crew3r.com",
  phone: "(605) 965-2727",
  phoneRaw: "+16059652727",
  hideMobileHeaderCall: false,
  // Sitewide call-tracking number (2026-08-24). When BOTH fields are set,
  // a tiny inline script in BaseLayout swaps every visible phone mention
  // and tel: link to this number AFTER the page renders. The HTML source,
  // the JSON-LD in schema.ts, and anything crawlers/citation-checkers read
  // keep the canonical NAP number above — humans dial the tracked line,
  // Google sees consistent NAP. Empty = feature off (default at scaffold;
  // filled by the call-tracking provisioning step).
  trackingPhone: "(877) 759-0695",
  trackingPhoneRaw: "+18777590695",
  email: "estimates@crewthatcares.com",
  hours: "24/7",
  // AVAILABILITY 24/7 (Santino 2026-11-21, scripts/availability.py): calls are
  // answered 24/7 (the AI receptionist), every trade, default true; false only
  // when the client said not to. Separate from the emergency-SERVICE rule
  // (emergency_policy.py, the `hours` gate above). openingHoursSpec = the
  // schema hours (scripts/schema_hours.py): 24/7 when available, else the
  // real Google hours, else none.
  available247: true,
  openingHoursSpec: [{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59"}] as { days: string[]; opens: string; closes: string }[],
  foundedYear: "2015",
  primaryCity: "Sioux Falls",
  primaryState: "SD",
  // SERVICE REGION (Santino 2026-11-19): multi-metro clients name the region
  // on every region-wide surface (see src/lib/region.ts); city pages and the
  // address/NAP keep the city. Empty = one-metro client, city wording.
  serviceRegion: "Sioux Falls, SD & the Sioux Empire",
  serviceRegionDetail: "Brandon, Tea, Harrisburg, Dell Rapids, Canton, Hartford and nearby Minnehaha County towns",
  // primaryCity/primaryState = the #1 MARKETING city (headlines, coverage
  // copy). addressCity/addressState = where the business PHYSICALLY is.
  // They are usually the same and often diverge (DISS: Farrell PA office,
  // Youngstown OH target) — only the address pair may go in a PostalAddress.
  addressCity: "Sioux Falls",
  addressState: "SD",
  streetAddress: "3503 South Norton Avenue",
  postalCode: "57105",
  lat: "43.5476008",
  lng: "-96.7293629",
  placeId: "ChIJ62IxEgm2jocRJj94-dsO6Nw",
  googleCid: "",
  imagesBase: "https://images.crew3r.com",
  googleMapsApiKey: "",
  // Analytics — set post-scaffold (scripts/analytics_set.py / create_ga4.py); no-op if empty
  ga4MeasurementId: "G-GCKPEW6C00",
  clarityProjectId: "",
  logoUrl: "/images/logo.png",
  licenseNumbers: ["3814"] as string[],
  licenseAuthority: "",
  // State license-verification page — the footer links the license number here.
  licenseLookupUrl: "",
  licenseType: "",
  // Operator-confirmed "licensed & insured" attestation from plan-input.json —
  // lets the TrustStrip show the badge before a license number is on file.
  licensedInsuredAttested: false as boolean,
  certifications: ["IICRC"] as string[],
  trustBadges: [] as string[],
  jobPhotos: [] as string[],
  sameAsUrls: ["https://www.facebook.com/CrewSiouxFalls/", "https://maps.google.com/maps?cid=15917989220887052070", "https://www.yelp.com/biz/crew-construction-and-restoration-sioux-falls", "https://www.bbb.org/us/sd/sioux-falls/profile/fire-water-damage-restoration/crew-construction-restoration-0714-300168398", "https://www.bing.com/maps?ss=ypid.YN841719F0A3CAB26F", "https://pro.porch.com/sioux-falls-sd/restoration-specialists/crew-construction-and-restoration/pp", "https://homeguide.com/sd/sioux-falls/water-damage-restoration/crew-restoration---construction-fM89hDMcv"] as string[],
  credentials: [{"name": "Contractor License", "kind": "license", "number": "3814", "state": "SD", "holder": "company"}, {"name": "IICRC", "kind": "certification", "authority": "IICRC", "holder": "company"}] as { name: string; kind: string; number?: string; authority?: string; url?: string; since?: string; state?: string; holder?: string; course?: string }[],
  credentialsLine: [{"text": "Licensed in SD (#3814)"}, {"text": "IICRC"}] as { text: string; url?: string }[],
  // GBP rating fields — synced from the live Google Business Profile by
  // scripts/sync_brand_reviews.py; never hand-edited (real ratings only).
  gbpRatingValue: "4.9",
  gbpReviewCount: "629",
  gbpReviews: [
    { author: "Sally", rating: 5, text: "Thanks to Terra and Eric for getting a spill out of my carpet. They were very diligent to remove the spot and the carpet around. A great team!!", when: "October 2026" },
    { author: "Tim", rating: 5, text: "Vic and Tom did an awesome job helping me get my mom‘s house cleaned up and ready to sell. She was a heavy smoker and they had the expertise to get the odor out, cover and seal the stains and make it ready for a new family.", when: "October 2026" },
    { author: "Randy", rating: 5, text: "The people at Crew really do care. Zach Wiseman is always friendly and smiling. He has such a positive attitude and always is brightening someone's day. Keep up the good work Zach!", when: "October 2026" },
    { author: "Jake", rating: 5, text: "Zach is the man. Goes above and beyond to help in every situation!!", when: "October 2026" },
    { author: "Andrew", rating: 5, text: "Zach is the best! Professional and very knowledgeable!", when: "October 2026" },
    { author: "D", rating: 5, text: "Highly recommend! Zach is professional and has great communication!", when: "October 2026" },
  ] as { author: string; rating: number; text: string; when: string }[],
  tagline: "24/7 restoration services in Sioux Falls, SD.",
  ctaLabel: "24/7 Emergency Line",
  // Vertical trade-identity copy — resolved at scaffold time from
  // templates/{vertical}/vertical-tokens.json (see scripts/verticals.py).
  // Components must use these instead of hardcoding a trade phrase.
  // vertical gates layout too: restoration is call-first, so the homepage
  // hero renders NO estimate form there (Santino 2026-09-11).
  vertical: "restoration",
  tradeNoun: "restoration",
  specialistPhrase: "Damage Restoration Specialists",
  announcementSuffix: "24/7 Emergency Response",
  homeAboutBlurb: "Crew Restoration & Construction serves Sioux Falls and the surrounding SD area with professional damage restoration for homes and businesses. From the first emergency call to the final walkthrough, our team manages the entire recovery, and we answer the phone 24/7, so help is on the way the moment something goes wrong.",
} as const;

export const entityId = `${brand.canonicalUrl}/#identity`;
