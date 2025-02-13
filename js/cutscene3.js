document.addEventListener("DOMContentLoaded", function () {
    const dialogueText = document.getElementById("dialogue-text-three");
    const sceneImg = document.getElementById("scene-img-three");
    const nextButton = document.getElementById("next-button-three");

    let currentScene = 0;
    const scenes = [
        { text: "Makasih!", img: "assets/grandma_thank_you.png" },
        { text: "Sekarang tolong bantuin masak!", img: "assets/cutscene8.PNG" }
    ];

    nextButton.addEventListener("click", function () {
        currentScene++;
        if (currentScene < scenes.length) {
            dialogueText.textContent = scenes[currentScene].text;
            sceneImg.src = scenes[currentScene].img;
        } else {
            window.location.href = "cooking.html"; // Move to cooking phase
        }
    });
});
