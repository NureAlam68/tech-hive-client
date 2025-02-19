import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AlertTriangle, Eye, Trash2, ShieldAlert } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ReportedProducts = () => {
  const [reportedProducts, setReportedProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  
  useEffect(() => {
    axiosSecure.get("/reported-products")
      .then((res) => setReportedProducts(res.data))
      .catch((error) => console.error("Error fetching reported products:", error));
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/reported-products/${id}`);
          setReportedProducts(reportedProducts.filter(product => product.productId !== id));

          Swal.fire({
            title: "Deleted!",
            text: "The product has been deleted.",
            icon: "success"
          });

        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the product.",
            icon: "error"
          });
          toast.error("Error deleting product:", error);
        }
      }
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>TechHive | Reported Contents</title>
      </Helmet>
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Reported Products</h2>
          </div>
          <div className="bg-red-100 rounded-full px-4 py-2 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-600 font-medium">
              {reportedProducts.length} Reports
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {reportedProducts.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {reportedProducts.map((product) => (
                <div 
                  key={product._id} 
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                        {product.productName}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Reported on {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link
                        to={`/product/${product.productId}`}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDelete(product.productId)}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <ShieldAlert className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2 dark:text-gray-300">
                No Reported Products
              </h3>
              <p className="text-gray-500">
                There are currently no products that have been reported.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportedProducts;