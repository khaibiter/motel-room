import { fallbackSiteContent } from "../lib/siteContent.js";

function linkFields(defaultLabel, defaultHref) {
  return [
    { name: "label", type: "text", required: true, defaultValue: defaultLabel },
    { name: "href", type: "text", required: true, defaultValue: defaultHref },
  ];
}

function statFields(defaultValue, defaultLabel) {
  return [
    { name: "value", type: "text", required: true, defaultValue },
    { name: "label", type: "text", required: true, defaultValue: defaultLabel },
  ];
}

export const WebsiteContent = {
  slug: "website-content",
  label: "Website Content",
  access: {
    read: () => true,
  },
  admin: {
    group: "Website",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true, defaultValue: fallbackSiteContent.seo.title },
                {
                  name: "description",
                  type: "textarea",
                  required: true,
                  defaultValue: fallbackSiteContent.seo.description,
                },
                { name: "siteName", type: "text", required: true, defaultValue: fallbackSiteContent.seo.siteName },
                { name: "url", type: "text", required: true, defaultValue: fallbackSiteContent.seo.url },
              ],
            },
          ],
        },
        {
          label: "Header",
          fields: [
            {
              name: "brand",
              type: "group",
              fields: [
                { name: "name", type: "text", required: true, defaultValue: fallbackSiteContent.brand.name },
                { name: "tagline", type: "text", required: true, defaultValue: fallbackSiteContent.brand.tagline },
              ],
            },
            {
              name: "contact",
              type: "group",
              fields: [
                { name: "name", type: "text", required: true, defaultValue: fallbackSiteContent.contact.name },
                { name: "phone", type: "text", required: true, defaultValue: fallbackSiteContent.contact.phone },
                { name: "zalo", type: "text", required: true, defaultValue: fallbackSiteContent.contact.zalo },
                { name: "facebook", type: "text", required: true, defaultValue: fallbackSiteContent.contact.facebook },
              ],
            },
            {
              name: "navigation",
              type: "array",
              defaultValue: fallbackSiteContent.navigation,
              fields: linkFields("Tìm kiếm", "#filters"),
            },
            {
              name: "subNavigation",
              type: "array",
              defaultValue: fallbackSiteContent.subNavigation,
              fields: linkFields("Tìm kiếm phòng", "#filters"),
            },
            {
              name: "header",
              type: "group",
              fields: [
                { name: "callLabel", type: "text", required: true, defaultValue: fallbackSiteContent.header.callLabel },
                { name: "zaloLabel", type: "text", required: true, defaultValue: fallbackSiteContent.header.zaloLabel },
              ],
            },
          ],
        },
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true, defaultValue: fallbackSiteContent.hero.title },
                {
                  name: "highlightedTitle",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.hero.highlightedTitle,
                },
                { name: "copy", type: "textarea", required: true, defaultValue: fallbackSiteContent.hero.copy },
                {
                  name: "primaryLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.hero.primaryLabel,
                },
                {
                  name: "secondaryLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.hero.secondaryLabel,
                },
                { name: "phoneLabel", type: "text", required: true, defaultValue: fallbackSiteContent.hero.phoneLabel },
                {
                  name: "stats",
                  type: "array",
                  defaultValue: fallbackSiteContent.hero.stats,
                  fields: statFields("4 - 10tr", "Ngân sách phổ biến"),
                },
              ],
            },
            {
              name: "preview",
              type: "group",
              fields: [
                { name: "badge", type: "text", required: true, defaultValue: fallbackSiteContent.preview.badge },
                { name: "image", type: "text", required: true, defaultValue: fallbackSiteContent.preview.image },
                { name: "imageAlt", type: "text", required: true, defaultValue: fallbackSiteContent.preview.imageAlt },
                { name: "title", type: "text", required: true, defaultValue: fallbackSiteContent.preview.title },
                { name: "price", type: "text", required: true, defaultValue: fallbackSiteContent.preview.price },
                { name: "location", type: "text", required: true, defaultValue: fallbackSiteContent.preview.location },
                {
                  name: "socialProof",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.preview.socialProof,
                },
                { name: "status", type: "text", required: true, defaultValue: fallbackSiteContent.preview.status },
              ],
            },
          ],
        },
        {
          label: "Filters",
          fields: [
            {
              name: "filters",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true, defaultValue: fallbackSiteContent.filters.title },
                { name: "copy", type: "textarea", required: true, defaultValue: fallbackSiteContent.filters.copy },
                {
                  name: "resetLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.filters.resetLabel,
                },
                {
                  name: "keywordLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.filters.keywordLabel,
                },
                {
                  name: "keywordPlaceholder",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.filters.keywordPlaceholder,
                },
                { name: "priceLabel", type: "text", required: true, defaultValue: fallbackSiteContent.filters.priceLabel },
                {
                  name: "districtLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.filters.districtLabel,
                },
                { name: "typeLabel", type: "text", required: true, defaultValue: fallbackSiteContent.filters.typeLabel },
                {
                  name: "statusLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.filters.statusLabel,
                },
                {
                  name: "searchLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.filters.searchLabel,
                },
                {
                  name: "quickFiltersLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.filters.quickFiltersLabel,
                },
                {
                  name: "priceRanges",
                  type: "array",
                  defaultValue: fallbackSiteContent.filters.priceRanges,
                  fields: [
                    { name: "label", type: "text", required: true },
                    { name: "value", type: "text", required: true },
                    { name: "low", type: "number", required: true },
                    { name: "high", type: "number", required: true },
                  ],
                },
                {
                  name: "quickFilters",
                  type: "array",
                  defaultValue: fallbackSiteContent.filters.quickFilters,
                  fields: [
                    { name: "label", type: "text", required: true },
                    {
                      name: "group",
                      type: "select",
                      required: true,
                      options: ["district", "type", "status", "price"],
                    },
                    { name: "value", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Sections",
          fields: [
            {
              name: "trustStrip",
              type: "array",
              defaultValue: fallbackSiteContent.trustStrip,
              fields: statFields("4-10 triệu", "Ngân sách phổ biến"),
            },
            {
              name: "listings",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true, defaultValue: fallbackSiteContent.listings.title },
                {
                  name: "resultPrefix",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.listings.resultPrefix,
                },
                {
                  name: "resultSuffix",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.listings.resultSuffix,
                },
                { name: "sortLabel", type: "text", required: true, defaultValue: fallbackSiteContent.listings.sortLabel },
                {
                  name: "emptyTitle",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.listings.emptyTitle,
                },
                {
                  name: "emptyCopy",
                  type: "textarea",
                  required: true,
                  defaultValue: fallbackSiteContent.listings.emptyCopy,
                },
                { name: "likeLabel", type: "text", required: true, defaultValue: fallbackSiteContent.listings.likeLabel },
                { name: "likedLabel", type: "text", required: true, defaultValue: fallbackSiteContent.listings.likedLabel },
                {
                  name: "messageLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.listings.messageLabel,
                },
                {
                  name: "contactLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.listings.contactLabel,
                },
              ],
            },
            {
              name: "contactSection",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.contactSection.eyebrow,
                },
                { name: "title", type: "text", required: true, defaultValue: fallbackSiteContent.contactSection.title },
                { name: "copy", type: "textarea", required: true, defaultValue: fallbackSiteContent.contactSection.copy },
                {
                  name: "zaloLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.contactSection.zaloLabel,
                },
                {
                  name: "facebookLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.contactSection.facebookLabel,
                },
              ],
            },
            {
              name: "mobileContact",
              type: "group",
              fields: [
                {
                  name: "ariaLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.mobileContact.ariaLabel,
                },
                {
                  name: "zaloLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.mobileContact.zaloLabel,
                },
                { name: "callLabel", type: "text", required: true, defaultValue: fallbackSiteContent.mobileContact.callLabel },
                {
                  name: "facebookLabel",
                  type: "text",
                  required: true,
                  defaultValue: fallbackSiteContent.mobileContact.facebookLabel,
                },
              ],
            },
            {
              name: "footer",
              type: "group",
              fields: [{ name: "text", type: "text", required: true, defaultValue: fallbackSiteContent.footer.text }],
            },
          ],
        },
      ],
    },
  ],
};
