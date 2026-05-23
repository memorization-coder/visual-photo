import { DemoHostListPage } from "@/features/demo/pages/DemoHostListPage";

type HostDemoEventRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function HostDemoEventRoute({ params }: HostDemoEventRouteProps) {
  const { locale } = await params;
  return <DemoHostListPage locale={locale} />;
}
