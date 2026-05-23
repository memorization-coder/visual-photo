import type { ReactNode } from "react";
import { DemoHostPrototypeProvider } from "@/features/demo/DemoHostPrototypeProvider";

type HostDemoLayoutProps = {
  children: ReactNode;
};

export default function HostDemoLayout({ children }: HostDemoLayoutProps) {
  return <DemoHostPrototypeProvider>{children}</DemoHostPrototypeProvider>;
}
