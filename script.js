const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;
function drawMatrix() {
    // Increase this value to make the trails fade faster (more transparent)
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)"; // Changed from 0.05 to 0.15
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reduce the opacity of the green characters
    ctx.fillStyle = "rgba(0, 255, 0, 0.7)"; // Changed from #0f0 to semi-transparent
    ctx.font = fontSize + "px monospace";
    
    // Rest of the function remains the same
    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Scroll-triggered animations
const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
hiddenElements.forEach(el => observer.observe(el));

// Modal functionality
const openButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.modal-close');
openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.getElementById(btn.getAttribute('data-modal'));
        modal.style.display = 'flex';
    });
});
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.getElementById(btn.getAttribute('data-modal'));
        modal.style.display = 'none';
    });
});
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
document.getElementById("demoBtn1").addEventListener("click", function () {
    // The URL to copy
    const urlToCopy = "https://github.com/yonnn101/PyGuard-A_Simple_Python_Honeypot";

    // Create a temporary input element to copy the URL
    const tempInput = document.createElement("input");
    tempInput.value = urlToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");  // Copy the URL to clipboard
    document.body.removeChild(tempInput);

    // Show the success message
    const messageDiv = document.getElementById("message");
    messageDiv.style.display = "block";

    // Hide the message after 2 seconds
    setTimeout(function () {
        messageDiv.style.display = "none";
    }, 1000);
});
document.getElementById("demoBtn2").addEventListener("click", function () {
    // The URL to copy
    const urlToCopy = "https://projectsecurity.teachable.com/p/build-a-cybersecurity-homelab-a-practical-guide-to-offense-defense-enterprise-101";

    // Create a temporary input element to copy the URL
    const tempInput = document.createElement("input");
    tempInput.value = urlToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");  // Copy the URL to clipboard
    document.body.removeChild(tempInput);

    // Show the success message
    const messageDiv = document.getElementById("message2");
    messageDiv.style.display = "block";

    // Hide the message after 2 seconds
    setTimeout(function () {
        messageDiv.style.display = "none";
    }, 1000);
});
document.getElementById("demoBtn3").addEventListener("click", function () {
    // The URL to copy
    const urlToCopy = "https://github.com/yonnn101/MBE";

    // Create a temporary input element to copy the URL
    const tempInput = document.createElement("input");
    tempInput.value = urlToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");  // Copy the URL to clipboard
    document.body.removeChild(tempInput);

    // Show the success message
    const messageDiv = document.getElementById("message3");
    messageDiv.style.display = "block";

    // Hide the message after 2 seconds
    setTimeout(function () {
        messageDiv.style.display = "none";
    }, 1000);
});

// Download Resume functionality
document.getElementById("downloadResume").addEventListener("click", function(e) {
    e.preventDefault();
    
    const resumeUrl = "https://drive.google.com/file/d/1sqxTCT9irldRPYcsfC4xedgLX2SVFhBh/view?usp=sharing";
    
    // Create a temporary link to trigger the download
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Yonas_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
    // Don't prevent default - let it submit to the iframe
    const formResponse = document.getElementById('formResponse');
    formResponse.textContent = "Sending message...";
    formResponse.className = 'form-response success';
    
    // Reset form after submission
    setTimeout(() => {
        this.reset();
        formResponse.textContent = "Your message has been sent!";
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formResponse.style.display = 'none';
        }, 5000);
    }, 1000);
});
