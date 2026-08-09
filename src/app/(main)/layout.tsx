import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function MainSiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
        <main className="allow-select allow-interact relative z-0 flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
