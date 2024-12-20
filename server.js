import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await fetch(`https://www.dark-yasiya-api.site/download/tiktok?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.status) {
      res.status(200).json({
        title: data.result.title,
        author: data.result.author,
        cover: data.result.cover,
        wmVideo: data.result.wmVideo,
        hdVideo: data.result.hdVideo,
        sound: data.result.sound
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch video details' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
