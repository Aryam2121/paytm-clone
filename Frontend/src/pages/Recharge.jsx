import React, { useState } from "react";

const Recharge = () => {
  const [amount, setAmount] = useState("");

  const handleRecharge = () => {
    alert(`Recharge of ₹${amount} successful!`);
    setAmount("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Recharge</h2>
      <input
        type="number"
        className="mt-4 p-2 border rounded w-full"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleRecharge}
      >
        Recharge
      </button>
    </div>
  );
};

export default Recharge;
