export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3d2c29] mb-4">
            Size <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Guide</span>
          </h1>
          <p className="text-gray-600 text-lg">Find your perfect fit</p>
        </div>

        <div className="space-y-8">
          {/* How to Measure */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📏</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">How to Measure</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-2">1. Bust/Chest</h3>
                  <p className="text-gray-600 text-sm">Measure around the fullest part of your bust/chest, keeping the tape parallel to the floor.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-2">2. Waist</h3>
                  <p className="text-gray-600 text-sm">Measure around the narrowest part of your waist, typically about an inch above your belly button.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3d2c29] mb-2">3. Hips</h3>
                  <p className="text-gray-600 text-sm">Measure around the fullest part of your hips, keeping the tape parallel to the floor.</p>
                </div>
              </div>
              <div className="bg-linear-to-br from-[#f7e6e1] to-[#e7d6c6] rounded-lg p-6">
                <h3 className="font-semibold text-[#3d2c29] mb-3">Measuring Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span>Use a flexible measuring tape</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span>Wear fitted clothing or underwear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span>Keep the tape snug but not tight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span>Stand naturally and breathe normally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span>Have someone help you for accuracy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Women's Clothing */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👗</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Women&apos;s Clothing</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Size</th>
                    <th className="px-4 py-3 text-center">Bust (cm)</th>
                    <th className="px-4 py-3 text-center">Waist (cm)</th>
                    <th className="px-4 py-3 text-center rounded-tr-lg">Hips (cm)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">XS</td>
                    <td className="px-4 py-3 text-center">81-84</td>
                    <td className="px-4 py-3 text-center">63-66</td>
                    <td className="px-4 py-3 text-center">89-92</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">S</td>
                    <td className="px-4 py-3 text-center">85-88</td>
                    <td className="px-4 py-3 text-center">67-70</td>
                    <td className="px-4 py-3 text-center">93-96</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">M</td>
                    <td className="px-4 py-3 text-center">89-92</td>
                    <td className="px-4 py-3 text-center">71-74</td>
                    <td className="px-4 py-3 text-center">97-100</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">L</td>
                    <td className="px-4 py-3 text-center">93-97</td>
                    <td className="px-4 py-3 text-center">75-79</td>
                    <td className="px-4 py-3 text-center">101-105</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">XL</td>
                    <td className="px-4 py-3 text-center">98-102</td>
                    <td className="px-4 py-3 text-center">80-84</td>
                    <td className="px-4 py-3 text-center">106-110</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">XXL</td>
                    <td className="px-4 py-3 text-center">103-107</td>
                    <td className="px-4 py-3 text-center">85-89</td>
                    <td className="px-4 py-3 text-center">111-115</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">3XL</td>
                    <td className="px-4 py-3 text-center">108-112</td>
                    <td className="px-4 py-3 text-center">90-94</td>
                    <td className="px-4 py-3 text-center">116-120</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Men's Clothing */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👔</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Men&apos;s Clothing</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Size</th>
                    <th className="px-4 py-3 text-center">Chest (cm)</th>
                    <th className="px-4 py-3 text-center">Waist (cm)</th>
                    <th className="px-4 py-3 text-center rounded-tr-lg">Hips (cm)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">XS</td>
                    <td className="px-4 py-3 text-center">86-89</td>
                    <td className="px-4 py-3 text-center">71-74</td>
                    <td className="px-4 py-3 text-center">89-92</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">S</td>
                    <td className="px-4 py-3 text-center">90-93</td>
                    <td className="px-4 py-3 text-center">75-78</td>
                    <td className="px-4 py-3 text-center">93-96</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">M</td>
                    <td className="px-4 py-3 text-center">94-97</td>
                    <td className="px-4 py-3 text-center">79-82</td>
                    <td className="px-4 py-3 text-center">97-100</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">L</td>
                    <td className="px-4 py-3 text-center">98-102</td>
                    <td className="px-4 py-3 text-center">83-87</td>
                    <td className="px-4 py-3 text-center">101-105</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">XL</td>
                    <td className="px-4 py-3 text-center">103-107</td>
                    <td className="px-4 py-3 text-center">88-92</td>
                    <td className="px-4 py-3 text-center">106-110</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">XXL</td>
                    <td className="px-4 py-3 text-center">108-112</td>
                    <td className="px-4 py-3 text-center">93-97</td>
                    <td className="px-4 py-3 text-center">111-115</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">3XL</td>
                    <td className="px-4 py-3 text-center">113-117</td>
                    <td className="px-4 py-3 text-center">98-102</td>
                    <td className="px-4 py-3 text-center">116-120</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shoe Sizes */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👟</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Shoe Sizes</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Women's Shoes */}
              <div>
                <h3 className="font-semibold text-[#3d2c29] mb-4">Women&apos;s Shoes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white">
                        <th className="px-4 py-2 text-left rounded-tl-lg">SA/UK</th>
                        <th className="px-4 py-2 text-center">US</th>
                        <th className="px-4 py-2 text-center">EU</th>
                        <th className="px-4 py-2 text-center rounded-tr-lg">CM</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2">3</td>
                        <td className="px-4 py-2 text-center">5</td>
                        <td className="px-4 py-2 text-center">36</td>
                        <td className="px-4 py-2 text-center">22.5</td>
                      </tr>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <td className="px-4 py-2">4</td>
                        <td className="px-4 py-2 text-center">6</td>
                        <td className="px-4 py-2 text-center">37</td>
                        <td className="px-4 py-2 text-center">23</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2">5</td>
                        <td className="px-4 py-2 text-center">7</td>
                        <td className="px-4 py-2 text-center">38</td>
                        <td className="px-4 py-2 text-center">24</td>
                      </tr>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <td className="px-4 py-2">6</td>
                        <td className="px-4 py-2 text-center">8</td>
                        <td className="px-4 py-2 text-center">39</td>
                        <td className="px-4 py-2 text-center">25</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2">7</td>
                        <td className="px-4 py-2 text-center">9</td>
                        <td className="px-4 py-2 text-center">40</td>
                        <td className="px-4 py-2 text-center">25.5</td>
                      </tr>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <td className="px-4 py-2">8</td>
                        <td className="px-4 py-2 text-center">10</td>
                        <td className="px-4 py-2 text-center">41</td>
                        <td className="px-4 py-2 text-center">26</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">9</td>
                        <td className="px-4 py-2 text-center">11</td>
                        <td className="px-4 py-2 text-center">42</td>
                        <td className="px-4 py-2 text-center">27</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Men's Shoes */}
              <div>
                <h3 className="font-semibold text-[#3d2c29] mb-4">Men&apos;s Shoes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white">
                        <th className="px-4 py-2 text-left rounded-tl-lg">SA/UK</th>
                        <th className="px-4 py-2 text-center">US</th>
                        <th className="px-4 py-2 text-center">EU</th>
                        <th className="px-4 py-2 text-center rounded-tr-lg">CM</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2">6</td>
                        <td className="px-4 py-2 text-center">7</td>
                        <td className="px-4 py-2 text-center">40</td>
                        <td className="px-4 py-2 text-center">25</td>
                      </tr>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <td className="px-4 py-2">7</td>
                        <td className="px-4 py-2 text-center">8</td>
                        <td className="px-4 py-2 text-center">41</td>
                        <td className="px-4 py-2 text-center">26</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2">8</td>
                        <td className="px-4 py-2 text-center">9</td>
                        <td className="px-4 py-2 text-center">42</td>
                        <td className="px-4 py-2 text-center">27</td>
                      </tr>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <td className="px-4 py-2">9</td>
                        <td className="px-4 py-2 text-center">10</td>
                        <td className="px-4 py-2 text-center">43</td>
                        <td className="px-4 py-2 text-center">28</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2">10</td>
                        <td className="px-4 py-2 text-center">11</td>
                        <td className="px-4 py-2 text-center">44</td>
                        <td className="px-4 py-2 text-center">28.5</td>
                      </tr>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <td className="px-4 py-2">11</td>
                        <td className="px-4 py-2 text-center">12</td>
                        <td className="px-4 py-2 text-center">45</td>
                        <td className="px-4 py-2 text-center">29</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">12</td>
                        <td className="px-4 py-2 text-center">13</td>
                        <td className="px-4 py-2 text-center">46</td>
                        <td className="px-4 py-2 text-center">30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Fit Tips */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💡</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Fit Tips & Recommendations</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#3d2c29] mb-3">Between Sizes?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span>If you&apos;re between sizes, we recommend sizing up for comfort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span>Check product descriptions for fit notes (slim, regular, relaxed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span>Read customer reviews for fit feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span>Contact us for personalized size recommendations</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#3d2c29] mb-3">Style-Specific Guidance</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span><strong>Bodycon/Form-fitting:</strong> Choose your exact size</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span><strong>Oversized styles:</strong> Size down for a fitted look</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span><strong>Stretch fabrics:</strong> Can accommodate a range of sizes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b88e72] mt-1">•</span>
                    <span><strong>Non-stretch fabrics:</strong> Choose carefully for best fit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-linear-to-br from-[#f7e6e1] to-[#e7d6c6] rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💬</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3d2c29]">Need Help Finding Your Size?</h2>
            </div>
            <p className="text-gray-600 mb-4">Our style consultants are here to assist you!</p>
            <div className="space-y-2 text-gray-600">
              <p>📧 Email: <a href="mailto:claytonsiby@gmail.com" className="text-[#b88e72] hover:underline">claytonsiby@gmail.com</a></p>
              <p>📞 Phone: <a href="tel:+27845860645" className="text-[#b88e72] hover:underline">+27 84 586 0645</a></p>
              <p>⏰ Mon-Fri: 9:00 AM - 6:00 PM</p>
            </div>
            <div className="mt-4 bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Pro Tip:</strong> Take a photo of your measurements and save them for easy reference when shopping with us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
