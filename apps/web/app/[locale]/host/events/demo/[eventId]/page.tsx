import { HostDemoEditor } from "@/features/demo/components/HostDemoEditor";

type HostDemoEditRouteProps = {
  params: Promise<{ locale: string; eventId: string }>;
};

export default async function HostDemoEditRoute({ params }: HostDemoEditRouteProps) {
  const { locale, eventId } = await params;
  return <HostDemoEditor locale={locale} mode="edit" eventId={eventId} />;
}
