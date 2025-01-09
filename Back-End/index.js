import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from "url";



import userRoute from './route/user.route.js';
import productRoute from './route/product.route.js';
import resetPasswordRoute  from './route/resetPassword.route.js';
import orderRoute from './route/order.route.js'
import cartRoute from './route/cart.route.js';


// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from 'cloudinary';

const app = express()
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true 
  }));
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
dotenv.config()
const port = process.env.PORT || 3000; 
const URI = process.env.MongoDBURI;

// Cloudinary configuration
// const { v2: cloudinaryv2 } = cloudinary;

// cloudinaryv2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Cloudinary storage configuration
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinaryv2,  // Use cloudinary.v2 here
//   params: {
//     folder: 'products', // Cloudinary folder for product images
//     format: async (req, file) => 'png', // File format (e.g., png)
//     public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Unique file name
//   },
// });

// export const upload = multer({ storage });



// connect to MongoDB
try{
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
}
catch(error){ 
    console.log("Error connecting",error)
}

// Define __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/user",userRoute);
app.use("/product",productRoute);
app.use('/user', resetPasswordRoute);
app.use('/cart', cartRoute)


app.use("/order", orderRoute); // Prefix for all order-related routes




app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});