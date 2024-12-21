document.getElementById('fetchForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const url = document.getElementById('tiktokUrl').value;
  if (!url) return alert('Please enter a valid TikTok video URL');

  try {
    const response = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.status) {
      document.getElementById('videoDetails').style.display = 'block';
      document.getElementById('title').textContent = `Title: ${data.title}`;
      document.getElementById('author').textContent = `Author: ${data.author}`;
      document.getElementById('videoCover').src = data.cover;

      document.getElementById('downloadWmVideo').onclick = () => window.location.href = data.wmVideo;
      document.getElementById('downloadHdVideo').onclick = () => window.location.href = data.hdVideo;
      document.getElementById('downloadSound').onclick = () => window.location.href = data.sound;
    } else {
      alert('Failed to fetch video details');
    }
  } catch (error) {
    alert('An error occurred, please try again later');
    console.error(error);
  }
});
