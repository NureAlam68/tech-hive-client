import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosSecure.get("/admin/statistics");
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStatistics();
  }, [axiosSecure]);

  const pieChartData = statistics
    ? [
        { name: "Accepted", value: statistics.acceptedProducts },
        { name: "Pending", value: statistics.pendingProducts },
        { name: "Total Reviews", value: statistics.totalReviews },
        { name: "Total Users", value: statistics.totalUsers },
      ]
    : [];

  const COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3"]; 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-200">
      <div className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">
          Admin Dashboard Statistics
        </h2>
        {statistics ? (
          <div className="flex flex-col items-center">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={true}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#333" }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-gray-700 font-medium">{value}</span>
                )}
              />
            </PieChart>
            <p className="text-sm text-gray-500 text-center mt-4">
              This pie chart shows the overview of the platform&apos;s key metrics, including
              products, reviews, and users.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStatistics;
