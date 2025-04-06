const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true }, // Cửa hàng sở hữu
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }, // URL ảnh món ăn
    category: { type: String, required: true, enum: ["pizza", "burger", "beverage", "dessert", "other"] }, 
    toppings: [
      {
        name: { type: String, required: true },
        price: { type: Number, default: 0 }
      }
    ],
    discount: {
      percent: { type: Number, default: 0 }, 
      valid_until: { type: Date } 
    },
    available: { type: Boolean, default: true }, 
  },
  { timestamps: true } 
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;