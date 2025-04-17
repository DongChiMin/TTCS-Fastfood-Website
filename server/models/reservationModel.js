const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String },
  address: { type: String },
  paymentMethod: { type: String },
  note: { type: String },
  agreeTerms: { type: Boolean, default: false },
  items: [{ type: mongoose.Schema.Types.Mixed }],
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Export model
module.exports = mongoose.model("Reservation", reservationSchema);
