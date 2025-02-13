const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");

const pipeline = promisify(require("stream").pipeline);
const router = express.Router();

// Ensure directories exist
const createDirectory = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

createDirectory(`${__dirname}/../public/resume`);
createDirectory(`${__dirname}/../public/profile`);

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = `${__dirname}/../public/resume/`;
    if (file.mimetype.startsWith("image/")) {
      uploadPath = `${__dirname}/../public/profile/`;
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${uuidv4()}.${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

// Resume Upload
router.post("/resume", upload.single("file"), (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileExtension = req.file.filename.split(".").pop().toLowerCase();
  if (fileExtension !== "pdf") {
    return res.status(400).json({ message: "Invalid format. Only PDF allowed." });
  }

  res.send({
    message: "File uploaded successfully",
    url: `/host/resume/${req.file.filename}`,
  });
});

// Profile Image Upload
router.post("/profile", upload.single("file"), (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileExtension = req.file.filename.split(".").pop().toLowerCase();
  if (fileExtension !== "jpg" && fileExtension !== "png") {
    return res.status(400).json({ message: "Invalid format. Only JPG or PNG allowed." });
  }

  res.send({
    message: "Profile image uploaded successfully",
    url: `/host/profile/${req.file.filename}`,
  });
});

module.exports = router;

