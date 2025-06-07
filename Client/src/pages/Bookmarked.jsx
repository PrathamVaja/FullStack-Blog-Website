import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GoArrowRight } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";

const Bookmarked = () => {
  const userId = useSelector((state) => state.user.user._id);
  const [bookmarkBlog, setBookmarkBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchbookmark = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/blog/bookmark/showbookmark`,
          { params: { userId } }
        );
        const blogs = response.data.blogs?.blogs || [];
        setBookmarkBlog(blogs);

       
        const bookmarksMap = {};
        blogs.forEach((blog) => {
          bookmarksMap[blog._id] = true;
        });
        setBookmarks(bookmarksMap);
      } catch (error) {
        toast.error("Failed to load bookmarks");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchbookmark();
  }, [userId]);

  const handleBlogDetail = (blog) => {
    navigate(`/show-post/${blog.title}`, { state: { id: `${blog._id}` } });
  };

  const handleRemoveBookmark = async (blogId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/blog/bookmark/remove`,
        {
          blogId,
          userId,
        }
      );
      setBookmarks((prev) => ({
        ...prev,
        [blogId]: false,
      }));
      setBookmarkBlog((prev) => prev.filter((blog) => blog._id !== blogId));
      toast.success("Bookmark removed!");
    } catch (err) {
      toast.error("Failed to remove bookmark");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (bookmarkBlog.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <FaBookmark className="text-5xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          No Bookmarks Yet
        </h2>
        <p className="text-gray-500 max-w-md">
          You haven't saved any blogs yet. When you find interesting articles,
          click the bookmark icon to save them here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Saved Articles
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            All your bookmarked blogs in one place
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarkBlog.map((blog) => (
            <div
              onClick={() => handleBlogDetail(blog)}
              key={blog._id}
              className="group mx-5 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer"
            >
              <div className="relative overflow-hidden h-60">
                <img
                  src={blog.banner || blog.image}
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
                      handleRemoveBookmark(blog._id);
                    }}
                  >
                    <FaBookmark className="text-xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarked;
