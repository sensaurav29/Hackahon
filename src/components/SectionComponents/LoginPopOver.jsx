import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const LoginPopover = ({ isOpen, onClose, setCheckLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", formData);
    setCheckLogin(true);
    console.log(formData);
    onClose(); // Close after submission (mock)
    
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 right-6 bg-white dark:bg-zinc-900 text-black dark:text-white p-6 rounded-2xl shadow-xl z-50 w-80 border border-gray-200 dark:border-zinc-700"
        >
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-red-500 mt-2 block mx-auto"
            >
              Cancel
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopover;
