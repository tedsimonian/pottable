import { Footer } from "~/components/home/footer";
import { Header } from "~/components/home/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <div className="flex flex-1">{children}</div>
      <Footer />
    </div>
  );
}
