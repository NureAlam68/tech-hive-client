import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaExternalLinkAlt, FaThumbsUp } from "react-icons/fa";
import { MdReport, MdStar, MdStarBorder } from "react-icons/md";

const ProductDetails = () => {
  const { id } = useParams(); 
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState(1);
  const [isHovering, setIsHovering] = useState(0);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        toast.error("Failed to fetch product details.", error.response?.data.message);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews/${id}`);
        setReviews(res.data);
      } catch (error) {
        toast.error("Failed to fetch reviews.", error.response?.data.message);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [axiosSecure, id]);

  const handleUpvote = async () => {
    if (!user) {
      return navigate("/login"); // Redirect to login if not logged in
    }

    try {
      const response = await axiosSecure.patch(`/upvote/${id}`, { email: user?.email });
      if (response.data.modifiedCount) {
        toast.success("Upvoted successfully!");
        setProduct((prev) => ({
          ...prev,
          upvote: prev.upvote + 1,
        }));
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const handleReport = async () => {
    if (!user) {
      return navigate("/login");
    }

    try {
      await axiosSecure.post(`/report/${id}`, { email: user?.email });
      toast.success("Product reported successfully!");
    } catch (error) {
      toast.error("Failed to report product.", error.response?.data.message);
    }
  };

  const handlePostReview = async () => {
    if (!user) {
      return navigate("/login");
    }

    if (!rating || rating < 1 || rating > 5) {
      toast.error("Please select a valid rating between 1 and 5 stars");
      return;
    }

    try {
      const response = await axiosSecure.post("/reviews", {
        productId: id,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        reviewDescription,
        rating: parseInt(rating), 
      });

      if (response.data.success) {
        toast.success("Review posted successfully!");
        setReviews((prev) => [
          ...prev,
          {
            reviewerName: user.displayName,
            reviewerImage: user.photoURL,
            reviewDescription,
            rating: parseInt(rating), 
          },
        ]);
        setReviewDescription("");
        setRating(1); 
      }
    } catch (error) {
      toast.error("Failed to post review.", error.response?.data.message);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const hasVoted = product.votedUsers?.includes(user?.email);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Details Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-[400px] lg:h-[500px]">
              <img
                src={product.productImage}
                alt={product.productName}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.productName}</h1>
                {product.externalLink && (
                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <FaExternalLinkAlt />
                    <span className="text-sm">Visit Site</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <p className="text-lg text-gray-600 mb-6">{product.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium
                             transition-transform hover:scale-105"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleUpvote}
                  disabled={hasVoted || product.email === user?.email}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                    ${hasVoted || product.email === user?.email
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                >
                  <FaThumbsUp className="text-lg" />
                  <span>{product.upvote || 0}</span>
                </button>
                <button
                  onClick={handleReport}
                  disabled={product.email === user?.email}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                    ${product.email === user?.email
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                >
                  <MdReport className="text-lg" />
                  <span>Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Customer Reviews
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({reviews.length})
            </span>
          </h2>
          
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {reviews.length === 0 ? (
              <div className="col-span-2 text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review?.reviewerImage}
                      alt={review.reviewerName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
                      <div className="flex gap-1 text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= review.rating ? (
                              <MdStar size={20} />
                            ) : (
                              <MdStarBorder size={20} />
                            )}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.reviewDescription}</p>
                </div>
              ))
            )}
          </div>

          {/* Post Review Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>
            <div className="space-y-6">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{user.displayName}</p>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setIsHovering(star)}
                          onMouseLeave={() => setIsHovering(0)}
                          onClick={() => setRating(star)}
                          className="text-2xl transition-colors focus:outline-none"
                        >
                          {star <= (isHovering || rating) ? (
                            <MdStar className="text-yellow-400 hover:text-yellow-500" size={32} />
                          ) : (
                            <MdStarBorder className="text-gray-300 hover:text-yellow-200" size={32} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your experience with this product..."
                      value={reviewDescription}
                      onChange={(e) => setReviewDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 
                               focus:border-transparent transition-shadow resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handlePostReview}
                    className="w-full bg-blue-500 text-white font-medium px-6 py-3 rounded-lg
                             hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition-all
                             transform hover:-translate-y-0.5"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">Please login to write a review</p>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-500 text-white font-medium px-6 py-3 rounded-lg
                             hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition-all"
                  >
                    Login to Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
