import { HostPlaceholderPage } from "@/features/demo/components/HostPlaceholderPage";

type HostDemoMissionsRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function HostDemoMissionsRoute({ params }: HostDemoMissionsRouteProps) {
  const { locale } = await params;
  return <HostPlaceholderPage locale={locale} titleKey="missionsTitle" bodyKey="missionsBody" />;
}
