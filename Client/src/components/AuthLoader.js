import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, removeUser } from "@/fetures/user/user.slice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setUser(JSON.parse(user)));
    }

    const handleStorage = (event) => {
      if (event.key === "token" && event.newValue === null) {
        dispatch(removeUser());
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, [dispatch]);

  return children;
};

export default AuthLoader;
