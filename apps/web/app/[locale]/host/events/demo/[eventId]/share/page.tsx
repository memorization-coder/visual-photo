import { DemoHostSharePage } from "@/features/demo/pages/DemoHostSharePage";

type HostDemoShareRouteProps = {
  params: Promise<{ locale: string; eventId: string }>;
};

export default async function HostDemoShareRoute({ params }: HostDemoShareRouteProps) {
  const { locale, eventId } = await params;
  return <DemoHostSharePage locale={locale} eventId={eventId} />;
}
