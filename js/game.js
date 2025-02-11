document.addEventListener("DOMContentLoaded", function () {
    const basket = document.getElementById("basket");
    const plants = document.querySelectorAll(".plant");

    // Preload drag images
    const dragImages = {
        chili: new Image(),
        turmeric: new Image(),
        carrot: new Image()
    };

    dragImages.chili.src = "assets/bunch_of_chili.png";
    dragImages.turmeric.src = "assets/turmeric.png";
    dragImages.carrot.src = "assets/carrot.png";

    // Add drag event listeners to each plant
    plants.forEach((plant) => {
        plant.addEventListener("dragstart", dragStart);
    });

    basket.addEventListener("dragover", dragOver);
    basket.addEventListener("drop", drop);

    function dragStart(event) {
        const plant = event.target.closest(".plant");
        if (!plant) return;
    
        const plantType = plant.dataset.type;
        const plantState = plant.dataset.state;
        if (!plantType || !plantState) return;
    
        let dragImage = null;
    
        switch (plantType) {
            case "chili":
                if (plantState === "ready") {
                    dragImage = dragImages.chili;
                }
                break;
            case "turmeric":
                if (plantState === "ready") {
                    dragImage = dragImages.turmeric;
                }
                break;
            case "carrot":
                if (plantState === "ready") {
                    dragImage = dragImages.carrot;
                }
                break;
        }
    
        if (dragImage) {
            // Clone the image to resize it
            const smallDragImage = new Image();
            smallDragImage.src = dragImage.src;
            smallDragImage.style.width = "50px"; // Adjust the size here
            smallDragImage.style.height = "50px";
    
            // Append to body to ensure visibility during drag
            document.body.appendChild(smallDragImage);
    
            // Set custom drag image
            event.dataTransfer.setDragImage(smallDragImage, 15, 15);
    
            // Store plant data
            event.dataTransfer.setData("text/plain", JSON.stringify({ type: plantType, state: plantState }));
    
            // Remove after short delay to prevent clutter
            setTimeout(() => smallDragImage.remove(), 100);
        }
    }
    

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        if (!data) return;

        try {
            const { type: plantType, state: plantState } = JSON.parse(data);
            if (!plantType || !plantState) return;

            if (plantState === "ready") {
                const harvestedItem = document.createElement("img");
                harvestedItem.src = dragImages[plantType].src;
                harvestedItem.alt = `Harvested ${plantType}`;
                harvestedItem.style.width = "50px";
                harvestedItem.style.height = "50px";
                basket.appendChild(harvestedItem);

                if (plantType === "turmeric" || plantType === "carrot") {
                    const plant = document.querySelector(`.plant[data-type="${plantType}"]`);
                    if (plant) plant.remove();
                }

                if (plantType === "chili") {
                    const plant = document.querySelector(`.plant[data-type="chili"]`);
                    if (plant) {
                        plant.dataset.state = "bare";
                        plant.innerHTML = `<img src="assets/Cabai_gundul.png" alt="Bare chili plant">`;
                    }
                }

                alert(`You harvested a ${plantType}!`);
            }
        } catch (error) {
            console.error("Error parsing JSON data:", error);
        }
    }
});
