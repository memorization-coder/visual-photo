import { HostPlaceholderPage } from "@/features/demo/components/HostPlaceholderPage";

type HostDemoModerateRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function HostDemoModerateRoute({ params }: HostDemoModerateRouteProps) {
  const { locale } = await params;
  return <HostPlaceholderPage locale={locale} titleKey="moderateTitle" bodyKey="moderateBody" />;
}
