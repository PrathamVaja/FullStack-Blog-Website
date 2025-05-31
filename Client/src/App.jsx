import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import BlogDetail from "./pages/BlogDetail";
import SpacificCategory from "./pages/SpacificCategory";
import AuthLoader from "./components/AuthLoader";



const App = () => {
  return (
    <>
      <AuthLoader>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/show-post/:id" element={<BlogDetail />} />
            <Route path="/category/:category" element={<SpacificCategory />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthLoader>
    </>
  );
};

export default App;
