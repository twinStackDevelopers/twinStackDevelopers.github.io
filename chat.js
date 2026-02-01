// Chat functionality for Twinstack Developers

document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const quickQuestions = document.querySelectorAll('.quick-question');

    // Chat responses
    const chatResponses = {
        'greeting': 'Hello! 👋 Welcome to Twinstack Developers. How can we help you today?',
        'website': 'We offer custom website development . Our websites are responsive, SEO-optimized, and fast-loading. Would you like to schedule a consultation?',
        'mobile app': 'We develop both native (iOS/Android) and cross-platform mobile apps . Tell us about your app idea and we\'ll provide a custom quote.',
        'pricing': 'Our pricing depends on project requirements. Websites start as low as  K800 for personal portifolio websites, mobile apps at K5,000. All prices are customizable based on features.',
        'timeline': 'Typical project timelines: Websites 2-4 weeks, Mobile Apps 6-12 weeks, E-commerce 4-8 weeks. We provide detailed timelines during our discovery phase.',
        'contact': 'You can reach us at twinstackdevelopers@gmail.com or call +260 973 018 429. We reply within 24 hours.',
        'process': 'Our process: 1) Discovery & Planning, 2) Design & Prototyping, 3) Development, 4) Testing & Launch. Each phase includes client collaboration.',
        'default': 'I\'m here to help! You can ask about our services, pricing, timeline, or contact information. What would you like to know?'
    };

    // Toggle chat widget
    if (chatButton && chatWidget) {
        chatButton.addEventListener('click', function() {
            chatWidget.classList.toggle('active');
        });

        chatClose.addEventListener('click', function() {
            chatWidget.classList.remove('active');
        });

        // Close chat when clicking outside
        document.addEventListener('click', function(event) {
            if (!chatWidget.contains(event.target) && !chatButton.contains(event.target)) {
                chatWidget.classList.remove('active');
            }
        });
    }

    // Send message function
    function sendUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-avatar">You</div>
            <div class="message-content">
                <p>${message}</p>
                <small>Just now</small>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Auto-reply after 1 second
        setTimeout(() => {
            autoReply(message.toLowerCase());
        }, 1000);
    }

    // Auto-reply function
    function autoReply(userMessage) {
        let response = chatResponses.default;
        
        // Check for keywords in user message
        if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
            response = chatResponses.greeting;
        } else if (userMessage.includes('website') || userMessage.includes('web')) {
            response = chatResponses.website;
        } else if (userMessage.includes('mobile') || userMessage.includes('app')) {
            response = chatResponses['mobile app'];
        } else if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('budget')) {
            response = chatResponses.pricing;
        } else if (userMessage.includes('time') || userMessage.includes('schedule') || userMessage.includes('duration')) {
            response = chatResponses.timeline;
        } else if (userMessage.includes('contact') || userMessage.includes('email') || userMessage.includes('phone')) {
            response = chatResponses.contact;
        } else if (userMessage.includes('process') || userMessage.includes('workflow') || userMessage.includes('step')) {
            response = chatResponses.process;
        }
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">TS</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Remove typing indicator and show response after delay
        setTimeout(() => {
            typingDiv.remove();
            
            const responseDiv = document.createElement('div');
            responseDiv.className = 'message';
            responseDiv.innerHTML = `
                <div class="message-avatar">TS</div>
                <div class="message-content">
                    <p>${response}</p>
                    <small>Just now</small>
                </div>
            `;
            chatMessages.appendChild(responseDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }

    // Send message on button click
    if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', function() {
            const message = chatInput.value.trim();
            if (message) {
                sendUserMessage(message);
                chatInput.value = '';
            }
        });

        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    sendUserMessage(message);
                    chatInput.value = '';
                }
            }
        });
    }

    // Quick question buttons
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.textContent;
            sendUserMessage(question);
        });
    });

    // Auto-open chat after 10 seconds on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        setTimeout(() => {
            if (!chatWidget.classList.contains('active')) {
                // Show notification
                const notification = document.createElement('div');
                notification.className = 'chat-notification';
                notification.innerHTML = `
                    <div class="notification-content">
                        <i class="fas fa-comment-dots"></i>
                        <div>
                            <strong>Need help?</strong>
                            <p>Chat with us about your project</p>
                        </div>
                        <button class="notification-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                document.body.appendChild(notification);
                
                // Close notification
                const closeBtn = notification.querySelector('.notification-close');
                closeBtn.addEventListener('click', function() {
                    notification.remove();
                });
                
                // Click notification to open chat
                notification.addEventListener('click', function(e) {
                    if (!e.target.closest('.notification-close')) {
                        chatWidget.classList.add('active');
                        notification.remove();
                    }
                });
                
                // Auto-remove notification after 10 seconds
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 10000);
            }
        }, 10000);
    }

});
