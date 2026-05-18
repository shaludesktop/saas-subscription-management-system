import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Plan from "../models/Plan.js";
import SaasApp from "../models/SaasApp.js";

dotenv.config();

connectDB();

const seedPlans = async () => {
  try {
    await Plan.deleteMany();

    const canva = await SaasApp.findOne({ name: "Canva" });
    const zoom = await SaasApp.findOne({ name: "Zoom" });
    const slack = await SaasApp.findOne({ name: "Slack" });
    const netflix = await SaasApp.findOne({ name: "Netflix" });
    const spotify = await SaasApp.findOne({ name: "Spotify" });
    const drive = await SaasApp.findOne({ name: "Google Drive" });

    const plans = [
      // Canva Plans
      {
        appId: canva._id,
        name: "Free",
        price: 0,
        duration: "free",
        features: [
          "Basic design tools",
          "Limited templates",
        ],
        seatLimit: 1,
      },
      {
        appId: canva._id,
        name: "Pro",
        price: 499,
        duration: "monthly",
        features: [
          "Premium templates",
          "Brand kit",
          "Background remover",
        ],
        seatLimit: 1,
      },

      // Zoom Plans
      {
        appId: zoom._id,
        name: "Starter",
        price: 299,
        duration: "monthly",
        features: [
          "100 participant meetings",
          "40 min limit",
        ],
        seatLimit: 5,
      },
      {
        appId: zoom._id,
        name: "Business",
        price: 999,
        duration: "monthly",
        features: [
          "Unlimited meetings",
          "Cloud recording",
          "Team management",
        ],
        seatLimit: 10,
      },

      // Slack Plans
      {
        appId: slack._id,
        name: "Standard",
        price: 799,
        duration: "monthly",
        features: [
          "Team messaging",
          "File sharing",
          "Workflow automation",
        ],
        seatLimit: 5,
      },

      // Netflix Plans
      {
        appId: netflix._id,
        name: "Mobile",
        price: 149,
        duration: "monthly",
        features: [
          "Mobile only",
          "480p quality",
        ],
        seatLimit: 1,
      },
      {
        appId: netflix._id,
        name: "Premium",
        price: 649,
        duration: "monthly",
        features: [
          "4K streaming",
          "Watch on 4 devices",
          "No ads",
        ],
        seatLimit: 4,
      },

      // Spotify Plans
      {
        appId: spotify._id,
        name: "Individual",
        price: 119,
        duration: "monthly",
        features: [
          "Ad-free music",
          "Offline downloads",
          "High quality audio",
        ],
        seatLimit: 1,
      },
      {
        appId: spotify._id,
        name: "Family",
        price: 179,
        duration: "monthly",
        features: [
          "6 premium accounts",
          "Family mix",
          "Offline listening",
        ],
        seatLimit: 6,
      },

      // Google Drive Plans
      {
        appId: drive._id,
        name: "Basic",
        price: 99,
        duration: "monthly",
        features: [
          "100GB storage",
          "File sharing",
        ],
        seatLimit: 1,
      },
      {
        appId: drive._id,
        name: "Premium",
        price: 299,
        duration: "monthly",
        features: [
          "2TB storage",
          "Advanced sharing",
          "Backup sync",
        ],
        seatLimit: 5,
      },
    ];

    await Plan.insertMany(plans);

    console.log("Plans Seeded Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedPlans();