const express = require("express");
const router = express.Router();

const {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry
} = require("../controllers/enquiryController");

router.post("/", createEnquiry);

router.get("/", getEnquiries);

router.put("/:id", updateEnquiry);

router.delete("/:id", deleteEnquiry);

module.exports = router;