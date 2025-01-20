import { FaUserShield, FaUserTie } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeModerator = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Moderator!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/moderator/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: `${user.name}`,
              text: "Is moderator now!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: `${user.name}`,
              text: "Is admin now!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-[50px] mt-[68px] min-h-screen">
        <div className="flex justify-between items-center">
          <h2 className="font-cinzel font-bold lg:text-[24px] xl:text-[32px]">
            Total Users: {users.length}
          </h2>
        </div>
        <div className="mt-10">
          <table className="table">
            {/* head */}
            <thead className="bg-primary text-white uppercase">
              <tr>
                <th></th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>Make Admin</th>
                <th>Make Moderator</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn bg-primary btn-md text-white hover:text-black"
                      >
                        <FaUserTie></FaUserTie>
                      </button>
                    )}
                  </td>
                  <td>
                    {user.role === "moderator" ? (
                      "Moderator"
                    ) : (
                      <button
                        onClick={() => handleMakeModerator(user)}
                        className="btn bg-accent hover:text-black btn-md text-white"
                      >
                        <FaUserShield></FaUserShield>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
