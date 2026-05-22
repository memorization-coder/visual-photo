import { HostPlaceholderPage } from "@/features/demo/components/HostPlaceholderPage";

type HostDemoShareRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function HostDemoShareRoute({ params }: HostDemoShareRouteProps) {
  const { locale } = await params;
  return <HostPlaceholderPage locale={locale} titleKey="shareTitle" bodyKey="shareBody" />;
}
