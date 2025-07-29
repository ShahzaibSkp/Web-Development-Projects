// Select all links that start with '#'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Stop default jump/refresh

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// contact form submit
const form = document.getElementById("contact-form");
const responseDiv = document.getElementById("form-response");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default form redirect

    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Clear form fields
            form.reset();

            // Hide form and show thank you message
            form.style.display = "none";
            responseDiv.style.display = "block";
        } else {
            alert("Something went wrong. Please try again.");
        }
    }).catch(error => {
        alert("Failed to send. Please check your internet connection.");
        console.error("Error:", error);
    });
});