document.addEventListener("DOMContentLoaded", function () {
    const basket = document.getElementById("basket");
    const plants = document.querySelectorAll(".plant");
    const popup = document.getElementById("harvest-popup");
    const nextPhaseBtn = document.getElementById("next-phase-btn");
    const transitionScreen = document.getElementById("transition-screen");
    
    let harvestedCount = 0; // Track harvested items
    const dragImages = {}; // Store preloaded images

    // Preload images and store them
    function preloadImage(src) {
        const img = new Image();
        img.src = src;
        dragImages[src] = img;
    }

    preloadImage("assets/bunch_of_chili.png");
    preloadImage("assets/Cabai_gundul.png");
    preloadImage("assets/turmeric.png");
    preloadImage("assets/carrot.png");
    preloadImage("assets/Carrot_cabut.png");
    preloadImage("assets/kunyit_cabut.png");

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

        let dragImageSrc = "";
        switch (plantType) {
            case "chili":
                dragImageSrc = plantState === "ready" 
                    ? "assets/bunch_of_chili.png" 
                    : "assets/Cabai_gundul.png";
                break;
            case "turmeric":
                dragImageSrc = "assets/kunyit_cabut.png";
                break;
            case "carrot":
                dragImageSrc = "assets/Carrot_cabut.png";
                break;
        }

        if (dragImageSrc) {
            const img = new Image();
            img.src = dragImageSrc;
            img.width = 100; // Set your desired width
            img.height = 100; // Set your desired height
            document.body.appendChild(img); // Append temporarily
            event.dataTransfer.setDragImage(img, 50, 50);
            setTimeout(() => document.body.removeChild(img), 0); // Remove after setting
        }

        event.dataTransfer.setData("text/plain", JSON.stringify({ type: plantType, state: plantState }));
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
                harvestedItem.src = `assets/${plantType}.png`;
                harvestedItem.alt = `Harvested ${plantType}`;
                harvestedItem.style.width = "80px";
                harvestedItem.style.height = "80px";
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

                harvestedCount++;

                if (harvestedCount === 3) {
                    setTimeout(() => {
                        popup.classList.remove("hidden");
                    }, 500);
                }
            }
        } catch (error) {
            console.error("Error parsing JSON data:", error);
        }
    }

    nextPhaseBtn.addEventListener("click", function () {
        popup.classList.add("hidden");
        transitionScreen.classList.remove("hidden");

        setTimeout(() => {
            window.location.href = "planting.html"; // Redirect after transition
        }, 2000);
    });
});
