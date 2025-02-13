document.addEventListener("DOMContentLoaded", function() {
    let scenes = document.querySelectorAll(".cutscene-frame");
    let currentScene = 0;

    function showNextScene() {
        console.log(`Current Scene: ${currentScene}`); // Debugging log

        if (currentScene > 0) {
            scenes[currentScene - 1].classList.remove("fade"); // Hide previous scene
            console.log(`Hiding Scene: ${currentScene - 1}`); // Debugging log
        }

        if (currentScene < scenes.length) {
            scenes[currentScene].classList.add("fade"); // Show current scene
            console.log(`Showing Scene: ${currentScene}`); // Debugging log
            currentScene++;
            setTimeout(showNextScene, 4000); // Change scene every 3 seconds
        } else {
            setTimeout(() => {
                window.location.href = "game.html"; // Move to next game part
            }, 2000);
        }
    }

    showNextScene(); // Start the cutscene
});

document.getElementById("skip-button").addEventListener("click", function() {
    window.location.href = "game.html"; // Skip cutscene
});
