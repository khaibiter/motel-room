export const Media = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["alt", "filename", "mimeType", "updatedAt"],
    useAsTitle: "alt",
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      {
        name: "card",
        width: 900,
        height: 620,
        position: "centre",
      },
      {
        name: "thumbnail",
        width: 360,
        height: 240,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt text",
      admin: {
        description: "Mô tả ngắn cho ảnh, dùng cho SEO và accessibility.",
      },
    },
  ],
};
