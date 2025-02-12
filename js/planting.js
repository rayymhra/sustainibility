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
    const seedElement = event.target.closest(".seed"); // Ensure we get the parent div
    if (!seedElement) return;

    const seedType = seedElement.dataset.seed; // Get the seed type
    event.dataTransfer.setData("text/plain", seedType);

    console.log("Seed Dragged:", seedType); // Debugging log
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function plantSeed(event) {
    event.preventDefault();
    const seedType = event.dataTransfer.getData("text/plain");
    const targetType = event.target.dataset.target;

    console.log("Seed Dragged:", seedType);
    console.log("Target Spot:", targetType);

    if (seedType === targetType) {
        // Set background image
        event.target.style.backgroundImage = `url('assets/${seedType}_planted.png')`;
        event.target.style.backgroundSize = "cover";
        event.target.style.border = "none";

        // Append the planted crop image
        const plantedImg = document.createElement("img");
        plantedImg.src = `assets/${seedType}_planted.png`;
        plantedImg.alt = `${seedType} Planted`;
        plantedImg.classList.add("planted-crop");

        event.target.appendChild(plantedImg); // Add image inside the planting spot

        // Remove seed
        document.querySelector(`.seed[data-seed="${seedType}"]`).remove();
        alert(`${seedType} has been planted!`);
    } else {
        alert("Wrong spot! Try again.");
    }
}

});
