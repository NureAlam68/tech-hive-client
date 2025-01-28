import { useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUpVote from "../hooks/useUpVote";

const FeaturedProducts = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const { products, isLoading, upvoteProduct } = useUpVote(); 

  const handleUpvote = (id) => {
    if (!user) {
      return navigate("/login"); 
    }

    upvoteProduct(id, user?.email);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
