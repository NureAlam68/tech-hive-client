import { useState, useEffect, useCallback } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [form, setForm] = useState({
    code: "",
    expiryDate: "",
    description: "",
    discount: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchCoupons = useCallback(async () => {
    try {
      const response = await axiosSecure.get("/coupons");
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchCoupons();
  }, [axiosSecure, fetchCoupons]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axiosSecure.put(`/coupons/${editId}`, form);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Coupon updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditing(false);
        setEditId(null);
      } else {
        await axiosSecure.post("/coupons", form);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Coupon added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setForm({ code: "", expiryDate: "", description: "", discount: "" });
      fetchCoupons();
    } catch (error) {
      console.error("Error adding/updating coupon:", error);
    }
  };

  const handleDelete = async (id) => {
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
        try {
          await axiosSecure.delete(`/coupons/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Coupon has been deleted.",
            icon: "success",
          });
          fetchCoupons();
        } catch (error) {
          console.error("Error deleting coupon:", error);
        }
      }
    });
  };

  const handleEdit = (coupon) => {
    setIsEditing(true);
    setEditId(coupon._id);
    setForm({
      code: coupon.code,
      expiryDate: coupon.expiryDate,
      description: coupon.description,
      discount: coupon.discount,
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <Helmet>
        <title>TechHive | Manage Coupons</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center dark:text-gray-200">
        Manage Coupons
      </h1>
      <form
        onSubmit={handleAddCoupon}
        className="bg-white p-6 dark:bg-gray-800 rounded-lg shadow-md mb-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Coupon Code
            </label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Discount Amount
          </label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-3 rounded hover:bg-blue-700 transition"
        >
          {isEditing ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 dark:text-gray-200">
                {coupon.code}
              </h2>
              <p className="text-sm text-gray-600 mb-1 dark:text-gray-400">
                <span className="font-medium">Expiry:</span> {coupon.expiryDate}
              </p>
              <p className="text-sm text-gray-600 mb-1 dark:text-gray-400">
                {coupon.description}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Discount:</span> ${coupon.discount}
              </p>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(coupon)}
                className="flex items-center justify-center p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                <AiFillEdit className="text-lg" />
              </button>
              <button
                onClick={() => handleDelete(coupon._id)}
                className="flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                <AiFillDelete className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCoupons;
