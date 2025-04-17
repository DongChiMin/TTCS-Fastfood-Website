const Reservation = require("../models/reservationModel"); // import model

// Controller để thêm một reservation
const addReservation = async (req, res) => {
  try {
    const {
      customerName,
      phoneNumber,
      emailAddress,
      address,
      paymentMethod,
      note,
      agreeTerms,
      items,
      date,
      totalPrice,
    } = req.body;

    // Tạo đối tượng reservation mới
    const newReservation = new Reservation({
      customerName,
      phoneNumber,
      emailAddress,
      address,
      paymentMethod,
      note,
      agreeTerms,
      items,
      totalPrice,
      date: date || new Date(),
    });

    // Lưu vào database
    await newReservation.save();

    res.status(201).json({
      message: "Đặt hàng thành công!",
      reservation: newReservation,
    });
  } catch (error) {
    console.error("Lỗi khi thêm reservation:", error);
    res.status(500).json({ message: "Lỗi server, không thể đặt hàng." });
  }
};

module.exports = { addReservation };
