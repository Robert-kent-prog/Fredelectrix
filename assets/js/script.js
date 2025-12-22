// FredElectrix - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Validate form
      if (validateForm(formData)) {
        // In production, this would be an AJAX call to your backend
        showAlert(
          "success",
          "Thank you for your message! We will contact you soon."
        );
        contactForm.reset();
      }
    });
  }

  // Quote Form Submission
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const quoteData = {
        service: document.getElementById("serviceType").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        name: document.getElementById("quoteName").value,
        email: document.getElementById("quoteEmail").value,
        phone: document.getElementById("quotePhone").value,
      };

      if (validateQuoteForm(quoteData)) {
        showAlert(
          "success",
          "Quote request submitted successfully! We will get back to you within 24 hours."
        );
        quoteForm.reset();
      }
    });
  }

  // Newsletter Subscription
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;

      if (validateEmail(email)) {
        showAlert("success", "Thank you for subscribing to our newsletter!");
        newsletterForm.reset();
      } else {
        showAlert("error", "Please enter a valid email address.");
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Counter animation
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }
});

// Form Validation Functions
function validateForm(data) {
  if (!data.name || data.name.trim().length < 2) {
    showAlert("error", "Please enter your name.");
    return false;
  }

  if (!validateEmail(data.email)) {
    showAlert("error", "Please enter a valid email address.");
    return false;
  }

  if (!data.subject || data.subject === "") {
    showAlert("error", "Please select a subject.");
    return false;
  }

  if (!data.message || data.message.trim().length < 10) {
    showAlert("error", "Please enter a message with at least 10 characters.");
    return false;
  }

  return true;
}

function validateQuoteForm(data) {
  if (!data.service || data.service === "") {
    showAlert("error", "Please select a service type.");
    return false;
  }

  if (!data.location || data.location.trim().length < 3) {
    showAlert("error", "Please enter your location.");
    return false;
  }

  if (!data.name || data.name.trim().length < 2) {
    showAlert("error", "Please enter your name.");
    return false;
  }

  if (!validateEmail(data.email)) {
    showAlert("error", "Please enter a valid email address.");
    return false;
  }

  if (!data.phone || data.phone.trim().length < 10) {
    showAlert("error", "Please enter a valid phone number.");
    return false;
  }

  return true;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Alert System
function showAlert(type, message) {
  // Remove existing alerts
  const existingAlert = document.querySelector(".custom-alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alert = document.createElement("div");
  alert.className = `custom-alert alert alert-${type} alert-dismissible fade show`;
  alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  // Style the alert
  alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

  // Add to document
  document.body.appendChild(alert);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentNode) {
      alert.remove();
    }
  }, 5000);
}

// Add CSS for custom alert
const style = document.createElement("style");
style.textContent = `
    .custom-alert {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Products Filter System (for products page)
function filterProducts(category) {
  const products = document.querySelectorAll(".product-item");

  products.forEach((product) => {
    if (category === "all" || product.dataset.category === category) {
      product.style.display = "block";
      setTimeout(() => {
        product.style.opacity = "1";
        product.style.transform = "scale(1)";
      }, 50);
    } else {
      product.style.opacity = "0";
      product.style.transform = "scale(0.8)";
      setTimeout(() => {
        product.style.display = "none";
      }, 300);
    }
  });

  // Update active filter button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
}
