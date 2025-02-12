document.addEventListener("DOMContentLoaded", function () {
  const seeds = document.querySelectorAll(".seed");
  const plantingSpots = document.querySelectorAll(".planting-spot");
  const wateringCan = document.querySelector(".watering-can");

  let plantedSeeds = 0; // Count of planted seeds
  let wateredSpots = {}; // Track watered spots

  // Attach event listeners for seeds
  seeds.forEach((seed) => {
    seed.addEventListener("dragstart", seedDragStart);
  });

  // Attach event listeners for planting spots (ONLY for planting)
  plantingSpots.forEach((spot) => {
    spot.addEventListener("dragover", dragOver);
    spot.addEventListener("drop", plantSeed);
  });

  // Attach event listener for watering can
  wateringCan.addEventListener("dragstart", wateringCanDragStart);

  // Attach event listeners for watering (AFTER planting)
  plantingSpots.forEach((spot) => {
    spot.addEventListener("dragover", dragOver);
    spot.addEventListener("drop", waterPlant);
  });

  // Function to handle dragging seeds
  function seedDragStart(event) {
    const seedElement = event.target.closest(".seed");
    if (!seedElement) return;

    const seedType = seedElement.dataset.seed;
    event.dataTransfer.setData("text/plain", seedType);
  }

  // Function to allow dragover
  function dragOver(event) {
    event.preventDefault();
  }

  // Function to plant a seed
  function plantSeed(event) {
    event.preventDefault();

    const draggedItem = event.dataTransfer.getData("text/plain");
    const targetType = event.target.dataset.target;

    if (draggedItem === "watering-can") return; // Prevent watering logic here

    if (draggedItem === targetType) {
      event.target.style.backgroundImage = `url('assets/${targetType}_planted.png')`;
      event.target.style.backgroundSize = "cover";
      event.target.style.border = "none";

      // Add planted crop image
      const plantedImg = document.createElement("img");
      plantedImg.src = `assets/${targetType}_planted.png`;
      plantedImg.alt = `${targetType} Planted`;
      plantedImg.classList.add("planted-crop");

      event.target.appendChild(plantedImg);
      event.target.dataset.planted = "true"; // Mark as planted

      document.querySelector(`.seed[data-seed="${targetType}"]`).remove();

      plantedSeeds++;

      if (plantedSeeds === 2) {
        alert("All seeds are planted! Now, water them with the watering can.");
      }
    } else {
      alert("Wrong spot! Try again.");
    }
  }

  // Function to handle dragging the watering can
  function wateringCanDragStart(event) {
    if (plantedSeeds < 2) {
      event.preventDefault();
      alert("Plant both seeds first!");
      return;
    }

    event.dataTransfer.setData("text/plain", "watering-can");
  }

  function startTransition() {
    const transitionScreen = document.createElement("div");
    transitionScreen.id = "transition-screen";
    transitionScreen.innerText = "Loading...";
    document.body.appendChild(transitionScreen);

    setTimeout(() => {
        window.location.href = "cutscene2.html";
    }, 2000);
}

  // Function to water the plant
  function waterPlant(event) {
    event.preventDefault();
    const draggedItem = event.dataTransfer.getData("text/plain");

    if (draggedItem !== "watering-can") return; // Only allow watering can

    const plantingSpot = event.target.closest(".planting-spot");

    if (!plantingSpot) return;

    const spotType = plantingSpot.dataset.target; // Get the correct plant type

    if (!spotType) {
      alert("Error: Undefined plant type.");
      return;
    }

    if (!wateredSpots[spotType]) {
      const plantedImg = plantingSpot.querySelector(".planted-crop");

      if (plantedImg) {
        plantedImg.src = `assets/${spotType}_watered.png`;
      }

      wateredSpots[spotType] = true;

      alert(`${spotType} has been watered!`);

      if (Object.keys(wateredSpots).length === 2) {
        setTimeout(startTransition, 1500);
      }
    } else {
      alert("This spot is already watered!");
    }
  }
});
