import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Findrooms | Khải",
  description:
    "Find rental rooms, Duplex units, and Studio rooms in District 4, District 7, District 8, and Nhà Bè from 4 to 10 million VND. Contact Khải via Zalo or Facebook.",
  metadataBase: new URL("http://findrooms.vn"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Findrooms",
    description: "Filter rental rooms by location, price, room type, and availability.",
    url: "http://findrooms.vn",
    siteName: "Findrooms",
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
