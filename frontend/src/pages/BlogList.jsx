import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // ✅ Helmet for SEO
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/getblogs`);
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </div>
    );

  if (blogs.length === 0)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No blogs found</h2>
          <p className="text-gray-500">Check back soon for new content!</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ SEO for Blog List Page */}
      <Helmet>
        <title>All Blogs | Bhavya Patel Blog</title>
        <meta
          name="description"
          content="Read our latest blogs on coding, technology, AI, and more. Stay updated with insightful articles."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Explore Our
            <span className="text-blue-600 block mt-2">Blogs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover insights, tutorials, and stories on technology, coding, AI, and more. Stay curious, keep learning!
          </p>
        </div>

        {/* Featured Post */}
        {blogs.length > 0 && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
                <span className="text-white font-bold text-sm uppercase tracking-wider">
                  ⭐ Featured Post
                </span>
              </div>
              <div className="p-10 md:p-12">
                <div className="max-w-4xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight hover:text-blue-600 transition-colors duration-200">
                    <Link to={`/blog/${blogs[0]?.slug}`}>
                      {blogs[0]?.title || "Featured Post"}
                    </Link>
                  </h2>
                  <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    {blogs[0]?.content?.[0]?.paragraph?.slice(0, 350) ||
                      "Dive into our latest featured content with insights that will transform your understanding of the topic and provide you with valuable knowledge..."}
                    ...
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <Link
                      to={`/blog/${blogs[0]?.slug}`}
                      className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      Read Featured Post
                    </Link>
                    <div className="text-gray-500">
                      {blogs[0]?.createdAt
                        ? new Date(blogs[0].createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Recently"} • By Admin
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Other Posts */}
        {blogs.length > 1 && (
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">All Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
              {blogs.slice(1).map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
                >
                  <div className="p-6">
                    <Link to={`/blog/${blog.slug}`} className="block mb-4">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                        {blog.title}
                      </h4>
                    </Link>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {blog?.content?.[0]?.paragraph?.slice(0, 100) || "Explore this fascinating topic..."}...
                    </p>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
                    >
                      Read More about {blog.title}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
