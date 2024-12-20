// Select the form and button elements
const form = document.getElementById('videoForm');
const urlInput = document.getElementById('videoUrl');
const downloadButton = document.getElementById('downloadButton');
const downloadLinksDiv = document.getElementById('downloadLinks');

// Event listener for the form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();  // Prevent the default form submission

  const videoUrl = urlInput.value.trim();  // Get the input URL

  if (!videoUrl) {
    alert("Please enter a TikTok video URL.");
    return;
  }

  downloadButton.textContent = "Fetching video details...";  // Update button text

  try {
    // Make a request to the backend API with the TikTok video URL
    const response = await fetch(`/api/tiktok?url=${encodeURIComponent(videoUrl)}`);

    // Check if the request was successful
    if (!response.ok) {
      alert("An error occurred. Please try again later.");
      downloadButton.textContent = "Fetch Video Details";
      return;
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if data was successfully returned
    if (!data.status) {
      alert("Failed to fetch video details.");
      downloadButton.textContent = "Fetch Video Details";
      return;
    }

    // Update the UI with the fetched video details
    displayDownloadLinks(data.result);

  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching the video.");
  } finally {
    downloadButton.textContent = "Fetch Video Details";  // Reset button text
  }
});

// Function to display the download links
function displayDownloadLinks(data) {
  downloadLinksDiv.innerHTML = '';  // Clear previous links

  // Display Video Details
  const title = document.createElement('h2');
  title.textContent = data.title;
  downloadLinksDiv.appendChild(title);

  const coverImage = document.createElement('img');
  coverImage.src = data.cover;
  coverImage.alt = "Video Cover Image";
  downloadLinksDiv.appendChild(coverImage);

  // Create download buttons for each available option
  const buttons = [
    { label: 'Download Watermarked Video', url: data.result.wmVideo },
    { label: 'Download HD Video', url: data.result.hdVideo },
    { label: 'Download Sound', url: data.result.sound }
  ];

  buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button.label;
    btn.onclick = () => {
      window.location.href = button.url;  // Trigger the download
    };
    downloadLinksDiv.appendChild(btn);
  });
}
