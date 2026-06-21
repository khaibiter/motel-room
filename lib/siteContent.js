export const fallbackSiteContent = {
  seo: {
    title: "Findrooms | Khải",
    description:
      "Find rental rooms, Duplex units, and Studio rooms in District 4, District 7, District 8, and Nhà Bè from 4 to 10 million VND. Contact Khải via Zalo or Facebook.",
    siteName: "Findrooms",
    url: "http://findrooms.vn",
  },
  brand: {
    name: "Findrooms",
    tagline: "Tư vấn phòng bởi Khải",
  },
  contact: {
    name: "Khải",
    phone: "0812333067",
    zalo: "https://zalo.me/0812333067",
    facebook: "https://www.facebook.com/share/1EzxXXeDBL/",
  },
  navigation: [
    { label: "Tìm kiếm", href: "#filters" },
    { label: "Phòng nổi bật", href: "#listings" },
    { label: "Liên hệ", href: "#contact" },
  ],
  subNavigation: [
    { label: "Tìm kiếm phòng", href: "#filters" },
    { label: "Danh sách phòng", href: "#listings" },
    { label: "Liên hệ Khải", href: "#contact" },
  ],
  header: {
    callLabel: "Gọi Khải",
    zaloLabel: "Nhắn Zalo",
  },
  hero: {
    title: "Tìm phòng trọ đẹp, đúng nhu cầu,",
    highlightedTitle: "dễ chốt lịch xem",
    copy:
      "Lọc phòng theo khu vực Quận 4, Quận 7, Quận 8, Nhà Bè; ngân sách 4 - 10 triệu; dạng phòng Duplex hoặc Studio; trạng thái trống sẵn hoặc đã thuê và sắp trống.",
    primaryLabel: "Tìm phòng ngay",
    secondaryLabel: "Nhắn Zalo Khải",
    phoneLabel: "Gọi 0812 333 067",
    stats: [
      { value: "4 - 10tr", label: "Ngân sách phổ biến" },
      { value: "4 khu vực", label: "Q4, Q7, Q8, Nhà Bè" },
      { value: "2 kiểu phòng", label: "Duplex và Studio" },
    ],
  },
  preview: {
    badge: "Phòng mới cập nhật",
    image: "/rooms/room-2.svg",
    imageAlt: "Studio full nội thất, ban công thoáng",
    title: "Studio full nội thất, ban công thoáng",
    price: "6,5tr",
    location: "Quận 7 - gần Nguyễn Thị Thập",
    socialProof: "1.248 lượt xem · 86 yêu thích",
    status: "Trống sẵn · Có thể xem phòng trong ngày",
  },
  filters: {
    title: "Tìm kiếm khu vực",
    copy: "Chọn bộ lọc để xem nhanh các phòng phù hợp với nhu cầu.",
    resetLabel: "Đặt lại bộ lọc",
    keywordLabel: "Khu vực / từ khóa",
    keywordPlaceholder: "Ví dụ: Nguyễn Thị Thập, Lotte, Him Lam",
    priceLabel: "Giá tiền",
    districtLabel: "Quận / khu",
    typeLabel: "Dạng phòng",
    statusLabel: "Trạng thái",
    searchLabel: "Tìm phòng",
    quickFiltersLabel: "Bộ lọc nhanh",
    priceRanges: [
      { label: "4 - 10 triệu", value: "4-10", low: 4, high: 10 },
      { label: "Dưới 6 triệu", value: "4-6", low: 4, high: 6 },
      { label: "6 - 8 triệu", value: "6-8", low: 6, high: 8 },
      { label: "8 - 10 triệu", value: "8-10", low: 8, high: 10 },
    ],
    quickFilters: [
      { label: "Quận 7", group: "district", value: "Quận 7" },
      { label: "Quận 4", group: "district", value: "Quận 4" },
      { label: "Studio", group: "type", value: "Studio" },
      { label: "Duplex", group: "type", value: "Duplex" },
      { label: "Trống sẵn", group: "status", value: "Trống sẵn" },
      { label: "Dưới 6 triệu", group: "price", value: "4-6" },
    ],
  },
  trustStrip: [
    { value: "4-10 triệu", label: "Ngân sách phổ biến" },
    { value: "4 khu vực", label: "Quận 4, 7, 8, Nhà Bè" },
    { value: "Zalo 0812333067", label: "Khải tư vấn trực tiếp" },
  ],
  listings: {
    title: "Phòng trọ nổi bật",
    resultPrefix: "Đang hiển thị",
    resultSuffix: "phòng phù hợp.",
    sortLabel: "Sắp xếp",
    emptyTitle: "Chưa có phòng khớp bộ lọc",
    emptyCopy: "Hãy thử đổi khu vực, dạng phòng hoặc khoảng giá để xem thêm lựa chọn.",
    likeLabel: "Yêu thích",
    likedLabel: "Đã yêu thích",
    messageLabel: "Nhắn tin",
    contactLabel: "Liên hệ",
  },
  contactSection: {
    eyebrow: "Tư vấn miễn phí",
    title: "Cần xem phòng hoặc giữ chỗ?",
    copy:
      "Nhắn Khải thông tin khu vực, ngân sách và ngày muốn dọn vào. Mình sẽ gửi phòng còn phù hợp, video thực tế và hỗ trợ lịch xem.",
    zaloLabel: "Nhắn Zalo",
    facebookLabel: "Tìm Facebook",
  },
  mobileContact: {
    ariaLabel: "Liên hệ nhanh",
    zaloLabel: "Zalo",
    callLabel: "Gọi",
    facebookLabel: "Facebook",
  },
  footer: {
    text: "© 2026 findrooms.vn - Khải hỗ trợ tìm phòng trọ khu Nam Sài Gòn.",
  },
};

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function mergeContent(fallback, value) {
  if (Array.isArray(fallback)) {
    return Array.isArray(value) && value.length > 0 ? value : fallback;
  }

  if (isObject(fallback)) {
    return Object.fromEntries(
      Object.entries(fallback).map(([key, fallbackValue]) => [
        key,
        mergeContent(fallbackValue, value?.[key]),
      ])
    );
  }

  return value === undefined || value === null || value === "" ? fallback : value;
}

export function normalizeSiteContent(content) {
  return mergeContent(fallbackSiteContent, content);
}
