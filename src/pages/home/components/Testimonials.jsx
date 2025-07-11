export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "Circle Code Shipping has transformed our logistics operations. We've reduced delivery times by 40% and customer satisfaction is at an all-time high.",
      author: "Maher",
      position: "Owner",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 2,
      text: "The real-time tracking feature has significantly reduced customer inquiries about shipping status, saving us time and resources.",
      author: "Nader Maged",
      position: "Front End Developer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 3,
      text: "The cost savings we've experienced with Circle Code have allowed us to offer free shipping to our customers without hurting our margins.",
      author: "Mina",
      position: "Back End Developer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <section className="testimonials py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="section-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Sellers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust Circle Code with their
            shipping needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                <div className="testimonial-text mb-6">
                  <div className="text-blue-500 text-4xl mb-4">"</div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {testimonial.text}
                  </p>
                </div>

                <div className="testimonial-author flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="testimonial-avatar w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {testimonial.author}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
