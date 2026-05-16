import Plan from "../models/Plan.js";
import SaasApp from "../models/SaasApp.js";

export const getPlans = async (req, res) => {
  const plans = await Plan.find()
    .populate("appId", "name category")
    .sort({ createdAt: -1 });

  res.json(plans);
};

export const getPlansByApp = async (req, res) => {
  const plans = await Plan.find({ appId: req.params.appId, status: "active" })
    .populate("appId", "name category")
    .sort({ price: 1 });

  res.json(plans);
};

export const createPlan = async (req, res) => {
  const { appId, name, price, duration, features, seatLimit, status } = req.body;

  if (!appId || !name || price === undefined || !duration) {
    return res.status(400).json({ message: "appId, name, price and duration are required" });
  }

  const app = await SaasApp.findById(appId);
  if (!app) {
    return res.status(404).json({ message: "SaaS app not found" });
  }

  const duplicate = await Plan.findOne({ appId, name });
  if (duplicate) {
    return res.status(400).json({ message: "Plan already exists for this app" });
  }

  const plan = await Plan.create({
    appId,
    name,
    price,
    duration,
    features: features || [],
    seatLimit: seatLimit || 1,
    status: status || "active",
  });

   res.status(201).json(plan);
};

export const updatePlan = async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  plan.name = req.body.name || plan.name;
  plan.price = req.body.price ?? plan.price;
  plan.duration = req.body.duration || plan.duration;
  plan.features = req.body.features ?? plan.features;
  plan.seatLimit = req.body.seatLimit ?? plan.seatLimit;
  plan.status = req.body.status || plan.status;

  const updatedPlan = await plan.save();
  res.json(updatedPlan);
};

export const deletePlan = async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  await plan.deleteOne();
  res.json({ message: "Plan deleted successfully" });
};