// Apply fade-out effect & redirection to navigation buttons
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function(event) {
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = event.target.getAttribute("onclick")?.split("'")[1];
        }, 500); // Wait for fade-out before changing page
    });
});

// Ensure the loading screen hides properly
window.addEventListener("load", function () {
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("hidden");
    }, 500);
});
