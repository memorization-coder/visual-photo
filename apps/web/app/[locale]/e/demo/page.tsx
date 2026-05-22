import { DemoEventPage } from "@/features/demo/pages/DemoEventPage";

type DemoEventRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function DemoEventRoute({ params }: DemoEventRouteProps) {
  const { locale } = await params;
  return <DemoEventPage locale={locale} />;
}
