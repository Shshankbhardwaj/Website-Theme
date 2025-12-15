let currentStep = 1;
const totalSteps = 9;

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    showStep(currentStep);
    updateProgressBar();
});

function showStep(step) {
    const steps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Hide all steps
    steps.forEach(s => s.classList.remove('active'));
    
    // Show current step
    steps[step - 1].classList.add('active');
    
    // Update step indicator
    document.getElementById('currentStep').textContent = step;
    
    // Handle button visibility
    if (step === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    if (step === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
    
    updateProgressBar();
}

function changeStep(direction) {
    const steps = document.querySelectorAll('.form-step');
    const currentStepElement = steps[currentStep - 1];
    
    // Validate current step before moving forward
    if (direction === 1) {
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                
                // Add error message if not exists
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                    const error = document.createElement('span');
                    error.className = 'error-message';
                    error.style.color = '#ef4444';
                    error.style.fontSize = '0.875rem';
                    error.style.marginTop = '0.25rem';
                    error.textContent = 'This field is required';
                    input.parentNode.insertBefore(error, input.nextSibling);
                }
            } else {
                input.style.borderColor = '#e5e7eb';
                // Remove error message if exists
                if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                    input.nextElementSibling.remove();
                }
            }
        });
        
        if (!isValid) {
            return;
        }
    }
    
    // Change step
    currentStep += direction;
    
    if (currentStep > totalSteps) {
        currentStep = totalSteps;
    }
    if (currentStep < 1) {
        currentStep = 1;
    }
    
    showStep(currentStep);
}

function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Form submission
document.getElementById('multiStepForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted with data:', data);
    
    // Here you would typically send the data to your server
    // For now, show a success message
    alert('Thank you for applying! Our team will review your application and contact you within 24 hours.');
    
    // Optionally redirect to home page
    // window.location.href = 'index.html';
});

// Add input event listeners to remove error styling
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#e5e7eb';
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                    this.nextElementSibling.remove();
                }
            }
        });
    });
});
