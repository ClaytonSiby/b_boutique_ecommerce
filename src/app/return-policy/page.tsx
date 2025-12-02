export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3d2c29] mb-4">
            Return <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-gray-600 text-lg">Your satisfaction is our priority</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Overview */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📦</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Return Period</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We offer a <strong>30-day return policy</strong> from the date of delivery. If you&#39;re not completely satisfied with your purchase, you can return it for a full refund or exchange within this period.
            </p>
          </section>

          {/* Eligible Items */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Eligible Items</h2>
            </div>
            <p className="text-gray-600 mb-3">To be eligible for a return, items must meet the following conditions:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Items must be unworn, unwashed, and in their original condition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>All original tags and labels must be attached</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Items must be returned in their original packaging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Proof of purchase (receipt or order number) must be provided</span>
              </li>
            </ul>
          </section>

          {/* Non-Returnable Items */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✗</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Non-Returnable Items</h2>
            </div>
            <p className="text-gray-600 mb-3">For hygiene and safety reasons, the following items cannot be returned:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Underwear, swimwear, and intimate apparel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Earrings and pierced jewelry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Final sale items (marked as &quot;Final Sale&quot; at time of purchase)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Gift cards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span>Items worn, washed, or altered</span>
              </li>
            </ul>
          </section>

          {/* Return Process */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔄</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">How to Return</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-[#b88e72] text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-1">Initiate Your Return</h3>
                  <p className="text-gray-600">Contact our customer service at <a href="mailto:claytonsiby@gmail.com" className="text-[#b88e72] hover:underline">claytonsiby@gmail.com</a> or call <a href="tel:+27845860645" className="text-[#b88e72] hover:underline">+27 84 586 0645</a> to request a return authorization.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-[#b88e72] text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-1">Pack Your Items</h3>
                  <p className="text-gray-600">Place items in their original packaging with all tags attached. Include a copy of your receipt or order confirmation.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-[#b88e72] text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-1">Ship Your Return</h3>
                  <p className="text-gray-600">Send the package to the address provided by our customer service team. We recommend using a trackable shipping method.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-[#b88e72] text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-1">Receive Your Refund</h3>
                  <p className="text-gray-600">Once we receive and inspect your return, we&#39;ll process your refund within 5-10 business days.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Exchanges */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔁</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Exchanges</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We&#39;re happy to exchange items for a different size or color. Follow the same return process and indicate in your message that you&#39;d like an exchange. We&#39;ll ship your replacement item once we receive your return.
            </p>
          </section>

          {/* Refund Method */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💳</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Refund Method</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              Refunds will be issued to your original payment method:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span><strong>Credit/Debit Card:</strong> 5-10 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span><strong>PayPal:</strong> 3-5 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b88e72] mt-1">•</span>
                <span><strong>Cash on Delivery:</strong> Bank transfer within 7 business days (provide bank details)</span>
              </li>
            </ul>
            <p className="text-gray-600 mt-3">
              Original shipping costs are non-refundable unless the return is due to our error.
            </p>
          </section>

          {/* Damaged Items */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Damaged or Defective Items</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              If you receive a damaged or defective item, please contact us immediately with photos of the damage. We&#39;ll arrange for a replacement or full refund at no additional cost, including return shipping.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-linear-to-br from-[#f7e6e1] to-[#e7d6c6] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#3d2c29] mb-3">Questions About Returns?</h3>
            <p className="text-gray-600 mb-4">Our customer service team is here to help!</p>
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
