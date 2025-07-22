import React, { useState } from 'react';
import { X, CreditCard, Smartphone, CheckCircle, Loader } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSuccess: (paymentDetails: any) => void;
}

const paymentOptions = [
  { id: 'gpay', name: 'Google Pay', icon: '🟢', color: 'from-green-500 to-green-600' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣', color: 'from-purple-500 to-purple-600' },
  { id: 'paytm', name: 'Paytm', icon: '🔵', color: 'from-blue-500 to-blue-600' },
  { id: 'upi', name: 'UPI', icon: '🟠', color: 'from-orange-500 to-orange-600' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', color: 'from-gray-500 to-gray-600' }
];

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'process' | 'success'>('select');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStep('process');

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const paymentDetails = {
      method: selectedMethod,
      transactionId: `TXN${Date.now()}`,
      amount: amount,
      timestamp: new Date()
    };

    setPaymentStep('success');
    setTimeout(() => {
      onPaymentSuccess(paymentDetails);
      onClose();
      setPaymentStep('select');
      setIsProcessing(false);
      setSelectedMethod('');
    }, 2000);
  };

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
          <h2 className="text-xl font-bold text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {paymentStep === 'select' && (
            <>
              <div className="mb-6 text-center">
                <p className="text-2xl font-bold text-gray-800">₹{amount.toLocaleString()}</p>
                <p className="text-gray-600">Choose your payment method</p>
              </div>

              <div className="space-y-3 mb-6">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedMethod(option.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                      selectedMethod === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium text-gray-800">{option.name}</span>
                  </button>
                ))}
              </div>

              {selectedMethod === 'card' && (
                <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Card Details</h3>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={(e) => handleCardDetailsChange('number', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => handleCardDetailsChange('expiry', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardDetailsChange('cvv', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardDetails.name}
                    onChange={(e) => handleCardDetailsChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={!selectedMethod}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pay ₹{amount.toLocaleString()}
              </button>
            </>
          )}

          {paymentStep === 'process' && (
            <div className="text-center py-8">
              <Loader className="h-16 w-16 text-blue-500 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we process your payment...</p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  You will be redirected to {paymentOptions.find(p => p.id === selectedMethod)?.name} to complete the payment
                </p>
              </div>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h3>
              <p className="text-gray-600">Your order has been placed successfully</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;