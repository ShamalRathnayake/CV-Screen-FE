import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useLazyPaymentQuery } from "../../services/userApi/userApi";

import toast from "react-hot-toast";
import { useAppDispatch } from "../../state/useAppDispatch";
import { setLoadingState } from "../../state/settings/settingsSlice";

type CheckoutFormProps = {
  onFormSubmit: () => void;
};

const CheckoutForm = ({ onFormSubmit }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useAppDispatch();

  const [trigger] = useLazyPaymentQuery();

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    try {
      event.preventDefault();

      dispatch(setLoadingState({ isLoading: true }));

      if (!elements || !stripe) return;

      const paymentIntentRes = await trigger().unwrap();

      const clientSecret = paymentIntentRes.data;

      const { error: submitError } = await elements.submit();
      if (submitError?.message) {
        toast.error(submitError.message);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/signup",
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error("Payment Failed!");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment Successfull!");
        onFormSubmit();
      }
    } catch (error) {
      console.log("🚀 ~ handleFormSubmit ~ error:", error);
    } finally {
      dispatch(setLoadingState({ isLoading: false }));
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
      <label>
        <PaymentElement
          options={{
            fields: {
              billingDetails: {
                name: "auto",
                address: {
                  country: "auto",
                  postalCode: "auto",
                },
                email: "auto",
              },
            },
            layout: {
              type: "tabs",
            },
            paymentMethodOrder: ["card"],
            wallets: {
              applePay: "never",
              googlePay: "never",
              link: "never",
            },
          }}
        />
      </label>
      <button
        type="submit"
        className={`mt-8 p-2 w-full  rounded-2xl text-white text-sm text-center ${
          !stripe || !elements
            ? "cursor-not-allowed bg-gray-600"
            : "cursor-pointer bg-gradient-to-r from-g-start to-g-end"
        }`}
        disabled={!stripe || !elements}
      >
        Sign Up
      </button>
    </form>
  );
};

export default CheckoutForm;
