import { DemoMissionsPage } from "@/features/demo/pages/DemoMissionsPage";

type DemoMissionsRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function DemoMissionsRoute({ params }: DemoMissionsRouteProps) {
  const { locale } = await params;
  return <DemoMissionsPage locale={locale} />;
}
