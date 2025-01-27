import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { CreditCard, Gift, Lock } from "lucide-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const cardStyle = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const CheckoutForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(9.99);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    axiosPublic.post("/create-payment-intent", { amount }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [amount, axiosPublic]);

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      Swal.fire("Error", "Please enter a coupon code", "error");
      return;
    }

    try {
      const res = await axiosPublic.post("/apply-coupon", { couponCode });
      if (res.data.valid) {
        setDiscount(res.data.discount);
        setAmount(9.99 - res.data.discount);
        Swal.fire({
          icon: 'success',
          title: 'Coupon Applied!',
          text: `You saved $${res.data.discount}!`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Coupon',
          text: 'Please enter a valid coupon code.',
          confirmButtonColor: '#3B82F6'
        });
      }
    } catch (err) {
      console.error("Coupon Error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong.',
        confirmButtonColor: '#3B82F6'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: { email: user?.email, name: user?.displayName },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      await axiosPublic.post("/users/subscribe", { 
        email: user?.email, 
        transactionId: paymentIntent.id 
      });
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: 'Your subscription has been activated.',
        showConfirmButton: false,
        timer: 2000
      });
      onPaymentSuccess();
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
          <Lock className="text-blue-600 w-6 h-6" />
        </div>

        {/* Price Display */}
        <div className="bg-blue-50 p-4 rounded-xl mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subscription</span>
            <span className="text-lg font-semibold">${(9.99).toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between items-center mt-2 text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-blue-100 mt-3 pt-3 flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="text-xl font-bold text-blue-600">${amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Gift className="w-4 h-4" />
            Have a coupon?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              onClick={applyCoupon}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition duration-200 font-medium"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <CreditCard className="w-4 h-4" />
              Card Details
            </label>
            <div className="border border-gray-300 rounded-lg p-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
              <CardElement options={cardStyle} />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Pay ${amount.toFixed(2)}</span>
                </>
              )}
            </div>
          </button>
        </form>

        {/* Security Notice */}
        <p className="text-center text-gray-500 text-sm mt-6 flex items-center justify-center gap-1">
          <Lock className="w-4 h-4" />
          Secured by Stripe
        </p>
      </div>
    </div>
  );
};

CheckoutForm.propTypes = {
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default CheckoutForm;