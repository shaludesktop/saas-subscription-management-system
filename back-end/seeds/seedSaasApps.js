import dotenv from "dotenv";
import connectDB from "../config/db.js";
import SaasApp from "../models/SaasApp.js";
import Plan from "../models/Plan.js";

dotenv.config();
await connectDB();

await Plan.deleteMany();

const appNames = [
  "Canva",
  "Zoom",
  "Slack",
  "Notion",
  "Microsoft 365",
  "Google Workspace",
  "Dropbox",
  "Adobe Creative Cloud",
  "Figma",
  "Trello",
  "Asana",
  "HubSpot",
  "Salesforce",
  "GitHub",
  "Spotify",
  "Netflix",
];

const apps = await SaasApp.find({ name: { $in: appNames } });

if (!apps.length) {
  console.log("Seed apps first");
  process.exit(1);
}

const appMap = {};
apps.forEach((app) => {
  appMap[app.name] = app;
});

const plans = [
  // Canva
  {
    appId: appMap["Canva"]?._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Basic templates", "Simple editing"],
    seatLimit: 1,
  },
  {
    appId: appMap["Canva"]?._id,
    name: "Pro",
    price: 499,
    duration: "monthly",
    features: ["Premium templates", "Brand kit", "Background remover"],
    seatLimit: 1,
  },
  {
    appId: appMap["Canva"]?._id,
    name: "Teams",
    price: 999,
    duration: "monthly",
    features: ["Team collaboration", "Shared assets", "Admin controls"],
    seatLimit: 5,
  },

  // Zoom
  {
    appId: appMap["Zoom"]?._id,
    name: "Basic",
    price: 0,
    duration: "free",
    features: ["40 min meetings", "100 participants"],
    seatLimit: 1,
  },
  {
    appId: appMap["Zoom"]?._id,
    name: "Pro",
    price: 699,
    duration: "monthly",
    features: ["Longer meetings", "Cloud recording"],
    seatLimit: 1,
  },
  {
    appId: appMap["Zoom"]?._id,
    name: "Business",
    price: 1499,
    duration: "monthly",
    features: ["Admin dashboard", "Branding", "Large meetings"],
    seatLimit: 10,
  },

  // Slack
  {
    appId: appMap["Slack"]?._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Basic messaging", "Limited history"],
    seatLimit: 1,
  },
  {
    appId: appMap["Slack"]?._id,
    name: "Pro",
    price: 399,
    duration: "monthly",
    features: ["Unlimited history", "App integrations", "Group calls"],
    seatLimit: 1,
  },
  {
    appId: appMap["Slack"]?._id,
    name: "Business+",
    price: 899,
    duration: "monthly",
    features: ["Advanced security", "User management", "Analytics"],
    seatLimit: 10,
  },

  // Notion
  {
    appId: appMap["Notion"]?._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Personal notes", "Basic workspace"],
    seatLimit: 1,
  },
  {
    appId: appMap["Notion"]?._id,
    name: "Plus",
    price: 299,
    duration: "monthly",
    features: ["Unlimited blocks", "File uploads", "Team sharing"],
    seatLimit: 1,
  },
  {
    appId: appMap["Notion"]?._id,
    name: "Business",
    price: 799,
    duration: "monthly",
    features: ["Private team spaces", "Advanced permissions", "Admin tools"],
    seatLimit: 10,
  },

  // Microsoft 365
  {
    appId: appMap["Microsoft 365"]?._id,
    name: "Basic",
    price: 199,
    duration: "monthly",
    features: ["Outlook", "OneDrive", "Web apps"],
    seatLimit: 1,
  },
  {
    appId: appMap["Microsoft 365"]?._id,
    name: "Standard",
    price: 499,
    duration: "monthly",
    features: ["Word", "Excel", "PowerPoint", "Teams"],
    seatLimit: 1,
  },
  {
    appId: appMap["Microsoft 365"]?._id,
    name: "Premium",
    price: 899,
    duration: "monthly",
    features: ["Desktop apps", "Security tools", "Business email"],
    seatLimit: 5,
  },

  // Google Workspace
  {
    appId: appMap["Google Workspace"]?._id,
    name: "Starter",
    price: 250,
    duration: "monthly",
    features: ["Gmail", "Drive", "Docs", "Meet"],
    seatLimit: 1,
  },
  {
    appId: appMap["Google Workspace"]?._id,
    name: "Standard",
    price: 500,
    duration: "monthly",
    features: ["Shared drives", "More storage", "Meeting recording"],
    seatLimit: 5,
  },
  {
    appId: appMap["Google Workspace"]?._id,
    name: "Plus",
    price: 900,
    duration: "monthly",
    features: ["Advanced admin", "Security", "More participants"],
    seatLimit: 10,
  },

  // Dropbox
  {
    appId: appMap["Dropbox"]?._id,
    name: "Basic",
    price: 0,
    duration: "free",
    features: ["Limited cloud storage", "File sync"],
    seatLimit: 1,
  },
  {
    appId: appMap["Dropbox"]?._id,
    name: "Plus",
    price: 349,
    duration: "monthly",
    features: ["More storage", "File recovery", "Offline access"],
    seatLimit: 1,
  },
  {
    appId: appMap["Dropbox"]?._id,
    name: "Professional",
    price: 699,
    duration: "monthly",
    features: ["Large storage", "Share controls", "Advanced backup"],
    seatLimit: 3,
  },

  // Adobe Creative Cloud
  {
    appId: appMap["Adobe Creative Cloud"]?._id,
    name: "Single App",
    price: 799,
    duration: "monthly",
    features: ["One Adobe app", "Cloud storage"],
    seatLimit: 1,
  },
  {
    appId: appMap["Adobe Creative Cloud"]?._id,
    name: "All Apps",
    price: 1999,
    duration: "monthly",
    features: ["Photoshop", "Illustrator", "Premiere Pro", "More apps"],
    seatLimit: 1,
  },
  {
    appId: appMap["Adobe Creative Cloud"]?._id,
    name: "Teams",
    price: 3999,
    duration: "monthly",
    features: ["All apps", "Team libraries", "Admin console"],
    seatLimit: 5,
  },

  // Figma
  {
    appId: appMap["Figma"]?._id,
    name: "Starter",
    price: 0,
    duration: "free",
    features: ["Basic design files", "Collaborative editing"],
    seatLimit: 1,
  },
  {
    appId: appMap["Figma"]?._id,
    name: "Professional",
    price: 599,
    duration: "monthly",
    features: ["Unlimited files", "Team projects", "Dev mode basics"],
    seatLimit: 3,
  },
  {
    appId: appMap["Figma"]?._id,
    name: "Organization",
    price: 1499,
    duration: "monthly",
    features: ["Advanced design systems", "Team libraries", "Admin controls"],
    seatLimit: 10,
  },

  // Trello
  {
    appId: appMap["Trello"]?._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Basic boards", "Cards", "Task lists"],
    seatLimit: 1,
  },
  {
    appId: appMap["Trello"]?._id,
    name: "Standard",
    price: 249,
    duration: "monthly",
    features: ["Advanced checklists", "Custom fields", "More boards"],
    seatLimit: 5,
  },
  {
    appId: appMap["Trello"]?._id,
    name: "Premium",
    price: 499,
    duration: "monthly",
    features: ["Timeline view", "Dashboard", "Admin tools"],
    seatLimit: 10,
  },

  // Asana
  {
    appId: appMap["Asana"]?._id,
    name: "Personal",
    price: 0,
    duration: "free",
    features: ["Task tracking", "Basic collaboration"],
    seatLimit: 1,
  },
  {
    appId: appMap["Asana"]?._id,
    name: "Starter",
    price: 399,
    duration: "monthly",
    features: ["Timeline", "Reporting", "Project templates"],
    seatLimit: 5,
  },
  {
    appId: appMap["Asana"]?._id,
    name: "Advanced",
    price: 899,
    duration: "monthly",
    features: ["Goals", "Portfolios", "Advanced reporting"],
    seatLimit: 10,
  },

  // HubSpot
  {
    appId: appMap["HubSpot"]?._id,
    name: "Free Tools",
    price: 0,
    duration: "free",
    features: ["CRM", "Contacts", "Basic email tools"],
    seatLimit: 1,
  },
  {
    appId: appMap["HubSpot"]?._id,
    name: "Starter",
    price: 799,
    duration: "monthly",
    features: ["Email marketing", "Live chat", "Basic automation"],
    seatLimit: 2,
  },
  {
    appId: appMap["HubSpot"]?._id,
    name: "Professional",
    price: 2499,
    duration: "monthly",
    features: ["Marketing automation", "Sales tools", "Custom reports"],
    seatLimit: 10,
  },

  // Salesforce
  {
    appId: appMap["Salesforce"]?._id,
    name: "Essentials",
    price: 999,
    duration: "monthly",
    features: ["Contact management", "Sales tracking"],
    seatLimit: 1,
  },
  {
    appId: appMap["Salesforce"]?._id,
    name: "Professional",
    price: 2499,
    duration: "monthly",
    features: ["Lead scoring", "Forecasting", "Dashboards"],
    seatLimit: 5,
  },
  {
    appId: appMap["Salesforce"]?._id,
    name: "Enterprise",
    price: 4999,
    duration: "monthly",
    features: ["Advanced customization", "Automation", "API access"],
    seatLimit: 20,
  },

  // GitHub
  {
    appId: appMap["GitHub"]?._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Public/private repos", "Basic CI/CD"],
    seatLimit: 1,
  },
  {
    appId: appMap["GitHub"]?._id,
    name: "Team",
    price: 299,
    duration: "monthly",
    features: ["Team access", "Code owners", "Review tools"],
    seatLimit: 5,
  },
  {
    appId: appMap["GitHub"]?._id,
    name: "Enterprise",
    price: 999,
    duration: "monthly",
    features: ["Enterprise security", "Advanced audit", "SSO"],
    seatLimit: 20,
  },

  // Spotify
  {
    appId: appMap["Spotify"]?._id,
    name: "Free",
    price: 0,
    duration: "free",
    features: ["Ad-supported music streaming"],
    seatLimit: 1,
  },
  {
    appId: appMap["Spotify"]?._id,
    name: "Premium Individual",
    price: 119,
    duration: "monthly",
    features: ["Ad-free music", "Offline downloads", "Unlimited skips"],
    seatLimit: 1,
  },
  {
    appId: appMap["Spotify"]?._id,
    name: "Premium Family",
    price: 179,
    duration: "monthly",
    features: ["Up to 6 accounts", "Family mix", "Parental controls"],
    seatLimit: 6,
  },

  // Netflix
  {
    appId: appMap["Netflix"]?._id,
    name: "Mobile",
    price: 149,
    duration: "monthly",
    features: ["Mobile only", "Standard quality"],
    seatLimit: 1,
  },
  {
    appId: appMap["Netflix"]?._id,
    name: "Basic",
    price: 199,
    duration: "monthly",
    features: ["Watch on 1 device", "HD streaming"],
    seatLimit: 1,
  },
  {
    appId: appMap["Netflix"]?._id,
    name: "Premium",
    price: 649,
    duration: "monthly",
    features: ["4K streaming", "Multiple devices", "Multiple profiles"],
    seatLimit: 4,
  },
].filter((plan) => plan.appId);

await Plan.insertMany(plans);

console.log("Plans seeded successfully");
process.exit();