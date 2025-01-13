import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const RevenueChart = ({ timeRange }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatChartData = (orders, range) => {
    if (!Array.isArray(orders)) return [];

    const now = new Date();
    const periods = { "7d": 7, "30d": 30, "90d": 90, "1y": 365 };
    const days = periods[range] || 30;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const dataMap = {};
    for (let i = 0; i < days; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dataMap[key] = 0;
    }

    orders.forEach((order) => {
      const date = new Date(order.orderDate);
      const key = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (dataMap[key] !== undefined) {
        dataMap[key] += order.totalAmount;
      }
    });

    return Object.entries(dataMap)
      .map(([name, value]) => ({ name, value }))
      .reverse();
  };

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        };

        const ordersRes = await fetch("https://elysian-feast.onrender.com/order/all", { headers });
        const ordersData = await ordersRes.json();
        // console.log("Orders API Response:", ordersData);

        const orders = Array.isArray(ordersData.orders) ? ordersData.orders : [];
        // console.log("Orders Array:", orders);

        const formattedData = formatChartData(orders, timeRange);
        // console.log("Formatted Chart Data:", formattedData);

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [timeRange]);

  if (loading) return <div>Loading Chart...</div>;
  if (!chartData || chartData.length === 0) return <div>No data available for the selected time range.</div>;

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${value.toLocaleString()}`} stroke="#9CA3AF" />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800">{label}</p>
                    <p className="text-blue-600 font-bold">₹{payload[0].value.toLocaleString()}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: "#2563EB" }} activeDot={{ r: 6, fill: "#2563EB" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
