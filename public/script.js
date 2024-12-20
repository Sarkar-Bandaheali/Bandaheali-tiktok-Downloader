document.getElementById('fetchBtn').addEventListener('click', async () => {
  const videoUrl = document.getElementById('videoUrl').value;
  const videoDetailsContainer = document.getElementById('videoDetails');
  const downloadButtonsContainer = document.getElementById('downloadButtons');

  if (!videoUrl.trim()) {
    alert('Please paste a valid TikTok video URL!');
    return;
  }

  try {
    // Fetch video details from the backend
    const response = await fetch(`/api/tiktok?url=${encodeURIComponent(videoUrl)}`);
    const data = await response.json();

    if (!data.result) {
      alert('Failed to fetch video details. Please check the URL or try again later.');
      return;
    }

    // Populate video details
    document.getElementById('coverImage').src = data.result.cover;
    document.getElementById('videoTitle').innerText = `Title: ${data.result.title}`;
    document.getElementById('authorName').innerText = `Author: ${data.result.author}`;
    document.getElementById('stats').innerText = `Duration: ${data.result.duration}s | Views: ${data.result.views}`;

    // Generate download buttons
    downloadButtonsContainer.innerHTML = ''; // Clear previous buttons

    // Button for HD Video Download
    const hdButton = document.createElement('button');
    hdButton.innerText = 'Download HD Video';
    hdButton.addEventListener('click', () => downloadFile(data.result.hdVideo, 'hd_video.mp4'));
    downloadButtonsContainer.appendChild(hdButton);

    // Button for Watermarked Video Download
    const wmButton = document.createElement('button');
    wmButton.innerText = 'Download Watermarked Video';
    wmButton.addEventListener('click', () => downloadFile(data.result.wmVideo, 'wm_video.mp4'));
    downloadButtonsContainer.appendChild(wmButton);

    // Button for Audio Download
    const audioButton = document.createElement('button');
    audioButton.innerText = 'Download Audio';
    audioButton.addEventListener('click', () => downloadFile(data.result.sound, 'audio.mp3'));
    downloadButtonsContainer.appendChild(audioButton);

    // Show video details
    videoDetailsContainer.classList.remove('hidden');
  } catch (error) {
    console.error('Error fetching video details:', error);
    alert('An error occurred. Please try again later.');
  }
});

// Function to trigger file download
function downloadFile(url, filename) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
      }
