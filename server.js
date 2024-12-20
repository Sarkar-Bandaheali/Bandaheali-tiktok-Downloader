const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/api/tiktok", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "TikTok URL is required." });
  }

  try {
    const response = await fetch(`https://www.dark-yasiya-api.site/download/tiktok?url=${url}`);
    const data = await response.json();

    if (!data.status) {
      return res.status(500).json({ error: "Failed to fetch video details." });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching TikTok data:", error);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
