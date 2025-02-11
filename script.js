// This is a placeholder for any JavaScript functionality you might want to add
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded. You can add interactivity here.');

    const features = document.querySelectorAll('.fade-in');
    const ipads = document.querySelectorAll('.ipad-container');

    const options = {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add visible class to trigger animation
                observer.unobserve(entry.target); // Stop observing once the animation is triggered
            }
        });
    }, options);

    features.forEach(feature => {
        observer.observe(feature); // Observe each feature element
    });

    ipads.forEach(ipad => {
        observer.observe(ipad); // Observe each iPad element
    });

    // Observe the download section for animation
    const downloadSection = document.querySelector('.download-section');
    if (downloadSection) {
        observer.observe(downloadSection); // Observe the download section
    }

    // Set playback rate for videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.playbackRate = 1.75; // Set playback speed to 1.75x
    });

    gsap.registerPlugin(ScrollTrigger);

    // Remove hero section animation
    // gsap.from(".hero h1", {
    //     scrollTrigger: {
    //         trigger: ".hero",
    //         start: "top center",
    //         end: "bottom top",
    //         scrub: true,
    //     },
    //     y: -100,
    //     opacity: 0,
    //     duration: 1,
    // });

    // gsap.from(".hero p", {
    //     scrollTrigger: {
    //         trigger: ".hero",
    //         start: "top center",
    //         end: "bottom top",
    //         scrub: true,
    //     },
    //     y: 50,
    //     opacity: 0,
    //     duration: 1,
    // });

    // Animate the subtitle on scroll without vertical movement
    gsap.from(".hero p", {
        scrollTrigger: {
            trigger: ".hero p",
            start: "top 80%", // Start the animation when the top of the paragraph is 80% from the top of the viewport
            toggleActions: "play none none reverse", // Play on enter, reverse on leave
        },
        opacity: 0, // Start invisible
        duration: 0.5, // Animation duration
    });

    // Features section animation
    const featureContainers = document.querySelectorAll('.feature-container');

    featureContainers.forEach((feature) => {
        gsap.from(feature, {
            scrollTrigger: {
                trigger: feature,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
        });
    });

    // Change color of the hero text on scroll
    gsap.to(".hero h1", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "top 30%",
            scrub: true,
        },
        color: "white", // Change to white
    });

    gsap.to(".hero p", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "top 30%",
            scrub: true,
        },
        color: "white", // Change to white
    });

    // Prevent automatic scrolling on page load
    if (window.location.hash) {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 1);
    }

    // iOS Form Handler
    document.getElementById('notifyFormIOS').addEventListener('submit', function(e) {
        handleFormSubmit(e, '1FAIpQLSd9XsWCdENYYMrF598lU0cyfjXOx-Rks1M1x9gXqj7atiR_EQ', 'entry.672705469', 'notifyEmailIOS');
    });

    // Android Form Handler
    document.getElementById('notifyFormAndroid').addEventListener('submit', function(e) {
        handleFormSubmit(e, 'FAIpQLSeRrMEs0CC0DMZDalbdwfBiDApIqTw0vxuOSFH_EZAt1fQaqw', 'entry.672705469', 'notifyEmailAndroid');
    });

    function handleFormSubmit(e, formId, entryId, inputId) {
        e.preventDefault();
        
        // Debug logging
        console.log('Starting form submission for:', inputId);
        
        const emailInput = document.getElementById(inputId);
        const email = emailInput.value;
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailInput.classList.add('error');
            console.error('Invalid email format:', email);
            return;
        }

        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Submitting...';

        try {
            // Create hidden iframe with unique name
            const iframeName = `hidden_iframe_${Date.now()}`;
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.name = iframeName;
            document.body.appendChild(iframe);
            
            // Create actual form for submission
            const form = document.createElement('form');
            form.action = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
            form.method = 'POST';
            form.target = iframeName;
            
            // Add email input
            const hiddenInput = document.createElement('input');
            hiddenInput.name = entryId;
            hiddenInput.value = email;
            form.appendChild(hiddenInput);
            
            // Add to page and submit
            document.body.appendChild(form);
            console.log('Submitting to:', form.action);
            form.submit();

            // Show success and clean up
            setTimeout(() => {
                emailInput.value = '';
                button.classList.add('success');
                button.innerHTML = '<span class="success-icon">✓</span> Thanks!';
                // Clean up form and iframe
                if (document.body.contains(form)) document.body.removeChild(form);
                if (document.body.contains(iframe)) document.body.removeChild(iframe);
                setTimeout(() => {
                    button.classList.remove('success');
                    button.innerHTML = originalText;
                }, 2000);
            }, 1000);
        } catch (error) {
            console.error('Form submission error:', error);
            button.textContent = 'Error - Try Again';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    }
}); 