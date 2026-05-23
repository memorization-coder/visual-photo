export function buildLocalizedPath(locale: string, path: string): string {
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildEventPath(locale: string, qrSlug: string): string {
  return buildLocalizedPath(locale, `/e/${qrSlug}`);
}

export function buildEventCapturePath(locale: string, qrSlug: string, missionId: string): string {
  return buildLocalizedPath(locale, `/e/${qrSlug}/capture/${missionId}`);
}

export function buildEventPreviewPath(locale: string, qrSlug: string, missionId: string): string {
  return buildLocalizedPath(locale, `/e/${qrSlug}/preview/${missionId}`);
}

export function buildEventSubmittedPath(locale: string, qrSlug: string): string {
  return buildLocalizedPath(locale, `/e/${qrSlug}/submitted`);
}

export function buildEventWallPath(locale: string, qrSlug: string): string {
  return buildLocalizedPath(locale, `/e/${qrSlug}/wall`);
}

export function buildHostDemoListPath(locale: string): string {
  return buildLocalizedPath(locale, "/host/events/demo");
}

export function buildHostDemoCreatePath(locale: string): string {
  return buildLocalizedPath(locale, "/host/events/demo/create");
}

export function buildHostDemoEditPath(locale: string, eventId: string): string {
  return buildLocalizedPath(locale, `/host/events/demo/${eventId}`);
}

export function buildHostDemoSharePath(locale: string, eventId: string): string {
  return buildLocalizedPath(locale, `/host/events/demo/${eventId}/share`);
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
