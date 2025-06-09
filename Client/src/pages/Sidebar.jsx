import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiHomeLine,
  RiBookmarkLine,
  RiFireLine,
  RiHistoryLine,
  RiUserLine,
  RiBloggerLine,
} from "react-icons/ri";


import { useSelector } from "react-redux";
import axios from "axios";

const  Sidebar = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/blog/post/categories`
        );
        setCategory(response.data.listcategory);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategory();
  }, []);

  const popularPosts = [
    { title: "How to Build a React App in 2023", views: "1.2k" },
    { title: "10 Best Travel Destinations", views: "950" },
    { title: "Healthy Eating Habits", views: "870" },
  ];

  const user = useSelector((state) => state.user);

  const linkClasses = ({ isActive }) =>
    `flex items-center p-2 rounded-lg text-gray-700 ${
      isActive
        ? "bg-indigo-100 text-indigo-600"
        : "hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <div className="h-[90vh] bg-white shadow-lg min-w-[280px] fixed mt-18 hidden md:block overflow-y-auto">
      {/* Navigation */}
      <div className="p-4 border-b">
        <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3">
          Navigation
        </h3>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className={linkClasses}>
                <RiHomeLine className="mr-3 text-lg" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypost" className={linkClasses}>
                <RiBloggerLine className="mr-3 text-lg" />

                <span>My Post</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={user.isLoggedIn ? "/bookmarks" : "/signin"}
                className={linkClasses}
              >
                <RiBookmarkLine className="mr-3 text-lg" />
                <span>Bookmarks</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={user.isLoggedIn ? "/history" : "/signin"}
                className={linkClasses}
              >
                <RiHistoryLine className="mr-3 text-lg" />
                <span>Reading History</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={user.isLoggedIn ? "/profile" : "/signin"}
                className={linkClasses}
              >
                <RiUserLine className="mr-3 text-lg" />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Categories */}
      <div className="p-4 border-b">
        <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3">
          Categories
        </h3>
        <ul className="space-y-2">
          {category.map((cate, index) => (
            <li key={index}>
              <NavLink
                to={`/category/${cate.name}`}
                className={({ isActive }) =>
                  `flex justify-between items-center p-2 rounded-lg text-gray-700 ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600"
                      : "hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                <span>{cate.name}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {cate.length}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="p-4 border-b">
        <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3 flex items-center">
          <RiFireLine className="mr-1 text-orange-500" /> Popular Posts
        </h3>
        <ul className="space-y-3">
          {popularPosts.map((post, index) => (
            <li key={index}>
              <NavLink to="/post/sample" className="block group">
                <h4 className="text-sm font-medium text-gray-800 group-hover:text-indigo-600">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500">{post.views} views</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
