import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "@/fetures/user/user.slice";
import { IoCameraReverseOutline } from "react-icons/io5";



const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.user?.name || "");
  const [email, setEmail] = useState(user?.user?.email || "");
  const [bio, setBio] = useState(user?.user?.bio || "");
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [loading , setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("bio", bio);

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/user/update/${user?.user?._id}`,
        formData,
      );

      if (response.status === 200) {
        setLoading(false)
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Update failed"
      );
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
    console.log(preview);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center ">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        Loading...
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" w-full h-screen  flex  items-center justify-center">
          <div className="max-w-[600px] w-[450px] h-auto px-7 py-7  border rounded-lg ">
            <div className="mb-2 mt-2 flex justify-center">
              <div className="relative group w-fit h-fit rounded-full cursor-pointer">
                <Dropzone
                  onDrop={(acceptedFiles) => handleFiles(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="relative w-24 h-24">
                      <input {...getInputProps()} className="hidden" />

                      
                      <Avatar className="w-24 h-24 border border-purple-600 rounded-full overflow-hidden">
                        {preview || user?.user?.avatar ? (
                          <AvatarImage
                            src={preview || user?.user?.avatar}
                            alt="User avatar"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-5xl">
                            <CgProfile />
                          </div>
                        )}
                      </Avatar>

                      <div className="absolute inset-0 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-2xl">
                        <IoCameraReverseOutline />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 text-gray-600 block w-full px-3 mb-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 text-gray-600 block w-full px-3 mb-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 text-gray-600 block w-full px-3 mb-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center px-3 py-2 text-md font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              save
            </button>
          </div>
        </div>
      </form>

    </>
  );
};

export default Profile;
