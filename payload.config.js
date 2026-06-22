import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import { Media } from "./collections/Media.js";
import { Rooms } from "./collections/Rooms.js";
import { Users } from "./collections/Users.js";
import { WebsiteContent } from "./globals/WebsiteContent.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const developmentSecret = "findrooms-development-payload-secret-change-before-production";
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseStorageBucket = process.env.SUPABASE_STORAGE_BUCKET || "room-images";
const roomImagePrefix = "rooms";

function getSupabaseS3Endpoint() {
  const explicitEndpoint = process.env.SUPABASE_S3_ENDPOINT?.replace(/\/$/, "");

  if (explicitEndpoint) {
    return explicitEndpoint;
  }

  if (!supabaseUrl) {
    return undefined;
  }

  try {
    const url = new URL(supabaseUrl);

    if (url.hostname.endsWith(".supabase.co")) {
      url.hostname = url.hostname.replace(".supabase.co", ".storage.supabase.co");
    }

    url.pathname = "/storage/v1/s3";
    url.search = "";
    url.hash = "";

    return url.toString().replace(/\/$/, "");
  } catch {
    return `${supabaseUrl}/storage/v1/s3`;
  }
}

const supabaseS3Endpoint = getSupabaseS3Endpoint();
const hasSupabaseStorageEnv = Boolean(
  supabaseUrl &&
    supabaseS3Endpoint &&
    process.env.SUPABASE_S3_ACCESS_KEY_ID &&
    process.env.SUPABASE_S3_SECRET_ACCESS_KEY &&
    process.env.SUPABASE_S3_REGION
);

function getSupabasePublicURL({ filename, prefix }) {
  const pathParts = [roomImagePrefix, prefix, filename]
    .filter(Boolean)
    .flatMap((part) => String(part).split("/").filter(Boolean))
    .map(encodeURIComponent);
  return `${supabaseUrl}/storage/v1/object/public/${supabaseStorageBucket}/${pathParts.join("/")}`;
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.js"),
    },
    meta: {
      titleSuffix: "- Findrooms CMS",
    },
  },
  collections: [Users, Media, Rooms],
  globals: [WebsiteContent],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || process.env.DATABASE_URL || "",
  }),
  editor: lexicalEditor(),
  plugins: [
    s3Storage({
      alwaysInsertFields: true,
      bucket: supabaseStorageBucket,
      collections: {
        media: {
          generateFileURL: hasSupabaseStorageEnv ? getSupabasePublicURL : undefined,
          prefix: roomImagePrefix,
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || "",
        },
        endpoint: supabaseS3Endpoint,
        forcePathStyle: true,
        region: process.env.SUPABASE_S3_REGION || "auto",
      },
      enabled: hasSupabaseStorageEnv,
      useCompositePrefixes: true,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || developmentSecret,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
