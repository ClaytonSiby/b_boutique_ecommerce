export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3d2c29] mb-4">
            Shipping <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Information</span>
          </h1>
          <p className="text-gray-600 text-lg">Fast and reliable delivery to your door</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Delivery Times */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚚</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Delivery Times</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-[#b88e72] pl-4 py-2">
                <h3 className="font-semibold text-[#3d2c29] mb-1">Standard Delivery</h3>
                <p className="text-gray-600">3-5 business days • FREE on orders over R500</p>
                <p className="text-sm text-gray-500 mt-1">R75 for orders under R500</p>
              </div>
              <div className="border-l-4 border-[#b88e72] pl-4 py-2">
                <h3 className="font-semibold text-[#3d2c29] mb-1">Express Delivery</h3>
                <p className="text-gray-600">1-2 business days • R150</p>
                <p className="text-sm text-gray-500 mt-1">Available for major cities and metropolitan areas</p>
              </div>
              <div className="border-l-4 border-[#b88e72] pl-4 py-2">
                <h3 className="font-semibold text-[#3d2c29] mb-1">Same-Day Delivery</h3>
                <p className="text-gray-600">Within 4-6 hours • R250</p>
                <p className="text-sm text-gray-500 mt-1">Available in Cape Town, Johannesburg, and Pretoria (orders placed before 12 PM)</p>
              </div>
            </div>
          </section>

          {/* Shipping Locations */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🌍</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Shipping Locations</h2>
            </div>
            <p className="text-gray-600 mb-4">We currently ship to the following locations:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-linear-to-br from-[#f7e6e1] to-[#e7d6c6] rounded-lg p-4">
                <h3 className="font-semibold text-[#3d2c29] mb-2">🇿🇦 South Africa (Nationwide)</h3>
                <p className="text-sm text-gray-600">All provinces and major cities</p>
              </div>
              <div className="bg-linear-to-br from-[#f7e6e1] to-[#e7d6c6] rounded-lg p-4">
                <h3 className="font-semibold text-[#3d2c29] mb-2">📦 Pick-Up Points</h3>
                <p className="text-sm text-gray-600">Collect from selected Pargo, Paxi, and PostNet locations</p>
              </div>
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              International shipping coming soon! Sign up for our newsletter to be notified when we expand our delivery areas.
            </p>
          </section>

          {/* Order Processing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⏱️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Order Processing</h2>
            </div>
            <p className="text-gray-600 mb-3">Here&#39;s what happens after you place your order:</p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-[#b88e72] text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-1">Order Confirmation</h3>
                  <p className="text-gray-600">You&#39;ll receive an email confirmation immediately after placing your order.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-[#b88e72] text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-1">Processing (1-2 business days)</h3>
                  <p className="text-gray-600">We carefully pick, pack, and prepare your items for shipment.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-[#b88e72] text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-1">Shipping Notification</h3>
                  <p className="text-gray-600">Once shipped, you&#39;ll receive a tracking number via email and SMS.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-[#b88e72] text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-1">Out for Delivery</h3>
                  <p className="text-gray-600">Track your package in real-time until it reaches your doorstep.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Orders placed after 2 PM on weekdays or during weekends will be processed on the next business day.
              </p>
            </div>
          </section>

          {/* Tracking Your Order */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📍</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Tracking Your Order</h2>
            </div>
            <p className="text-gray-600 mb-4">Stay updated on your delivery every step of the way:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Track your order using the tracking number sent to your email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Check order status in your account dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Receive SMS updates for major milestones (dispatched, out for delivery, delivered)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Contact courier directly for real-time location updates</span>
              </li>
            </ul>
          </section>

          {/* Shipping Partners */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Our Shipping Partners</h2>
            </div>
            <p className="text-gray-600 mb-4">We work with trusted courier services to ensure safe delivery:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="font-semibold text-[#3d2c29]">The Courier Guy</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="font-semibold text-[#3d2c29]">Pargo</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="font-semibold text-[#3d2c29]">PostNet</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="font-semibold text-[#3d2c29]">RAM Couriers</p>
              </div>
            </div>
          </section>

          {/* Packaging */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📦</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Packaging & Sustainability</h2>
            </div>
            <p className="text-gray-600 mb-3">
              Your items arrive beautifully packaged and protected:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Eco-friendly recycled packaging materials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Secure packaging to prevent damage during transit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Elegant presentation suitable for gifting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Biodegradable packing materials whenever possible</span>
              </li>
            </ul>
          </section>

          {/* Delivery Issues */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">❓</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Delivery Issues</h2>
            </div>
            <p className="text-gray-600 mb-4">What to do if there&#39;s a problem with your delivery:</p>
            <div className="space-y-3">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h3 className="font-semibold text-[#3d2c29] mb-1">Package Not Received?</h3>
                <p className="text-sm text-gray-600">If your tracking shows delivered but you haven&#39;t received it, check with neighbors or building security. Contact us within 48 hours for assistance.</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h3 className="font-semibold text-[#3d2c29] mb-1">Damaged Package?</h3>
                <p className="text-sm text-gray-600">Take photos of the damaged packaging and items immediately. Contact us at <a href="mailto:claytonsiby@gmail.com" className="text-[#b88e72] hover:underline">claytonsiby@gmail.com</a> for a replacement or refund.</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h3 className="font-semibold text-[#3d2c29] mb-1">Delayed Delivery?</h3>
                <p className="text-sm text-gray-600">Check your tracking for updates. Delays may occur due to weather, high volume, or courier issues. We&#39;ll investigate and keep you informed.</p>
              </div>
            </div>
          </section>

          {/* Address Requirements */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏠</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Address Requirements</h2>
            </div>
            <p className="text-gray-600 mb-3">To ensure successful delivery, please provide:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Complete street address with unit/apartment number</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Valid contact phone number for delivery updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Delivery instructions (e.g., gate codes, building access)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Alternative contact person if you won&#39;t be available</span>
              </li>
            </ul>
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> Double-check your address before completing checkout. Incorrect addresses may result in delivery delays or additional fees.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-linear-to-br from-[#f7e6e1] to-[#e7d6c6] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#3d2c29] mb-3">Shipping Questions?</h3>
            <p className="text-gray-600 mb-4">Our team is ready to assist you!</p>
            <div className="space-y-2 text-gray-600">
              <p>📧 Email: <a href="mailto:claytonsiby@gmail.com" className="text-[#b88e72] hover:underline">claytonsiby@gmail.com</a></p>
              <p>📞 Phone: <a href="tel:+27845860645" className="text-[#b88e72] hover:underline">+27 84 586 0645</a></p>
              <p>⏰ Mon-Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
