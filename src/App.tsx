import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/ui/Footer";
import Nav from "./components/ui/Nav";
import ScrollToTop from "./components/ui/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ui/ScrollToTopOnRouteChange";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";

function App() {
  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/top-stories" element={<Home />} />
            <Route path="/world" element={<Home />} />
            <Route path="/business" element={<Home />} />
            <Route path="/technology" element={<Home />} />
            <Route path="/art" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
