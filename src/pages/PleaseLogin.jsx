import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function PleaseLogin() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#0f172a] px-4">
      <div className="max-w-md w-full text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">

        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Please Login
        </h2>

        <p className="text-gray-300 text-sm mb-6">
          You have been logged out.  
          Please login again to continue.
        </p>

        <Link
          to="/login"
          className="
            inline-block w-full
            py-3 rounded-full
            font-semibold text-white
            bg-linear-to-r from-orange-500 via-orange-600 to-red-500
            hover:from-orange-600 hover:to-pink-600
            transition-all duration-300
            hover:shadow-lg hover:shadow-orange-500/30
          "
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
