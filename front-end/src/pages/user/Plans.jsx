import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import PlanCard from "../../components/cards/PlanCard";

import { getPlansByApp } from "../../api/planApi";
import { createSubscription } from "../../api/subscriptionApi";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../api/paymentApi";

import useAuth from "../../hooks/useAuth";

export default function Plans() {
  const { appId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, [appId]);

  const fetchPlans = async () => {
    try {
      setLoading(true);

      const { data } = await getPlansByApp(appId);

      setPlans(data);
    } catch (error) {
      console.log("Plans error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load plans"
      );
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (plan) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      /* Create Subscription */

      const subRes = await createSubscription({
        appId,
        planId: plan._id,
      });

      /* FREE PLAN */

      if (plan.price === 0) {
        alert("Free subscription activated");

        navigate("/dashboard");

        return;
      }

      /* CREATE RAZORPAY ORDER */

      const orderRes = await createRazorpayOrder({
        amount: plan.price,
      });

      /* RAZORPAY OPTIONS */

      const options = {
        key: orderRes.data.key,

        amount: orderRes.data.amount,

        currency: orderRes.data.currency,

        name: "SaaS Manager",

        description: `${plan.name} Subscription`,

        order_id: orderRes.data.orderId,

        handler: async function (response) {
          try {
            await verifyRazorpayPayment({
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,

              subscriptionId: subRes.data._id,
            });

            alert("Payment successful");

            navigate("/dashboard");
          } catch (error) {
            console.log(error);

            alert("Payment verification failed");
          }
        },

        prefill: {
          name: user?.name || "User",

          email:
            user?.email || "test@example.com",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log("Subscribe error:", error);

      if (error.response?.status === 401) {
        alert(
          "Session expired. Please login again."
        );

        navigate("/login");

        return;
      }

      alert(
        error.response?.data?.message ||
          "Subscription failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-6 text-gray-900 dark:text-white transition">
        
        <h1 className="mb-6 text-3xl font-bold">
          Choose Plan
        </h1>

        {loading ? (
          <div className="rounded-xl bg-white dark:bg-slate-900 p-6 text-gray-500 dark:text-gray-400 shadow">
            Loading plans...
          </div>
        ) : plans.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-slate-700 p-10 text-center text-gray-500 dark:text-gray-400">
            No plans found for this app
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                onSubscribe={subscribe}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}