import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import JoditEditor from "jodit-react";



const CreatePost = ({ placeholder }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  


  // for jodit editor
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    [placeholder]
  );

  const categories = [
    "Business",
    "Travel",
    "Technology",
    "Food",
    "Lifestyle",
    "Education",
  ];

  const handleBannerUpload = (files) => {
    const file = files[0];
    if (file) {
      setBanner(file);
      setPreview(URL.createObjectURL(file));
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    
    try {
     
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/blog/create`,
        {
          title,
          description: content,
          category,
          file: banner,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Blog created successfully!");
       
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Blog Post
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Banner
              </label>
              <Dropzone
                onDrop={handleBannerUpload}
                accept="image/*"
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      preview
                        ? "border-gray-300"
                        : "border-gray-300 hover:border-indigo-500"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {preview ? (
                      <img
                        src={preview}
                        alt="Banner preview"
                        className="mx-auto max-h-64 object-cover rounded-md"
                      />
                    ) : (
                      <div className="space-y-2">
                        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Drag and drop your banner image here, or click to
                          select
                        </p>
                        <p className="text-xs text-gray-500">
                          Recommended size: 1200x630 pixels
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>

            
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your blog title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            
            <div className="  ">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <JoditEditor
                
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} 
                onChange={(newContent) => setContent(newContent)}
              />
            </div>

            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Publishing..." : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
