import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ID } from "appwrite";
import { account } from "../lib/appwrite";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Minimum 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await account.create(
          ID.unique(),
          values.email,
          values.password,
          values.name
        );

        toast.success("Account created successfully 🎉");
        resetForm();
        setTimeout(() => navigate("/login"), 1500);
      } catch (e) {
        toast.error(e.message || "Registration failed");
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
          {/* HEADER */}
          <div className="text-center mb-6">
            <Logo />
            <p className="text-gray-400 text-sm mt-2">
              Create your account
            </p>
          </div>

          {/* NAME */}
          <div className="mb-5">
            <label className="text-gray-300 text-sm mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/20 text-white focus:border-btn focus:ring-1 focus:ring-btn outline-none transition"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="text-gray-300 text-sm mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/20 text-white focus:border-btn focus:ring-1 focus:ring-btn outline-none transition"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-6 relative">
            <label className="text-gray-300 text-sm mb-1 block">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-white/20 text-white focus:border-btn focus:ring-1 focus:ring-btn outline-none transition"
            />
            <span
              className="absolute right-4 top-9 cursor-pointer text-gray-400 hover:text-white"
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={`
              w-full py-2.5 rounded-lg font-semibold text-white
              transition-all duration-300
              ${
                !formik.isValid || formik.isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-700 hover:shadow-lg hover:shadow-orange-500/30"
              }
            `}
          >
            {formik.isSubmitting ? "Creating account..." : "Register"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-gray-400 text-sm mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Register;
