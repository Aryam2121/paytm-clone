import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Recharge from "./pages/Recharge";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import BillPaymentPage from "./Components/Paybills";
import MoneyTransferPage from "./Components/transfer";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import QrScanner from "./Components/QRCodeScanner";
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-12">
          <Routes>
            <Route path="/qr-scanner" element={<QrScanner />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/transfer" element={<MoneyTransferPage />} />
            <Route path="/pay-bills" element={<BillPaymentPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/recharge" element={<Recharge />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
