
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DailyDeals from "@/components/home/DailyDeals";
import TrendingProducts from "@/components/home/TrendingProducts";
import NewArrivals from "@/components/home/NewArrivals";
import TopSellers from "@/components/home/TopSellers";
import LiveActivity from "@/components/home/LiveActivity";
import VendorCTA from "@/components/home/VendorCTA";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSignup from "@/components/common/NewsletterSignup";
import HowItWorks from "@/components/home/HowItWorks";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <LiveActivity />
      <DailyDeals />
      <HowItWorks />
      <FeaturedCategories />
      <FeaturedProducts />
      <NewArrivals />
      <TrendingProducts />
      <TopSellers />
      <VendorCTA />
      <Testimonials />
      <NewsletterSignup />
    </Layout>
  );
};

export default Index;
