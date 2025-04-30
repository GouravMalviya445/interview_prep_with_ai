import LandingPage from "@/components/LandingPage";
import { isAuthenticated } from "@/lib/action/auth.action";
import { redirect } from "next/navigation";

export default async function Home() {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/");
  
  return <LandingPage />;
}
