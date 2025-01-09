import Order from "../model/order.model.js";
import Product from "../model/product.model.js";
import User from "../model/user.model.js"; // Import User model

import { sendMail } from "../services/emailService.js";const orderConfirmationTemplate = (userDetails, productList, numericTotalAmount, formattedAddress) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            color: #333333;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #FF6347; /* Tomato color for a restaurant feel */
            border-radius: 10px 10px 0 0;
            color: white;
        }
        .header h1 {
            font-size: 28px;
            margin: 0;
            color: white;
        }
        .body {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
            padding: 20px;
        }
        .product-list {
            margin: 20px 0;
        }
        .product-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 10px;
        }
        .product-item:last-child {
            border-bottom: none;
        }
        .product-item img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 8px;
            margin-right: 15px;
        }
        .product-item .details {
            flex: 1;
        }
        .product-item .details p {
            margin: 0;
            color: #555555;
        }
        .product-item .details p.name {
            font-weight: bold;
            color: #333333;
        }
        .footer {
            font-size: 12px;
            text-align: center;
            color: #888888;
            padding: 10px;
            background-color: #f2f2f2;
            border-radius: 0 0 10px 10px;
        }
        .footer a {
            color: #FF6347;
            text-decoration: none;
        }
        .emoji {
            font-size: 24px;
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🍴 Order Confirmed!</h1>
            <p>Your delicious food is on the way 🍕</p>
        </div>
        <div class="body">
            <p>Hello <strong>${userDetails.firstName}</strong>,</p>
            <p>Thank you for ordering with us! Here's what you ordered:</p>
            <div class="product-list">
                ${productList.map(item => `
                <div class="product-item">
                    <img src="${item.product.imageUrl}" alt="${item.product.name}">
                    <div class="details">
                        <p class="name">${item.product.name}</p>
                        <p>Price: ₹${item.product.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                </div>
                `).join('')}
            </div>
            <p><strong>Total Amount:</strong> ₹${numericTotalAmount.toFixed(2)}</p>
            <p><strong>Delivery Address:</strong> ${formattedAddress}</p>
        </div>
        <div class="footer">
            <p>🍽️ If you have any questions, feel free to <a href="mailto:support@elysianfeast.com">contact us</a>.</p>
            <p>Thank you for choosing <strong>Elysian Feast</strong>!</p>
        </div>
    </div>
</body>
</html>
`;

    
// Create a new order
export const createOrder = async (req, res) => {
  console.log("Test route hit!");

  try {
    const { user, products, totalAmount, address } = req.body;

    // Validate and convert totalAmount if necessary
    const numericTotalAmount = parseFloat(totalAmount);
    if (isNaN(numericTotalAmount)) {
      throw new Error("Invalid totalAmount: Must be a number");
    }
    const formattedAddress = `
  ${address.street}, 
  ${address.city}, 
  ${address.state}, 
  ${address.zipCode}, 
  ${address.country}
`.trim();

    // Create and save the order
    const newOrder = new Order({
      user,
      products,
      totalAmount: numericTotalAmount,
      formattedAddress,
    });

    const savedOrder = await newOrder.save();

    // Populate user and product details
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("user", "firstName lastName email")
      .populate("products.product");

    const userDetails = populatedOrder.user;
    const productDetails = populatedOrder.products;

    // Generate the product list for the email template
    const productList = productDetails
      .map(
        (item) => `
        <tr>
          <td>${item.product.name}</td>
          <td>₹${item.product.price.toFixed(2)}</td>
        </tr>`
      )
      .join("");

    // email template
    const emailContent = orderConfirmationTemplate(
      userDetails,
      productDetails,
      numericTotalAmount,
      formattedAddress
    );

    // Send the email
    await sendMail(userDetails.email, "Your Order Confirmation", emailContent);

    // Send success response
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "firstName lastName")
      .populate("products.product", "name price");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get a specific order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("user", "firstName lastName email")
      .populate("products.product", "name price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// Get order count
export const getOrderCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error fetching order count:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order count",
      error: error.message,
    });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};