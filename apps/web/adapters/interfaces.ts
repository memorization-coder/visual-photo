export type AuthUser = {
  id: string;
  email?: string;
};

export type CapturedPhoto = {
  localUri: string;
  mimeType: string;
  width?: number;
  height?: number;
  fileSizeBytes?: number;
  file?: File;
};

export interface AuthAdapter {
  signInWithGoogle(redirectTo?: string): Promise<void>;
  signInWithApple(redirectTo?: string): Promise<void>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
}

export interface PhotoCaptureAdapter {
  capturePhoto(): Promise<CapturedPhoto>;
  selectPhotoFromLibrary(): Promise<CapturedPhoto>;
}

export interface MemoryUploadAdapter {
  uploadVisualMemory(input: {
    eventId: string;
    participantId: string;
    missionId: string;
    photo: CapturedPhoto;
  }): Promise<{
    mainsizeUrl: string;
    thumbnailUrl: string;
    storagePath: string;
  }>;
}

export interface DeepLinkAdapter {
  getCurrentUrl(): string;
  buildEventLink(qrSlug: string): string;
  readEventSlug(url: string): string | null;
}

export interface AnalyticsAdapter {
  track(eventName: string, properties?: Record<string, unknown>): Promise<void>;
}

export interface StorageAdapter {
  upload(path: string, file: Blob, contentType: string): Promise<{ publicUrl: string }>;
}

