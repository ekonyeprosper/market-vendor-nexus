
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
import BestDeals from "@/components/home/BestDeals";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import ProductGrid from "@/components/home/ProductGrid";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <LiveActivity />
      <DailyDeals />
      <FeaturedCategories />
      <FeaturedProducts />
      <BestDeals />
      <NewArrivals />
      <TrendingProducts />
      <CategoryShowcase />
      <ProductGrid />
      <TopSellers />
      <HowItWorks />
      <VendorCTA />
      <Testimonials />
      <NewsletterSignup />
    </Layout>
  );
};

export default Index;
