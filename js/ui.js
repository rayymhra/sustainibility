document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function(event) {
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = event.target.getAttribute("onclick").split("'")[1];
        }, 500); // Wait for fade-out before changing page
    });
});

let bgMusic = document.getElementById("bg-music");

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
}


window.addEventListener("load", function () {
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("hidden");
    }, 500); // Small delay to ensure all assets are loaded
});
