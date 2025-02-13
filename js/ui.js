// Apply fade-out effect & redirection to navigation buttons, NOT the music button
document.querySelectorAll("button:not(#music-btn)").forEach(button => {
    button.addEventListener("click", function(event) {
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = event.target.getAttribute("onclick")?.split("'")[1];
        }, 500); // Wait for fade-out before changing page
    });
});

let musicBtn = document.getElementById("music-btn");
let musicFrame = document.getElementById("music-frame")?.contentWindow;

// Function to update the button text based on music state
function updateMusicButton() {
    if (!musicBtn) return; // ✅ Only run if musicBtn exists
    let isPlaying = localStorage.getItem("musicPlaying") === "true";
    musicBtn.textContent = isPlaying ? "Pause Music" : "Play Music";
}

// Check local storage to set the initial button state
window.addEventListener("DOMContentLoaded", function () {
    updateMusicButton();
});

// Listen for messages from `audio.html`
window.addEventListener("message", function (event) {
    if (!musicBtn) return; // ✅ Only run if musicBtn exists
    if (event.data === "musicStarted") {
        localStorage.setItem("musicPlaying", "true");
        updateMusicButton();
    } else if (event.data === "musicStopped") {
        localStorage.setItem("musicPlaying", "false");
        updateMusicButton();
    }
});

// Music Toggle Function (called on button click)
function toggleMusic() {
    if (!musicBtn) return; // ✅ Only run if musicBtn exists
    let isPlaying = localStorage.getItem("musicPlaying") === "true";

    if (musicFrame) {
        if (isPlaying) {
            musicFrame.postMessage("pauseMusic", "*");
        } else {
            musicFrame.postMessage("playMusic", "*");
        }
    }
}

// Attach the event listener only if the button exists
if (musicBtn) {
    musicBtn.addEventListener("click", toggleMusic);
}

// Ensure the loading screen hides properly
window.addEventListener("load", function () {
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("hidden");
    }, 500);
});
