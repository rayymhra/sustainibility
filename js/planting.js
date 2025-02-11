document.addEventListener("DOMContentLoaded", function () {
    const seeds = document.querySelectorAll(".seed");
    const plantingSpots = document.querySelectorAll(".planting-spot");

    seeds.forEach((seed) => {
        seed.addEventListener("dragstart", seedDragStart);
    });

    plantingSpots.forEach((spot) => {
        spot.addEventListener("dragover", dragOver);
        spot.addEventListener("drop", plantSeed);
    });

    function seedDragStart(event) {
        const seedType = event.target.dataset.seed;
        event.dataTransfer.setData("text/plain", seedType);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function plantSeed(event) {
        event.preventDefault();
        const seedType = event.dataTransfer.getData("text/plain");
        const targetType = event.target.dataset.target;

        if (seedType === targetType) {
            event.target.style.backgroundImage = `url('assets/${seedType}_planted.png')`;
            event.target.style.backgroundSize = "cover";
            event.target.style.border = "none";
            document.querySelector(`.seed[data-seed="${seedType}"]`).remove();
            alert(`${seedType} has been planted!`);
        } else {
            alert("Wrong spot! Try again.");
        }
    }
});
