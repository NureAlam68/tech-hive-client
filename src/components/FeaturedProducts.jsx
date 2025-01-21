import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth(); // Get logged-in user info
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosPublic
      .get("http://localhost:5000/featured-products")
      .then((response) => setProducts(response.data))
      .catch((error) =>
        console.error("Error fetching featured products:", error)
      );
  }, [axiosPublic]);

  const handleUpvote = async (id) => {
    if (!user) {
      return navigate("/login"); // Redirect to login if not logged in
    }

    try {
      // console.log("Sending Upvote Request for ID:", id, "By User:", user.email);

      const response = await axiosSecure.patch(
        `http://localhost:5000/upvote/${id}`,
        { email: user?.email }
      );

      // console.log("Upvote Response:", response.data);

      if (response.data.modifiedCount) {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === id ? { ...p, upvote: (p.upvote || 0) + 1 } : p
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Up voted successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <section className="mt-10 md:mt-[60px] lg:mt-[80px] 2xl:mt-[100px] container mx-auto">
      <h2 className="text-3xl lg:text-4xl font-bold text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mt-6 md:mt-8 lg:mt-10">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3
              className="text-lg font-semibold mt-2 cursor-pointer text-blue-500"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {product.productName}
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 mt-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-gray-700 px-2 py-1 text-sm rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleUpvote(product._id)}
                disabled={product.email === user?.email}
                className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-md ${
                  product.email === user?.email
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                <FaThumbsUp />
                {product.upvote}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
