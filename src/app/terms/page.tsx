export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3d2c29] mb-4">
            Terms of <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-gray-600 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Agreement */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📜</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Agreement to Terms</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Welcome to B&#39; Boutique. By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </section>

          {/* Use License */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Use License</h2>
            </div>
            <p className="text-gray-600 mb-3">
              Permission is granted to temporarily access the materials on B&#39; Boutique&#39;s website for personal, non-commercial use only. This is the grant of a license, not a transfer of title. Under this license you may not:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Modify or copy the materials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Use the materials for any commercial purpose or for any public display</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Attempt to decompile or reverse engineer any software contained on our website</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Remove any copyright or other proprietary notations from the materials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</span>
              </li>
            </ul>
          </section>

          {/* Account Registration */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Account Registration</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms. You are responsible for:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Safeguarding your password and any other credentials used to access your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>All activities that occur under your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Notifying us immediately of any unauthorized use of your account</span>
              </li>
            </ul>
            <p className="text-gray-600 mt-3">
              We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
            </p>
          </section>

          {/* Product Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🛍️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Product Information & Availability</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We make every effort to display our products accurately. However, we cannot guarantee that your device&#39;s display of colors, textures, or details will be accurate. Product descriptions, pricing, and availability are subject to change without notice. We reserve the right to limit quantities, discontinue products, or refuse orders at our discretion. In the event of a pricing error, we will notify you and give you the option to proceed with your order at the correct price or cancel.
            </p>
          </section>

          {/* Pricing & Payment */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💳</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Pricing & Payment</h2>
            </div>
            <p className="text-gray-600 mb-3">All prices are displayed in South African Rand (ZAR) and include VAT unless otherwise stated. We accept the following payment methods:</p>
            <ul className="space-y-2 text-gray-600 mb-3">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Credit and debit cards (Visa, Mastercard, American Express)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>PayPal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>EFT (Electronic Funds Transfer)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Cash on Delivery (selected areas only)</span>
              </li>
            </ul>
            <p className="text-gray-600">
              Payment is required in full before order dispatch. By providing payment information, you confirm that you are authorized to use the payment method.
            </p>
          </section>

          {/* Shipping & Delivery */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚚</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Shipping & Delivery</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Delivery times are estimates and not guaranteed. We are not responsible for delays caused by courier services, weather conditions, or other factors beyond our control. Risk of loss and title for items pass to you upon delivery to the carrier. For detailed information about shipping options, costs, and delivery times, please refer to our <a href="/shipping-info" className="text-[#b88e72] hover:underline">Shipping Information</a> page.
            </p>
          </section>

          {/* Returns & Refunds */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔄</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Returns & Refunds</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We want you to be completely satisfied with your purchase. We offer a 30-day return policy for most items. Returns must meet specific conditions as outlined in our <a href="/return-policy" className="text-[#b88e72] hover:underline">Return Policy</a>. Refunds will be processed within 5-10 business days of receiving your return. Original shipping costs are non-refundable unless the return is due to our error.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">©</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Intellectual Property</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, is the property of B&#39; Boutique or its content suppliers and is protected by South African and international copyright laws. The compilation of all content on this site is the exclusive property of B&#39; Boutique. Unauthorized use of any content may violate copyright, trademark, and other laws.
            </p>
          </section>

          {/* User Conduct */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Prohibited Activities</h2>
            </div>
            <p className="text-gray-600 mb-3">You agree not to:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Use the website for any illegal purpose or to solicit illegal activity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Harass, abuse, or harm another person or group</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Submit false or misleading information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Interfere with security features or the proper functioning of the website</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Engage in unauthorized framing of or linking to the website</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Upload viruses or other malicious code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Collect user information without consent</span>
              </li>
            </ul>
          </section>

          {/* Privacy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔒</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Privacy & Data Protection</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your privacy is important to us. We collect and use your personal information in accordance with the Protection of Personal Information Act (POPIA) and other applicable laws. By using our website, you consent to our collection and use of personal information as described in our Privacy Policy. We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⚖️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Limitation of Liability</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              B&apos; Boutique and its suppliers shall not be held liable for any damages arising out of or in connection with the use or inability to use the materials on our website, even if we have been notified of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties or limitations of liability for consequential or incidental damages, these limitations may not apply to you. Our total liability to you for all claims arising from the use of the website shall not exceed the amount you paid for the products.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">ℹ️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Disclaimer</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              The materials on B&#39; Boutique&#39;s website are provided on an &#39;as is&#39; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔗</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Third-Party Links</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our website may contain links to third-party websites or services that are not owned or controlled by B&apos; Boutique. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of such websites or services.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔄</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Modifications to Terms</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to revise these Terms of Service at any time without notice. By continuing to use this website after changes are posted, you agree to be bound by the revised terms. We encourage you to review these terms periodically for any updates. Material changes will be communicated via email to registered users or through a prominent notice on our website.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📍</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Governing Law</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of South Africa.
            </p>
          </section>

          {/* Termination */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚫</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Termination</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may terminate or suspend your account and access to the website immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the website will immediately cease. All provisions which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-linear-to-br from-[#f7e6e1] to-[#e7d6c6] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#3d2c29] mb-3">Questions About These Terms?</h3>
            <p className="text-gray-600 mb-4">If you have any questions about these Terms of Service, please contact us:</p>
            <div className="space-y-2 text-gray-600">
              <p>📧 Email: <a href="mailto:claytonsiby@gmail.com" className="text-[#b88e72] hover:underline">claytonsiby@gmail.com</a></p>
              <p>📞 Phone: <a href="tel:+27845860645" className="text-[#b88e72] hover:underline">+27 84 586 0645</a></p>
              <p>⏰ Mon-Fri: 9:00 AM - 6:00 PM</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm text-gray-500">
                By using B&apos; Boutique&apos;s website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
