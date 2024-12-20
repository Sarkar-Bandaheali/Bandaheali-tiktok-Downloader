document.getElementById('fetchBtn').addEventListener('click', async function () {
  const url = document.getElementById('videoUrl').value;
  if (!url) return alert('Please enter a valid TikTok video URL');

  try {
    const response = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.status) {
      document.getElementById('videoDetails').style.display = 'block';
      document.getElementById('videoTitle').textContent = `Title: ${data.title}`;
      document.getElementById('authorName').textContent = `Author: ${data.author}`;
      document.getElementById('coverImage').src = data.cover;

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
