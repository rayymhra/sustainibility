document.addEventListener("DOMContentLoaded", function () {
    const pan = document.getElementById("pan");
    const ingredients = document.querySelectorAll(".ingredient");
    const timerDisplay = document.getElementById("time-left");
    const tempe = document.getElementById("tempe");

    let timeLeft = 10;
    let ingredientsAdded = 0;

    // Timer countdown
    const countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            clearInterval(countdown);
            endGame(false); // Lose if time runs out
        }
    }, 1000);

    // Dragging logic
    ingredients.forEach(ingredient => {
        ingredient.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("ingredientId", ingredient.id);
            setTimeout(() => {
                ingredient.style.visibility = "hidden"; // Hide temporarily while dragging
            }, 0);
        });

        ingredient.addEventListener("dragend", function () {
            ingredient.style.visibility = "visible"; // Reset visibility after dragging ends
        });
    });

    pan.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    pan.addEventListener("drop", function (event) {
        event.preventDefault();
        const ingredientId = event.dataTransfer.getData("ingredientId");
        const ingredient = document.getElementById(ingredientId);

        if (ingredient) {
            ingredient.parentNode.removeChild(ingredient); // Ensure it's fully removed
            ingredientsAdded++;

            if (ingredientsAdded === 4) {
                clearInterval(countdown);
                endGame(true); // Win when all ingredients are added
            }
        }
    });

    function endGame(won) {
        clearInterval(countdown); // Ensure the timer stops
    
        if (won) {
            window.location.href = "win.html"; // Redirect to win scene
        } else {
            tempe.src = "assets/burnt_tempe.png"; // Change to burnt tempe image
            console.log("Game Lost! Redirecting soon..."); // Debugging log
    
            setTimeout(() => {
                window.location.href = "lose.html"; // Redirect after 1 second
            }, 1000);
        }
    }
    
});
