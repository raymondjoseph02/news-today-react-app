import { Outlet } from "react-router-dom";
import Footer from "../components/ui/Footer";
import Nav from "../components/ui/Nav";
import ScrollToTop from "../components/ui/ScrollToTop";
import ScrollToTopOnRouteChange from "../components/ui/ScrollToTopOnRouteChange";

export const Layout = () => {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <ScrollToTop />

      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
