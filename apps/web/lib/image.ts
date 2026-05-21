const mimeToExtensionMap: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic"
};

export function detectImageExtension(mimeType: string): string {
  const extension = mimeToExtensionMap[mimeType];
  if (!extension) {
    throw new Error("Unsupported image MIME type.");
  }
  return extension;
}

export function buildMemoryUploadPaths(params: {
  eventId: string;
  participantId: string;
  missionId: string;
  mimeType: string;
}): {
  basePath: string;
  mainsizePath: string;
  thumbnailPath: string;
} {
  const extension = detectImageExtension(params.mimeType);
  const basePath = `events/${params.eventId}/participants/${params.participantId}/missions/${params.missionId}`;

  return {
    basePath,
    mainsizePath: `${basePath}/mainsize.${extension}`,
    thumbnailPath: `${basePath}/thumbnail.${extension}`
  };
}

export type ImageDerivativePlan = {
  mainsizeMaxDimension: number;
  thumbnailMaxDimension: number;
  quality: number;
};

export const defaultImageDerivativePlan: ImageDerivativePlan = {
  mainsizeMaxDimension: 2048,
  thumbnailMaxDimension: 720,
  quality: 0.86
};

