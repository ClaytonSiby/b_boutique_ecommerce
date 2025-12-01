'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { API_BASE_URL } from '@/lib/constants';

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  paypalEmail?: string;
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useAuth();
  const { clearCart } = useCart();
  
  const orderId = searchParams?.get('orderId');
  const paymentMethod = searchParams?.get('method') || 'card';

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');
  const [orderTotal, setOrderTotal] = useState<number>(0);

  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
  });

  useEffect(() => {
    if (!orderId) {
      router.push('/checkout');
      return;
    }

    // Fetch order details to get total
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const order = await response.json();
          setOrderTotal(parseFloat(order.total));
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [orderId, token, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
      return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Limit CVV to 4 digits
    if (name === 'cvv') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 4) }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        setError('Please enter a valid 16-digit card number');
        return false;
      }
      if (!formData.cardHolder || formData.cardHolder.length < 3) {
        setError('Please enter the cardholder name');
        return false;
      }
      if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        setError('Please enter a valid expiry date (MM/YY)');
        return false;
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        setError('Please enter a valid CVV');
        return false;
      }
    } else if (paymentMethod === 'paypal') {
      if (!formData.paypalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.paypalEmail)) {
        setError('Please enter a valid PayPal email');
        return false;
      }
    }
    return true;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_method: paymentMethod,
          amount: orderTotal,
        }),
      });

      if (response.ok) {
        const paymentData = await response.json();
        
        // Simulate payment processing (in production, this would integrate with Stripe/PayPal)
        setTimeout(async () => {
          // Mark payment as completed
          const confirmResponse = await fetch(`${API_BASE_URL}/payments/${paymentData.id}/confirm`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (confirmResponse.ok) {
            setPaymentSuccess(true);
            await clearCart();
            setTimeout(() => {
              router.push(`/orders?success=true&orderId=${orderId}`);
            }, 2000);
          } else {
            setError('Payment confirmation failed. Please contact support.');
          }
          setIsProcessing(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Payment failed. Please try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('An error occurred while processing your payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel this payment? The order will be cancelled.')) {
      try {
        // Cancel the order
        await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        router.push('/checkout');
      } catch (error) {
        console.error('Error cancelling order:', error);
      }
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="text-5xl text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#3d2c29] mb-4">Payment Successful!</h2>
          <p className="text-[#8b6d5a] mb-6">
            Your payment has been processed successfully. Redirecting to your orders...
          </p>
          <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleCancel}
          className="inline-flex items-center gap-2 text-[#8b6d5a] hover:text-[#b88e72] transition-colors mb-6 font-medium"
          disabled={isProcessing}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Cancel Payment</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#f7e6e1] rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faCreditCard} className="text-3xl text-[#b88e72]" />
            </div>
            <h1 className="text-3xl font-bold text-[#3d2c29] mb-2">Complete Payment</h1>
            <p className="text-[#8b6d5a]">
              {paymentMethod === 'card' ? 'Enter your card details' : 'Enter your PayPal details'}
            </p>
            {orderTotal > 0 && (
              <div className="mt-4 text-2xl font-bold text-[#b88e72]">
                Total: R {orderTotal.toFixed(2)}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-xl mt-0.5" />
              <div>
                <h3 className="font-bold text-red-800">Payment Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-6">
            {paymentMethod === 'card' ? (
              <>
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                    disabled={isProcessing}
                    required
                  />
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                    disabled={isProcessing}
                    required
                  />
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                      disabled={isProcessing}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                      disabled={isProcessing}
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              // PayPal Email
              <div>
                <label className="block text-sm font-medium text-[#3d2c29] mb-2">
                  PayPal Email
                </label>
                <input
                  type="email"
                  name="paypalEmail"
                  value={formData.paypalEmail}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                  disabled={isProcessing}
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCreditCard} />
                  Pay R {orderTotal.toFixed(2)}
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 text-center text-sm text-[#8b6d5a]">
            🔒 Your payment information is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <PaymentContent />
      </Suspense>
    </ProtectedRoute>
  );
}

export default PaymentPage;
