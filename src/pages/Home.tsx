import useAuth from "../hooks/useAuth";
import { useFeaturedProfiles } from "./home/hooks/useFeaturedProfiles";

import Navbar from "./home/components/Navbar";
import Hero from "./home/components/Hero";
import UniversityStrip from "./home/components/UniversityStrip";
import Features from "./home/components/Features";
import CTA from "./home/components/CTA";
import RecentPortfolios from "./home/components/RecentPortfolios";
import Footer from "./home/components/Footer";

export default function Home() {
  const { user } = useAuth();
  const { profiles, stats, loading } = useFeaturedProfiles();

  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <Hero stats={stats} />
      <UniversityStrip />
      <Features />
      {!user && <CTA />}
      <RecentPortfolios profiles={profiles} loading={loading} />
      <Footer />
    </div>
  );
}
