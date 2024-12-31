const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  try {
    // Extract filters from query parameters
    const { type, status, startDate, endDate, search, limit, page } = req.query;

    // Build the query object dynamically
    const query = { user: req.user.id };

    if (type) {
      query.type = type; // Filter by transaction type (Credit/Debit)
    }

    if (status) {
      query.status = status; // Filter by status (Pending/Completed/Failed)
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { description: { $regex: search, $options: "i" } }, // Search in description
        { transactionId: { $regex: search, $options: "i" } }, // Search in transactionId
        { reference: { $regex: search, $options: "i" } }, // Search in reference
      ];
    }

    // Pagination settings
    const resultsPerPage = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;

    // Execute query with pagination and sorting
    const transactions = await Transaction.find(query)
      .sort({ date: -1 }) // Sort by date (most recent first)
      .skip(resultsPerPage * (currentPage - 1))
      .limit(resultsPerPage);

    // Count total transactions for pagination
    const totalTransactions = await Transaction.countDocuments(query);

    res.json({
      transactions,
      totalTransactions,
      totalPages: Math.ceil(totalTransactions / resultsPerPage),
      currentPage,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
