// This is a placeholder for any JavaScript functionality you might want to add
window.addEventListener('load', function() {
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

    // Check if we're on the contact page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('Contact form found, initializing handler');
        contactForm.addEventListener('submit', handleContactSubmit);
        
        // Add a test listener to verify the form is being caught
        contactForm.addEventListener('submit', function(e) {
            console.log('Form submitted');
        });
    }

    // Check if we're on the main page with notify forms
    const notifyFormIOS = document.getElementById('notifyFormIOS');
    if (notifyFormIOS) {
        notifyFormIOS.addEventListener('submit', function(e) {
            handleFormSubmit(e, '1FAIpQLSd9XsWCdENYYMrF598lU0cyfjXOx-Rks1M1x9gXqj7atiR_EQ', 'entry.672705469', 'notifyEmailIOS', 'iOS');
        });
    }

    const notifyFormAndroid = document.getElementById('notifyFormAndroid');
    if (notifyFormAndroid) {
        notifyFormAndroid.addEventListener('submit', function(e) {
            handleFormSubmit(e, '1FAIpQLSeRrMEs0CC0DMZDalbdwfBiDApIqTw0vxuOSFH_EZAt1fQaqw', 'entry.672705469', 'notifyEmailAndroid', 'Android');
        });
    }

    // Move contact form handler to a separate function
    function handleContactSubmit(e) {
        console.log('Handle contact submit called');
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        console.log('Form values:', { name, email, message });
        
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        
        // Create hidden iframe
        const iframe = document.createElement('iframe');
        iframe.name = `hidden_iframe_${Date.now()}`;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Create form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://docs.google.com/forms/d/e/1FAIpQLScRvoytBbz49L0UuUm-Egtw_FIoqHSSSnw2OkC6cDnOMXdO7w/formResponse';
        form.target = iframe.name;
        form.style.display = 'none';
        
        // Add fields
        const nameField = document.createElement('input');
        nameField.name = 'entry.82358068';
        nameField.value = name;
        form.appendChild(nameField);
        
        const emailField = document.createElement('input');
        emailField.name = 'emailAddress';
        emailField.value = email;
        form.appendChild(emailField);
        
        const messageField = document.createElement('input');
        messageField.name = 'entry.89955378';
        
        messageField.value = message;
        form.appendChild(messageField);
        
        document.body.appendChild(form);
        form.submit();
        
        // Success handling
        setTimeout(() => {
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            button.classList.add('success');
            button.innerHTML = '<span class="success-icon">✓</span> Message Sent!';
            
            if (document.body.contains(form)) document.body.removeChild(form);
            if (document.body.contains(iframe)) document.body.removeChild(iframe);
            
            setTimeout(() => {
                button.classList.remove('success');
                button.innerHTML = originalText;
            }, 2000);
        }, 1000);
    }

    // Let's also add a direct test function
    function testAndroidSubmission() {
        const testEmail = 'test@example.com';
        const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSeRrMEs0CC0DMZDalbdwfBiDApIqTw0vxuOSFH_EZAt1fQaqw/formResponse?${entryId}=${testEmail}`;
        
        fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => {
            console.log('Test submission completed');
        })
        .catch(error => {
            console.error('Test submission error:', error);
        });
    }

    // Call this from browser console to test
    // testAndroidSubmission();

    function handleFormSubmit(e, formId, entryId, inputId, platform) {
        console.log('Handle form submit called for: ' + platform);
        console.log('Form ID:', formId);
        console.log('Entry ID:', entryId);
        console.log('Input ID:', inputId);
        
        e.preventDefault();
        
        const emailInput = document.getElementById(inputId);
        const email = emailInput.value;
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailInput.classList.add('error');
            return;
        }

        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Submitting...';

        // Create hidden iframe
        const iframe = document.createElement('iframe');
        iframe.name = `hidden_iframe_${Date.now()}`;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Create form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
        form.target = iframe.name;
        form.style.display = 'none';

        // Add email input
        const emailField = document.createElement('input');
        emailField.type = 'hidden';
        emailField.name = entryId;
        emailField.value = email;
        form.appendChild(emailField);

        document.body.appendChild(form);
        form.submit();

        // Success handling
        setTimeout(() => {
            emailInput.value = '';
            button.classList.add('success');
            button.innerHTML = '<span class="success-icon">✓</span> Thanks!';
            
            // Cleanup
            if (document.body.contains(form)) document.body.removeChild(form);
            if (document.body.contains(iframe)) document.body.removeChild(iframe);
            
            setTimeout(() => {
                button.classList.remove('success');
                button.innerHTML = originalText;
            }, 2000);
        }, 1000);
    }
}); 