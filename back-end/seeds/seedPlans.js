import dotenv from "dotenv";
import connectDB from "../config/db.js";
import SaasApp from "../models/SaasApp.js";

dotenv.config();
await connectDB();

await SaasApp.deleteMany();

const apps = [
  {
    name: "Canva",
    category: "Design Tool",
    description: "Create graphics, presentations, and branding materials.",
    logo: "https://example.com/canva.png",
    status: "active",
  },
  {
    name: "Zoom",
    category: "Communication Tool",
    description: "Video meetings, webinars, and online collaboration.",
    logo: "https://example.com/zoom.png",
    status: "active",
  },
  {
    name: "Slack",
    category: "Team Communication",
    description: "Business messaging and team collaboration platform.",
    logo: "https://example.com/slack.png",
    status: "active",
  },
  {
    name: "Notion",
    category: "Productivity",
    description: "Workspace for notes, docs, databases, and project management.",
    logo: "https://example.com/notion.png",
    status: "active",
  },
  {
    name: "Microsoft 365",
    category: "Office Suite",
    description: "Word, Excel, PowerPoint, Outlook, and Teams in one suite.",
    logo: "https://example.com/microsoft365.png",
    status: "active",
  },
  {
    name: "Google Workspace",
    category: "Office Suite",
    description: "Professional Gmail, Docs, Sheets, Drive, and Meet.",
    logo: "https://example.com/googleworkspace.png",
    status: "active",
  },
  {
    name: "Dropbox",
    category: "Cloud Storage",
    description: "Cloud file storage, backup, and collaboration tools.",
    logo: "https://example.com/dropbox.png",
    status: "active",
  },
  {
    name: "Adobe Creative Cloud",
    category: "Creative Tools",
    description: "Photoshop, Illustrator, Premiere Pro, and creative apps.",
    logo: "https://example.com/adobe.png",
    status: "active",
  },
  {
    name: "Figma",
    category: "UI/UX Design",
    description: "Collaborative interface design and prototyping platform.",
    logo: "https://example.com/figma.png",
    status: "active",
  },
  {
    name: "Trello",
    category: "Project Management",
    description: "Task boards and workflow management for teams.",
    logo: "https://example.com/trello.png",
    status: "active",
  },
  {
    name: "Asana",
    category: "Project Management",
    description: "Work management platform for teams and businesses.",
    logo: "https://example.com/asana.png",
    status: "active",
  },
  {
    name: "HubSpot",
    category: "CRM",
    description: "Marketing, sales, and customer service software.",
    logo: "https://example.com/hubspot.png",
    status: "active",
  },
  {
    name: "Salesforce",
    category: "CRM",
    description: "Customer relationship management platform for enterprises.",
    logo: "https://example.com/salesforce.png",
    status: "active",
  },
  {
    name: "GitHub",
    category: "Developer Tools",
    description: "Code hosting, version control, and team collaboration.",
    logo: "https://example.com/github.png",
    status: "active",
  },
  {
    name: "Spotify",
    category: "Entertainment",
    description: "Music streaming subscription platform.",
    logo: "https://example.com/spotify.png",
    status: "active",
  },
  {
    name: "Netflix",
    category: "Entertainment",
    description: "Streaming platform for movies, shows, and originals.",
    logo: "https://example.com/netflix.png",
    status: "active",
  }
];

await SaasApp.insertMany(apps);

console.log("SaaS apps seeded successfully");
process.exit();