import React, { useState, useEffect } from "react";

// Mock Link component for demo purposes
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

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
          <div className="w-20 h-20 mx-auto mb-6 text-gray-400">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor"/>
              <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No blogs found</h2>
          <p className="text-gray-500">Check back soon for new content!</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Explore Our
            <span className="text-blue-600 block mt-2">Blogs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover insights, tutorials, and stories on technology, coding, AI,
            and more. Stay curious, keep learning!
          </p>
        </div>

        {/* Featured Post - Full Width */}
        {blogs.length > 0 && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Featured Badge */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
                <span className="text-white font-bold text-sm uppercase tracking-wider">
                  ⭐ Featured Post
                </span>
              </div>
              
              <div className="p-10 md:p-12">
                <div className="max-w-4xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight hover:text-blue-600 transition-colors duration-200">
                    <Link to={`/blog/${blogs[0]?._id}`}>
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
                      to={`/blog/${blogs[0]?._id}`}
                      className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      Read Featured Post
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>

                    <div className="text-gray-500">
                      {blogs[0]?.createdAt
                        ? new Date(blogs[0].createdAt).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "Recently"} • By Admin
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instagram-style Grid Layout */}
        {blogs.length > 1 && (
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">All Posts</h3>
            
            {/* Masonry-like Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
              {blogs.slice(1).map((blog, index) => {
                // Create varied card heights for visual interest
                const isLarge = (index + 1) % 4 === 0;
                const isMedium = (index + 1) % 3 === 0;
                
                return (
                  <article
                    key={blog._id}
                    className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group ${
                      isLarge ? 'md:row-span-2' : isMedium ? 'md:row-span-1' : ''
                    }`}
                  >
                    {/* Color bar indicator */}
                    <div className={`h-2 bg-gradient-to-r ${
                      index % 5 === 0 ? 'from-blue-500 to-purple-500' :
                      index % 5 === 1 ? 'from-green-500 to-blue-500' :
                      index % 5 === 2 ? 'from-purple-500 to-pink-500' :
                      index % 5 === 3 ? 'from-orange-500 to-red-500' :
                      'from-teal-500 to-cyan-500'
                    }`}></div>
                    
                    <div className={`p-6 ${isLarge ? 'pb-8' : ''}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                          {blog.createdAt
                            ? new Date(blog.createdAt).toLocaleDateString()
                            : "Recent"} • By Admin
                        </span>
                      </div>

                      <Link to={`/blog/${blog._id}`} className="block mb-4">
                        <h4 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight ${
                          isLarge ? 'text-2xl mb-4' : isMedium ? 'text-xl mb-3' : 'text-lg mb-2'
                        }`}>
                          {blog.title}
                        </h4>
                      </Link>

                      <p className={`text-gray-600 leading-relaxed mb-4 ${
                        isLarge ? 'text-base line-clamp-6' : 
                        isMedium ? 'text-sm line-clamp-4' : 
                        'text-sm line-clamp-3'
                      }`}>
                        {blog?.content?.[0]?.paragraph?.slice(0, isLarge ? 200 : isMedium ? 130 : 100) || "Explore this fascinating topic..."}
                        ...
                      </p>

                      <Link
                        to={`/blog/${blog._id}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group/link transition-colors duration-200"
                      >
                        Read More
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>

                      {/* Engagement indicators */}
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                       
                        <div className="flex items-center gap-1 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs">{Math.floor(Math.random() * 10) + 3} min read</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;