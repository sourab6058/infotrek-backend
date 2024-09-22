const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authController = require("../controllers/authController");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public", "imgs");
    console.log(uploadPath);
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Save the file with the original filename
    const id = req.params.id;
    cb(null, Date.now() + "_" + id); // e.g. 1629201923000.jpg
  },
});
const upload = multer({ storage });

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.put("/update/:id", authController.update);
router.patch("/uploadpic/:id", upload.single("file"), authController.uploadPic);

module.exports = router;
