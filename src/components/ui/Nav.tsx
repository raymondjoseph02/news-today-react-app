import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { links } from "../../constants/constants";
import { fetchNews } from "../../lib/news";

function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState<string | null>(null);

  // Search handler
  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (search) {
      fetchNews({
        search: search,
      });
    }
  };

  // Toggle mobile menu
  const handleToggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="py-4 px-4 xl:px-20 w-screen fixed top-0 bg-gray-50 border border-b-gray-200 z-50">
      <div className="flex items-center justify-between container">
        {/* left logo and links side */}
        <nav className="flex gap-6 xl:gap-12">
          <Link to="/" className="flex items-center gap-3">
            {/* logo */}
            <div className="flex flex-col items-end">
              <div className="h-2 bg-blue-300 w-4"></div>
              <div className="h-2.5 bg-blue-300 w-6"></div>
              <div className="h-2 bg-blue-300 w-9"></div>
            </div>

            <p className="text-gray-800 capitalize text-2xl font-bold xl:flex hidden">
              news today
            </p>
          </Link>
          <div>
            <div className="hidden lg:flex">
              <ul className="flex gap-6 xl:gap-10 items-center">
                {links.map((link) => (
                  <li
                    key={link.path}
                    className="text-gray-100 capitalize hover:text-blue-300/80 transition-colors ease-in-out duration-300 text-lg font-medium"
                  >
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* right search bar and user profile side */}
        <div className="hidden lg:flex gap-5 items-center">
          {/* search bar */}
          <div className="md:w-83 hidden lg:flex">
            <SearchBar
              value={search ?? ""}
              setValue={(val) => handleSearchChange(val)}
            />
          </div>
          {/* notification bell */}
          <div className="cursor-pointer">
            <Bell size={24} className="text-gray-100" />
          </div>

          {/* user profile  */}
          <div className="border-4 border-orange-100 rounded-full size-12 bg-orange-50 cursor-pointer">
            {/* <img src="" alt="" /> */}
          </div>
        </div>

        {/* hamburger menu for mobile and tablet  */}
        <button
          aria-label="menu button"
          className="flex flex-col gap-1 items-end justify-center w-7 h-6 relative z-50 lg:hidden"
          type="button"
          onClick={handleToggleMenu}
        >
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 6 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="block w-full h-0.5 bg-gray-100 rounded"
          />
          <motion.span
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="block w-full h-0.5 bg-gray-100 rounded"
          />
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -6 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="block w-full h-0.5 bg-gray-100 rounded"
          />
        </button>
      </div>

      <AnimatePresence>
        {/* MOBILE MENU PANEL */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-full bg-white px-6 z-40 transform transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="space-y-8 h-full flex-col flex justify-between pb-6">
            <nav>
              <ul className="space-y-10 p-2.5 mt-12 gap-3">
                {links.map((link) => (
                  <li className="relative h-10" key={`mobile-${link.path}`}>
                    <Link
                      to={link.path}
                      className="text-lg font-medium text-gray-800 hover:text-gray-600 relative bg-white pt-4 pl-4 capitalize w-full block z-20 h-10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    <span className="absolute top-1/2 left-0 w-full h-full border border-gray-300 rounded-lg" />
                  </li>
                ))}
              </ul>
            </nav>

            {/* mobile nav footer */}
            <div className="">
              <p className="text-center text-lg font-medium text-gray-600">
                &copy; 2024 News Today. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* OVERLAY */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

export default Nav;
