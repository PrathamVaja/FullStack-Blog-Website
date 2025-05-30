import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GoArrowRight } from 'react-icons/go';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SpacificCategory = () => {

    const [blogs, setBlogs] = useState([]);

    const navigate = useNavigate();
    

    const {category} = useParams()

    

    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/blog/post/categories/${category}`
          );
            setBlogs(response.data.blog);
            
           
          if (response.status !== 200) {
            toast.error(response.data.error);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchBlogs();
    }, [category]);

   
    const handleBlogDetail = (blog) => {
      navigate(`/show-post/${blog.title}`, { state: { id: `${blog._id}` } });
    };
  return (
       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12  sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto">
           <div className="text-center mx-3 mb-16">
             <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
               Our {category} Collection
             </h1>
             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
               Discover insightful articles, creative ideas, and inspiring stories
             </p>
           </div>
   
           {blogs && blogs.length === 0 ? (
             <div className="text-center py-20">
               <h3 className="text-xl font-medium text-gray-700">
                 No blog posts available
               </h3>
               <p className="text-gray-500 mt-2">
                 Check back later for new content
               </p>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {blogs && blogs.map((blog) => (
                 <div
                   onClick={() => {  handleBlogDetail(blog) }}
                   key={blog._id}
                   className="group mx-5 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
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
                      
                     </div>
                     <h2 className="text-xl font-[600] text-gray-900 mb-3 line-clamp-2">
                       {blog.title}
                     </h2>
   
                     <div
                       onClick={handleBlogDetail}
                       className="inline-flex items-center text-indigo-600 cursor-pointer  font-medium hover:text-indigo-800 transition-colors"
                     >
                       Read more <GoArrowRight className="mt-1 ml-2" />
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>
  )
}

export default SpacificCategory