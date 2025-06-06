import Link from "next/link";
import Image from "next/image";
import { isAuthenticated } from "@/lib/action/auth.action";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/home");
  
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex item-center gap-2">
          <Image
              src="/logo.svg"
              alt="Logo"
              width={38}
              height={32}
          />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}