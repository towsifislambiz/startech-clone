export const PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    icon: '💵',
    description: 'Pay with cash upon receiving your delivery at your doorstep.',
    requiresTrxId: false
  },
  {
    id: 'bkash',
    name: 'bKash Mobile Banking',
    icon: '📱',
    number: '01712345678 (Merchant)',
    description: 'Send payment to 01712345678 via bKash Make Payment option.',
    requiresTrxId: true
  },
  {
    id: 'nagad',
    name: 'Nagad Mobile Banking',
    icon: '📲',
    number: '01812345678 (Merchant)',
    description: 'Send payment to 01812345678 via Nagad Payment option.',
    requiresTrxId: true
  },
  {
    id: 'sslcommerz',
    name: 'SSLCommerz / Credit & Debit Card',
    icon: '💳',
    description: 'Pay securely using Visa, MasterCard, AMEX, or Internet Banking.',
    requiresTrxId: false
  }
];

export const paymentService = {
  /**
   * Validates payment input details
   * @param {string} methodId 
   * @param {Object} details 
   * @returns {{ valid: boolean, message: string }}
   */
  validatePayment(methodId, details = {}) {
    const selected = PAYMENT_METHODS.find((m) => m.id === methodId);
    if (!selected) {
      return { valid: false, message: 'Please select a valid payment method.' };
    }

    if (selected.requiresTrxId) {
      if (!details.transactionId || details.transactionId.trim().length < 6) {
        return {
          valid: false,
          message: `Please enter a valid Transaction ID for ${selected.name} payment.`
        };
      }
    }

    if (methodId === 'sslcommerz') {
      if (details.cardNumber && details.cardNumber.length < 16) {
        return { valid: false, message: 'Please enter a valid 16-digit Card Number.' };
      }
    }

    return { valid: true, message: 'Payment validation successful.' };
  },

  getPaymentMethods() {
    return PAYMENT_METHODS;
  }
};

export default paymentService;
