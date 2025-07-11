import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import ClientPage from "./pages/client/ClientPage";
import AgentPage from "./pages/agent/AgentPage";
import HomePage from "./pages/home/Homepage";
import AboutPage from "./pages/about/AboutPage";
import ServicesPage from "./pages/services/ServicesPage";
import ContactPage from "./pages/contact/ContactPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/">
            <Route path="admin" element={<AdminPage />} />
            <Route path="client" element={<ClientPage />} />
            <Route path="agent" element={<AgentPage />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* Routes with PublicLayout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
}
