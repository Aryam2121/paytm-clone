const express = require("express");
const { getBalance, addBalance } = require("../controllers/walletController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/getBalance", protect, getBalance);
router.post("/addBalance", protect, addBalance);

module.exports = router;
