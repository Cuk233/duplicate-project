'use client'

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  order: number;
}

interface FAQProps {
  questions?: FAQItem[] | null;
}

export default function FAQ({ questions = [] }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  const toggleQuestion = (index: number) => {
    if (expandAll) {
      setExpandAll(false);
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleExpandAll = () => {
    setExpandAll(!expandAll);
    setOpenIndex(null);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No frequently asked questions available
      </div>
    );
  }

  // Sort questions by category and order
  const sortedQuestions = [...questions].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return (a.order || 0) - (b.order || 0);
  });

  // Group questions by category
  const groupedQuestions = sortedQuestions.reduce((acc, question) => {
    const category = question.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'departure':
        return 'Departure Information';
      case 'booking':
        return 'Booking & Flights';
      case 'pricing':
        return 'Pricing & Payments';
      case 'experiences':
        return 'Experiences';
      case 'solo':
        return 'Solo Travelers';
      case 'additional':
        return 'Additional Information';
      default:
        return category;
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={handleExpandAll}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          {expandAll ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
          <div key={category} className="space-y-4">
            <div className="faq-accordion">
              {categoryQuestions.map((item, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${openIndex === index || expandAll ? 'active' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={openIndex === index || expandAll}
                  >
                    <span>{item.question}</span>
                    <span className="icon">
                      {openIndex === index || expandAll ? '−' : '+'}
                    </span>
                  </button>
                  <div 
                    className={`faq-answer ${openIndex === index || expandAll ? 'open' : ''}`}
                  >
                    <div className="faq-answer-content">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

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
          color: #000000;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-item .faq-question {
          background: white;
          color: #000000;
        }

        .faq-item.active .faq-question {
          background: #2d5a7b;
          color: white;
        }

        .faq-question:hover {
          background: #f8fafc;
        }

        .icon {
          font-size: 1.5rem;
          font-weight: 300;
          color: #000000;
          transition: transform 0.2s ease;
        }

        .faq-item.active .icon {
          color: white;
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
          padding: 1.25rem;
          color: #4B5563;
          line-height: 1.6;
          background: white;
        }
      `}</style>
    </div>
  );
} 