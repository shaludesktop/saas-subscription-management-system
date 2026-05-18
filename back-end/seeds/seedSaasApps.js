import dotenv from "dotenv";

import connectDB from "../config/db.js";
import SaasApp from "../models/SaasApp.js";

dotenv.config();

connectDB();

const apps = [
  {
    name: "Canva",
    description: "Design platform for graphics and presentations",
    category: "Design",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  },
  {
    name: "Zoom",
    description: "Video meetings and online communication",
    category: "Communication",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
  },
  {
    name: "Slack",
    description: "Team collaboration and messaging platform",
    category: "Productivity",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968890.png",
  },
  {
    name: "Notion",
    description: "Workspace for notes, tasks, and collaboration",
    category: "Productivity",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968875.png",
  },
  {
    name: "Figma",
    description: "Collaborative interface design tool",
    category: "Design",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968704.png",
  },
  {
    name: "Dropbox",
    description: "Cloud storage and file sharing platform",
    category: "Storage",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968517.png",
  },
  {
    name: "Google Drive",
    description: "Online cloud storage and collaboration",
    category: "Storage",
    logo: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
  },
  {
    name: "Trello",
    description: "Project management and task organization tool",
    category: "Management",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968879.png",
  },
  {
    name: "Asana",
    description: "Work management and team collaboration platform",
    category: "Management",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968865.png",
  },
  {
    name: "Spotify",
    description: "Music streaming and podcast platform",
    category: "Entertainment",
    logo: "https://cdn-icons-png.flaticon.com/512/174/174872.png",
  },
  {
    name: "Netflix",
    description: "Video streaming and entertainment platform",
    category: "Entertainment",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
  },
  {
    name: "Adobe Creative Cloud",
    description: "Professional creative software suite",
    category: "Design",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
  },
];

const seedApps = async () => {
  try {
    await SaasApp.deleteMany();

    await SaasApp.insertMany(apps);

    console.log("SaaS Apps Seeded Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedApps();