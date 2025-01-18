import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";


const Main = () => {
    return (
        <div className="max-w-[1920px] mx-auto font-inconsolata">
            <Toaster></Toaster>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;