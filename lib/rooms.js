export const fallbackListings = [
  {
    id: 1,
    title: "Duplex ban công gần Nguyễn Tất Thành",
    district: "Quận 4",
    type: "Duplex",
    status: "Trống sẵn",
    price: 8.5,
    area: "32m²",
    furniture: "Cơ bản",
    address: "Đường Tôn Đản, Quận 4",
    desc: "Gác cao thoáng, cửa sổ lớn, nội thất cơ bản, di chuyển nhanh sang Quận 1.",
    views: 128,
    likes: 24,
    image: "/rooms/room-1.svg",
    gallery: ["/rooms/room-1.svg", "/rooms/room-2.svg", "/rooms/room-3.svg"],
  },
  {
    id: 2,
    title: "Studio full nội thất gần Lotte Mart",
    district: "Quận 7",
    type: "Studio",
    status: "Sắp trống",
    price: 7.2,
    area: "28m²",
    furniture: "Full nội thất",
    address: "Đường Nguyễn Thị Thập, Quận 7",
    desc: "Có bếp riêng, máy giặt chung, hầm xe rộng, phù hợp người đi làm.",
    views: 96,
    likes: 18,
    image: "/rooms/room-2.svg",
    gallery: ["/rooms/room-2.svg", "/rooms/room-4.svg", "/rooms/room-5.svg"],
  },
  {
    id: 3,
    title: "Studio cửa sổ lớn khu Phạm Hùng",
    district: "Quận 8",
    type: "Studio",
    status: "Trống sẵn",
    price: 5.8,
    area: "24m²",
    furniture: "Cơ bản",
    address: "Đường Phạm Hùng, Quận 8",
    desc: "Phòng sáng, có thang máy, giờ giấc tự do, gần siêu thị và trạm xe buýt.",
    views: 211,
    likes: 35,
    image: "/rooms/room-3.svg",
    gallery: ["/rooms/room-3.svg", "/rooms/room-1.svg", "/rooms/room-6.svg"],
  },
  {
    id: 4,
    title: "Duplex mới xây gần Phú Mỹ Hưng",
    district: "Nhà Bè",
    type: "Duplex",
    status: "Trống sẵn",
    price: 9.6,
    area: "38m²",
    furniture: "Máy lạnh, tủ, bếp",
    address: "Đường Nguyễn Hữu Thọ, Nhà Bè",
    desc: "Không gian rộng, có ban công, máy lạnh, tủ bếp, thuận tiện đi Quận 7.",
    views: 174,
    likes: 29,
    image: "/rooms/room-4.svg",
    gallery: ["/rooms/room-4.svg", "/rooms/room-6.svg", "/rooms/room-2.svg"],
  },
  {
    id: 5,
    title: "Studio yên tĩnh gần cầu Kênh Tẻ",
    district: "Quận 4",
    type: "Studio",
    status: "Đã thuê",
    price: 6.4,
    area: "25m²",
    furniture: "Nội thất gọn",
    address: "Đường Khánh Hội, Quận 4",
    desc: "Khu an ninh, nội thất gọn, phù hợp một người hoặc cặp đôi.",
    views: 83,
    likes: 12,
    image: "/rooms/room-5.svg",
    gallery: ["/rooms/room-5.svg", "/rooms/room-3.svg", "/rooms/room-1.svg"],
  },
  {
    id: 6,
    title: "Duplex nội thất cao cấp khu Him Lam",
    district: "Quận 7",
    type: "Duplex",
    status: "Sắp trống",
    price: 10,
    area: "40m²",
    furniture: "Cao cấp",
    address: "Đường D1 Him Lam, Quận 7",
    desc: "Thiết kế hiện đại, bếp tách mùi, gần Crescent Mall và khu văn phòng.",
    views: 245,
    likes: 41,
    image: "/rooms/room-6.svg",
    gallery: ["/rooms/room-6.svg", "/rooms/room-4.svg", "/rooms/room-2.svg"],
  },
];

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseStorageBucket = process.env.SUPABASE_STORAGE_BUCKET || "room-images";
const mediaStoragePrefix = "rooms";

function isExternalURL(value) {
  return /^https?:\/\//i.test(value);
}

function getFilenameFromPath(value) {
  const withoutQuery = value.split("?")[0].split("#")[0];
  return withoutQuery.split("/").filter(Boolean).pop() || "";
}

function getSupabaseMediaURL(filename) {
  if (!supabaseUrl || !filename) {
    return "";
  }

  return `${supabaseUrl}/storage/v1/object/public/${supabaseStorageBucket}/${mediaStoragePrefix}/${encodeURIComponent(filename)}`;
}

function normalizeStoredMediaURL(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  const url = value.trim();

  if (!url) {
    return "";
  }

  if (isExternalURL(url) || url.startsWith("/rooms/")) {
    return url;
  }

  if (url.startsWith("/api/media/file/")) {
    return getSupabaseMediaURL(getFilenameFromPath(url)) || url;
  }

  if (url.startsWith("/media/")) {
    return getSupabaseMediaURL(getFilenameFromPath(url)) || url;
  }

  if (url.startsWith("/")) {
    return url;
  }

  return getSupabaseMediaURL(getFilenameFromPath(url)) || `/media/${url}`;
}

function getUploadedMediaURL(media) {
  if (!media || typeof media !== "object") {
    return "";
  }

  return normalizeStoredMediaURL(media.sizes?.card?.url || media.url || "");
}

function getUploadedImageURL(media) {
  if (!media || typeof media !== "object") {
    return "";
  }

  if (media.mimeType && !media.mimeType.startsWith("image/")) {
    return "";
  }

  return normalizeStoredMediaURL(media.sizes?.card?.url || media.url || "");
}

function getMediaType(media, url = "") {
  if (media?.mimeType?.startsWith("video/")) {
    return "video";
  }

  if (/\.(mp4|mov|m4v|webm|ogg)(\?|#|$)/i.test(url)) {
    return "video";
  }

  return "image";
}

function normalizeGalleryItem(item) {
  if (typeof item === "string") {
    const url = normalizeStoredMediaURL(item);

    return {
      type: getMediaType(null, url),
      url,
    };
  }

  const media = item?.photo || item?.media || item;
  const url = getUploadedMediaURL(media) || normalizeStoredMediaURL(item?.image || "");

  if (!url) {
    return null;
  }

  return {
    alt: media?.alt || item?.alt || "",
    type: getMediaType(media, url),
    url,
  };
}

function getGalleryMedia(room) {
  if (!Array.isArray(room.gallery)) {
    return [];
  }

  return room.gallery
    .map(normalizeGalleryItem)
    .filter(Boolean);
}

export function normalizeRoomListing(room) {
  const image = getUploadedImageURL(room.photo) || normalizeStoredMediaURL(room.image) || "/rooms/room-1.svg";
  const gallery = getGalleryMedia(room);

  return {
    id: room.id,
    title: room.title,
    district: room.district,
    type: room.type,
    status: room.status,
    price: Number(room.price ?? 0),
    area: room.area,
    furniture: room.furniture,
    address: room.address,
    desc: room.desc,
    views: Number(room.views ?? 0),
    likes: Number(room.likes ?? 0),
    image,
    gallery: gallery.length ? gallery : [{ type: "image", url: image }],
  };
}
