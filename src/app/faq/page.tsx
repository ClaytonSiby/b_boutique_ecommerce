'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: 'Orders & Shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 3-5 business days within South Africa. Express shipping is available for 1-2 business days delivery. International shipping may take 7-14 business days depending on the destination.',
  },
  {
    id: 2,
    category: 'Orders & Shipping',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the exact shipping cost during checkout.',
  },
  {
    id: 3,
    category: 'Orders & Shipping',
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.',
  },
  {
    id: 4,
    category: 'Orders & Shipping',
    question: 'Can I change or cancel my order?',
    answer: 'You can modify or cancel your order within 1 hour of placing it. After that, the order goes into processing and cannot be changed. Please contact customer support immediately if you need to make changes.',
  },
  {
    id: 5,
    category: 'Returns & Exchanges',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery for unworn, unwashed items with original tags attached. Items must be in their original condition. Refunds are processed within 5-7 business days of receiving the return.',
  },
  {
    id: 6,
    category: 'Returns & Exchanges',
    question: 'How do I initiate a return?',
    answer: 'Log into your account, go to your order history, and select "Return Items" on the order you wish to return. Follow the instructions to print your return label and ship the items back to us.',
  },
  {
    id: 7,
    category: 'Returns & Exchanges',
    question: 'Do you offer exchanges?',
    answer: 'Yes, we offer free exchanges for different sizes or colors within 30 days. Simply indicate you want an exchange when initiating your return, and we\'ll ship the new item once we receive your return.',
  },
  {
    id: 8,
    category: 'Returns & Exchanges',
    question: 'Who pays for return shipping?',
    answer: 'For South African returns, we provide a free return shipping label. For international returns, customers are responsible for return shipping costs unless the item is defective or incorrect.',
  },
  {
    id: 9,
    category: 'Products & Sizing',
    question: 'How do I know what size to order?',
    answer: 'We provide detailed size guides for each product. Click on "Size Guide" on any product page to view measurements. If you\'re between sizes, we recommend sizing up for a more comfortable fit.',
  },
  {
    id: 10,
    category: 'Products & Sizing',
    question: 'Are your products authentic?',
    answer: 'Yes, all products sold on Benedetto Boutique are 100% authentic. We source directly from authorized distributors and manufacturers.',
  },
  {
    id: 11,
    category: 'Products & Sizing',
    question: 'Do you restock sold-out items?',
    answer: 'Popular items are frequently restocked. You can sign up for restock notifications on product pages to be alerted when an item becomes available again.',
  },
  {
    id: 12,
    category: 'Payment & Security',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and secure online payments through Stripe. All transactions are encrypted and secure.',
  },
  {
    id: 13,
    category: 'Payment & Security',
    question: 'Is it safe to shop on your website?',
    answer: 'Yes, absolutely. We use industry-standard SSL encryption to protect your personal and payment information. We never store your credit card details on our servers.',
  },
  {
    id: 14,
    category: 'Payment & Security',
    question: 'Do you offer payment plans?',
    answer: 'Currently, we only accept full payment at checkout. We may introduce payment plans in the future.',
  },
  {
    id: 15,
    category: 'Account & Privacy',
    question: 'Do I need an account to shop?',
    answer: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, create wishlists, and enjoy faster checkout.',
  },
  {
    id: 16,
    category: 'Account & Privacy',
    question: 'How do you use my personal information?',
    answer: 'We only use your information to process orders and improve your shopping experience. We never sell your data to third parties. See our Privacy Policy for full details.',
  },
  {
    id: 17,
    category: 'Account & Privacy',
    question: 'How do I delete my account?',
    answer: 'You can delete your account from your account settings, or contact customer support to request account deletion. Please note this action is permanent and cannot be undone.',
  },
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = selectedCategory === 'all'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f7e6e1] to-white">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#3d2c29] to-[#5a4541] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about orders, shipping, returns, and more
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#b88e72] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Questions
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[#b88e72] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <span className="text-xs font-semibold text-[#b88e72] uppercase tracking-wide">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">
                    {item.question}
                  </h3>
                </div>
                <FontAwesomeIcon
                  icon={openItems.includes(item.id) ? faChevronUp : faChevronDown}
                  className="w-5 h-5 text-gray-400"
                />
              </button>
              {openItems.includes(item.id) && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-linear-to-r from-[#3d2c29] to-[#5a4541] rounded-2xl p-8 text-center text-white">
          <FontAwesomeIcon icon={faEnvelope} className="w-12 h-12 mx-auto mb-4 text-[#b88e72]" />
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Can&#39;t find what you&#39;re looking for? Our customer support team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#b88e72] text-white font-semibold rounded-full hover:bg-[#8b6d5a] transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
