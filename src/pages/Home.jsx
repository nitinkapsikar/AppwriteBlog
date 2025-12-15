import React, { useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { Query } from "appwrite";
import BlogCard from "../components/BlogCard";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthSlicePath } from "../redux/slice/AuthSlice";



const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useSelector(AuthSlicePath);


  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );

      setBlogs(res.documents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-main px-4 py-8">
      
   
<div className="max-w-4xl mx-auto mb-10">
  {!user && (
  <div
    className="
      max-w-5xl mx-auto mb-6
      bg-gradient-to-r from-orange-500/10 via-orange-600/10 to-red-500/10
      border border-orange-500/20
      rounded-2xl
      p-4
      flex flex-col sm:flex-row
      items-center justify-between
      gap-3
      animate-slideDown
    "
  >
    <p className="text-sm text-gray-300">
      🔒 You are viewing as a guest.
      <span className="text-white font-medium">
        {" "}Login to create and manage blogs.
      </span>
    </p>

    <Link
      to="/login"
      className="
        px-5 py-2 rounded-full
        text-sm font-semibold text-white
        bg-gradient-to-r from-orange-500 via-orange-600 to-red-500
        hover:shadow-lg hover:shadow-orange-500/30
        transition
      "
    >
      Login Now
    </Link>
  </div>
)}

  <div className="relative">

    
    {/* ICON */}
   <FiSearch
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      placeholder="Search blogs by title..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-full
        pl-12 pr-4 py-3
        rounded-full
        bg-section
        text-white
        border border-gray-600
        outline-none
        transition
        focus:border-btn
        focus:ring-2 focus:ring-btn/40
        placeholder-gray-400
      "
    />
  </div>
</div>


      {/* 🔄 LOADING STATE */}
      {loading && (
        <div className="text-center text-white mt-20">
          <p className="text-lg animate-pulse">Loading blogs...</p>
        </div>
      )}

      {/* 📭 EMPTY STATE */}
      {!loading && filteredBlogs.length === 0 && (
        <div className="text-center text-white mt-20">
          <h2 className="text-2xl font-semibold mb-2">No blogs found</h2>
          <p className="mb-4 text-gray-400">
            Be the first one to create a blog ✨
          </p>
          <Link
            to="/create"
            className="inline-block px-6 py-2 rounded bg-btn hover:bg-btn-hover transition"
          >
            Create Blog
          </Link>
        </div>
      )}

      {/* 📰 BLOG GRID */}
      {!loading && filteredBlogs.length > 0 && (
        <div className="grid gap-6 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.$id} blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
