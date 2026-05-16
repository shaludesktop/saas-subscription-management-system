import Payment from "../models/Payment.js";

export const getPaymentSummary = async (req, res) => {
  try {
    const payment = await Payment.findOne({ user: req.user.id, status: "paid" })
      .populate("plan")
      .sort({ paidAt: -1 });

    if (!payment) {
      return res.status(404).json({ message: "No payment found" });
    }

    res.json({
      lastPayment: payment.amount,
      paidOn: payment.paidAt,
      method: payment.method,
      invoiceNumber: payment.invoiceNumber,
      plan: payment.plan?.name || "N/A",
      paymentId: payment._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};