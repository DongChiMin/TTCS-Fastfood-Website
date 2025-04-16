const Chef = require("../models/chefModel");

// Lấy danh sách chefs
exports.getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Thêm chef mới
exports.createChef = async (req, res) => {
  const { name, specialty, imageUrl, experience } = req.body;

  try {
    const newChef = new Chef({ name, specialty, imageUrl, experience });
    const savedChef = await newChef.save();
    res
      .status(201)
      .json({ message: "Chef created successfully", chef: savedChef });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Cập nhật thông tin chef
exports.updateChef = async (req, res) => {
  const { id } = req.params;
  const { name, specialty, imageUrl, experience } = req.body;

  try {
    const updatedChef = await Chef.findByIdAndUpdate(
      id,
      { name, specialty, imageUrl, experience },
      { new: true }
    );

    if (!updatedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    res.json({ message: "Chef updated successfully", chef: updatedChef });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Xóa chef
exports.deleteChef = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedChef = await Chef.findByIdAndDelete(id);

    if (!deletedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    res.json({ message: "Chef deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
