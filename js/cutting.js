document.addEventListener("DOMContentLoaded", function () {
  const carrot = document.getElementById("carrot");
  const cuttingBoard = document.getElementById("cutting-board");
  const knife = document.getElementById("knife");
  const transitionScreen = document.getElementById("transition-screen2");
  const cuttingDonePopup = document.getElementById("cutting-done-popup");
  const continueButton = document.getElementById("continue-button");

  let carrotPlaced = false;
  let cutCount = 0;
  const carrotImages = [
    "assets/whole_carrot.png",
    "assets/half_cut_carrot.png",
    "assets/sliced_carrot.png",
  ];

  // Enable dragging for the carrot
  carrot.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", "carrot");
  });

  // Allow cutting board to accept the carrot
  cuttingBoard.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  cuttingBoard.addEventListener("drop", function (event) {
    event.preventDefault();
    const draggedItem = event.dataTransfer.getData("text/plain");

    if (draggedItem === "carrot") {
      cuttingBoard.appendChild(carrot); // Move carrot to the board
      carrot.style.position = "absolute"; // Ensure absolute positioning inside board
      carrot.style.left = "300px"; // Adjust X position (Change as needed)
      carrot.style.top = "50px"; // Adjust Y position (Change as needed)
      carrot.style.cursor = "default";
      carrotPlaced = true;
      knife.classList.remove("disabled"); // Enable knife

      console.log("Carrot placed on board!");
    }
  });

  // Enable dragging for the knife
  knife.addEventListener("dragstart", function (event) {
    if (!carrotPlaced) {
      event.preventDefault();
      alert("Place the carrot on the cutting board first!");
      return;
    }
    event.dataTransfer.setData("text/plain", "knife");
  });

  // Allow cutting carrot
  carrot.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  carrot.addEventListener("drop", function (event) {
    event.preventDefault();
    const draggedItem = event.dataTransfer.getData("text/plain");

    if (draggedItem === "knife") {
      if (cutCount < 2) {
        cutCount++;
        carrot.querySelector("img").src = carrotImages[cutCount]; // Update carrot image
      }

      if (cutCount === 2) {
        setTimeout(() => {
          cuttingDonePopup.classList.remove("hidden"); // Show popup
        }, 500);
      }
    } else {
      alert("Use the knife to cut!");
    }
  });
  continueButton.addEventListener("click", function () {
    cuttingDonePopup.classList.add("hidden");
    transitionScreen.classList.remove("hidden"); // Show transition
    setTimeout(() => {
      window.location.href = "cutscene3.html"; // Move to next cutscene
    }, 2000);
  });
});
