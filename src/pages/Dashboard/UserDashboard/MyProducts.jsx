import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products?email=${user?.email}`);
      return res.data;
    },
  });

  // Handle Delete
  const handleDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/products/${product._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${product.productName} has been deleted`,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>TechHive | My Products</title>
      </Helmet>
      <div className="max-w-[1600px] mx-auto bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-gray-200">My Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No products found.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 px-4 py-2 text-left dark:text-gray-200">
                    Product Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:text-gray-200">
                    Votes
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:text-gray-200">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="border border-gray-300 px-4 py-2 dark:text-gray-300">
                      {product.productName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 dark:text-gray-300">
                      {product.upvote}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          product.status === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Link to={`/dashboard/updateProduct/${product._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 mt-[2px] md:mt-0"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
