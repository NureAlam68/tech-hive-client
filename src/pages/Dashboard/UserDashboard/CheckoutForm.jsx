import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const CheckoutForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useState(() => {
    axiosSecure.post('/create-payment-intent', { amount: 9.99 }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      const res = await axiosSecure.post('/users/subscribe', {
        email: user?.email,
        transactionId: paymentIntent.id,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', 'Your subscription is active!', 'success');
        onPaymentSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: { fontSize: '16px', color: '#424770' },
            invalid: { color: '#9e2146' },
          },
        }}
        className="border p-2 rounded-lg"
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
      >
        Pay $9.99
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};
CheckoutForm.propTypes = {
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default CheckoutForm;

