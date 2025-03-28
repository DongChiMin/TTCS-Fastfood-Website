const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: {
      address: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    opening_hours: {
      open: { type: String, required: true }, 
      close: { type: String, required: true } 
    },
    rating: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { timestamps: true } 
);

// Tạo index cho tìm kiếm cửa hàng theo vị trí
storeSchema.index({ "location": "2dsphere" });

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;