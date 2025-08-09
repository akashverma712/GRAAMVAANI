import React from 'react';
import { motion } from 'framer-motion';

const Scheme = ({ scheme }) => {
  if (!scheme) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-12 bg-white shadow rounded-xl"
    >
      <h2 className="text-3xl font-bold text-green-800 mb-4">{scheme.title}</h2>

      <p className="text-gray-700 mb-4">{scheme.description}</p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Benefits</h3>
        <ul className="list-disc list-inside text-gray-600">
          {scheme.benefits.map((benefit, i) => (
            <li key={i}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Eligibility Criteria</h3>
        <ul className="list-disc list-inside text-gray-600">
          {scheme.eligibility.map((criteria, i) => (
            <li key={i}>{criteria}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-700 mb-2">How to Apply</h3>
        <p className="text-gray-700">{scheme.howToApply}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Application Status</h3>
        <p className="text-gray-700">{scheme.status}</p>
      </div>

      {scheme.faqs && (
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">FAQs</h3>
          <ul className="space-y-3">
            {scheme.faqs.map((faq, i) => (
              <li key={i} className="border rounded p-3">
                <strong>Q:</strong> {faq.q}
                <br />
                <strong>A:</strong> {faq.a}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.section>
  );
};

export default Scheme;
