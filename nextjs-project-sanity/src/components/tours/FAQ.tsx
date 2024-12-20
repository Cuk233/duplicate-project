'use client'

import React from 'react';

interface FAQProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

export default function FAQ({ questions }: FAQProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="space-y-6">
      {questions.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
} 