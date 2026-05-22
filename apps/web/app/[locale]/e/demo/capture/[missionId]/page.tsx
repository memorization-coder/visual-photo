import { DemoCapturePage } from "@/features/demo/pages/DemoCapturePage";

type DemoCaptureRouteProps = {
  params: Promise<{ locale: string; missionId: string }>;
};

export default async function DemoCaptureRoute({ params }: DemoCaptureRouteProps) {
  const { locale, missionId } = await params;
  return <DemoCapturePage locale={locale} missionId={missionId} />;
}
