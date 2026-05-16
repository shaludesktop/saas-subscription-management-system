import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import saasAppRoutes from "./routes/saasAppRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

/* Middleware */
app.use(
  cors({
    origin: "https://saas-subscription-system.netlify.app",
    credentials: true,
  })
);

app.use(express.json());

/* Test Route */
app.get("/", (req, res) => {
  res.send("SaaS Subscription Management API is running");
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/saas-apps", saasAppRoutes);

/* Error Middleware */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});