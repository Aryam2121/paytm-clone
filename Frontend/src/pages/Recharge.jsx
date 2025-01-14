import React, { useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isValid, setIsValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [userLanguage, setUserLanguage] = useState("English");
  const [rating, setRating] = useState(0);

  const validateAmount = (amount) => {
    return !isNaN(amount) && amount > 0;
  };

  const handleRecharge = () => {
    if (!amount || !validateAmount(amount)) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setIsProcessing(true);

    // Simulate promo code discount logic
    let finalAmount = parseFloat(amount);
    if (promoCode.toLowerCase() === "discount10") {
      finalAmount = finalAmount * 0.9; // Apply 10% discount
    }

    setTimeout(() => {
      setIsSuccess(true);
      setIsProcessing(false);
      setTransactionHistory([
        ...transactionHistory,
        { amount: finalAmount, paymentMethod, date: new Date().toLocaleString() },
      ]);
      setAmount("");
      setPromoCode("");
      setIsSuccess(false);
    }, 1500);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (e) => {
    setUserLanguage(e.target.value);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className={`p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      {/* Language Selector */}
      <motion.div
        className="absolute top-4 left-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <select
          value={userLanguage}
          onChange={handleLanguageChange}
          className="p-2 bg-gray-100 rounded-lg"
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
        </select>
      </motion.div>

      <motion.h2
        className="text-3xl font-semibold mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Recharge Your Account
      </motion.h2>

      {/* Dark Mode Toggle */}
      <motion.button
        className="absolute top-4 right-4 bg-gray-500 text-white p-2 rounded-full focus:outline-none"
        onClick={handleToggleDarkMode}
        whileHover={{ scale: 1.1 }}
      >
        {isDarkMode ? "🌞" : "🌙"}
      </motion.button>

      {/* Amount Input */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <input
          type="number"
          className={`mt-4 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isValid && "border-red-500"}`}
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {!isValid && (
          <motion.p
            className="text-red-500 text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Please enter a valid amount.
          </motion.p>
        )}
      </motion.div>

      {/* Promo Code Input */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <input
          type="text"
          className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter promo code (optional)"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
      </motion.div>

      {/* Payment Method Dropdown with Icons */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <select
          className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="UPI">UPI</option>
          <option value="Debit/Credit">Debit/Credit Card</option>
          <option value="Wallet">Wallet</option>
        </select>
      </motion.div>

      {/* QR Code for Payment */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="text-xl font-semibold">Scan to Pay (UPI)</h3>
        {paymentMethod === "UPI" && <QRCode value={`upi://pay?pa=someone@upi&pn=Paytm&mc=123456&tid=789&url=upi&am=${amount}`} />}
      </motion.div>

      {/* Recharge Button */}
      <motion.button
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded shadow-lg hover:bg-blue-700 transition-all"
        onClick={handleRecharge}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="loader" />
            <span className="ml-2">Processing...</span>
          </motion.div>
        ) : isSuccess ? (
          "Recharge Successful!"
        ) : (
          "Recharge"
        )}
      </motion.button>

      {/* Success or Error Message */}
      {isSuccess && (
        <motion.div
          className="mt-4 text-green-500 font-semibold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>Recharge of ₹{parseFloat(amount).toFixed(2)} was successful!</p>
        </motion.div>
      )}

      {/* Rating System */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h3 className="font-semibold">Rate your Experience</h3>
        <div className="flex justify-center mt-2">
          {[1, 2, 3, 4, 5].map((rate) => (
            <motion.button
              key={rate}
              className={`px-3 py-2 rounded-lg ${rating >= rate ? "bg-yellow-500" : "bg-gray-300"}`}
              onClick={() => handleRating(rate)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {rate}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        className="mt-6 p-4 bg-gray-100 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <h3 className="text-xl font-semibold">Transaction History</h3>
        <ul className="mt-4 space-y-2">
          {transactionHistory.length > 0 ? (
            transactionHistory.map((transaction, index) => (
              <li key={index} className="flex justify-between">
                <span>{transaction.date}</span>
                <span>₹{transaction.amount.toFixed(2)}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No transactions yet.</p>
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default Recharge;
