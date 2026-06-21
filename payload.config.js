import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { Rooms } from "./collections/Rooms.js";
import { Users } from "./collections/Users.js";
import { WebsiteContent } from "./globals/WebsiteContent.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const developmentSecret = "findrooms-development-payload-secret-change-before-production";

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
  collections: [Users, Rooms],
  globals: [WebsiteContent],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || process.env.DATABASE_URL || "",
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || developmentSecret,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
