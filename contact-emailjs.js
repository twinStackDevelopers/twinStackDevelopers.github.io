// EmailJS Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize EmailJS
    emailjs.init('HeUnhX-RrHwDW0cpQ');
    
    // Get the form and response elements
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    const responseTitle = document.getElementById('responseTitle');
    const responseMessage = document.getElementById('responseMessage');
    
    // Function to show response message
    function showResponse(isSuccess, title, message) {
        if (!formResponse || !responseTitle || !responseMessage) return;
        
        // Set colors based on success/error
        if (isSuccess) {
            formResponse.style.backgroundColor = '#e8f5e9';
            formResponse.style.border = '2px solid #4CAF50';
            responseTitle.style.color = '#2e7d32';
            const icon = formResponse.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-check-circle';
                icon.style.color = '#4CAF50';
            }
        } else {
            formResponse.style.backgroundColor = '#ffebee';
            formResponse.style.border = '2px solid #f44336';
            responseTitle.style.color = '#c62828';
            const icon = formResponse.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-exclamation-circle';
                icon.style.color = '#f44336';
            }
        }
        
        // Set content
        responseTitle.textContent = title;
        responseMessage.textContent = message;
        formResponse.style.display = 'block';
        
        // Scroll to message
        setTimeout(() => {
            formResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
        
        // Hide after 8 seconds
        setTimeout(() => {
            formResponse.style.display = 'none';
        }, 8000);
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get submit button
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Collect form data
        const templateParams = {
            from_name: document.getElementById('fullName').value ,
            from_email: document.getElementById('email').value || 'Not provided',
            phone: document.getElementById('phone').value || 'Not provided',
            company: document.getElementById('company').value || 'Not provided',
            service: document.getElementById('service').value || 'Not specified',
            budget: document.getElementById('budget').value || 'Not specified',
            message: document.getElementById('projectDetails').value || 'No message',
            date: new Date().toLocaleString(),
            website: window.location.hostname || 'twinstackdevs.com'
        };
        
        // Send the email
        emailjs.send('service_8ktci84', 'template_zj4w1on', templateParams)
            .then(function(response) {
                showResponse(true, 'Success!', 'Message sent successfully! We\'ll reply within 24 hours.');
                contactForm.reset();
            })
            .catch(function(error) {
                showResponse(false, 'Error', 'Failed to send message. Please email us directly at twinstackdevelopers@gmail.com');
            })
            .finally(function() {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
    
    // Schedule button functionality
    const scheduleBtns = document.querySelectorAll('.schedule-btn');
    scheduleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Scroll to contact form
            document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' });
            
            // Show message
            showResponse(true, 'Schedule a Call', 'Please fill out the form above to schedule a call. We\'ll contact you to arrange a suitable time.');
        });
    });
});