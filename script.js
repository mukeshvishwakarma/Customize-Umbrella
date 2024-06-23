document.addEventListener("DOMContentLoaded", () => {
    const umbrellaImage = document.getElementById("umbrella-image");
    const logoImage = document.getElementById("logo-image");
    const logoUpload = document.getElementById("logo-upload");
    const colorSwatches = document.querySelectorAll(".color-swatch");
    const uploadButton = document.querySelector(".upload-button");
    const spinnerIcon = document.getElementById("spinner-icon");
    const spinnerCircle = document.querySelector("#spinner-svg circle");

    // Define color map for button background colors
    const colorMap = {
        pink: "rgb(253, 94, 120)",
        blue: "rgb(76, 156, 255)",
        yellow: "rgb(235, 209, 15)",
    };

    // Show spinner function with color parameter
    const showSpinner = (color) => {
        spinnerIcon.style.display = "flex";
        spinnerCircle.style.stroke = color; // Change spinner SVG color
    };

    // Hide spinner function
    const hideSpinner = () => {
        spinnerIcon.style.display = "none";
    };

    // Handle color change
    colorSwatches.forEach((swatch) => {
        swatch.addEventListener("click", () => {
            const color = swatch.getAttribute("data-color");
            umbrellaImage.src = ""; // Remove previous image
            showSpinner(colorMap[color]);
            setTimeout(() => {
                umbrellaImage.src = `assets/umbrella-${color}.png`;
                hideSpinner();
            }, 1000);

            // Change the upload button background color
            uploadButton.style.backgroundColor = colorMap[color];
        });
    });

    // Handle logo upload
    logoUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                logoImage.src = ""; // Remove previous logo
                showSpinner(uploadButton.style.backgroundColor); // Use current button color
                setTimeout(() => {
                    logoImage.src = e.target.result;
                    logoImage.style.display = "block";
                    hideSpinner();
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
    });
});
