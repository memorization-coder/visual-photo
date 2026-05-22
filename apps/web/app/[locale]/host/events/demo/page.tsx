import { DemoHostOverviewPage } from "@/features/demo/pages/DemoHostOverviewPage";

type HostDemoEventRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function HostDemoEventRoute({ params }: HostDemoEventRouteProps) {
  const { locale } = await params;
  return <DemoHostOverviewPage locale={locale} />;
}
