import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-gray-900 text-white py-12 ">
      <div className="container  mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="footer-logo flex items-center gap-2 mb-2">
            <span className="brand-icon">
              <i className="fas fa-shipping-fast"></i>
            </span>
            <span className="brand-text font-bold text-xl">Circle Code</span>
          </div>
          <p className="text-gray-400 mb-4">
            The most reliable shipping solution for online sellers. Fast,
            secure, and cost-effective.
          </p>
          <div className="flex gap-2">
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/services#domestic">Domestic Shipping</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact Info</h4>
          <ul className="space-y-2">
            <li>Egypt, Cairo</li>
            <li>+20 1208349801</li>
            <li>info@CircleCodeshipping.com</li>
          </ul>
        </div>
        <div className="footer-bottom flex col-span-4 justify-between text-center mt-8 border-t  border-gray-700 pt-4">
          <p className="text-gray-400">
            &copy; 2023 Circle Code Shipping. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
