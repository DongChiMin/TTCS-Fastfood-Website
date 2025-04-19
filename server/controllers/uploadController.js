const fs = require("fs");
const path = require("path");

exports.uploadTempImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const tempFilename = Date.now() + "-" + req.file.originalname;
  const tempFolder = path.join(__dirname, "../temp_uploads");
  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder, { recursive: true });
  }

  const tempPath = path.join(tempFolder, tempFilename);

  fs.rename(req.file.path, tempPath, (err) => {
    if (err) {
      console.error("Error moving file:", err);
      return res
        .status(500)
        .json({ error: "Failed to save file", details: err.message });
    }

    console.log(`File uploaded successfully: ${tempPath}`);
    res.status(200).json({ tempFilename: tempFilename });
  });
};
