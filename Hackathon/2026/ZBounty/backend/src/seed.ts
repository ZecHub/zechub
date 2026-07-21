import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User";
import Bounty from "./models/Bounty";
import { hashPassword } from "./utils/crypto";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI is not defined.");
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully!");

    // Clear old records
    console.log("Clearing existing users and bounties...");
    await User.deleteMany({});
    await Bounty.deleteMany({});

    // 1. Create Mock Users
    console.log("Creating mock users...");
    
    const admin = new User({
      username: "admin",
      email: "admin@zbounty.org",
      password: hashPassword("admin123"),
      role: "Admin",
      bio: "Administrator for the ZBounty platform review portal.",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=admin",
      reputation: {
        bountiesFunded: 0,
        completionRate: 0,
        tasksCompleted: 0,
        totalRewardsEarned: 0,
        successRate: 0,
      },
      privacyScore: {
        average: 100,
        highest: 100,
        championCount: 0,
        totalShieldedEarnings: 0,
      },
    });
    await admin.save();

    const sponsor = new User({
      username: "Zcash Foundation",
      email: "sponsor@zcash.org",
      password: hashPassword("sponsor123"),
      role: "Creator",
      walletAddress: "zs1zcashfoundationaddress1234567890abcdefghijklmnopqrstuvwxyz",
      bio: "Sponsoring privacy-preserving technologies and cryptographic research on Zcash.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw39ScrxNa3ZgzehfSnq_YoRqJofZus71SLW3Bb7uZtGBzNwV55CayP5mje1Trt7rMVRtD5X-a74dAPHwUlq3MqhfX7flwAvqOgzv3ovfQJh_UZWcxifC0HJEMI5w9ijaNf9_U_9MlKEHHY85-PRy3DXq2P5WARiDSltoNf1_7QsxWWcaIevld4uD7XoV1Zhm581DkNtbo-FrRbPxihGvZVVlg-nUvq9FcP1tOkfAYu7gueTu3PRLBVBROwBxxllhyJ6i_0BhBGw",
      reputation: {
        bountiesFunded: 24,
        completionRate: 98,
        tasksCompleted: 0,
        totalRewardsEarned: 0,
        successRate: 5.0,
      },
      privacyScore: {
        average: 92,
        highest: 100,
        championCount: 5,
        totalShieldedEarnings: 0,
      },
    });
    await sponsor.save();

    // 2. Create Mock Bounties
    console.log("Creating mock bounties...");
    const bounties = [
      {
        creatorId: sponsor._id,
        title: "Implement ZSA Support in Lightwalletd",
        description: "Update the lightwalletd infrastructure to properly parse and index Zcash Shielded Assets (ZSA) transactions. Focus on maintaining backward compatibility and query efficiency.",
        reward: 50.0,
        status: "Open",
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days left
        category: "Development",
        tags: ["Development", "Protocol"],
        skillsRequired: ["Go", "gRPC", "Zcash Protocol"],
        privacyScore: 80,
        privacyStatus: {
          funding: "Shielded",
          payout: "Mixed",
        },
      },
      {
        creatorId: sponsor._id,
        title: "Educational Video Series: Frost Core",
        description: "Produce a series of 3 short, high-quality video tutorials explaining how threshold signatures work with FROST and demonstrating integration steps.",
        reward: 12.5,
        status: "Open",
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days left
        category: "Content",
        tags: ["Content", "FROST"],
        skillsRequired: ["Video Editing", "FROST", "Cryptography"],
        privacyScore: 40,
        privacyStatus: {
          funding: "Transparent",
          payout: "Pending",
        },
      },
      {
        creatorId: sponsor._id, // Set to sponsor instead of freelancer
        title: "Revamp Dashboard UI/UX",
        description: "Redesign and restructure the freelancer portal user interface to follow sunlit warm fintech design systems.",
        reward: 20.0,
        status: "In Progress",
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days left
        category: "Design",
        tags: ["Design", "Frontend"],
        skillsRequired: ["Figma", "TailwindCSS", "React"],
        privacyScore: 60,
        privacyStatus: {
          funding: "Mixed",
          payout: "Pending",
        },
      },
      {
        creatorId: sponsor._id,
        title: "Analysis of Node Sync Performance",
        description: "Perform a comprehensive profiling of node synchronization speeds across different network topologies and publish findings.",
        reward: 35.0,
        status: "Open",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days left
        category: "Research",
        tags: ["Research", "Performance"],
        skillsRequired: ["Rust", "Profiling", "Networking"],
        privacyScore: 90,
        privacyStatus: {
          funding: "Shielded",
          payout: "Shielded",
        },
      },
      {
        creatorId: sponsor._id,
        title: "Develop a Zcash Privacy Guide",
        description: "A comprehensive tutorial for developers integrating shielded transactions into modern web architectures.",
        reward: 2.5,
        status: "Open",
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days left
        category: "Content",
        tags: ["Documentation", "Privacy"],
        skillsRequired: ["Technical Writing", "Privacy"],
        privacyScore: 100,
        privacyStatus: {
          funding: "Shielded",
          payout: "Shielded",
        },
      },
    ];

    await Bounty.insertMany(bounties);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

seedDatabase();
