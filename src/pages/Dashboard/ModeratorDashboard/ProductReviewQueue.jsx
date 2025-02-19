import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CheckCircle2, XCircle, Star, ExternalLink, Clock, Shield, BadgeCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ProductReviewQueue = () => {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get("/products");
        const pendingProducts = response.data.filter(product => product.status === "Pending");
        const otherProducts = response.data.filter(product => product.status !== "Pending");
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </span>
        );
      case "Accepted":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Accepted
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-scree py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>TechHive | Product Review Queue</title>
      </Helmet>
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Product Review Queue</h1>
          </div>
          <div className="bg-blue-100 rounded-full px-4 py-2 flex items-center">
            <BadgeCheck className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">
              {products.filter(p => p.status === "Pending").length} Pending Reviews
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {products.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {products.map((product) => (
                <div 
                  key={product._id} 
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                          {product.productName}
                        </h3>
                        {getStatusBadge(product.status)}
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Submitted on {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/product/${product._id}`}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                      <button
                        onClick={() => handleFeature(product._id)}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 transition-colors duration-200"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Feature
                      </button>
                      <button
                        onClick={() => handleAccept(product._id)}
                        disabled={product.status === "Accepted"}
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                          product.status === "Accepted"
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                            : "text-green-600 hover:text-green-700 hover:bg-green-50"
                        } transition-colors duration-200`}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(product._id)}
                        disabled={product.status === "Rejected"}
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                          product.status === "Rejected"
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                            : "text-red-600 hover:text-red-700 hover:bg-red-50"
                        } transition-colors duration-200`}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Shield className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2 dark:text-gray-300">
                No Products to Review
              </h3>
              <p className="text-gray-500">
                There are currently no products waiting for review.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewQueue;