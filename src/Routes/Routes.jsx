import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../layout/Dashboard";
import UserProfile from "../pages/Dashboard/UserDashboard/UserProfile";
import AddProduct from "../pages/Dashboard/UserDashboard/AddProduct";
import MyProducts from "../pages/Dashboard/UserDashboard/MyProducts";
import UpdateProduct from "../pages/Dashboard/UserDashboard/UpdateProduct";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import ProductReviewQueue from "../pages/Dashboard/ModeratorDashboard/ProductReviewQueue";
import ProductDetails from "../pages/ProductDetails";
import ProductsPage from "../pages/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "products",
        element: <ProductsPage></ProductsPage>
      }
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // user routes
      {
        path: "userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "addProduct",
        element: <AddProduct></AddProduct>
      },
      {
        path: "myProducts",
        element: <MyProducts></MyProducts>
      },
      {
        path: 'updateProduct/:id',
        element: <UpdateProduct></UpdateProduct>,
        loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
      },
      // admin routes
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>
      },
      // moderator routes
      {
        path: "ProductReviewQueue",
        element: <ProductReviewQueue></ProductReviewQueue>
      }
    ],
  },
]);
