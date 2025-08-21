import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/getblogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading blogs...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        All Blogs
      </h1>

      {blogs.length === 0 && (
        <p className="text-center text-gray-500">No blogs found</p>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {blog.content[0]?.paragraph?.slice(0, 120) || "No content"}...
              </p>
            </div>

            <Link
              to={`/blog/${blog._id}`}
              className="inline-block mt-auto text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
