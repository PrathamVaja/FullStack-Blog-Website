import axios from "axios";
import { toast } from "react-toastify";

export const useFetch = (url) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const fetchBlogs = async () => {
         
       try {
         const response = await axios.get(
           `${import.meta.env.VITE_BACKEND_API}/${url}`,
         );
         setData(response.data);
         setLoading(false);

         if (response.status !== 200) {
           toast.error(response.data.error);
         }
       } catch (error) {
         setError(error);
         setLoading(false);
         toast.error(error.message);
       }
     };
}