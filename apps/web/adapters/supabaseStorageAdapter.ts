import type { StorageAdapter } from "./interfaces";

type SupabaseStorageClient = {
  storage: {
    from(bucket: string): {
      upload(
        path: string,
        file: Blob,
        options: { contentType: string; upsert: boolean }
      ): Promise<{ error: { message: string } | null }>;
      getPublicUrl(path: string): { data: { publicUrl: string } };
    };
  };
};

export class SupabaseStorageAdapter implements StorageAdapter {
  constructor(
    private readonly client: SupabaseStorageClient,
    private readonly bucket: string
  ) {}

  async upload(path: string, file: Blob, contentType: string): Promise<{ publicUrl: string }> {
    const storage = this.client.storage.from(this.bucket);
    const result = await storage.upload(path, file, {
      contentType,
      upsert: true
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    const publicUrl = storage.getPublicUrl(path).data.publicUrl;
    return { publicUrl };
  }
}

