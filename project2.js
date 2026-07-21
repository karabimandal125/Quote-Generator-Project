const moodSelect = document.getElementById("mood");
const generateBtn = document.getElementById("generateBtn");
const quoteEl = document.getElementById("quote");
const musicContainer = document.getElementById("musicContainer");

// Spotify playlist embeds (guaranteed to work)
const musicLinks = {
  happy: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC",     // Feel Good
  sad: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1",       // Sad songs
  motivated: "https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP", // Motivation/Workout
  relaxed: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO"    // Peaceful Piano
};

// Background colors for moods
const moodColors = {
  happy: "#FFF176",
  sad: "#7986CB",
  motivated: "#FF7043",
  relaxed: "#4DB6AC"
};

// Local fallback quotes (so they change!)
const fallbackQuotes = [
  "Believe in yourself and all that you are.",
  "Every day is a new beginning.",
  "Small steps every day lead to big results.",
  "Turn your wounds into wisdom.",
  "Don’t stop until you’re proud.",
  "Your limitation—it’s only your imagination."
];

// Fetch a motivational quote
async function fetchQuote() {
  try {
    // Add a random parameter to avoid cache
    const res = await fetch("https://api.quotable.io/random?nocache=" + Math.random(), {
      cache: "no-store"
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return `"${data.content}" — ${data.author}`;
  } catch {
    // If API fails, return a random fallback quote
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    return `"${randomQuote}" — Karabi Mandal`;
  }
}

async function updateMood() {
  const mood = moodSelect.value;

  // Change background color
  document.body.style.background = moodColors[mood];

  // Show new quote every time
  const quote = await fetchQuote();
  quoteEl.textContent = quote;

  // Show Spotify embed
  musicContainer.innerHTML = `
    <iframe src="${musicLinks[mood]}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
  `;
}

generateBtn.addEventListener("click", updateMood);
