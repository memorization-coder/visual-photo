import { DemoCapturePage } from "@/features/demo/pages/DemoCapturePage";

type DemoPreviewRouteProps = {
  params: Promise<{ locale: string; missionId: string }>;
};

export default async function DemoPreviewRoute({ params }: DemoPreviewRouteProps) {
  const { locale, missionId } = await params;
  return <DemoCapturePage locale={locale} missionId={missionId} initialMode="preview" />;
}
