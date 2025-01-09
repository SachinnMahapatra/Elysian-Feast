import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProductModal from "../Components/modals/AddProductModal";
import DeleteConfirmationModal from "../Components/modals/DeleteConfirmationModal";
import EditProductModal from "../Components/modals/EditProduct.Modal";
import AdminNavbar from "../Components/AdminNavbar";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4001/product/all")
      .then((res) => setProducts(res.data.products));
  }, []);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:4001/product/update/${updatedProduct._id}`,
        updatedProduct
      );
      setProducts(
        products.map((product) =>
          product._id === updatedProduct._id ? response.data.product : product
        )
      );
      setShowEditModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:4001/product/delete/${selectedProduct._id}`
      );
      setProducts(
        products.filter((product) => product._id !== selectedProduct._id)
      );
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
        <AdminNavbar/>

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-600 p-3 rounded-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Products Dashboard</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transform transition hover:scale-105"
            >
            <span>Add Product</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-102 hover:shadow-xl"
            >
              <div className="relative h-48">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                    ₹{product.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description || "N/A"}</p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => editProduct(product)}
                    className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 py-2 rounded-lg font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(product)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-lg font-medium transition"
                    >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddProductModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={addProduct}
          />
        )}

        {showEditModal && (
          <EditProductModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={updateProduct}
          product={selectedProduct}
          />
        )}

        {showDeleteModal && (
          <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={deleteProduct}
          />
        )}
      </div>
    </div>
        </>
  );
};

export default Dashboard;