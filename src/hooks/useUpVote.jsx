import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const useUpVote = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); 

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-products");
      return res.data;
    },
  });

  const upvoteProduct = async (id, email) => {
    try {
      const response = await axiosSecure.patch(`/upvote/${id}`, { email });
      if (response.data.modifiedCount) {
        toast.success("Upvoted successfully!");

        queryClient.invalidateQueries(["featured-products"]);
        queryClient.invalidateQueries(["trending-products"]);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return { products, isLoading, upvoteProduct, refetch };
};

export default useUpVote;
