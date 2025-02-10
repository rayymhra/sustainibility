document.addEventListener("DOMContentLoaded", function() {
    let stepsCompleted = 0;
    const totalSteps = 3;
    let cookingTimer; // Timer for frying step
    let isCooking = false;

    document.querySelectorAll(".ingredient").forEach(item => {
        item.addEventListener("click", function() {
            this.style.opacity = "0.5"; // Mark as used
            stepsCompleted++;

            if (stepsCompleted === totalSteps) {
                document.getElementById("cooking-status").innerText = "Masukkan bahan ke penggorengan!";
                isCooking = true;

                // Start frying timer
                cookingTimer = setTimeout(function() {
                    if (isCooking) {
                        window.location.href = "lose.html"; // Food burns if too slow
                    }
                }, 5000); // 5 seconds before it burns
            }
        });
    });

    document.getElementById("pan").addEventListener("click", function() {
        if (isCooking) {
            clearTimeout(cookingTimer); // Stop burning timer
            document.getElementById("cooking-status").innerText = "Masakan selesai!";
            document.getElementById("finish-btn").style.display = "block";
        }
    });
});

function finishGame() {
    window.location.href = "win.html"; // If successful, go to win screen
}
