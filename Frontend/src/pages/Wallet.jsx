import React, { useState } from "react";
import { motion } from "framer-motion";

const Wallet = () => {
  const [balance, setBalance] = useState(5000); // Mock balance
  const [transactions, setTransactions] = useState([]);
  const targetBalance = 10000; // Mock target balance

  const addTransaction = (amount, type) => {
    const newTransaction = {
      id: transactions.length + 1,
      amount,
      type,
      date: new Date().toLocaleString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDeposit = (amount) => {
    setBalance(balance + amount);
    addTransaction(amount, "Deposit");
  };

  const handleWithdraw = (amount) => {
    if (balance - amount >= 0) {
      setBalance(balance - amount);
      addTransaction(amount, "Withdraw");
    } else {
      alert("Insufficient balance!");
    }
  };

  const progressPercentage = (balance / targetBalance) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 flex flex-col items-center">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.8 }}
      >
        {/* Wallet Balance */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Wallet Balance</h2>
          <motion.p
            className="text-4xl font-extrabold text-indigo-600 mt-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            ₹ {balance.toLocaleString()}
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="text-sm text-gray-500">Target: ₹ {targetBalance}</div>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <motion.div
              className="bg-indigo-600 h-4 rounded-full"
              style={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <motion.button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md"
            onClick={() => handleDeposit(1000)}
            whileHover={{ scale: 1.1 }}
            transition={{ delay: 0.2 }}
          >
            Deposit ₹1000
          </motion.button>
          <motion.button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
            onClick={() => handleWithdraw(1000)}
            whileHover={{ scale: 1.1 }}
            transition={{ delay: 0.2 }}
          >
            Withdraw ₹1000
          </motion.button>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h3 className="text-xl font-semibold text-gray-800">Transaction History</h3>
        {transactions.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {transactions.map((txn) => (
              <motion.li
                key={txn.id}
                className={`flex justify-between items-center px-4 py-2 rounded-lg ${
                  txn.type === "Deposit"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span>{txn.type}</span>
                <span>₹ {txn.amount}</span>
                <span className="text-sm text-gray-500">{txn.date}</span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No transactions yet.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Wallet;
