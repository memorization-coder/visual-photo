"use client";

import { Heading } from "@/components/primitives";
import { Button, Stack, Text } from "@/components/primitives";

type CameraFallbackUploadProps = {
  title: string;
  body: string;
  help: string;
  retryLabel: string;
  wallLabel: string;
  onRetry: () => void;
  onOpenWall: () => void;
};

export function CameraFallbackUpload({
  title,
  body,
  help,
  retryLabel,
  wallLabel,
  onRetry,
  onOpenWall
}: CameraFallbackUploadProps) {
  return (
    <Stack gap="md" className="rounded-2xl border border-[#e6d7c8] bg-surface p-lg shadow-card">
      <Heading level={3}>{title}</Heading>
      <Text>{body}</Text>
      <Text tone="muted">{help}</Text>
      <Stack gap="sm">
        <Button variant="filled" onClick={onRetry}>
          {retryLabel}
        </Button>
        <Button variant="outlined" onClick={onOpenWall}>
          {wallLabel}
        </Button>
      </Stack>
    </Stack>
  );
}
