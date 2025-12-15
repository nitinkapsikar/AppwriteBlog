import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databases, storage } from "../lib/appwrite";
import { FiUser, FiTag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { AuthSlicePath } from "../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";


const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

const user = useSelector(AuthSlicePath);
const navigate = useNavigate();

const isAuthor = user && blog && blog.userId === user.$id;



  useEffect(() => {
    fetchBlog();
  }, []);

  const handleDelete = async () => {
  const confirm = window.confirm("Are you sure you want to delete this blog?");
  if (!confirm) return;

  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      blog.$id
    );

    navigate("/");
  } catch (error) {
    console.log(error);
    alert("Failed to delete blog");
  }
};


  const fetchBlog = async () => {
    try {
      const res = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id
      );
      setBlog(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-gray-400">
        Loading blog...
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-gray-400">
        Blog not found
      </div>
    );

  const imageUrl = storage.getFileView(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    blog.imageId
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1b2430] px-4 py-10">
      
      <article className="max-w-4xl mx-auto">

        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-[420px] object-cover hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* CONTENT CARD */}
        <div
          className="
            -mt-20
            backdrop-blur-xl
            bg-white/5
            border border-white/10
            rounded-3xl
            p-8
            shadow-xl
          "
        >
          {/* CATEGORY */}
          <span className="inline-block mb-3 px-4 py-1.5 text-xs font-semibold rounded-full bg-orange-500/10 text-orange-400">
            {blog.category}
          </span>

          {/* TITLE */}
  <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {blog.title}
   </h1>

        {isAuthor && (
  <div className="flex gap-3 mt-4">
    <button
      onClick={() => navigate(`/edit/${blog.$id}`)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
    >
      <FiEdit2 /> Edit
    </button>

    <button
      onClick={handleDelete}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
    >
      <FiTrash2 /> Delete
    </button>
  </div>
)}



          {/* META */}
          <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FiUser /> {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <FiTag /> {blog.category}
            </span>
          </div>

          {/* DIVIDER */}
          <div className="h-px w-full bg-white/10 my-6" />

          {/* CONTENT */}
          <div className="text-gray-200 leading-relaxed whitespace-pre-line text-base md:text-lg">
            {blog.content}
          </div>
        </div>

      </article>
    </section>
  );
};

export default SingleBlog;
