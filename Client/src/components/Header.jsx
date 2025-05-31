import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { removeUser } from "@/fetures/user/user.slice";
import { Avatar, AvatarImage } from "@/components/ui/avatar";


import { CgProfile } from "react-icons/cg";
import { CiUser, CiSettings } from "react-icons/ci";
import { RiBloggerLine, RiHome4Line } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineCreate } from "react-icons/md";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const userId = user.user._id;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/user/logout/${userId}`
      );

      if (response.status !== 200) {
        toast.error(response.data.error?.message || "Logout failed");
        return;
      }

      dispatch(removeUser());
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      toast.success(response.data.message || "Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Logout error"
      );
    }
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50 border-b ">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
       
        <Link to="/" className="flex items-center">
          <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            BloggerBhai
          </span>

        </Link>

   
        <div className="flex items-center space-x-4">
          {user.isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/create-post"
                className="hidden sm:flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors"
              >
                <MdOutlineCreate className="mr-1" />
                Create Post
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                      {user.user?.avatar ? (
                        <img
                          src={user.user.avatar}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <CgProfile className="text-2xl text-indigo-600" />
                      )}
                    </div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 mt-2 shadow-lg rounded-md bg-white border border-gray-100">
                  <DropdownMenuLabel className="px-4 py-3 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full object-cover bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                        {user.user?.avatar ? (
                          <Avatar>
                            <AvatarImage
                              src={user?.user?.avatar}
                              alt="User avatar"
                            />
                          </Avatar>
                        ) : (
                          <CgProfile className="text-xl text-indigo-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 truncate">
                          {user.user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.user.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer"
                  >
                    <CiUser className="mr-2 text-lg" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/my-posts")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer"
                  >
                    <RiBloggerLine className="mr-2 text-lg" />
                    My Posts
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/settings")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer"
                  >
                    <CiSettings className="mr-2 text-lg" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="border-t border-gray-100" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <IoIosLogOut className="mr-2 text-lg" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/signin"
                className="px-4 py-2 text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
