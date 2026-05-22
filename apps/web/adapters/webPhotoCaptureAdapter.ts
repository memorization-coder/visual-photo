import type { CameraFacingMode, CapturedPhoto, LiveCameraSession, PhotoCaptureAdapter } from "./interfaces";

const MAX_IMAGE_EDGE = 1600;

async function readImageDimensions(localUri: string): Promise<{ width?: number; height?: number }> {
  if (typeof Image === "undefined") {
    return {};
  }

  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight
      });
    };

    image.onerror = () => resolve({});
    image.src = localUri;
  });
}

function ensureBrowserEnvironment() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("Photo capture requires a browser environment.");
  }
}

async function fileToCapturedPhoto(file: File): Promise<CapturedPhoto> {
  const localUri = URL.createObjectURL(file);
  const dimensions = await readImageDimensions(localUri);

  return {
    localUri,
    mimeType: file.type || "image/jpeg",
    fileSizeBytes: file.size,
    width: dimensions.width,
    height: dimensions.height,
    file
  };
}

async function pickPhoto(capture?: "environment"): Promise<CapturedPhoto> {
  ensureBrowserEnvironment();

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

      void fileToCapturedPhoto(file).then(resolve, reject);
    };

    input.click();
  });
}

async function blobToCapturedPhoto(blob: Blob): Promise<CapturedPhoto> {
  const file = new File([blob], `visual-photo-${Date.now()}.jpg`, {
    type: blob.type || "image/jpeg"
  });

  return fileToCapturedPhoto(file);
}

function getScaledDimensions(width: number, height: number) {
  const maxEdge = Math.max(width, height);
  if (maxEdge <= MAX_IMAGE_EDGE) {
    return { width, height };
  }

  const scale = MAX_IMAGE_EDGE / maxEdge;
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale))
  };
}

async function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not create image blob."));
          return;
        }

        resolve(blob);
      },
      mimeType,
      0.9
    );
  });
}

export class WebPhotoCaptureAdapter implements PhotoCaptureAdapter {
  capturePhoto(): Promise<CapturedPhoto> {
    return pickPhoto("environment");
  }

  selectPhotoFromLibrary(): Promise<CapturedPhoto> {
    return pickPhoto();
  }

  isLiveCameraSupported(): boolean {
    return typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
  }

  async startLiveCamera(facingMode: CameraFacingMode = "environment"): Promise<LiveCameraSession> {
    ensureBrowserEnvironment();

    if (!this.isLiveCameraSupported()) {
      throw new Error("Live camera is not supported.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });

    return {
      stream,
      facingMode
    };
  }

  async switchLiveCamera(session: LiveCameraSession, facingMode: CameraFacingMode): Promise<LiveCameraSession> {
    this.stopLiveCamera(session);
    return this.startLiveCamera(facingMode);
  }

  async captureFrame(videoElement: HTMLVideoElement, mimeType = "image/jpeg"): Promise<CapturedPhoto> {
    ensureBrowserEnvironment();

    const sourceWidth = videoElement.videoWidth;
    const sourceHeight = videoElement.videoHeight;

    if (!sourceWidth || !sourceHeight) {
      throw new Error("Camera frame is not ready.");
    }

    const { width, height } = getScaledDimensions(sourceWidth, sourceHeight);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not create camera frame.");
    }

    context.drawImage(videoElement, 0, 0, width, height);
    const blob = await canvasToBlob(canvas, mimeType);
    return blobToCapturedPhoto(blob);
  }

  stopLiveCamera(session: LiveCameraSession) {
    session.stream.getTracks().forEach((track) => track.stop());
  }
}
