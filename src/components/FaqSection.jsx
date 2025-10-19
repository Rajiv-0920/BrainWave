import React from "react";
import FaqItem from "./FaqItem";

const FaqSection = ({ faqs }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-2">
            Have questions? We've got answers.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
