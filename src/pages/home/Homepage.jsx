import Header from "../../components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";

function Homepage() {
  return (
    <div className="bg-white font-sans min-h-screen">
      <Hero />
      <Features />
      <Testimonials />
    </div>
  );
}

export default Homepage;
