import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthSlicePath, removeUser } from "../redux/slice/AuthSlice";
import Logo from "./Logo";
import { account } from "../lib/appwrite";


const Navbar = () => {
  const user = useSelector(AuthSlicePath);
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await account.deleteSessions(); // ✅ correct
  } catch (e) {
    console.log(e);
  }

  dispatch(removeUser());

  navigate("/please-login", { replace: true }); // ✅ correct redirect
};

  return (
    <nav className="w-full bg-[#1b2430] text-white shadow-md py-4 px-6 flex justify-between items-center">
      
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold">
       <Logo/>
      </Link>

      {/* LINKS */}
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/about" className="hover:text-blue-400">About</Link>

        {/* ✅ Create Blog only when NOT on login/register */}
        {!isAuthPage && user && (
          <Link to="/create" className="hover:text-blue-400">
            Create Blog
          </Link>
        )}
      </div>

    {/* RIGHT BUTTON */}
<div>
  {user ? (
    <button
      onClick={handleLogout}
      className="
        px-5 py-2.5
        rounded-full
        text-sm font-semibold text-white
        bg-linear-to-r from-orange-500 via-orange-600 to-red-500
        hover:from-orange-600 hover:via-red-500 hover:to-pink-600
        transition-all duration-300
        hover:shadow-lg hover:shadow-orange-500/30
        active:scale-95
      "
    >
      Logout
    </button>
  ) : (
    <Link
      to={location.pathname === "/login" ? "/register" : "/login"}
      className="
        inline-flex items-center justify-center
        px-5 py-2.5
        rounded-full
        text-sm font-semibold text-white
        bg-linear-to-r from-orange-500 via-orange-600 to-red-500
        hover:from-orange-600 hover:via-red-500 hover:to-pink-600
        transition-all duration-300
        hover:shadow-lg hover:shadow-orange-500/30
        active:scale-95
      "
    >
      {location.pathname === "/login" ? "Register" : "Login"}
    </Link>
  )}
</div>

    </nav>
  );
};

export default Navbar;
