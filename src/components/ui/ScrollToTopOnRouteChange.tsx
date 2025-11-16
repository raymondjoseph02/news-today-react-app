import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the route pathname changes
    window.scrollTo({
      top: 0,
      behavior: "instant", // Use instant for immediate positioning on navigation
    });
  }, [location.pathname]);

  // This component doesn't render anything
  return null;
}

export default ScrollToTopOnRouteChange;