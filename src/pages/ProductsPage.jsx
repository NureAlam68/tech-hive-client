import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbsUp, Search, ChevronLeft, ChevronRight } from "lucide-react";
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosPublic.get(`/accepted-products`, {
          params: {
            search: searchTerm,
            page: currentPage,
            limit: productsPerPage,
          },
        });
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm, currentPage, axiosPublic]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Helmet>
        <title>TechHive | Products</title>
      </Helmet>
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Discover Amazing Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of innovative products and vote for
            your favorites
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search by tag..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3
                  className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 cursor-pointer transition-colors duration-200"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.productName}
                </h3>

                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => handleUpvote(product._id)}
                    disabled={product.email === user?.email}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300
                      ${
                        product.email === user?.email
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-200"
                      }
                    `}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{product.upvote}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-16 space-x-4">
          <button
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <span className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md font-medium">
            Page {currentPage}
          </span>

          <button
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
