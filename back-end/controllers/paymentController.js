import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import Subscription from "../models/Subscription.js";
import Invoice from "../models/Invoice.js";
import generateInvoiceNumber from "../utils/invoiceNumber.js";

let razorpay;

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys missing. Check your .env file");
  }

  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  return razorpay;
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const razorpayInstance = getRazorpayInstance();

    const order = await razorpayInstance.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Razorpay order creation failed",
    });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      subscriptionId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    req.body.subscriptionId = subscriptionId;
    req.body.paymentMethod = "Razorpay";
    req.body.transactionId = razorpay_payment_id;
    req.body.status = "paid";

    return createPayment(req, res);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Payment verification failed",
    });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { subscriptionId, paymentMethod, transactionId, status } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({ message: "subscriptionId is required" });
    }

    const subscription = await Subscription.findById(subscriptionId).populate(
      "planId"
    );

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (String(subscription.userId) !== String(req.user._id)) {
      return res.status(403).json({
        message: "Not allowed to pay for this subscription",
      });
    }

    const payment = await Payment.create({
      userId: req.user._id,
      subscriptionId: subscription._id,
      amount: subscription.planId.price,
      status: status === "success" ? "paid" : status || "paid",
      paymentMethod: paymentMethod || "UPI",
      transactionId: transactionId || `TXN-${Date.now()}`,
    });

    if (payment.status === "paid") {
      subscription.status = "active";
      await subscription.save();

      const invoice = await Invoice.create({
        userId: req.user._id,
        subscriptionId: subscription._id,
        paymentId: payment._id,
        invoiceNumber: generateInvoiceNumber(),
        amount: payment.amount,
        status: "paid",
      });

      return res.status(201).json({
        message:
          "Payment successful, subscription activated and invoice generated",
        payment,
        subscription,
        invoice,
      });
    }

    res.status(201).json({
      message: "Payment recorded",
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Payment failed" });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate({
        path: "subscriptionId",
        populate: [
          { path: "appId", select: "name category logo" },
          { path: "planId", select: "name price duration" },
        ],
      })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("userId", "name email")
      .populate({
        path: "subscriptionId",
        populate: [
          { path: "appId", select: "name category logo" },
          { path: "planId", select: "name price duration" },
        ],
      })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};