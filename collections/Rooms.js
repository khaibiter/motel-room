export const Rooms = {
  slug: "rooms",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "district", "type", "status", "price"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "district",
      type: "select",
      required: true,
      options: ["Quận 4", "Quận 7", "Quận 8", "Nhà Bè"],
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: ["Duplex", "Studio"],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "Trống sẵn",
      options: ["Trống sẵn", "Sắp trống", "Đã thuê"],
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Đơn vị: triệu VND.",
      },
    },
    {
      name: "area",
      type: "text",
      required: true,
    },
    {
      name: "furniture",
      type: "text",
      required: true,
    },
    {
      name: "address",
      type: "text",
      required: true,
    },
    {
      name: "desc",
      type: "textarea",
      required: true,
      label: "Description",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Ảnh đại diện hiển thị ngoài danh sách. Nếu để trống, website sẽ dùng đường dẫn ảnh fallback bên dưới.",
      },
    },
    {
      name: "gallery",
      type: "upload",
      label: "Gallery ảnh / video",
      relationTo: "media",
      hasMany: true,
      displayPreview: true,
      admin: {
        description: "Không bắt buộc. Chọn nhiều ảnh hoặc video tùy phòng; các media này chỉ hiện khi khách nhấn xem chi tiết.",
      },
    },
    {
      name: "image",
      type: "text",
      defaultValue: "/rooms/room-1.svg",
      admin: {
        description: "Ảnh fallback dạng URL/path public, ví dụ /rooms/room-1.svg.",
      },
    },
    {
      name: "views",
      type: "number",
      defaultValue: 0,
      min: 0,
    },
    {
      name: "likes",
      type: "number",
      defaultValue: 0,
      min: 0,
    },
  ],
};
