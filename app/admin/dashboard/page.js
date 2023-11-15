import Heading from "@/app/_components/heading";
import HeroSection from "@/app/_components/pages/admin/hero-section";
import TestimonialsSection from "@/app/_components/pages/admin/testimonials-section";

const Dashboard = () => {
  return (
    <div>
      <Heading pageHeading>Dashboard</Heading>
      <TestimonialsSection />
      <HeroSection />
    </div>
  );
};

export default Dashboard;
