import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { AuthSlicePath } from "../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { databases, storage, ID } from "../lib/appwrite"; // adjust path if needed

const CreateBlog = () => {
  const user = useSelector(AuthSlicePath);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

 
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters")
      .required("Title is required"),
    content: Yup.string()
      .min(50, "Content must be at least 50 characters")
      .required("Content is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed().required("Cover image is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

      
        const imageUpload = await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          ID.unique(),
          values.image
        );

        const imageId = imageUpload.$id;

     
        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          ID.unique(),
          {
            title: values.title,
            content: values.content,
            category: values.category,
            imageId: imageId,
            userId: user.$id,
            author: user.name,
            createdAt: new Date().toISOString(),
          }
        );

        toast.success("Blog created successfully!");
        resetForm();
        navigate("/");
      } catch (error) {
        console.error(error);
        toast.error("Failed to create blog");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="min-h-screen bg-white flex justify-center py-10">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-2xl bg-[#1b2430] p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Create New Blog
        </h2>

        {/* TITLE */}
        <div className="mb-4">
          <label className="text-white block mb-1">Title</label>
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="w-full px-4 py-2 rounded bg-transparent border border-white text-white"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div className="mb-4">
          <label className="text-white block mb-1">Category</label>
          <select
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="w-full px-4 py-2 text-white rounded bg-transparent border border-white "
          >
            <option className="text-black" value="">Select category</option>
            <option className="text-black" value="technology">Technology</option>
            <option className="text-black" value="programming">Programming</option>
            <option className="text-black"value="career">Career</option>
            <option className="text-black" value="lifestyle">Lifestyle</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm">{formik.errors.category}</p>
          )}
        </div>

        {/* CONTENT */}
        <div className="mb-4">
          <label className="text-white block mb-1">Content</label>
          <textarea
            name="content"
            rows="6"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            className="w-full px-4 py-2 rounded bg-transparent border border-white text-white"
          />
          {formik.touched.content && formik.errors.content && (
            <p className="text-red-500 text-sm">{formik.errors.content}</p>
          )}
        </div>

        {/* IMAGE */}
        <div className="mb-6">
          <label className="text-white block mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
            className="text-white"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm">{formik.errors.image}</p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading || !formik.isValid}
          className={`w-full py-2 rounded font-semibold ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-btn hover:opacity-80"
          }`}
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </section>
  );
};

export default CreateBlog;
