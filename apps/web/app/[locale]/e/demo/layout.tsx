import type { ReactNode } from "react";
import { DemoEventPrototypeProvider } from "@/features/demo/DemoEventPrototypeProvider";
import { demoEvent, demoMissions, demoParticipant, demoSeedMemories } from "@/features/demo/demoData";
import { DemoGuestShell } from "@/features/demo/components/DemoGuestShell";

type DemoEventLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DemoEventLayout({ children, params }: DemoEventLayoutProps) {
  const { locale } = await params;

  return (
    <DemoEventPrototypeProvider
      event={demoEvent}
      participant={demoParticipant}
      missions={demoMissions}
      seedMemories={demoSeedMemories}
    >
      <DemoGuestShell>{children}</DemoGuestShell>
    </DemoEventPrototypeProvider>
  );
}
