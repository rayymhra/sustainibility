// Only apply fade-out effect & redirection to navigation buttons, NOT the music button
document.querySelectorAll("button:not(#music-btn)").forEach(button => {
    button.addEventListener("click", function(event) {
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = event.target.getAttribute("onclick")?.split("'")[1];
        }, 500); // Wait for fade-out before changing page
    });
});

let bgMusic = document.getElementById("bg-music");
let musicBtn = document.getElementById("music-btn");

// Check local storage to see if music was playing
window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("musicPlaying") === "true") {
        bgMusic.play();
        musicBtn.textContent = "Pause Music";
    }
});

// Toggle music and store state
function toggleMusic() {
    let musicFrame = document.getElementById("music-frame").contentWindow;
    let isPlaying = localStorage.getItem("musicPlaying") === "true";

    if (isPlaying) {
        musicFrame.postMessage("pauseMusic", "*");
        localStorage.setItem("musicPlaying", "false");
        musicBtn.textContent = "Play Music"; // Update button text
    } else {
        musicFrame.postMessage("playMusic", "*");
        localStorage.setItem("musicPlaying", "true");
        musicBtn.textContent = "Pause Music"; // Update button text
    }
}





// Ensure the loading screen hides properly
window.addEventListener("load", function () {
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("hidden");
    }, 500);
});
