import { Link } from "react-router-dom";
import { storage } from "../lib/appwrite";

const BlogCard = ({ blog }) => {
  const imageUrl = blog.imageId
    ? storage.getFileView(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        blog.imageId
      )
    : "https://via.placeholder.com/600x400";

  return (
    <div className="bg-[#1b2430] flex flex-col h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">

      {/* IMAGE */}
      <div className="h-48 shrink-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-xl font-psemibold text-orange-600 mb-2 line-clamp-2">
          {blog.title}
        </h2>

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="text-gray-300 font-medium">
            {blog.author || "Admin"}
          </span>
          <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
          <span>{new Date(blog.$createdAt).toLocaleDateString()}</span>
        </div>

        <p className="text-gray-300 text-sm line-clamp-3 mb-4">
          {blog.content}
        </p>

        {/* CTA */}
   <Link
  to={`/blog/${blog.$id}`}
  className="
    mt-auto ml-auto
    inline-flex items-center gap-2
    px-5 py-2.5
    rounded-full
    text-sm font-medium text-white
    bg-gradient-to-r from-[#2d3748] via-[#1b2430] to-[#0f172a]
    hover:from-[#374151] hover:via-[#1b2430] hover:to-[#020617]
    transition-all duration-300
    border border-white/10
    hover:shadow-md hover:shadow-black/30
    active:scale-95
  "
>
  Read More
  <span className="transition group-hover:translate-x-1">→</span>
</Link>


      </div>
    </div>
  );
};

export default BlogCard;
