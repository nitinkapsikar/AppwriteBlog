import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthSlicePath, removeUser } from "../redux/slice/AuthSlice";
import Logo from "./Logo";
import { account } from "../lib/appwrite";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

const Navbar = () => {
  const user = useSelector(AuthSlicePath);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  // 🔒 Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await account.deleteSessions();
    } catch (e) {
      console.log(e);
    }

    dispatch(removeUser());
    navigate("/please-login", { replace: true });
  };

  return (
    <>
      <nav className="w-full bg-[#1b2430] text-white shadow-md py-4 px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          <Logo />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>

          {!isAuthPage && user && (
            <Link to="/create" className="hover:text-blue-400">
              Create Blog
            </Link>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* DESKTOP AUTH BUTTON */}
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={handleLogout}
                className="
                  px-5 py-2.5 rounded-full text-sm font-semibold text-white
                  bg-linear-to-r from-orange-500 via-orange-600 to-red-500
                  hover:shadow-lg hover:shadow-orange-500/30
                  transition-all active:scale-95
                "
              >
                Logout
              </button>
            ) : (
              <Link
                to={location.pathname === "/login" ? "/register" : "/login"}
                className="
                  inline-flex items-center justify-center
                  px-5 py-2.5 rounded-full text-sm font-semibold text-white
                  bg-linear-to-r from-orange-500 via-orange-600 to-red-500
                  hover:shadow-lg hover:shadow-orange-500/30
                  transition-all active:scale-95
                "
              >
                {location.pathname === "/login" ? "Register" : "Login"}
              </Link>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#1b2430] border-t border-white/10 px-6 py-4 space-y-4 animate-slideDown">
          
          <Link to="/" className="block hover:text-blue-400">Home</Link>
          <Link to="/about" className="block hover:text-blue-400">About</Link>

          {user && (
            <Link to="/create" className="block hover:text-blue-400">
              Create Blog
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded bg-red-500/20 text-red-400"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-center py-2 rounded bg-orange-500/20 text-orange-400"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
