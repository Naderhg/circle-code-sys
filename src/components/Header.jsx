import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky  top-0 z-50 bg-white shadow flex justify-between items-center">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-700 font-bold text-2xl focus:outline-none"
          aria-label="Circle Code Home"
        >
          <span className="brand-icon">
            <i className="fas fa-shipping-fast"></i>
          </span>
          <span className="brand-text">Circle Code</span>
        </Link>
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`flex-col md:flex-row md:flex gap-4 items-center ${
            menuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded transition-colors duration-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                location.pathname === link.to
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/auth?signin=true">
            <Button variant="outline" className="btn-sign-in">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
