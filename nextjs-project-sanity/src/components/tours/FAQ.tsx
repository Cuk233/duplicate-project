'use client'

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  questions?: FAQItem[] | null;
}

export default function FAQ({ questions = [] }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No frequently asked questions available
      </div>
    );
  }

  return (
    <div className="faq-accordion">
      {questions.map((item, index) => (
        <div 
          key={index} 
          className={`faq-item ${openIndex === index ? 'active' : ''}`}
        >
          <button
            className="faq-question"
            onClick={() => toggleQuestion(index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <span className="icon">
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          <div 
            className={`faq-answer ${openIndex === index ? 'open' : ''}`}
          >
            <div className="faq-answer-content">
              {item.answer}
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .faq-accordion {
          border: 1px solid #E5E7EB;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .faq-item {
          border-bottom: 1px solid #E5E7EB;
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          background: white;
          text-align: left;
          font-size: 1rem;
          font-weight: 500;
          color: #111827;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-item.active .faq-question {
          background: #F9FAFB;
          color: #DC2626;
        }

        .faq-question:hover {
          background: #F9FAFB;
        }

        .icon {
          font-size: 1.5rem;
          font-weight: 300;
          color: #6B7280;
          transition: transform 0.2s ease;
        }

        .faq-item.active .icon {
          color: #DC2626;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .faq-answer.open {
          max-height: 500px;
          transition: max-height 0.5s ease-in;
        }

        .faq-answer-content {
          padding: 0 1.25rem 1.25rem;
          color: #4B5563;
          line-height: 1.6;
          background: #F9FAFB;
        }
      `}</style>
    </div>
  );
} 