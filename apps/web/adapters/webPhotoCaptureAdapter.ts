import type { CapturedPhoto, PhotoCaptureAdapter } from "./interfaces";

async function pickPhoto(capture?: "environment"): Promise<CapturedPhoto> {
  if (typeof document === "undefined") {
    throw new Error("Photo capture requires a browser environment.");
  }

  return new Promise<CapturedPhoto>((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    if (capture) {
      input.capture = capture;
    }

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error("No photo selected."));
        return;
      }

      resolve({
        localUri: URL.createObjectURL(file),
        mimeType: file.type,
        fileSizeBytes: file.size,
        file
      });
    };

    input.click();
  });
}

export class WebPhotoCaptureAdapter implements PhotoCaptureAdapter {
  capturePhoto(): Promise<CapturedPhoto> {
    return pickPhoto("environment");
  }

  selectPhotoFromLibrary(): Promise<CapturedPhoto> {
    return pickPhoto();
  }
}

