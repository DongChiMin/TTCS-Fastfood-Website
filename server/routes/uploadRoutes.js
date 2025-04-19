const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadTempImage } = require("../controllers/uploadController");

router.post("/upload-temp", upload.single("image"), uploadTempImage);

module.exports = router;
