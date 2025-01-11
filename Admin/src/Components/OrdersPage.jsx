import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  ShoppingCart, 
  User, 
  Calendar, 
  Clock, 
  Filter,
  Search,
  MoreHorizontal,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  Download
} from "lucide-react";
import AdminNavbar from "./AdminNavbar";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [showMoreActions, setShowMoreActions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [loading, setLoading] = useState(true);
  
  const statusOptions = ["pending", "processing", "completed", "cancelled"];
  const statusIcons = {
    pending: <Clock className="w-4 h-4 text-yellow-500" />,
    processing: <Package className="w-4 h-4 text-blue-500" />,
    completed: <CheckCircle className="w-4 h-4 text-green-500" />,
    cancelled: <XCircle className="w-4 h-4 text-red-500" />
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://elysian-feast.onrender.com/order/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(response.data.orders);
      toast.success("Orders loaded successfully");
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `https://elysian-feast.onrender.com/order/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.order.status } : order
        )
      );
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  };

  const toggleMoreActions = (orderId) => {
    setShowMoreActions(showMoreActions === orderId ? null : orderId);
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const filterOrders = (orders) => {
    let filteredOrders = [...orders];

    // Status filter
    if (statusFilter !== "all") {
      filteredOrders = filteredOrders.filter((order) => order.status === statusFilter);
    }

    // Time filter
    if (timeFilter !== "all") {
      const currentTime = new Date();
      let timeLimit;

      switch(timeFilter) {
        case "last24":
          timeLimit = new Date(currentTime.setHours(currentTime.getHours() - 24));
          break;
        case "last7":
          timeLimit = new Date(currentTime.setDate(currentTime.getDate() - 7));
          break;
        case "last30":
          timeLimit = new Date(currentTime.setDate(currentTime.getDate() - 30));
          break;
        default:
          break;
      }

      filteredOrders = filteredOrders.filter((order) => new Date(order.createdAt) > timeLimit);
    }

    // Search filter
    if (searchTerm) {
      filteredOrders = filteredOrders.filter((order) => 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${order.user?.firstName} ${order.user?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortConfig.key) {
      filteredOrders.sort((a, b) => {
        if (sortConfig.key === 'customer') {
          const nameA = `${a.user?.firstName} ${a.user?.lastName}`.toLowerCase();
          const nameB = `${b.user?.firstName} ${b.user?.lastName}`.toLowerCase();
          return sortConfig.direction === 'asc' ? 
            nameA.localeCompare(nameB) : 
            nameB.localeCompare(nameA);
        }
        return sortConfig.direction === 'asc' ? 
          a[sortConfig.key] > b[sortConfig.key] ? 1 : -1 :
          a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      });
    }

    return filteredOrders;
  };

  const exportToCSV = () => {
    const filteredOrders = filterOrders(orders);
    const csvContent = [
      ["Order ID", "Customer Name", "Email", "Status", "Created At"],
      ...filteredOrders.map(order => [
        order._id,
        `${order.user?.firstName} ${order.user?.lastName}`,
        order.user?.email,
        order.status,
        new Date(order.createdAt).toLocaleString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <>
        <AdminNavbar/>

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
          </div>
          <button
            onClick={exportToCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        {/* <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="last24">Last 24 Hours</option>
                  <option value="last7">Last 7 Days</option>
                  <option value="last30">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div> */}

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('_id')}>
                    <div className="flex items-center gap-2">
                      <span>Order ID</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('customer')}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Customer</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span>Status</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('createdAt')}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Created At</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterOrders(orders).map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{order._id}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {order.user?.firstName} {order.user?.lastName}
                        </span>
                        <span className="text-sm text-gray-500">{order.user?.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {statusIcons[order.status]}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          onClick={() => toggleMoreActions(order._id)}
                        >
                          <MoreHorizontal className="w-5 h-5 text-gray-600" />
                        </button>

                        {showMoreActions === order._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                            {statusOptions.map((status) => (
                              <button
                                key={status}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                onClick={() => {
                                  handleStatusChange(order._id, status);
                                  setShowMoreActions(null);
                                }}
                              >
                                {statusIcons[status]}
                                <span className="capitalize">{status}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrdersPage;