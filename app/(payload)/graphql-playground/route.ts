import configPromise from "@payload-config";
import { GRAPHQL_PLAYGROUND_GET, REST_OPTIONS } from "@payloadcms/next/routes";

export const GET = GRAPHQL_PLAYGROUND_GET(configPromise);
export const OPTIONS = REST_OPTIONS(configPromise);
