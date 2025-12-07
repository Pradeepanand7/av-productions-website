document.addEventListener("DOMContentLoaded", function() {

    // --- PRELOADER ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // --- MOBILE MENU TOGGLE ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => {
            n.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

   // --- ANIMATED COUNTERS FIX ---
const counters = document.querySelectorAll('.counter');
const speed = 100; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            // Get the target number from the data-target attribute
            const target = +counter.getAttribute('data-target');
            // Get the current number displayed
            const count = +counter.innerText;
            
            // Calculate the step size (so they all finish at the same time)
            const inc = target / speed;

            // If current count is less than target, keep adding
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20); // Run this function again in 20ms
            } else {
                counter.innerText = target; // Ensure it ends exactly on the target
            }
        };
        updateCount();
    });
};

// This "Observer" waits for the user to scroll to the section
const counterSection = document.querySelector('.counters');
if (counterSection) {
    const observer = new IntersectionObserver((entries, observer) => {
        const [entry] = entries;
        // If the section is visible on screen...
        if (entry.isIntersecting) {
            animateCounters(); // ...start the animation
            observer.unobserve(counterSection); // ...and stop watching (so it runs only once)
        }
    }, {
        root: null,
        threshold: 0.4 // Trigger when 40% of the section is visible
    });

    observer.observe(counterSection);
}

    // --- LIVE EVENT SECTION LOGIC (UPDATED) ---
const liveContent = document.getElementById('live-content');

if (liveContent) {
    const eventConfig = {
        // --- 1. SET YOUR EVENT DETAILS HERE ---
        // If there is NO upcoming event, set eventDate to a past date (e.g., "2020-01-01")
        eventDate: "2025-09-27T17:00:00", 
        
        eventTitle: "EVENT COVERAGE",
        eventName: "BOOK LAUNCH EVENT",
        eventDescription: "Watch the celebration live from the venue.",
        previewImageUrl: "assets/live/thumbnails/live.jpg",
        liveStreamUrl: "https://www.youtube.com/embed/LXb3EKWsInQ", // YouTube Embed Link
        
        // --- 2. INSTAGRAM DETAILS (Shows when no event is active) ---
        // Paste the ID of your reel here (e.g. for instagram.com/reel/C_xyz123/, the ID is C_xyz123)
        instagramReelId: "DBS8uB4S_lK", 
        instagramProfileUrl: "https://www.instagram.com/avproductions"
    };

    // DOM Elements
    const liveNavlink = document.getElementById('live-nav-link');
    const heroLiveBtn = document.getElementById('hero-live-btn');
    const eventTitleEl = document.getElementById('live-event-title');
    
    // Views
    const countdownView = document.getElementById('countdown-view');
    const playerView = document.getElementById('player-view');
    const instagramView = document.getElementById('instagram-view'); // New View

    // Content Elements
    const livePlayer = document.getElementById('live-player');
    const instaPlayer = document.getElementById('insta-player');
    const instaRedirectBtn = document.getElementById('insta-redirect-btn');
    const livePreviewImage = document.getElementById('live-preview-image');
    const liveEventName = document.getElementById('live-event-name');
    const liveEventDescription = document.getElementById('live-event-description');
    
    // Timer Elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // --- SETUP INSTAGRAM VIEW ---
    // This constructs the embed URL for the reel
    const instaEmbedUrl = `https://www.instagram.com/p/${eventConfig.instagramReelId}/embed/captioned/?cr=1&v=14&wp=540`;
    instaPlayer.src = instaEmbedUrl;
    instaRedirectBtn.href = eventConfig.instagramProfileUrl;

    // --- LOGIC ---
    const targetDate = new Date(eventConfig.eventDate).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // "isLive" means we are within 4 hours AFTER the start time
        const isLive = distance <= 0 && distance > - (1000 * 60 * 60 * 4);
        const isUpcoming = distance > 0;

        if (isUpcoming) { 
            // --- SCENARIO 1: UPCOMING EVENT ---
            eventTitleEl.style.display = 'block';
            eventTitleEl.innerText = eventConfig.eventTitle;
            
            liveNavlink.style.display = 'list-item';
            liveNavlink.querySelector('a').innerHTML = '🕒 Upcoming Event';
            liveNavlink.querySelector('a').href = '#live-event';
            
            if(heroLiveBtn) {
                heroLiveBtn.style.display = 'inline-block';
                heroLiveBtn.innerHTML = '🕒 View Upcoming Event';
                heroLiveBtn.href = '#live-event';
            }

            // Show Countdown, Hide others
            countdownView.style.display = 'block';
            playerView.style.display = 'none';
            instagramView.style.display = 'none';

            // Populate Info
            liveEventName.innerText = eventConfig.eventName;
            liveEventDescription.innerText = eventConfig.eventDescription;
            livePreviewImage.src = eventConfig.previewImageUrl;

            // Timer Logic
            daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

        } else if (isLive) { 
            // --- SCENARIO 2: LIVE NOW ---
            eventTitleEl.style.display = 'block';
            
            liveNavlink.style.display = 'list-item';
            liveNavlink.querySelector('a').innerHTML = '🔴 Live Now';
            liveNavlink.querySelector('a').href = '#live-event';

            if(heroLiveBtn) {
                heroLiveBtn.style.display = 'inline-block';
                heroLiveBtn.innerHTML = '🔴 Watch Live!';
                heroLiveBtn.href = '#live-event';
            }

            // Show Player, Hide others
            countdownView.style.display = 'none';
            instagramView.style.display = 'none';
            playerView.style.display = 'block';

            if (livePlayer.src !== eventConfig.liveStreamUrl + "?autoplay=1") {
                livePlayer.setAttribute('src', eventConfig.liveStreamUrl + "?autoplay=1");
            }

        } else { 
            // --- SCENARIO 3: NO EVENT (DEFAULT) ---
            // This is where we show the Instagram Reel
            
            eventTitleEl.style.display = 'none'; // Hide the "EVENT COVERAGE" title
            
            // Update Nav Link to point to social media
            liveNavlink.style.display = 'list-item';
            liveNavlink.querySelector('a').innerHTML = '📷 Our Instagram';
            liveNavlink.querySelector('a').href = eventConfig.instagramProfileUrl;
            liveNavlink.querySelector('a').target = "_blank";

            // Hide the Hero Button (or point it to Insta)
            if(heroLiveBtn) {
                heroLiveBtn.style.display = 'none'; 
            }

            // Show Instagram, Hide others
            countdownView.style.display = 'none';
            playerView.style.display = 'none';
            instagramView.style.display = 'flex'; // Using flex to center content
            
            // Stop the timer since we don't need it
            clearInterval(interval);
        }
    }, 1000);
}

    // --- GALLERY FOLDER LOGIC (Restored) ---
    const gallerySection = document.querySelector('#gallery');
    if (gallerySection) {
        const folders = gallerySection.querySelectorAll('.folder');
        const photoGrids = gallerySection.querySelectorAll('.photo-grid');
        const folderView = gallerySection.querySelector('#folderView');
        const backToFoldersBtn = gallerySection.querySelector('#backToFoldersBtn');

        folders.forEach(folder => {
            folder.addEventListener('click', () => {
                const folderName = folder.getAttribute('data-folder');
                const gridToShow = gallerySection.querySelector(`#${folderName}-grid`);
                if (gridToShow) {
                    folderView.style.display = 'none';
                    backToFoldersBtn.style.display = 'block';
                    gridToShow.style.display = 'block';
                }
            });
        });

        backToFoldersBtn.addEventListener('click', () => {
            photoGrids.forEach(grid => {
                grid.style.display = 'none';
            });
            backToFoldersBtn.style.display = 'none';
            folderView.style.display = 'grid';
        });
    }

    // --- INFINITE CLIENT LOGO SCROLLER ---
