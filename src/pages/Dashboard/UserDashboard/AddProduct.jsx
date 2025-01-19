import { useState } from "react";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function AddProduct() {
  const { user } = useAuth();
//   const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = {
        ...data,
        tags: tags.map((tag) => tag.text),
        owner: {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        },
        createdAt: new Date().toISOString(),
      };

      const productRes = await axiosPublic.post("/products", formData);
      if (productRes.data.insertedId) {
        reset();
        setTags([]);
        // navigate("/my-products");
        Swal.fire({
          title: `${data.productName} is added to the product.`,
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                {...register("productName", {
                  required: "Product name is required",
                })}
                className="mt-1 block w-full rounded-md border border-blue-100 p-[6px]"
              />
              {errors.productName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Image URL *
              </label>
              <input
                type="url"
                placeholder="Product Image Url"
                {...register("productImage", {
                  required: "Product image URL is required",
                })}
                className="mt-1 block w-full rounded-md border border-blue-100 p-[6px]"
              />
              {errors.productImage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.productImage.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                className="mt-1 block w-full rounded-md border border-blue-100"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Owner Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Product Owner Information
              </h3>
              <div className="flex items-center space-x-4">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <input
                    type="text"
                    value={user?.displayName}
                    disabled
                    className="block w-full rounded-md border-gray-300 bg-gray-50"
                  />
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="mt-2 block w-full rounded-md border-gray-300 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="bottom"
                autocomplete
                classNames={{
                  tags: "react-tags-wrapper",
                  tagInput: "react-tags-input",
                  tag: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mr-2 mb-2",
                  remove: "ml-2 text-indigo-400 hover:text-indigo-500",
                }}
              />
            </div>

            {/* External Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                External Link
              </label>
              <input
                type="url"
                {...register("externalLink")}
                placeholder="https://example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Adding Product..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
