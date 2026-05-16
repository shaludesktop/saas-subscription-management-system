import SaasApp from "../models/SaasApp.js";

export const getSaasApps = async (req, res) => {
  try {
    const apps = await SaasApp.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSaasAppById = async (req, res) => {
  try {
    const app = await SaasApp.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "SaaS app not found" });
    }

    res.json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSaasApp = async (req, res) => {
  try {
    const { name, category, description, logo, status } = req.body;

    if (!name || !category || !description) {
      return res
        .status(400)
        .json({ message: "Name, category and description are required" });
    }

    const exists = await SaasApp.findOne({ name });

    if (exists) {
      return res.status(400).json({ message: "SaaS app already exists" });
    }

    const app = await SaasApp.create({
      name,
      category,
      description,
      logo: logo || "",
      status: status || "active",
    });

    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSaasApp = async (req, res) => {
  try {
    const app = await SaasApp.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "SaaS app not found" });
    }

    app.name = req.body.name || app.name;
    app.category = req.body.category || app.category;
    app.description = req.body.description || app.description;
    app.logo = req.body.logo || app.logo;
    app.status = req.body.status || app.status;

    const updatedApp = await app.save();
    res.json(updatedApp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSaasApp = async (req, res) => {
  try {
    const app = await SaasApp.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "SaaS app not found" });
    }

    await app.deleteOne();
    res.json({ message: "SaaS app deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};