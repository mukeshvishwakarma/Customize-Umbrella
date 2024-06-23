document.addEventListener("DOMContentLoaded", () => {
    const umbrellaImage = document.getElementById("umbrella-image");
    const logoImage = document.getElementById("logo-image");
    const logoUpload = document.getElementById("logo-upload");
    const colorSwatches = document.querySelectorAll(".color-swatch");
    const uploadButton = document.querySelector(".upload-button");
    const spinnerIcon = document.getElementById("spinner-icon");
    const spinnerCircle = document.querySelector("#spinner-svg path");
    const fileInfo = document.getElementById("file-info");
    const fileNameSpan = document.getElementById("file-name");
    const cancelUploadButton = document.getElementById("cancel-upload");
    const uploadText = document.getElementById("upload-text");
    const messageDiv = document.getElementById('message');

    // Define color map for button background colors
    const colorMap = {
        pink: "rgb(253, 94, 120)",
        blue: "rgb(76, 156, 255)",
        yellow: "rgb(235, 209, 15)",
    };

    // Function to convert RGB to RGBA with transparency
    const addTransparency = (color, alpha) => {
        const [r, g, b] = color.match(/\d+/g).map(Number);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Show spinner function with color parameter
    const showSpinner = (color) => {
        spinnerIcon.style.display = "flex";
        spinnerCircle.style.stroke = color; // Change spinner SVG color
        umbrellaImage.style.opacity = "0"; // Hide umbrella image
        logoImage.style.opacity = "0"; 
    };

    // Hide spinner function
    const hideSpinner = () => {
        spinnerIcon.style.display = "none";
        umbrellaImage.style.opacity = "1"; // Show umbrella image
        logoImage.style.opacity = "1"; 
    };

    // Handle color change
    colorSwatches.forEach((swatch) => {
        swatch.addEventListener("click", () => {
            const color = swatch.getAttribute("data-color");
            showSpinner(colorMap[color]);
            setTimeout(() => {
                umbrellaImage.src = `assets/umbrella-${color}.png`;
                hideSpinner();
            }, 1000);

            // Change the upload button background color
            uploadButton.style.backgroundColor = colorMap[color];

            // Change the page background color to a lighter shade
            const lightColor = addTransparency(colorMap[color], 0.10); // Adjust the transparency for lighter color
            document.body.style.backgroundColor = lightColor;
        });
    });

    // Handle logo upload
    logoUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file) {
            const validExtensions = ['image/png', 'image/jpeg'];
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes

            if (!validExtensions.includes(file.type)) {
                messageDiv.textContent = 'Invalid file type. Only .png and .jpg files are allowed.';
                return;
            } else if (file.size > maxSize) {
                messageDiv.textContent = 'File is too large. Maximum size is 5MB.';
                return;
            } else {
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

                // Display file info and the cancel button
                fileNameSpan.textContent = file.name;
                fileInfo.style.display = "flex";
                messageDiv.textContent = ''; // Clear any previous messages
                uploadText.style.display = "none";
            }
        }
    });

    // Handle cancel upload
    cancelUploadButton.addEventListener("click", () => {
         // Reset file input
        logoUpload.value = '';

        // Reset image display
        logoImage.src = '';
        logoImage.style.display = "none";

        // Hide file info and show upload text
        fileInfo.style.display = "none";
        uploadText.style.display = "block"; 
    });
});
