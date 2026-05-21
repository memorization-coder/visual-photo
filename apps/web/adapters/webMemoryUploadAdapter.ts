import { buildMemoryUploadPaths } from "@/lib/image";
import type { CapturedPhoto, MemoryUploadAdapter, StorageAdapter } from "./interfaces";

type UploadResult = {
  mainsizeUrl: string;
  thumbnailUrl: string;
  storagePath: string;
};

async function requireBlob(photo: CapturedPhoto): Promise<Blob> {
  if (photo.file) {
    return photo.file;
  }

  const response = await fetch(photo.localUri);
  return response.blob();
}

export class WebMemoryUploadAdapter implements MemoryUploadAdapter {
  constructor(private readonly storageAdapter: StorageAdapter) {}

  async uploadVisualMemory(input: {
    eventId: string;
    participantId: string;
    missionId: string;
    photo: CapturedPhoto;
  }): Promise<UploadResult> {
    const { photo, eventId, participantId, missionId } = input;
    const blob = await requireBlob(photo);
    const paths = buildMemoryUploadPaths({
      eventId,
      participantId,
      missionId,
      mimeType: photo.mimeType
    });

    const [mainsizeUpload, thumbnailUpload] = await Promise.all([
      this.storageAdapter.upload(paths.mainsizePath, blob, photo.mimeType),
      this.storageAdapter.upload(paths.thumbnailPath, blob, photo.mimeType)
    ]);

    return {
      mainsizeUrl: mainsizeUpload.publicUrl,
      thumbnailUrl: thumbnailUpload.publicUrl,
      storagePath: paths.basePath
    };
  }
}

