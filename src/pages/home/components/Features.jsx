export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            Why Choose Circle Code Shipping?
          </h2>
          <p className="text-gray-600">
            We offer comprehensive shipping solutions to help your business
            thrive
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="feature-card delivery bg-cover bg-center rounded-lg shadow p-8"
            style={{ backgroundImage: "url('/image/feature-delivery.jpg')" }}
          >
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p>
              Same-day and next-day delivery options to keep your customers
              satisfied
            </p>
          </div>
          <div
            className="feature-card tracking bg-cover bg-center rounded-lg shadow p-8"
            style={{ backgroundImage: "url('/image/track.jpg')" }}
          >
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p>
              Monitor your shipments at every step with our advanced tracking
              system
            </p>
          </div>
          <div
            className="feature-card pricing bg-cover bg-center rounded-lg shadow p-8"
            style={{ backgroundImage: "url('/image/feature-pricing.jpg')" }}
          >
            <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
            <p>
              Affordable shipping rates with special discounts for regular
              sellers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
