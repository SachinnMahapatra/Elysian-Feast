import React, { useEffect, useState } from 'react';
import {
  Users, Package, ShoppingCart, IndianRupee, ArrowUp, ArrowDown, Calendar
} from 'lucide-react';
import RevenueChart from './RevenueChart'; // Importing the modular RevenueChart component

const DashboardCard = ({ title, value, increment, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold mt-2 text-gray-800">
          {title === "Revenue" ? `₹${value?.toLocaleString() || 0}` : value?.toLocaleString() || 0}
        </p>
        {increment !== undefined && (
          <div className={`flex items-center mt-2 ${increment >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {increment >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="text-sm font-medium ml-1">{Math.abs(increment)}% from previous period</span>
          </div>
        )}
      </div>
      <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </div>
);

const TimeRangeButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    {children}
  </button>
);

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [timeRange, setTimeRange] = useState('30d');
  const [stats, setStats] = useState({
    userIncrement: 14,
    productIncrement: -5,
    orderIncrement: 8,
    revenueIncrement: 15
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        };

        const [userRes, productRes, orderCountRes, ordersRes] = await Promise.all([
          fetch('https://elysian-feast.onrender.com/user/count', { headers }),
          fetch('https://elysian-feast.onrender.com/product/count', { headers }),
          fetch('https://elysian-feast.onrender.com/order/count', { headers }),
          fetch('https://elysian-feast.onrender.com/order/all', { headers })
        ]);

        const [userData, productData, orderCountData, ordersData] = await Promise.all([
          userRes.json(),
          productRes.json(),
          orderCountRes.json(),
          ordersRes.json()
        ]);

        setUserCount(userData.count);
        setProductCount(productData.count);
        setOrderCount(orderCountData.count);

        const orders = Array.isArray(ordersData.orders) ? ordersData.orders : 
                      Array.isArray(ordersData) ? ordersData : [];

        const totalRevenue = orders.reduce((sum, order) => {
          return sum + (Number(order.totalAmount) || 0);
        }, 0);
        
        setRevenue(totalRevenue);
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
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" />
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Track your business performance and growth</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2 bg-gray-100 p-1 rounded-xl">
            <TimeRangeButton 
              active={timeRange === '7d'} 
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </TimeRangeButton>
            <TimeRangeButton 
              active={timeRange === '30d'} 
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </TimeRangeButton>
            <TimeRangeButton 
              active={timeRange === '90d'} 
              onClick={() => setTimeRange('90d')}
            >
              90 Days
            </TimeRangeButton>
            <TimeRangeButton 
              active={timeRange === '1y'} 
              onClick={() => setTimeRange('1y')}
            >
              1 Year
            </TimeRangeButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            title="Total Users" 
            value={userCount}
            increment={stats.userIncrement}
            icon={Users}
          />
          <DashboardCard 
            title="Total Products" 
            value={productCount}
            increment={stats.productIncrement}
            icon={Package}
          />
          <DashboardCard 
            title="Total Orders" 
            value={orderCount}
            increment={stats.orderIncrement}
            icon={ShoppingCart}
          />
          <DashboardCard 
            title="Revenue" 
            value={revenue}
            increment={stats.revenueIncrement}
            icon={IndianRupee}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Revenue Overview</h2>
              <p className="text-gray-500 text-sm mt-1">Revenue trends over time</p>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm">
                {timeRange === '7d' ? 'Last 7 Days' :
                 timeRange === '30d' ? 'Last 30 Days' :
                 timeRange === '90d' ? 'Last 90 Days' : 'Last Year'}
              </span>
            </div>
          </div>
          <RevenueChart timeRange={timeRange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