const scroller = document.querySelector('.client-scroller');
if (scroller) {
    const scrollerList = scroller.querySelector('.clients-list');
    const scrollerItems = Array.from(scrollerList.children);

    // Duplicate the logos to create the seamless loop effect
    scrollerItems.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true);
        scrollerList.appendChild(duplicatedItem);
    });
}

    // --- VIDEO LIGHTBOX LOGIC ---
    const videoLightbox = document.querySelector('#videoLightbox');
    if (videoLightbox) {
        const videoItems = document.querySelectorAll('.gallery-item[data-type="video"]');
        const videoPlayer = videoLightbox.querySelector('#videoPlayer');
        const videoCloseButton = videoLightbox.querySelector('.video-close');
        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoSrc = item.getAttribute('data-video-src');
                videoPlayer.setAttribute('src', videoSrc + "?autoplay=1");
                videoLightbox.classList.add('active');
            });
        });
        const closeVideoLightbox = () => {
            videoLightbox.classList.remove('active');
            videoPlayer.setAttribute('src', '');
        };
        videoCloseButton.addEventListener('click', closeVideoLightbox);
        videoLightbox.addEventListener('click', (e) => {
            if (e.target === videoLightbox) closeVideoLightbox();
        });
    }

    // --- SERVICE MODAL LOGIC ---
    const serviceModal = document.querySelector('#serviceModal');
    if (serviceModal) {
        const serviceCardsWithModal = document.querySelectorAll('[data-modal-target="#serviceModal"]');
        const modalCloseButton = serviceModal.querySelector('.modal-close');
        serviceCardsWithModal.forEach(card => {
            card.addEventListener('click', () => {
                if (window.innerWidth <= 768) return;
                serviceModal.querySelector('#modalTitle').innerText = card.getAttribute('data-title');
                serviceModal.querySelector('#modalBody').innerHTML = card.getAttribute('data-content');
                serviceModal.classList.add('active');
            });
        });
        const closeModal = () => serviceModal.classList.remove('active');
        modalCloseButton.addEventListener('click', closeModal);
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) closeModal();
        });
    }



    // --- FOUNDERS SECTION TAP-TO-SHOW ON MOBILE ---
    const teamMembers = document.querySelectorAll('.team-member');
    if (teamMembers.length > 0) {
        teamMembers.forEach(member => {
            member.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    const wasActive = member.classList.contains('active');
                    teamMembers.forEach(m => m.classList.remove('active'));
                    if (!wasActive) member.classList.add('active');
                }
            });
        });
    }

    // --- TIMELINE SCROLL ANIMATION (Moved inside) ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // --- SMOOTH BACK TO TOP (Moved inside) ---
    const backToTopButton = document.querySelector('#backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

// --- CONTACT FORM SUBMISSION ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        // 1. Prevent the default form submission (which reloads the page)
        event.preventDefault();

        // 2. Gather the data from the form inputs
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());

        // 3. Send the data to your backend server
        fetch('https://av-productions-backend.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Show a success message to the user
            alert('Thank you! Your message has been sent.');
            contactForm.reset(); // Clear the form
        })
        .catch((error) => {
            console.error('Error:', error);
            // Show an error message to the user
            alert('Sorry, something went wrong. Please try again.');
        });
    });
}
