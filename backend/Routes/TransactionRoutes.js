const express = require("express");
const { getTransactions } = require("../controllers/transactionController");
const router = express.Router();
const { protect } = require("../Middleware/authMiddleware");
const {validateQueryParams} = require("../Middleware/validateQueryParams")
// Base path: /api/transactions

/**
 * @route   GET /api/transactions
 * @desc    Fetch all transactions with filters, pagination, and sorting
 * @access  Private
 */
router.get("/getTransactions", protect, validateQueryParams, getTransactions);

module.exports = router;
