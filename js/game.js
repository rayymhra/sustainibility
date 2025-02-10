document.addEventListener("DOMContentLoaded", function () {
    const basket = document.getElementById("basket");
    const plants = document.querySelectorAll(".plant");

    // Add drag event listeners to each plant
    plants.forEach((plant) => {
        plant.addEventListener("dragstart", dragStart);
    });

    // Add drop event listener to the basket
    basket.addEventListener("dragover", dragOver);
    basket.addEventListener("drop", drop);

    function dragStart(event) {
        // Store the type of plant being dragged
        event.dataTransfer.setData("text/plain", event.target.dataset.type);
    }

    function dragOver(event) {
        event.preventDefault(); // Allow dropping
    }

    function drop(event) {
        event.preventDefault();
        const plantType = event.dataTransfer.getData("text/plain");

        // Create a harvested item and add it to the basket
        const harvestedItem = document.createElement("div");
        harvestedItem.classList.add("harvested-item", plantType);
        basket.appendChild(harvestedItem);

        // Remove the plant from the garden
        const plant = document.querySelector(`.plant[data-type="${plantType}"]`);
        if (plant) {
            plant.remove();
        }

        // Notify the player
        alert(`You harvested a ${plantType}!`);
    }
});