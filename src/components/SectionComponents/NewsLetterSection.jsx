import { useEffect, useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail(""); // Clear input
    setSubmitted(false);
  };

  
  return (
    <>
      { (submitted) ? (
        <div className=" newsletter bg-zinc-950 dark:bg-zinc-950 py-10 px-4 sm:px-8 lg:px-16 rounded-2xl shadow-md max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white font-text dark:text-white mb-2">
            Subscribe to our Newsletter
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">
            Stay updated with our latest products, offers, and news.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-800 dark:bg-zinc-800 text-white dark:text-white focus:outline-none outline-0 focus:ring-2 focus:ring-red-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-zinc-900 dark:bg-zinc-900 py-10 px-4 sm:px-8 lg:px-16 rounded-2xl shadow-md max-w-4xl mx-auto mb-8 text-white text-center">
          <h2 className="text-2xl font-semibold">
            🎉 Congratulations! You are subscribed to our newsletter!
          </h2>
        </div>
      )}
    </>
  );
};

export default NewsletterSection;
