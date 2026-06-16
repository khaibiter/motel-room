import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Tìm Phòng Trọ Cùng Tôi | Khải",
  description:
    "Tìm phòng trọ Duplex, Studio khu vực Quận 4, 7, 8, Nhà Bè với mức giá 4 đến 10 triệu. Liên hệ Khải qua Zalo hoặc Facebook.",
  metadataBase: new URL("http://timphongtrocungtoi.vn"),
  openGraph: {
    title: "Tìm Phòng Trọ Cùng Tôi",
    description: "Lọc phòng theo khu vực, giá, dạng phòng và tình trạng trống.",
    url: "http://timphongtrocungtoi.vn",
    siteName: "Tìm Phòng Trọ Cùng Tôi",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={beVietnam.className}>{children}</body>
    </html>
  );
}
