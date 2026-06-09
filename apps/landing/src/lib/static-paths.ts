const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

export function toStaticAssetPath(path: string | undefined): string | undefined {
  if (!path || path.startsWith("#") || ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  return path.startsWith("/") ? `.${path}` : path;
}

export function toStaticRoutePath(path: string): string {
  if (path.startsWith("#") || ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  if (path === "/") {
    return "./";
  }

  if (path.startsWith("/")) {
    return `.${path}.html`;
  }

  return path;
}
