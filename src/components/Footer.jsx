import { Link } from "react-router-dom";
import {
  FaTruck,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="footer bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="footer-logo flex items-center gap-3 mb-6">
              <span className="brand-icon text-blue-500 text-2xl">
                <FaTruck />
              </span>
              <span className="brand-text font-bold text-2xl">Circle Code</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              The most reliable shipping solution for online sellers. Fast,
              secure, and cost-effective.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-all duration-300 hover:scale-110"
              >
                <FaXTwitter className="text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services#domestic"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Domestic Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/services#international"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  International Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/services#express"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Express Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/services#warehousing"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Warehousing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MdLocationOn className="text-blue-500 text-lg flex-shrink-0" />
                <span className="text-gray-400">Egypt, Cairo</span>
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="text-blue-500 text-lg flex-shrink-0" />
                <span className="text-gray-400">+20 1208349801</span>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="text-blue-500 text-lg flex-shrink-0" />
                <span className="text-gray-400">
                  info@CircleCodeshipping.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MdAccessTime className="text-blue-500 text-lg flex-shrink-0" />
                <span className="text-gray-400">Mon-Fri: 9AM - 5PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Circle Code Shipping. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
