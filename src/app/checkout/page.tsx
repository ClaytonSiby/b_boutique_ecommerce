'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faMapMarkerAlt,
  faCreditCard,
  faCheckCircle,
  faSpinner,
  faPlus,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { API_BASE_URL } from '@/lib/constants';

interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  postal_code_alt?: string;
}

interface OrderItem {
  product_id: string;
  quantity: number;
  price: string;
}

function CheckoutContent() {
  const router = useRouter();
  const { cart, isLoading: cartLoading, clearCart } = useCart();
  const { token } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<string>('');
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<string>('');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  // Removed unused pendingOrderId state

  const [addressForm, setAddressForm] = useState({
    type: 'shipping',
    street: '',
    city: '',
    state: '',
    country: 'South Africa',
    postal_code: '',
    postal_code_alt: '',
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoadingAddresses(true);
        const response = await fetch(`${API_BASE_URL}/addresses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAddresses(data);
          
          // Auto-select first address if available
          if (data.length > 0) {
            setSelectedShippingAddress(data[0].id);
            setSelectedBillingAddress(data[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setIsLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, [token]);

  const fetchAddresses = async () => {
    try {
      setIsLoadingAddresses(true);
      const response = await fetch(`${API_BASE_URL}/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
        
        // Auto-select first address if available
        if (data.length > 0) {
          setSelectedShippingAddress(data[0].id);
          setSelectedBillingAddress(data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingAddress
        ? `${API_BASE_URL}/addresses/${editingAddress.id}`
        : `${API_BASE_URL}/addresses`;

      const response = await fetch(url, {
        method: editingAddress ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressForm),
      });

      if (response.ok) {
        await fetchAddresses();
        setShowAddressForm(false);
        setEditingAddress(null);
        resetAddressForm();
      } else {
        alert('Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address');
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchAddresses();
        if (selectedShippingAddress === addressId) setSelectedShippingAddress('');
        if (selectedBillingAddress === addressId) setSelectedBillingAddress('');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      type: address.type,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      postal_code: address.postal_code,
      postal_code_alt: address.postal_code_alt || '',
    });
    setShowAddressForm(true);
  };

  const resetAddressForm = () => {
    setAddressForm({
      type: 'shipping',
      street: '',
      city: '',
      state: '',
      country: 'South Africa',
      postal_code: '',
      postal_code_alt: '',
    });
  };

  const calculateSubtotal = () => {
    if (!cart?.cart_items) return 0;
    return cart.cart_items.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.quantity;
    }, 0);
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `R ${numPrice.toFixed(2)}`;
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = async () => {
    if (!selectedShippingAddress) {
      alert('Please select a shipping address');
      return;
    }

    if (!sameAsShipping && !selectedBillingAddress) {
      alert('Please select a billing address');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (!cart?.cart_items || cart.cart_items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      const orderItems: OrderItem[] = cart.cart_items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      const orderData = {
        shipping_address_id: selectedShippingAddress,
        billing_address_id: sameAsShipping ? selectedShippingAddress : selectedBillingAddress,
        payment_method: paymentMethod,
        items: orderItems,
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();
        
        // For COD, complete the order immediately
        if (paymentMethod === 'cod') {
          await clearCart();
          router.push(`/orders?success=true&orderId=${order.id}`);
        } else {
          // For card/PayPal, redirect to payment page
          // Removed setPendingOrderId as it's unused
          router.push(`/checkout/payment?orderId=${order.id}&method=${paymentMethod}`);
        }
      } else {
        const error = await response.json();
        alert(`Failed to place order: ${error.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartLoading || isLoadingAddresses) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#3d2c29] text-lg">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!cart?.cart_items || cart.cart_items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <FontAwesomeIcon icon={faShoppingCart} className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-[#3d2c29] mb-4">Your Cart is Empty</h2>
          <p className="text-[#8b6d5a] mb-6">Add some items to your cart before checking out.</p>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#3d2c29] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Addresses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#3d2c29] flex items-center gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#b88e72]" />
                  Shipping Address
                </h2>
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    resetAddressForm();
                    setShowAddressForm(!showAddressForm);
                  }}
                  className="text-[#b88e72] hover:text-[#8b6d5a] font-medium flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Add New
                </button>
              </div>

              {addresses.length === 0 && !showAddressForm ? (
                <p className="text-[#8b6d5a] text-center py-4">
                  No addresses found. Please add a shipping address.
                </p>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedShippingAddress === address.id
                          ? 'border-[#b88e72] bg-[#f7e6e1]'
                          : 'border-gray-200 hover:border-[#b88e72]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                            type="radio"
                            name="shipping"
                            value={address.id}
                            checked={selectedShippingAddress === address.id}
                            onChange={(e) => setSelectedShippingAddress(e.target.value)}
                            className="mt-1"
                            title="Select shipping address"
                            placeholder="Shipping address option"
                          />
                        <div className="flex-1">
                          <p className="font-medium text-[#3d2c29]">{address.street}</p>
                          <p className="text-[#8b6d5a] text-sm">
                            {address.city}, {address.state} {address.postal_code}
                          </p>
                          <p className="text-[#8b6d5a] text-sm">{address.country}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleEditAddress(address);
                            }}
                            className="text-[#b88e72] hover:text-[#8b6d5a]"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteAddress(address.id);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {showAddressForm && (
                <form onSubmit={handleAddressSubmit} className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-[#3d2c29]">
                    {editingAddress ? 'Edit Address' : 'New Address'}
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#3d2c29] mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                      placeholder="Enter street address"
                      title="Street Address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3d2c29] mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                        title="City"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#3d2c29] mb-1">State/Province</label>
                      <input
                        type="text"
                        required
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                        title="State/Province"
                        placeholder="Enter state or province"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3d2c29] mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={addressForm.postal_code}
                        onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                        title="Postal Code"
                        placeholder="Enter postal code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#3d2c29] mb-1">Country</label>
                      <input
                        type="text"
                        required
                        value={addressForm.country}
                        onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                        title="Country"
                        placeholder="Enter country"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#b88e72] text-white rounded-lg hover:bg-[#8b6d5a] transition-colors"
                    >
                      {editingAddress ? 'Update' : 'Save'} Address
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddress(null);
                        resetAddressForm();
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#3d2c29] flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faCreditCard} className="text-[#b88e72]" />
                Billing Address
              </h2>

              <label className="flex items-center gap-2 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-[#3d2c29]">Same as shipping address</span>
              </label>

              {!sameAsShipping && (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedBillingAddress === address.id
                          ? 'border-[#b88e72] bg-[#f7e6e1]'
                          : 'border-gray-200 hover:border-[#b88e72]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="billing"
                          value={address.id}
                          checked={selectedBillingAddress === address.id}
                          onChange={(e) => setSelectedBillingAddress(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#3d2c29]">{address.street}</p>
                          <p className="text-[#8b6d5a] text-sm">
                            {address.city}, {address.state} {address.postal_code}
                          </p>
                          <p className="text-[#8b6d5a] text-sm">{address.country}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#b88e72] text-white flex items-center justify-center">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <h2 className="text-2xl font-bold text-[#3d2c29]">Payment Method</h2>
              </div>

              <div className="space-y-3">
                {/* Credit/Debit Card */}
                <label
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#b88e72] bg-[#f7e6e1]'
                      : 'border-gray-200 hover:border-[#b88e72]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#b88e72]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCreditCard} className="text-[#b88e72]" />
                        <span className="font-semibold text-[#3d2c29]">Credit/Debit Card</span>
                      </div>
                      <p className="text-sm text-[#8b6d5a] mt-1">
                        Pay securely with your credit or debit card
                      </p>
                    </div>
                  </div>
                </label>

                {/* PayPal */}
                <label
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-[#b88e72] bg-[#f7e6e1]'
                      : 'border-gray-200 hover:border-[#b88e72]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#b88e72]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCreditCard} className="text-[#0070ba]" />
                        <span className="font-semibold text-[#3d2c29]">PayPal</span>
                      </div>
                      <p className="text-sm text-[#8b6d5a] mt-1">
                        Fast and secure payment with PayPal
                      </p>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#b88e72] bg-[#f7e6e1]'
                      : 'border-gray-200 hover:border-[#b88e72]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#b88e72]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-[#b88e72]" />
                        <span className="font-semibold text-[#3d2c29]">Cash on Delivery</span>
                      </div>
                      <p className="text-sm text-[#8b6d5a] mt-1">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-[#3d2c29] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.cart_items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    {item.product?.images && item.product.images.length > 0 && (
                      <div className="relative w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-[#3d2c29] text-sm">
                        {item.product?.name || 'Product'}
                      </p>
                      <p className="text-[#8b6d5a] text-sm">Qty: {item.quantity}</p>
                      <p className="text-[#b88e72] font-medium text-sm">
                        {formatPrice(parseFloat(item.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-[#8b6d5a]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#8b6d5a]">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-[#8b6d5a]">
                  <span>Tax (10%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {paymentMethod && (
                  <div className="flex justify-between text-[#8b6d5a] text-sm pt-2 border-t border-gray-100">
                    <span>Payment Method</span>
                    <span className="font-medium capitalize">
                      {paymentMethod === 'card' && '💳 Card'}
                      {paymentMethod === 'paypal' && '💰 PayPal'}
                      {paymentMethod === 'cod' && '💵 Cash on Delivery'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-[#3d2c29] pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#b88e72]">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || !selectedShippingAddress || !paymentMethod}
                className="w-full mt-6 py-4 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={paymentMethod === 'cod' ? faCheckCircle : faCreditCard} />
                    {paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-[#8b6d5a] mt-4">
                By placing your order, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#3d2c29] text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <ProtectedRoute>
        <CheckoutContent />
      </ProtectedRoute>
    </Suspense>
  );
}
