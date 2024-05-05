import cookies from "browser-cookies";

const enabledFeatures = Object.entries(cookies.all())
  .filter(([key, val]) => /^swio/.test(key) && val)
  .map(([key, _]) => key);

const flags = new Set(enabledFeatures);

// Available flags
export const USER_ACCOUNTS = "swio-user";

export function enabled(flag) {
  return flags.has(flag);
}
