import Hero from "@/features/landing-page/Hero";
import Welcome from "@/features/landing-page/Welcome";
import Overview from "@/features/landing-page/Overview";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <Overview /> {/* Add Overview component */}
    </main>
  );
}
