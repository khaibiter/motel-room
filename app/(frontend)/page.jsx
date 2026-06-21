import { getPayload } from "payload";
import configPromise from "@payload-config";
import RoomFinder from "./RoomFinder";
import { fallbackListings, normalizeRoomListing } from "../../lib/rooms";

export const dynamic = "force-dynamic";

async function getRoomListings() {
  if (!process.env.DATABASE_URI && !process.env.DATABASE_URL) {
    return fallbackListings;
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "rooms",
      depth: 0,
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

export default async function HomePage() {
  const listings = await getRoomListings();

  return <RoomFinder listings={listings} />;
}
