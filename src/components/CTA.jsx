import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="cta bg-blue-700 text-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Ready to revolutionize your shipping operations?
          </h2>
          <p className="mb-0">
            Join Circle Code today and experience streamlined logistics and
            satisfied customers.
          </p>
        </div>
        <Link to="/signup">
          <Button variant="light" className="mt-6 md:mt-0">
            Sign Up Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
