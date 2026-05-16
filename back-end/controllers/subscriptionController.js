import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";
import SaasApp from "../models/SaasApp.js";
import { calculateSubscriptionDates } from "../utils/subscriptionDates.js";

export const getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user._id })
      .populate("appId", "name category logo")
      .populate("planId", "name price duration features seatLimit")
      .sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubscription = async (req, res) => {
  try {
    const { appId, planId, autoRenew } = req.body;

    if (!appId || !planId) {
      return res.status(400).json({ message: "appId and planId are required" });
    }

    const app = await SaasApp.findById(appId);
    const plan = await Plan.findById(planId);

    if (!app) {
      return res.status(404).json({ message: "SaaS app not found" });
    }

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    if (String(plan.appId) !== String(appId)) {
      return res.status(400).json({
        message: "Selected plan does not belong to this SaaS app",
      });
    }

    const existingActive = await Subscription.findOne({
      userId: req.user._id,
      appId,
      status: "active",
    });

    if (existingActive) {
      return res.status(400).json({
        message: "You already have an active subscription for this app",
      });
    }

    const existingPending = await Subscription.findOne({
      userId: req.user._id,
      appId,
      status: "pending",
    });

    if (existingPending) {
      await existingPending.deleteOne();
    }

    const { startDate, endDate } = calculateSubscriptionDates(plan.duration);

    const subscription = await Subscription.create({
      userId: req.user._id,
      appId,
      planId,
      status: plan.price === 0 ? "active" : "pending",
      startDate,
      endDate,
      autoRenew: autoRenew || false,
    });

    const populated = await Subscription.findById(subscription._id)
      .populate("appId", "name category logo")
      .populate("planId", "name price duration features seatLimit");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const renewSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("planId");

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const now = new Date();
    const baseDate =
      subscription.endDate > now ? new Date(subscription.endDate) : now;

    const newEndDate = new Date(baseDate);

    switch (subscription.planId.duration) {
      case "monthly":
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        break;
      case "yearly":
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        break;
      case "weekly":
        newEndDate.setDate(newEndDate.getDate() + 7);
        break;
      case "free":
      default:
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        break;
    }

    subscription.status = "active";
    subscription.endDate = newEndDate;
    subscription.cancelledAt = null;

    await subscription.save();

    const updated = await Subscription.findById(subscription._id)
      .populate("appId", "name category logo")
      .populate("planId", "name price duration features seatLimit");

    res.json({
      message: "Subscription renewed successfully",
      subscription: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const upgradeSubscription = async (req, res) => {
  try {
    const { newPlanId } = req.body;

    if (!newPlanId) {
      return res.status(400).json({ message: "newPlanId is required" });
    }

    const subscription = await Subscription.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const newPlan = await Plan.findById(newPlanId);

    if (!newPlan) {
      return res.status(404).json({ message: "New plan not found" });
    }

    if (String(subscription.appId) !== String(newPlan.appId)) {
      return res.status(400).json({
        message: "Upgrade plan must belong to the same SaaS app",
      });
    }

    subscription.planId = newPlan._id;
    subscription.status = "active";

    await subscription.save();

    const updated = await Subscription.findById(subscription._id)
      .populate("appId", "name category logo")
      .populate("planId", "name price duration features seatLimit");

    res.json({
      message: "Subscription upgraded successfully",
      subscription: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downgradeSubscription = async (req, res) => {
  try {
    const { newPlanId } = req.body;

    if (!newPlanId) {
      return res.status(400).json({ message: "newPlanId is required" });
    }

    const subscription = await Subscription.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const newPlan = await Plan.findById(newPlanId);

    if (!newPlan) {
      return res.status(404).json({ message: "New plan not found" });
    }

    if (String(subscription.appId) !== String(newPlan.appId)) {
      return res.status(400).json({
        message: "Downgrade plan must belong to the same SaaS app",
      });
    }

    subscription.planId = newPlan._id;
    subscription.status = "active";

    await subscription.save();

    const updated = await Subscription.findById(subscription._id)
      .populate("appId", "name category logo")
      .populate("planId", "name price duration features seatLimit");

    res.json({
      message: "Subscription downgraded successfully",
      subscription: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    subscription.status = "cancelled";
    subscription.cancelledAt = new Date();

    await subscription.save();

    const updated = await Subscription.findById(subscription._id)
      .populate("appId", "name category logo")
      .populate("planId", "name price duration features seatLimit");

    res.json({
      message: "Subscription cancelled successfully",
      subscription: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("userId", "name email")
      .populate("appId", "name category logo")
      .populate("planId", "name price duration features seatLimit")
      .sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};