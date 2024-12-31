import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Footer
    <motion.footer
      className="mt-10 py-4 bg-gradient-to-r from-gray-600 to-indigo-500 text-white text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8, duration: 0.5 }}
    >
      <p>© 2024 PayManni. All rights reserved.</p>
      {/* <Link
        to="/support"
        className="mt-2 inline-block text-sm underline hover:text-blue-300"
      >
        Need Help? Contact Support
      </Link> */}
    </motion.footer>
  );
};

export default Footer;
