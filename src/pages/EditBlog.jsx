import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases } from "../lib/appwrite";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      id
    );

    setTitle(res.title);
    setContent(res.content);
    setCategory(res.category);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id,
        { title, content, category }
      );

      navigate(`/blog/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="min-h-screen bg-[#020617] flex justify-center items-center px-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Edit Blog</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-[#020617] text-white"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-[#020617] text-white"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full mb-4 p-3 rounded bg-[#020617] text-white"
        />

        <button className="w-full py-3 rounded bg-orange-600 hover:bg-orange-700 text-white font-semibold">
          Update Blog
        </button>
      </form>
    </section>
  );
};

export default EditBlog;
