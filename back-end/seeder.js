import dotenv from "dotenv";
import connectDB from "./config/db.js";

import SaasApp from "./models/SaasApp.js";
import Plan from "./models/Plan.js";

dotenv.config();

connectDB();

const seedData = async () => {
  try {
    await SaasApp.deleteMany();
    await Plan.deleteMany();

   const apps = await SaasApp.insertMany([
  {
    name: "YouTube",
    category: "Entertainment",
    description: "Video streaming platform",
    logo: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
  },
  {
    name: "Canva",
    category: "Design",
    description: "Design platform",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  },
  {
    name: "Netflix",
    category: "Entertainment",
    description: "Movie and TV streaming platform",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
  },
  {
    name: "Spotify",
    category: "Music",
    description: "Music streaming platform",
    logo: "https://cdn-icons-png.flaticon.com/512/174/174872.png",
  },
  {
    name: "Zoom",
    category: "Communication",
    description: "Video meeting platform",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
  },
  {
    name: "Slack",
    category: "Productivity",
    description: "Team collaboration platform",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968890.png",
  },
  {
    name: "Figma",
    category: "Design",
    description: "UI/UX design platform",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968704.png",
  },
  {
    name: "Google Drive",
    category: "Storage",
    description: "Cloud storage platform",
    logo: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
  },
  {
    name: "Dropbox",
    category: "Storage",
    description: "Online file storage platform",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968517.png",
  },
  {
    name: "Notion",
    category: "Workspace",
    description: "Workspace and collaboration tool",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  },
]);

const plans = [

  // YouTube
  {
    appId: apps[0]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Ads supported", "720p streaming"],
    seatLimit: 1,
  },
  {
    appId: apps[0]._id,
    name: "Premium",
    price: 129,
    duration: "monthly",
    features: ["No ads", "Offline downloads", "Background play"],
    seatLimit: 1,
  },
  {
    appId: apps[0]._id,
    name: "Family",
    price: 189,
    duration: "monthly",
    features: ["6 accounts", "Ad-free", "Offline mode"],
    seatLimit: 6,
  },

  // Canva
  {
    appId: apps[1]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Basic templates", "Free assets"],
    seatLimit: 1,
  },
  {
    appId: apps[1]._id,
    name: "Pro",
    price: 499,
    duration: "monthly",
    features: ["Premium templates", "Brand kit", "AI tools"],
    seatLimit: 5,
  },
  {
    appId: apps[1]._id,
    name: "Enterprise",
    price: 1499,
    duration: "monthly",
    features: ["Team collaboration", "Admin dashboard", "Unlimited storage"],
    seatLimit: 25,
  },

  // Netflix
  {
    appId: apps[2]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Trailers only", "Ads supported"],
    seatLimit: 1,
  },
  {
    appId: apps[2]._id,
    name: "Mobile",
    price: 149,
    duration: "monthly",
    features: ["Mobile streaming", "480p"],
    seatLimit: 1,
  },
  {
    appId: apps[2]._id,
    name: "Premium",
    price: 649,
    duration: "monthly",
    features: ["4K streaming", "4 devices", "No ads"],
    seatLimit: 4,
  },

  // Spotify
  {
    appId: apps[3]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Ads enabled", "Shuffle play"],
    seatLimit: 1,
  },
  {
    appId: apps[3]._id,
    name: "Individual",
    price: 119,
    duration: "monthly",
    features: ["Ad-free music", "Offline listening"],
    seatLimit: 1,
  },
  {
    appId: apps[3]._id,
    name: "Family",
    price: 179,
    duration: "monthly",
    features: ["6 premium accounts", "Family mix"],
    seatLimit: 6,
  },

  // Zoom
  {
    appId: apps[4]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["40 min meetings", "100 participants"],
    seatLimit: 1,
  },
  {
    appId: apps[4]._id,
    name: "Pro",
    price: 499,
    duration: "monthly",
    features: ["30-hour meetings", "Cloud recording"],
    seatLimit: 5,
  },
  {
    appId: apps[4]._id,
    name: "Business",
    price: 999,
    duration: "monthly",
    features: ["Unlimited meetings", "Admin dashboard"],
    seatLimit: 20,
  },

  // Slack
  {
    appId: apps[5]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Basic messaging", "Limited history"],
    seatLimit: 1,
  },
  {
    appId: apps[5]._id,
    name: "Pro",
    price: 799,
    duration: "monthly",
    features: ["Unlimited history", "Workflow automation"],
    seatLimit: 10,
  },
  {
    appId: apps[5]._id,
    name: "Enterprise",
    price: 1499,
    duration: "monthly",
    features: ["Advanced security", "Priority support"],
    seatLimit: 50,
  },

  // Figma
  {
    appId: apps[6]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Draft projects", "Basic collaboration"],
    seatLimit: 1,
  },
  {
    appId: apps[6]._id,
    name: "Professional",
    price: 599,
    duration: "monthly",
    features: ["Unlimited projects", "Version history"],
    seatLimit: 5,
  },
  {
    appId: apps[6]._id,
    name: "Organization",
    price: 1999,
    duration: "monthly",
    features: ["Design systems", "Team libraries"],
    seatLimit: 50,
  },

  // Google Drive
  {
    appId: apps[7]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["15GB storage"],
    seatLimit: 1,
  },
  {
    appId: apps[7]._id,
    name: "Basic",
    price: 99,
    duration: "monthly",
    features: ["100GB storage"],
    seatLimit: 1,
  },
  {
    appId: apps[7]._id,
    name: "Premium",
    price: 299,
    duration: "monthly",
    features: ["2TB storage", "Backup sync"],
    seatLimit: 5,
  },

  // Dropbox
  {
    appId: apps[8]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["2GB storage"],
    seatLimit: 1,
  },
  {
    appId: apps[8]._id,
    name: "Plus",
    price: 199,
    duration: "monthly",
    features: ["2TB storage", "File recovery"],
    seatLimit: 1,
  },
  {
    appId: apps[8]._id,
    name: "Professional",
    price: 499,
    duration: "monthly",
    features: ["3TB storage", "Smart sync"],
    seatLimit: 5,
  },

  // Notion
  {
    appId: apps[9]._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Personal workspace"],
    seatLimit: 1,
  },
  {
    appId: apps[9]._id,
    name: "Plus",
    price: 399,
    duration: "monthly",
    features: ["Unlimited blocks", "Team collaboration"],
    seatLimit: 10,
  },
  {
    appId: apps[9]._id,
    name: "Business",
    price: 999,
    duration: "monthly",
    features: ["Advanced permissions", "Admin tools"],
    seatLimit: 50,
  },

];

    await Plan.insertMany(plans);

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();