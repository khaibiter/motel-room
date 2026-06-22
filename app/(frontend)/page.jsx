import { getPayload } from "payload";
import configPromise from "@payload-config";
import RoomFinder from "./RoomFinder";
import { fallbackListings, normalizeRoomListing } from "../../lib/rooms";
import { fallbackSiteContent, normalizeSiteContent } from "../../lib/siteContent";

export const dynamic = "force-dynamic";

async function getRoomListings() {
  if (!process.env.DATABASE_URI && !process.env.DATABASE_URL) {
    return fallbackListings;
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "rooms",
      depth: 1,
      limit: 100,
      pagination: false,
      sort: "-views",
    });

    if (!result.docs.length) {
      return fallbackListings;
    }

    return result.docs.map(normalizeRoomListing);
  } catch (error) {
    console.error("Could not load Payload room listings", error);
    return fallbackListings;
  }
}

async function getWebsiteContent() {
  if (!process.env.DATABASE_URI && !process.env.DATABASE_URL) {
    return fallbackSiteContent;
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const content = await payload.findGlobal({
      slug: "website-content",
      depth: 0,
    });

    return normalizeSiteContent(content);
  } catch (error) {
    console.error("Could not load Payload website content", error);
    return fallbackSiteContent;
  }
}

export async function generateMetadata() {
  const content = await getWebsiteContent();
  const seo = normalizeSiteContent(content).seo;

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.siteName,
      description: seo.description,
      url: seo.url,
      siteName: seo.siteName,
      locale: "vi_VN",
      type: "website",
    },
  };
}

export default async function HomePage() {
  const [listings, content] = await Promise.all([getRoomListings(), getWebsiteContent()]);

  return <RoomFinder content={content} listings={listings} />;
}
