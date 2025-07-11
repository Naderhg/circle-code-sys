import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CTA from "../components/CTA";

function PublicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <CTA />
      <Footer />
    </div>
  );
}

export default PublicLayout;
