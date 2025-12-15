let currentStep = 1;
const totalSteps = 9;

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    showStep(currentStep);
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

// Form submission
document.getElementById('multiStepForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Disable submit button
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        // Send data to API
        const response = await fetch('/api/submit-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Show success message
            alert('Thank you for applying! Our team will review your application and contact you within 24 hours.');
            
            // Reset form
            this.reset();
            currentStep = 1;
            showStep(currentStep);
        } else {
            throw new Error(result.error || 'Submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your application. Please try again or contact us directly.');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
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
