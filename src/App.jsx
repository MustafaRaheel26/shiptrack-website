import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TrackingResult from "./pages/TrackingResult";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import DeleteAccount from "./pages/DeleteAccount";
import SEO from "./components/SEO";

/**
 * Component to scroll to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SEO
                      title="ShipTrack - Real-Time Package Tracking"
                      description="Track your packages in real-time with ShipTrack. Enter your tracking number for instant updates."
                      keywords="package tracking, shipment tracking, track my order"
                      canonicalUrl="https://www.spedizionitrack.it/"
                    />
                    <Home />
                  </>
                }
              />
              <Route
                path="/track"
                element={
                  <>
                    <SEO
                      title="Track Your Shipment | ShipTrack Tracking Result"
                      description="View real-time tracking status and location of your package with ShipTrack."
                      keywords="tracking result, package status, shipment location"
                      canonicalUrl="https://www.spedizionitrack.it/track"
                    />
                    <TrackingResult />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <SEO
                      title="About ShipTrack | Global Package Tracking Platform"
                      description="Learn about ShipTrack - your trusted partner for global package tracking with 1200+ carriers."
                      keywords="about us, package tracking company, global logistics"
                      canonicalUrl="https://www.spedizionitrack.it/about"
                    />
                    <About />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <SEO
                      title="Contact ShipTrack | Support & Help Center"
                      description="Get in touch with ShipTrack support for any questions about tracking your packages."
                      keywords="contact support, help center, tracking help"
                      canonicalUrl="https://www.spedizionitrack.it/contact"
                    />
                    <Contact />
                  </>
                }
              />
              <Route
                path="/privacy"
                element={
                  <>
                    <SEO
                      title="Privacy Policy | ShipTrack"
                      description="Read ShipTrack's privacy policy to understand how we protect your data and tracking information."
                      keywords="privacy policy, data protection, user privacy"
                      canonicalUrl="https://www.spedizionitrack.it/privacy"
                    />
                    <PrivacyPolicy />
                  </>
                }
              />
              <Route
                path="/delete-account"
                element={
                  <>
                    <SEO
                      title="Delete Your Account | ShipTrack"
                      description="Request account deletion and receive confirmation within 48 hours."
                      keywords="delete account, account removal, privacy request"
                      canonicalUrl="https://www.spedizionitrack.it/delete-account"
                    />
                    <DeleteAccount />
                  </>
                }
              />
              <Route
                path="/blog"
                element={
                  <>
                    <SEO
                      title="Shipping Blog | Tracking Tips & Guides | ShipTrack"
                      description="Read the latest shipping guides, tracking tips, and logistics articles from ShipTrack."
                      keywords="shipping blog, tracking tips, logistics guide"
                      canonicalUrl="https://www.spedizionitrack.it/blog"
                    />
                    <Blog />
                  </>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <>
                    <SEO
                      title="Blog Details | ShipTrack Shipping Insights"
                      description="Detailed shipping and tracking insights from ShipTrack experts."
                      keywords="shipping details, tracking insights, logistics articles"
                      canonicalUrl="https://www.spedizionitrack.it/blog"
                    />
                    <BlogDetails />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <SEO
                      title="ShipTrack - Package Tracking"
                      description="Track your packages in real-time with ShipTrack."
                      keywords="package tracking, shipment tracking"
                      canonicalUrl="https://www.spedizionitrack.it/"
                    />
                    <Home />
                  </>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
