import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

import GlassButton from "../../../components/ui/GlassButton";

import imag1 from "../../../assets/slider/slider-1.jpg";
import imag2 from "../../../assets/slider/slider-2.jpg";
import imag3 from "../../../assets/slider/slider-3.jpg";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Streamline Your Shipping Operations",
      subtitle: "with Circle Code",
      description:
        "Join thousands of sellers who have revolutionized their delivery experience. Fast, reliable, and cost-effective shipping solutions.",
      image: imag1,
    },
    {
      id: 2,
      title: "Global Shipping Solutions",
      subtitle: "Worldwide Reach",
      description:
        "Expand your business globally with our international shipping network. Reach customers in over 200 countries with ease.",
      image: imag2,
    },
    {
      id: 3,
      title: "Real-Time Tracking",
      subtitle: "Stay Connected",
      description:
        "Monitor your shipments every step of the way. Advanced tracking technology keeps you and your customers informed.",
      image: imag3,
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden min-h-[600px]">
      {/* Background Images Layer */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={`bg-${slide.id}`}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-out"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.589), rgba(0, 0, 0, 0.589)), url(${slide.image})`,
                transform: index === currentSlide ? "scale(1)" : "scale(1.1)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {slides.map((slide, index) => (
          <div
            key={`content-${slide.id}`}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center min-h-[600px] py-20 px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg">
                {slide.title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-100 drop-shadow-md">
                {slide.subtitle}
              </h2>
              <p className="mb-8 text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-25 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <GlassButton
              size="lg"
              className="bg-blue-500 hover:bg-blue-400 text-gray-50"
            >
              Get Started
            </GlassButton>
          </Link>
          <Link to="/contact">
            <GlassButton variant="outline" size="lg" className="">
              Contact Sales
            </GlassButton>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 pointer-events-auto">
          <GlassButton onClick={prevSlide} aria-label="Previous slide">
            <MdKeyboardArrowLeft className="w-6 h-6" />
          </GlassButton>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 pointer-events-auto">
          <GlassButton onClick={nextSlide} aria-label="Next slide">
            <MdKeyboardArrowRight className="w-6 h-6" />
          </GlassButton>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3  ">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 backdrop-blur-sm ${
              index === currentSlide
                ? "border bg-white scale-125 shadow-lg "
                : " border bg-white/10 backdrop-blur-md hover:bg-opacity-80 hover:scale-110 "
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-20 bg-white/10  backdrop-blur-md border border-white/20 text-white p-3 rounded-full  shadow-lg ">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
}
