import { DemoSubmittedPage } from "@/features/demo/pages/DemoSubmittedPage";

type DemoSubmittedRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function DemoSubmittedRoute({ params }: DemoSubmittedRouteProps) {
  const { locale } = await params;
  return <DemoSubmittedPage locale={locale} />;
}
