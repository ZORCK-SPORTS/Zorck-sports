const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_BASE_PATH =
  configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");

export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  "https://zorck-sport.fagundessport.chatgpt.site"
).replace(/\/$/, "");

export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`;

export function withBasePath(path: string) {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_PATH}${pathname}`;
}

export function absoluteSiteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
