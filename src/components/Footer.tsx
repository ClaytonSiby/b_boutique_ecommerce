"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcPaypal, faCcApplePay, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Footer */}
      <footer className="relative w-full py-12 md:py-16 px-4 sm:px-6 md:px-8 mt-0 overflow-hidden">
        {/* Elegant Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#2d1f1c] via-[#3d2c29] to-[#2d1f1c]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,142,114,0.15),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Logo & Description */}
          <div className="text-center mb-8 md:mb-12">
            <Link href="/" className="inline-block text-3xl sm:text-4xl font-bold bg-linear-to-r from-[#b88e72] to-[#f7e6e1] bg-clip-text text-transparent tracking-wide mb-4">B Boutique</Link>
            <p className="text-sm sm:text-base text-[#f7e6e1]/70 max-w-md mx-auto px-4">Your destination for premium fashion and timeless elegance</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Social Media */}
            <div>
              <h4 className="font-bold text-[#f7e6e1] mb-6 text-lg">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener" title="Facebook" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 text-[#1877F2] hover:text-white transition-colors" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener" title="Twitter" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#1DA1F2] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <FontAwesomeIcon icon={faTwitter} className="w-5 h-5 text-[#1DA1F2] hover:text-white transition-colors" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener" title="Instagram" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-linear-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-[#E1306C] hover:text-white transition-colors" />
                </a>
              </div>
            </div>
            
            {/* Info Links */}
            <div>
              <h4 className="font-bold text-[#f7e6e1] mb-6 text-lg">Information</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
                <li><Link href="/blog" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Blog</Link></li>
                <li><Link href="/return-policy" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Return Policy</Link></li>
                <li><Link href="/shipping-policy" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Shipping Info</Link></li>
                <li><Link href="/terms" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Terms of Service</Link></li>
              </ul>
            </div>
            
            {/* Customer Service */}
            <div>
              <h4 className="font-bold text-[#f7e6e1] mb-6 text-lg">Customer Service</h4>
              <ul className="space-y-3">
                <li><Link href="/contact" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Contact Us</Link></li>
                <li><Link href="/faq" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">FAQ</Link></li>
                <li><Link href="/size-guide" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Size Guide</Link></li>
                <li><Link href="/track-order" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Track Order</Link></li>
              </ul>
            </div>
            
            {/* Payment Icons */}
            <div>
              <h4 className="font-bold text-[#f7e6e1] mb-6 text-lg">Secure Payments</h4>
              <div className="flex gap-3 flex-wrap">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center hover:scale-110 transition-all shadow-md">
                  <FontAwesomeIcon icon={faCcVisa} className="text-[#1A1F71] text-2xl" />
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center hover:scale-110 transition-all shadow-md">
                  <FontAwesomeIcon icon={faCcMastercard} className="text-[#FF5F00] text-2xl" />
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center hover:scale-110 transition-all shadow-md">
                  <FontAwesomeIcon icon={faCcPaypal} className="text-[#003087] text-2xl" />
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center hover:scale-110 transition-all shadow-md">
                  <FontAwesomeIcon icon={faCcApplePay} className="text-black text-2xl" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-[#b88e72]/30 to-transparent mb-8"></div>
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#f7e6e1]/60 text-sm">© {new Date().getFullYear()} B Boutique. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-[#f7e6e1]/60 hover:text-[#b88e72] transition-colors">Privacy Policy</Link>
              <Link href="/cookies" className="text-[#f7e6e1]/60 hover:text-[#b88e72] transition-colors">Cookies</Link>
              <Link href="/accessibility" className="text-[#f7e6e1]/60 hover:text-[#b88e72] transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
        
        {/* Chat Icon */}
        <button
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] text-white rounded-full shadow-2xl hover:shadow-[#b88e72]/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          onClick={() => setChatOpen((open) => !open)}
          aria-label="Chat"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </button>
        {chatOpen && (
          <div className="fixed bottom-20 md:bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-2xl shadow-2xl p-4 sm:p-6 z-50 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[#3d2c29] text-base sm:text-lg">Chat with us</span>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-[#b88e72] transition-colors text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto mb-4 text-sm text-gray-700">
              <p>Hello! How can we help you today?</p>
            </div>
            <form className="flex gap-2">
              <input type="text" placeholder="Type your message..." className="flex-1 px-3 sm:px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent text-sm" />
              <button type="submit" className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white px-4 sm:px-6 py-2 rounded-full hover:from-[#8b6d5a] hover:to-[#b88e72] transition-all text-sm">Send</button>
            </form>
          </div>
        )}
      </footer>
    </>
  );
}
