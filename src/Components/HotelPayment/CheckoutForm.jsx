import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion, useAnimation } from "framer-motion";
import slidebarpic from "../../assets/slideright.gif";
import "../../utills/StripeCSS/stripe.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useBookingStore from "../../stores/booking-store";
import PaymentFormLoading from "../Loading/PaymentsendFormLoading";
import { useShallow } from "zustand/shallow";
const API = import.meta.env.VITE_API

export default function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe();
  const elements = useElements();
  const [pageParams, setPageParams] = useState({
    errMsg: "",
    // isLoading : false,
    // stripe : useStripe(),
    // elements : useElements()
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const [timer, setTimer] = useState(900);
  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) {
        setTimer((prv) => prv - 1);
      } else {
        navigate("/bookinghotel-detail-payment-method-fail");
      }
    }, 1000);
  }, [timer]);
  const navigate = useNavigate();
  const controls = useAnimation();
  const { id, clientSecret, setResponseBooking } = useBookingStore(
    useShallow((state) => ({
      id: state.id,
      clientSecret: state.clientSecret,
      setResponseBooking: state.setResponseBooking,
    }))
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submit");
      if (!pageParams.isLoading) {
        await stripeCall();
      }
    } catch (error) {
      console.log(error);
      const errMsg = error?.response?.data?.message || error.message;
      setPageParams((prv) => ({ ...prv, errMsg: errMsg }));
    } finally {
      controls.start({ x: 0 });
      setPageParams((prv) => ({ ...prv, isLoading: false }));
    }
  };
  const stripeCall = async () => {
    if (!stripe || !elements) {
      throw new Error("Stripe or Elements not loaded");
    }
    const paymentIntentStatus = await stripe.retrievePaymentIntent(
      clientSecret
    );
    if (paymentIntentStatus.paymentIntent.status === "succeeded") {
      throw new Error("Payment already completed.");
    }
    const payload = await stripe.confirmPayment({
      elements: elements,
      redirect: "if_required",
    });
    console.log("payload", payload);
    if (payload.error) {
      throw new Error("An unexpected error occurred");
    } else if (
      payload.paymentIntent &&
      payload.paymentIntent.status === "succeeded"
    ) {
      console.log("Payment succeeded");
      setPageParams((prv) => ({ ...prv, errMsg: "", isLoading: true }));
      const result = await axios.post(
        `${API}/payment/payment-success`,
        { stripeId: payload.paymentIntent.id, bookingId: id }
      );
      const booking = result.data;
      setResponseBooking(booking);
      navigate("/bookinghotel-detail-payment-method-summary");
    }
  };
  let debounceTimeout;
  const handleSlideEnd = async (event, info) => {
    const offset = info.offset.x;
    const sliderWidth = 300;
    if (offset >= sliderWidth * 0.8) {
      if (isSubmit) return;
      console.log("you");
      setIsSubmit(true);
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(async () => {
        await handleSubmit(event); // Call submit function only once after debounce
      }, 300);
    } else if (offset <= sliderWidth * 0.25) {
      setIsSubmit(false);
    }
  };

  if (pageParams.isLoading) {
    return <PaymentFormLoading />;
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col p-6 bg-cream-gradient rounded-lg shadow-md space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full justify-between items-center">
        <h3 className="text-xl font-bold mb-5">Select Payment Method</h3>
        <div className="text-right">
          <p className="text-sm text-gray-600 font-medium mb-1">
            <span className="font-semibold">Please complete your payment</span>{" "}
            within the time limit.
          </p>
          <p
            className={`text-2xl font-bold ${
              timer > 300 ? "text-orange-600" : "text-red-600"
            }`}
          >
            <span className="font-extrabold">
              {Math.trunc(timer / 60)} :{" "}
              {(timer % 60).toString().padStart(2, "0")}
            </span>
          </p>
        </div>
      </div>

      <PaymentElement id="payment-element" options={{ layout: "tabs" }}/>

      <div id="dpm-annotation" className="text-center">
        <p>
          Payment methods are dynamically displayed based on customer location,
          order amount, and currency.&nbsp;
          <a className="text-blue-600 underline"
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Contact HotelBook Support.
          </a>
        </p>
      </div>

      <div className="flex justify-center w-full">
        <div className="relative bg-gray-300 rounded-full h-12 mt-6 w-1/2 mx-auto">
          <motion.div
            className="h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold relative z-10 cursor-pointer "
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            onDrag={handleSlideEnd}
            style={{ width: "150px" }}
            whileTap={{ cursor: "grabbing" }}
            animate={controls}
          >
            Slide to Pay
            <img
              src={slidebarpic}
              alt="slide button"
              className="absolute top-20 transform -translate-y-1/2 right-4"
            />
          </motion.div>
        </div>
      </div>

      {pageParams.errMsg && (
        <div id="payment-message" className="mt-4 text-red-500">
          {pageParams.errMsg}
        </div>
      )}
    </motion.form>
  );
}
