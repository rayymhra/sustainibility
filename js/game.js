document.addEventListener("DOMContentLoaded", function() {
    let harvested = 0;
    const totalPlants = 4;
    
    document.querySelectorAll(".plant").forEach(plant => {
        plant.addEventListener("click", function() {
            this.style.opacity = "0.3"; // Dim the harvested plant
            this.style.pointerEvents = "none"; // Disable clicking again
            harvested++;

            if (harvested === totalPlants) {
                document.getElementById("status").innerText = "All harvested! Let's cook!";
                document.getElementById("next-btn").style.display = "block";
            }
        });
    });
});

function goToCooking() {
    window.location.href = "minigame.html";
}
