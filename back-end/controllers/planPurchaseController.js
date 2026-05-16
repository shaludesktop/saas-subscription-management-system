import User from "../models/User.js";
import Plan from "../models/Plan.js";

export const purchasePlan = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;

    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // calculate expiry (30 days)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);

    await User.findByIdAndUpdate(userId, {
      plan: planId,
      planExpires: expiry
    });

    res.json({
      message: "Plan activated",
      plan
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};