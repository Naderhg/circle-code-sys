import { Button } from "../../components/ui/button";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Comprehensive shipping solutions tailored to meet your business
            needs.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Domestic Shipping */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-truck text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Domestic Shipping
              </h3>
              <p className="text-gray-600 mb-6">
                Fast and reliable shipping within Egypt. Same-day and next-day
                delivery options available.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Same-day delivery
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Next-day delivery
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Package tracking
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Insurance coverage
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </div>

            {/* International Shipping */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-globe text-2xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                International Shipping
              </h3>
              <p className="text-gray-600 mb-6">
                Worldwide shipping with customs handling and documentation
                support.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  200+ countries
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Customs clearance
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Documentation support
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Door-to-door delivery
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </div>

            {/* Express Delivery */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-bolt text-2xl text-red-600"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Express Delivery
              </h3>
              <p className="text-gray-600 mb-6">
                Urgent deliveries when time is critical. Premium service with
                priority handling.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  2-hour delivery
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Priority handling
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Real-time tracking
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Signature confirmation
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-box text-purple-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Packaging Services
                </h3>
                <p className="text-gray-600">
                  Professional packaging solutions to ensure your items arrive
                  safely. We provide materials and expert packing for fragile or
                  valuable items.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-warehouse text-yellow-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Warehousing
                </h3>
                <p className="text-gray-600">
                  Secure storage solutions for your inventory.
                  Climate-controlled facilities with 24/7 security and inventory
                  management systems.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-chart-line text-indigo-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Analytics & Reporting
                </h3>
                <p className="text-gray-600">
                  Detailed insights into your shipping patterns, costs, and
                  delivery performance. Make data-driven decisions to optimize
                  your logistics.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-headset text-pink-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Round-the-clock customer support to help you with any shipping
                  questions or issues. Our team is always ready to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose the service that fits your needs and experience the Circle
            Code difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Get Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
