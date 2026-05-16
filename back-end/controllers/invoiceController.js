import Invoice from "../models/Invoice.js";

export const createInvoice = async (req, res) => {
  const invoice = await Invoice.create(req.body);
  res.status(201).json(invoice);
};

export const getMyInvoices = async (req, res) => {
  const invoices = await Invoice.find({ userId: req.user._id })
    .populate({
      path: "subscriptionId",
      populate: [
        { path: "appId", select: "name" },
        { path: "planId", select: "name price duration" },
      ],
    })
    .populate("paymentId", "amount status paymentMethod transactionId")
    .sort({ createdAt: -1 });

  res.json(invoices);
};

export const getAllInvoices = async (req, res) => {
  const invoices = await Invoice.find()
    .populate("userId", "name email")
    .populate("paymentId", "amount status")
    .sort({ createdAt: -1 });

  res.json(invoices);
};