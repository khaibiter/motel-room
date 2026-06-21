import configPromise from "@payload-config";
import { NotFoundPage } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";

const params = Promise.resolve({ segments: [] });
const searchParams = Promise.resolve({});

export default function NotFound() {
  return NotFoundPage({ config: configPromise, importMap, params, searchParams });
}
