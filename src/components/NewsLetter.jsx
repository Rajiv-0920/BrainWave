import React from "react";

const NewsLetter = () => {
  return (
    <section className="py-20 bg-indigo-700 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to get the latest news about our courses
          and special offers.
        </p>
        <form className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-l-md bg-white text-gray-800 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-indigo-900 font-bold text-white px-6 py-3 rounded-r-md hover:bg-black transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
