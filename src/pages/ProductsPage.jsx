import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbsUp, Search, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ProductsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const productsPerPage = 6;
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosPublic.get(`/accepted-products`, {
          params: {
            search: searchTerm,
            page: currentPage,
            limit: productsPerPage,
            sort: sortOrder,
          },
        });
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm, currentPage, axiosPublic, sortOrder]);

  const handleUpvote = async (id) => {
    if (!user) {
      return navigate("/login");
    }

    try {
      const response = await axiosSecure.patch(`/upvote/${id}`, {
        email: user?.email,
      });
      if (response.data.modifiedCount) {
        toast.success("Upvoted successfully!");
        setProducts((prev) =>
          prev.map((product) =>
            product._id === id
              ? { ...product, upvote: product.upvote + 1 }
              : product
          )
        );
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Helmet>
        <title>TechHive | Products</title>
      </Helmet>
      
      <section className="max-w-[1600px] mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header with animated gradient text */}
        <div className="text-center mb-5">
          <h2 className="text-5xl font-extrabold mb-6 text-black dark:text-gray-300">
            Discover Amazing Products
          </h2>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 w-6 h-6" />
            <input
              type="text"
              placeholder="Search by tag..."
              className="w-full pl-14 pr-4 py-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-lg dark:text-gray-200"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex justify-end">
            <div className="relative inline-block">
              <select
                className="appearance-none pl-4 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-gray-700 dark:text-gray-200"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Sort by Upvotes (High to Low)</option>
                <option value="asc">Sort by Upvotes (Low to High)</option>
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Product Grid with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.map((product) => (
            <div
              key={product._id}
              className="group bg-white dark:bg-black rounded-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden border dark:border-gray-600"
            >
              <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-8">
                <h3
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {product.productName}
                </h3>

                <div className="flex flex-wrap gap-2 mt-6">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-2xl font-bold text-blue-500 mt-4 cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  Details
                </h3>
                <div className="mt-8">
                  <button
                    onClick={() => handleUpvote(product._id)}
                    disabled={product.email === user?.email}
                    className={`
                      flex items-center gap-3 px-8 py-2 rounded-md font-bold text-lg transition-all duration-300 w-full justify-center
                      ${
                        product.email === user?.email
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                          : "bg-blue-900 text-white"
                      }
                    `}
                  >
                    <ThumbsUp className="w-6 h-6" />
                    <span>{product.upvote}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="flex justify-center items-center mt-20 space-x-3 md:space-x-6">
          <button
            className="flex items-center gap-3 px-3 md:px-5 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border dark:border-gray-600 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg font-semibold"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="px-3 md:px-5 py-2 bg-blue-950 text-white rounded-lg font-bold text-lg text-center">
            Page {currentPage}
          </span>

          <button
            className="flex items-center gap-3 px-3 md:px-5 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border dark:border-gray-600 hover:shadow-xl transition-all duration-200 font-semibold"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;