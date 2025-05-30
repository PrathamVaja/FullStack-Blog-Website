import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoArrowRight, GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";


const Index = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [bookmarks , setBookmarks] = useState({})


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/blog/post`
        );
        setBlogs(response.data.blog);
        setFilteredBlogs(response.data.blog); // Initialize filtered blogs
        if (response.status !== 200) {
          toast.error(response.data.error);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchBlogs();
  }, []);

  // Search filter function
  useEffect(() => {
    const results = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(results);
  }, [searchTerm, blogs]);

  const handleBlogDetail = (blog) => {
    navigate(`/show-post/${blog.title}`, { state: { id: `${blog._id}` } });
  };


  const handleAddBookmark = (id) => {
    console.log(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mx-3 mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Blog Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover insightful articles, creative ideas, and inspiring stories
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GoSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search blogs by title, category or content..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-700">
              {searchTerm
                ? "No matching blog posts found"
                : "No blog posts available"}
            </h3>
            <p className="text-gray-500 mt-2">
              {searchTerm
                ? "Try a different search term"
                : "Check back later for new content"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                onClick={() => handleBlogDetail(blog)}
                key={blog._id}
                className="group mx-5 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer"
              >
                <div className="relative overflow-hidden h-60">
                  <img
                    src={blog.banner}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-indigo-600">
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {format(new Date(blog.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <h2 className="text-xl font-[600] text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>

                  <div className=" flex justify-between items-center ">
                    <div className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                      Read more <GoArrowRight className="mt-1 ml-2" />
                    </div>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setBookmarks((prev) => ({
                          ...prev,
                          [blog._id]: !prev[blog._id],
                        }));
                      }}
                    >
                      {bookmarks[blog._id] ? (
                        <FaBookmark
                          onClick={handleAddBookmark(blog._id)}
                          className="text-xl"
                        />
                      ) : (
                        <CiBookmark className="text-xl" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
