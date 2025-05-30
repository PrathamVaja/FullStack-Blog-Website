import Header from "@/components/Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className=" md:ml-[280px] mt-10  w-full h-screen ">
         
          <Outlet />
        </main>
      </div>
    </>
  );
}
