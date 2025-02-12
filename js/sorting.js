document.addEventListener("DOMContentLoaded", function () {
    const wastes = document.querySelectorAll(".waste");
    const bins = document.querySelectorAll(".bin");
    const feedbackPopup = document.getElementById("feedback-popup");
    const finalFeedback = document.getElementById("final-feedback");
    const continueBtn = document.getElementById("continue-btn");

    let score = 100; // Start with 100 points
    let totalItems = wastes.length;
    let sortedItems = 0;

    wastes.forEach((waste) => {
        waste.addEventListener("dragstart", dragStart);
    });

    bins.forEach((bin) => {
        bin.addEventListener("dragover", allowDrop);
        bin.addEventListener("drop", dropWaste);
    });

    function dragStart(event) {
        const wasteElement = event.target.closest(".waste");
        if (!wasteElement) return;
        
        const wasteType = wasteElement.dataset.type;
        event.dataTransfer.setData("text/plain", wasteType);
        event.dataTransfer.setData("id", wasteElement.dataset.type);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function dropWaste(event) {
        event.preventDefault();
        const wasteType = event.dataTransfer.getData("text/plain");
        const targetType = event.target.closest(".bin").dataset.type;

        const draggedWaste = document.querySelector(`[data-type='${wasteType}']`);

        if (wasteType === targetType) {
            sortedItems++;

            // Make the waste disappear
            draggedWaste.style.opacity = "0"; // Fade out
            setTimeout(() => {
                draggedWaste.remove(); // Remove from DOM
            }, 300);

        } else {
            alert("Oops! Wrong bin. -5 points.");
            score -= 5;
        }

        checkSorting();
    }

    function checkSorting() {
        if (sortedItems === totalItems) {
            let feedbackText = "";

            if (score >= 90) {
                feedbackText = "🌟 Eco-Warrior! You sorted everything perfectly!";
            } else if (score >= 70) {
                feedbackText = "🌿 Nice job! You are learning to be more eco-friendly.";
            } else if (score >= 50) {
                feedbackText = "⚠️ You can do better! Try again next time.";
            } else {
                feedbackText = "🚮 Oh no! You need to learn more about waste sorting.";
            }

            finalFeedback.textContent = feedbackText;
            feedbackPopup.classList.remove("hidden");

            continueBtn.addEventListener("click", () => {
                feedbackPopup.classList.add("hidden");
                window.location.href = "cutting.html"; // Move to next phase
            });
        }
    }
});
