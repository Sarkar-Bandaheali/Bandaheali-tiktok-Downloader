// Import required modules
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to serve static files (public folder)
app.use(express.static("public"));

// API endpoint to fetch TikTok video details
app.get("/api/tiktok", async (req, res) => {
  const { url } = req.query;

  // Check if URL is provided
  if (!url) {
    return res.status(400).json({ error: "TikTok URL is required." });
  }

  try {
    // Fetch video data from the TikTok downloader API
    const response = await fetch(`https://www.dark-yasiya-api.site/download/tiktok?url=${encodeURIComponent(url)}`);
    
    // Check if the response is successful
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch data from TikTok API." });
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if the API response is valid
    if (!data.status) {
      return res.status(500).json({ error: "Failed to retrieve valid data." });
    }

    // Return the fetched data
    res.json(data);
  } catch (error) {
    console.error("Error fetching TikTok data:", error);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
