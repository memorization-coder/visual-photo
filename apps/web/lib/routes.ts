export function buildLocalizedPath(locale: string, path: string): string {
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildEventPath(locale: string, qrSlug: string): string {
  return buildLocalizedPath(locale, `/events/${qrSlug}`);
}

export function buildAuthRedirectTarget(params: {
  locale: string;
  qrSlug?: string;
  fallbackPath?: string;
}): string {
  const basePath = params.qrSlug
    ? buildEventPath(params.locale, params.qrSlug)
    : buildLocalizedPath(params.locale, params.fallbackPath ?? "/");

  return buildLocalizedPath(params.locale, `/auth/callback?redirect=${encodeURIComponent(basePath)}`);
}

export function restoreRedirectFromSearchParams(searchParams: URLSearchParams): string | null {
  const redirect = searchParams.get("redirect");
  return redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : null;
}
