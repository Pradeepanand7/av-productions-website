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

    // --- UPDATED LIVE EVENT LOGIC (3 REELS VERSION) ---
const liveContent = document.getElementById('live-content');

if (liveContent) {
    const eventConfig = {
        // 1. SET EVENT DETAILS (Use past date to test Reel view)
        eventDate: "2020-01-01T17:00:00", 
        
        eventTitle: "EVENT COVERAGE",
        eventName: "BOOK LAUNCH EVENT",
        eventDescription: "Watch the celebration live.",
        previewImageUrl: "assets/live/thumbnails/live.jpg",
        liveStreamUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
        
        // --- 2. CONFIGURATION FOR 3 INSTAGRAM REELS ---
        // An array of objects, one for each reel card
        instaReels: [
            {
                // Reel 1 (Left)
                link: "https://www.instagram.com/reel/DPjbbIRj5lt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", // Replace with actual link
                thumb: "assets/live/thumbnails/reel-thumb-1.jpg"     // Utsav bts
            },
            {
                // Reel 2 (Center)
                link: "https://www.instagram.com/reel/DPR02s0k0Kn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", // Replace with actual link
                thumb: "assets/live/thumbnails/reel-thumb-2.jpg"      // Karthik reel
            },
            {
                // Reel 3 (Right)
                link: "https://www.instagram.com/reel/DNdoEtLImSJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",   // Replace with actual link
                thumb: "assets/live/thumbnails/reel-thumb-3.jpg"      // Poltical event
            }
        ]
    };

    // DOM Elements & Views
    const liveNavlink = document.getElementById('live-nav-link');
    const heroLiveBtn = document.getElementById('hero-live-btn');
    const eventTitleEl = document.getElementById('live-event-title');
    const countdownView = document.getElementById('countdown-view');
    const playerView = document.getElementById('player-view');
    // The container for the 3 reels
    const instagramView = document.getElementById('instagram-view'); 

    // Live Event Elements
    const livePlayer = document.getElementById('live-player');
    const livePreviewImage = document.getElementById('live-preview-image');
    const liveEventName = document.getElementById('live-event-name');
    const liveEventDescription = document.getElementById('live-event-description');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');


    // --- SETUP INSTAGRAM VIEW DATA (LOOPING) ---
    // We loop through the config array to populate the 3 cards
    if (instagramView && eventConfig.instaReels) {
        eventConfig.instaReels.forEach((reelData, index) => {
            // index is 0, 1, 2. Our HTML IDs use 1, 2, 3. So we add 1.
            const cardIdNum = index + 1; 
            const linkEl = document.getElementById(`reel-link-${cardIdNum}`);
            const thumbEl = document.getElementById(`reel-thumb-${cardIdNum}`);

            if (linkEl && thumbEl) {
                linkEl.href = reelData.link;
                thumbEl.src = reelData.thumb;
            }
        });
    }


    // --- TIMER LOGIC (UNCHANGED) ---
    const targetDate = new Date(eventConfig.eventDate).getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        const isLive = distance <= 0 && distance > - (1000 * 60 * 60 * 4);
        const isUpcoming = distance > 0;

        if (isUpcoming) { 
             // (Keep existing UPCOMING logic)
            eventTitleEl.style.display = 'block';
            eventTitleEl.innerText = eventConfig.eventTitle;
            liveNavlink.style.display = 'list-item';
            liveNavlink.querySelector('a').innerHTML = '🕒 Upcoming Event';
            liveNavlink.querySelector('a').href = '#live-event';
            if(heroLiveBtn) { heroLiveBtn.style.display = 'inline-block'; heroLiveBtn.innerHTML = '🕒 View Upcoming Event'; heroLiveBtn.href = '#live-event'; }
            countdownView.style.display = 'block';
            playerView.style.display = 'none';
            instagramView.style.display = 'none';
            liveEventName.innerText = eventConfig.eventName;
            liveEventDescription.innerText = eventConfig.eventDescription;
            livePreviewImage.src = eventConfig.previewImageUrl;
            daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

        } else if (isLive) { 
             // (Keep existing LIVE logic)
            eventTitleEl.style.display = 'block';
            liveNavlink.style.display = 'list-item';
            liveNavlink.querySelector('a').innerHTML = '🔴 Live Now';
            if(heroLiveBtn) { heroLiveBtn.style.display = 'inline-block'; heroLiveBtn.innerHTML = '🔴 Watch Live!'; heroLiveBtn.href = '#live-event'; }
            countdownView.style.display = 'none';
            instagramView.style.display = 'none';
            playerView.style.display = 'block';
            if (livePlayer.src !== eventConfig.liveStreamUrl + "?autoplay=1") {
                livePlayer.setAttribute('src', eventConfig.liveStreamUrl + "?autoplay=1");
            }

        } else { 
            // --- SCENARIO 3: NO EVENT (SHOW 3 REELS) ---
            eventTitleEl.style.display = 'none';
            
            // Update Nav Link (Generic Instagram Link)
            liveNavlink.style.display = 'list-item';
            liveNavlink.querySelector('a').innerHTML = '📷 Our Instagram';
            // You might want to change this to your main profile link instead of a specific reel
            liveNavlink.querySelector('a').href = "https://www.instagram.com/avproductions"; 
            liveNavlink.querySelector('a').target = "_blank";

            if(heroLiveBtn) heroLiveBtn.style.display = 'none'; 

            // Show the grid of 3 cards
            countdownView.style.display = 'none';
            playerView.style.display = 'none';
            instagramView.style.display = 'block'; 
            
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
