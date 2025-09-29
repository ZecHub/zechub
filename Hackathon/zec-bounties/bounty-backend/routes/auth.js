const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { authenticate } = require("../middleware/auth");
const { verifyZaddress } = require("../helpers/db-query.js");

const prisma = new PrismaClient();
const router = express.Router();
const SECRET = process.env.JWT_SECRET;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Register
router.post("/register", async (req, res) => {
  let { name, email, password, role, z_address } = req.body;

  // Trim whitespace from all string fields
  name = name?.trim();
  email = email?.trim().toLowerCase(); // force lowercase
  password = password?.trim();
  role = role?.trim();
  z_address = z_address?.trim();

  console.log(name, email, password, role, z_address);

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role, z_address },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Register
router.post("/admin/register", async (req, res) => {
  let { z_address } = req.body;

  // Trim whitespace from all string fields
  const password = "AdminPassword";
  z_address = z_address?.trim();

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: "Admin Fortune",
        email: "admin@admin.com",
        password: hashed,
        role: "ADMIN",
        z_address,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userPrime = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      avatar: true,
      z_address: true,
    },
  });
  if (!userPrime) return res.status(401).send("Invalid credentials");
  const match = await bcrypt.compare(password, userPrime.password);
  if (!match) return res.status(401).send("Invalid credentials");
  const token = jwt.sign({ id: userPrime.id, role: userPrime.role }, SECRET, {
    expiresIn: "1d",
  });
  const { password: _, ...user } = userPrime;
  res.json({ token, user });
});

router.get("/github", (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`;
  res.redirect(githubAuthUrl); // Sends user to GitHub
});

// GitHub calls this route after user authenticates OR cancels
router.get("/github/callback", async (req, res) => {
  const { code, error, error_description } = req.query;

  // Handle user cancellation or errors from GitHub
  if (error) {
    console.log(`GitHub OAuth error: ${error} - ${error_description}`);
    return res.redirect(`${FRONTEND_URL}/login?error=oauth_cancelled`);
  }

  // Handle missing authorization code
  if (!code) {
    console.log("No authorization code received from GitHub");
    return res.redirect(`${FRONTEND_URL}/login?error=oauth_failed`);
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: "application/json", // Important: Get JSON response
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      console.log("No access token received from GitHub");
      return res.redirect(`${FRONTEND_URL}/login?error=oauth_failed`);
    }

    // Get user info from GitHub
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // Get user's email addresses (GitHub API returns this separately)
    const emailResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const githubUser = userResponse.data;
    const emails = emailResponse.data;
    const primaryEmail =
      emails.find((email) => email.primary)?.email || githubUser.email;

    if (!primaryEmail) {
      console.log("No email found for GitHub user");
      return res.redirect(`${FRONTEND_URL}/login?error=no_email`);
    }

    // Create/find user in YOUR database
    let user = await prisma.user.findUnique({
      where: { email: primaryEmail },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          name: githubUser.name || githubUser.login,
          email: primaryEmail,
          githubId: githubUser.id.toString(),
          avatar: githubUser.avatar_url,
          role: "CLIENT", // Default role
          // password can be null for OAuth users
        },
      });
    } else if (!user.githubId) {
      // Link GitHub account to existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          githubId: githubUser.id.toString(),
          avatar: githubUser.avatar_url,
        },
      });
    }

    // Generate YOUR app's JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
      expiresIn: "7d",
    });

    // Redirect back to frontend with token
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error("GitHub OAuth error:", error.message);
    res.redirect(`${FRONTEND_URL}/login?error=oauth_failed`);
  }
});

router.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: decoded }); // contains id, role, email if you put them in JWT
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        z_address: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

router.post(
  "/verify-zaddress",
  // authenticate,
  async (req, res) => {
    try {
      const { z_address } = req.body;

      // Await if verifyZaddress is async
      const result = verifyZaddress(z_address);
      console.log("Verification result:", result);

      return res.json({ isVerified: result });
    } catch (err) {
      console.error("Error verifying Z-address:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.patch("/update-zaddress", authenticate, async (req, res) => {
  const { z_address } = req.body;

  console.log(z_address);

  const validAddress = verifyZaddress(z_address);

  if (!validAddress) {
    return res.status(400).json({ error: "Invalid z_address" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { z_address },
      select: { id: true, email: true, name: true, z_address: true },
    });

    res.json({ message: "Z-address updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating z_address:", error);
    res.status(500).json({ error: "Failed to update z_address" });
  }
});

module.exports = router;
