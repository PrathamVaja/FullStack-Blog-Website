import axios from "axios";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiArrowLeft, FiClock, FiCalendar, FiTag } from "react-icons/fi";

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBlog(null)
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/blog/post/detail/${id}`
        );
console.log(response)
        if (response.status === 200) {
          setBlog(response.data.blog);
          console.log(response.data.blog);
          
        } else {
          toast.error(response.data.message || "Failed to fetch blog details");
          setError(response.data.message);
        }
      } catch (err) {
        toast.error(err.message || "An error occurred");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };



    if (id) {
      fetchBlogDetail();
    } else {
      setError("No blog ID provided");
      setLoading(false);
      navigate("/blog");
    }
  }, [id, navigate]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Unknown date" : format(date, "MMMM d, yyyy");
    } catch (e) {
      console.error("Date formatting error:", e);
      return "Unknown date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading beautiful content...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Oops!</h2>
          <p className="text-gray-600 mb-6 text-lg">
            {error || "We couldn't find the blog you're looking for."}
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center mx-auto"
          >
            <FiArrowLeft className="mr-2 " /> Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8 transition-all duration-300 group"
        >
          <FiArrowLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" /> 
          <span className="font-medium">Back to all blogs</span>
        </button>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
          <div className="relative h-72 sm:h-96 lg:h-[32rem]">
            <img
              src={blog.banner}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
                  <span className="flex items-center">
                    <FiCalendar className="mr-1.5" />
                    {formatDate(blog.createdAt)}
                  </span>
                  <span className="flex items-center">
                    <FiClock className="mr-1.5" />
                    {Math.ceil(blog.description.split(" ").length / 200)} min read
                  </span>
                </div>
              </div>
            </div>
          </div>

       
          <div className="p-6 sm:p-8 lg:p-10">
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
              <span className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                <FiTag className="mr-1.5" />
                {blog.category}
              </span>
            </div>

          
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>

          
            {blog.tags?.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="flex items-center text-sm font-medium text-gray-500 mb-4">
                  <FiTag className="mr-2" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 text-gray-800 text-xs font-medium rounded-full hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {blog.author && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={
                  blog.author.avatar ||
                  "https://randomuser.me/api/portraits/men/32.jpg"
                }
                alt={blog.author.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-bold text-gray-900">{blog.author.name}</h4>
                <p className="text-indigo-600 text-sm font-medium mt-1">
                  {blog.author.bio || "Writer"}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {blog.author.stats || "Published multiple articles"}
                </p>
                <div className="mt-4 flex justify-center sm:justify-start gap-3">
                  {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                      aria-label={social}
                    >
                      {social.charAt(0)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Posts (Placeholder) */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 relative before:absolute before:-bottom-1 before:left-0 before:w-12 before:h-1 before:bg-indigo-600">
            You might also like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-r from-indigo-100 to-purple-100"></div>
                <div className="p-5">
                  <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded mb-2">
                    Category
                  </span>
                  <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">Related Post Title {item}</h4>
                  <p className="text-gray-500 text-sm">Coming soon...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;