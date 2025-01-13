import React, { useEffect, useState } from 'react';
import {
  Users, Package, ShoppingCart, IndianRupee 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DashboardCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">
          {title === "Revenue" ? `₹${value?.toLocaleString() || 0}` : value?.toLocaleString() || 0}
        </p>
      </div>
      <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatChartData = (orders) => {
    if (!Array.isArray(orders)) {
      console.error('Orders is not an array:', orders);
      return [];
    }

    // Create a map of all months with 0 as initial value
    const monthsMap = {};
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      monthsMap[monthYear] = 0;
    }

    // Fill in the actual values
    orders.forEach(order => {
      const date = new Date(order.orderDate);
      const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      if (monthsMap[monthYear] !== undefined) {
        monthsMap[monthYear] += order.totalAmount;
      }
    });

    // Convert to array and reverse to show oldest to newest
    return Object.entries(monthsMap)
      .map(([name, value]) => ({ name, value }))
      .reverse();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        };

        // Fetch all data
        const [userRes, productRes, orderCountRes, ordersRes] = await Promise.all([
          fetch('https://elysian-feast.onrender.com/user/count', { headers }),
          fetch('https://elysian-feast.onrender.com/product/count', { headers }),
          fetch('https://elysian-feast.onrender.com/order/count', { headers }),
          fetch('https://elysian-feast.onrender.com/order/all', { headers })
        ]);

        // Parse responses
        const [userData, productData, orderCountData, ordersData] = await Promise.all([
          userRes.json(),
          productRes.json(),
          orderCountRes.json(),
          ordersRes.json()
        ]);

        // Set counts
        setUserCount(userData.count);
        setProductCount(productData.count);
        setOrderCount(orderCountData.count);

        // Handle orders data
        const orders = Array.isArray(ordersData.orders) ? ordersData.orders : 
                      Array.isArray(ordersData) ? ordersData : [];

        // Calculate revenue
        const totalRevenue = orders.reduce((sum, order) => {
          const amount = Number(order.totalAmount) || 0;
          return sum + amount;
        }, 0);
        
        setRevenue(totalRevenue);

        // Set chart data
        const formattedChartData = formatChartData(orders);
        setChartData(formattedChartData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-500">₹{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard 
          title="Total Users" 
          value={userCount} 
          icon={Users}
        />
        <DashboardCard 
          title="Total Products" 
          value={productCount} 
          icon={Package}
        />
        <DashboardCard 
          title="Total Orders" 
          value={orderCount} 
          icon={ShoppingCart}
        />
        <DashboardCard 
          title="Revenue" 
          value={revenue} 
          icon={IndianRupee }
        />
      </div>

      {/* Sales Overview Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;