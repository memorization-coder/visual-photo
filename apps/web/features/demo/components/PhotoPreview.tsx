"use client";

import type { CapturedPhoto } from "@/adapters/interfaces";
import { useTranslations } from "next-intl";
import { SurfaceCard } from "./shared";

type PhotoPreviewProps = {
  photo: CapturedPhoto;
};

export function PhotoPreview({ photo }: PhotoPreviewProps) {
  const t = useTranslations("demo.preview");

  return (
    <SurfaceCard className="overflow-hidden p-0">
      <img src={photo.localUri} alt={t("previewAlt")} className="aspect-[4/5] w-full object-cover" />
      <div className="space-y-xs p-lg">
        <p className="text-sm font-medium text-text-primary">{t("previewTitle")}</p>
        <p className="text-sm text-text-secondary">{photo.mimeType}</p>
      </div>
    </SurfaceCard>
  );
}
