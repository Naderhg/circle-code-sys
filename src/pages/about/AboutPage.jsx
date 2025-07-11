import { Button } from "../../components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Circle Code
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We're revolutionizing the shipping industry with innovative
            technology and exceptional service.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, Circle Code started with a simple mission: to
                make shipping accessible, reliable, and cost-effective for
                businesses of all sizes. What began as a small team of logistics
                enthusiasts has grown into a comprehensive shipping platform
                serving thousands of customers worldwide.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that every business deserves access to professional
                shipping solutions, regardless of their size or shipping volume.
                That's why we've built a platform that scales with your needs
                while maintaining the personal touch of a dedicated service
                provider.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Learn More About Our Mission
              </Button>
            </div>
            <div className="bg-blue-100 rounded-lg p-8">
              <div className="text-center">
                <i className="fas fa-shipping-fast text-6xl text-blue-600 mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">1000+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Reliability
              </h3>
              <p className="text-gray-600">
                Your packages are safe with us. We ensure secure handling and
                timely delivery every time.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Speed
              </h3>
              <p className="text-gray-600">
                Fast processing and quick delivery times to keep your business
                moving forward.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Care</h3>
              <p className="text-gray-600">
                We treat every package with the care it deserves, as if it were
                our own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-blue-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Leading our vision to transform the shipping industry with
                innovation and customer focus.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-3xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mike Chen</h3>
              <p className="text-green-600 mb-2">CTO</p>
              <p className="text-gray-600 text-sm">
                Building the technology that powers our platform and ensures
                seamless operations.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-3xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emily Rodriguez</h3>
              <p className="text-purple-600 mb-2">Head of Operations</p>
              <p className="text-gray-600 text-sm">
                Ensuring every shipment runs smoothly and our customers receive
                exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
