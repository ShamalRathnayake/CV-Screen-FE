import { useNavigate } from "react-router-dom";

import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

type PaymentFormProps = {
  onFormSubmit: () => void;
};

const PaymentForm = ({ onFormSubmit }: PaymentFormProps) => {
  const navigate = useNavigate();

  const options: StripeElementsOptions = {
    mode: "payment" as const,
    amount: 79,
    currency: "usd",
    appearance: {
      theme: "night" as const,
      labels: "floating",
      variables: {
        colorPrimary: "#ffffff",
        colorBackground: "#2121258a",
        borderRadius: "10px",
        colorText: "#B2B2B2",
        colorTextSecondary: "#B2B2B2",
        colorTextPlaceholder: "##888888FF",
        fontSizeBase: "14px",
      },
      rules: {
        ".Input": {
          backgroundColor: "#2121258a",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "none",
        },
      },
    },
    loader: "auto" as const,
  };

  return (
    <>
      <div className={"flex flex-col glass pb-5"}>
        <div className="mt-4">
          <h3 className={"text-center text-white text-2xl mt-3"}>
            Complete Your Purchase
          </h3>
          <h4 className="text-center text-gray-200 text-xs mb-3 mt-1 font-extralight w-75 m-auto">
            Your payment information is secured with industry-standard
            encryption
          </h4>

          <p
            className={
              "text-center text-white text-4xl mt-10 mb-0 font-regular"
            }
          >
            $ 79.00
          </p>
        </div>
        <div className="mt-10 px-15">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm onFormSubmit={onFormSubmit} />
          </Elements>
        </div>
        <div className="mt-10 px-15 flex justify-center flex-col">
          <hr className="w-full bg-gray-100 h-[2px]" />
          <p className="mt-2 text-center text-gray-400 text-xs">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign In here
            </span>
          </p>
        </div>
      </div>
      <div className="h-[25px] absolute">&nbsp;</div>
    </>
  );
};

export default PaymentForm;
