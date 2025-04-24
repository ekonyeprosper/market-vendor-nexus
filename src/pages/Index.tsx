
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import VendorCTA from "@/components/home/VendorCTA";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSignup from "@/components/common/NewsletterSignup";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <VendorCTA />
      <Testimonials />
      <NewsletterSignup />
    </Layout>
  );
};

export default Index;
