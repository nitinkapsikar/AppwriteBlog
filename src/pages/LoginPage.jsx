import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/AuthSlice";
import { account } from "../lib/appwrite";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../components/Logo";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        try {
          await account.deleteSession("current");
        } catch {}

        await account.createEmailPasswordSession(
          values.email,
          values.password
        );

        const user = await account.get();
        dispatch(setUser(user));

        toast.success("Welcome back 👋");
        navigate("/");
      } catch (e) {
        toast.error("Invalid email or password");
      }
    },
  });

  return (
    <>
      <Toaster position="top-center" />

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1b2430] to-[#020617] px-4">
        
        <form
          onSubmit={formik.handleSubmit}
          className="
            w-full max-w-md
            backdrop-blur-xl
            bg-white/5
            border border-white/10
            rounded-2xl
            p-8
            shadow-2xl
          "
        >
          <div className="mb-6 text-center">
            <Logo />
            <p className="text-gray-400 text-sm mt-2">
              Login to continue
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-300 text-sm mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="
                w-full px-4 py-2.5
                rounded-lg
                bg-transparent
                border border-white/20
                text-white
                focus:outline-none
                focus:border-btn
                focus:ring-1 focus:ring-btn
                transition
              "
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-gray-300 text-sm mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="
                w-full px-4 py-2.5
                rounded-lg
                bg-transparent
                border border-white/20
                text-white
                focus:outline-none
                focus:border-btn
                focus:ring-1 focus:ring-btn
                transition
              "
            />
            <span
              className="absolute right-4 top-9 cursor-pointer text-gray-400 hover:text-white transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Button */}
       <button
  type="submit"
  disabled={!formik.isValid || formik.isSubmitting}
  className={`
    w-full py-2.5 rounded-lg font-semibold text-white
    transition-all duration-300
    ${
      !formik.isValid || formik.isSubmitting
        ? "bg-gray-600 cursor-not-allowed"
        : `
          bg-gradient-to-r
          from-orange-500
          via-orange-600
          to-red-500
          hover:from-orange-600
          hover:via-red-500
          hover:to-pink-600
          hover:shadow-lg
          hover:shadow-orange-500/30
        `
    }
  `}
>
  {formik.isSubmitting ? "Signing in..." : "Login"}
</button>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-5">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-orange-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
