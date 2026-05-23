import { HostDemoEditor } from "@/features/demo/components/HostDemoEditor";

type HostDemoCreateRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function HostDemoCreateRoute({ params }: HostDemoCreateRouteProps) {
  const { locale } = await params;
  return <HostDemoEditor locale={locale} mode="create" />;
}
