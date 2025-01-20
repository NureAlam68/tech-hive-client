import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProductReviewQueue = () => {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get("/products");

        // First, filter 'Pending' products and others separately
        const pendingProducts = response.data.filter(product => product.status === "Pending");
        const otherProducts = response.data.filter(product => product.status !== "Pending");

        // Merge them so 'Pending' ones come first
        const sortedProducts = [...pendingProducts, ...otherProducts];

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  const handleAccept = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to accept this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/products/status/${id}`, { status: "Accepted" });
        setProducts(products.map(product =>
          product._id === id ? { ...product, status: "Accepted" } : product
        ));
        Swal.fire({
          title: "Accepted!",
          text: "The product has been accepted.",
          icon: "success"
        });
      }
    });
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/products/status/${id}`, { status: "Rejected" });
        setProducts(products.map(product =>
          product._id === id ? { ...product, status: "Rejected" } : product
        ));
        Swal.fire({
          title: "Rejected!",
          text: "The product has been rejected.",
          icon: "success"
        });
      }
    });
  };

  const handleFeature = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this product as featured?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it featured!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/products/status/${id}`, { featured: true });
        Swal.fire({
          title: "Featured!",
          text: "The product has been marked as featured.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Product Review Queue</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-0 border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-blue-500 text-white uppercase">
            <tr>
              <th className="border p-2 text-center"></th>
              <th className="border p-2 text-left">Product Name</th>
              <th className="border p-2 text-left">View Details</th>
              <th className="border p-2 text-left">Make Featured</th>
              <th className="border p-2 text-left">Accept</th>
              <th className="border p-2 text-left">Reject</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product, idx) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="border p-2 text-center">{idx + 1}</td>
                <td className="border p-2">{product.productName}</td>
                <td className="border p-2">
                  <Link to={`/product/${product._id}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                      View Details
                    </button>
                  </Link>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleFeature(product._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                  >
                    Make Featured
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleAccept(product._id)}
                    disabled={product.status === "Accepted"}
                    className={`px-4 py-2 ${product.status === "Accepted" ? "bg-gray-400" : "bg-green-500"} text-white rounded hover:bg-green-600 focus:outline-none`}
                  >
                    Accept
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleReject(product._id)}
                    disabled={product.status === "Rejected"}
                    className={`px-4 py-2 ${product.status === "Rejected" ? "bg-gray-400" : "bg-red-500"} text-white rounded hover:bg-red-600 focus:outline-none`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReviewQueue;
