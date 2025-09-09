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

    // --- COUNTER ANIMATION ---
    const counterSection = document.querySelector('.about-section');
    if (counterSection) {
        let hasAnimated = false;
        const startCounters = () => {
            document.querySelectorAll('.counter').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let current = 0;
                const increment = target / 200;
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        };
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                startCounters();
                hasAnimated = true;
                observer.unobserve(counterSection);
            }
        }, { threshold: 0.3 });
        observer.observe(counterSection);
    }

    // --- LIVE EVENT SECTION LOGIC ---
    const liveContent = document.getElementById('live-content');
    if (liveContent) {
        const eventConfig = {
            eventTitle: "EVENT COVERAGE",
            eventName: "KIMS HOSPITAL EVENT",
            eventDescription: "Watch the celebration live from the venue. We are honored to be the official production partners for this Corporate event.",
            previewImageUrl: "assets/live/thumbnails/live.jpg",
            eventDate: "2025-09-10T10:00:00",
            liveStreamUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
            replayUrl: "https://www.youtube.com/embed/LXb3EKWsInQ"
        };

        const liveNavlink = document.getElementById('live-nav-link');
        const heroLiveBtn = document.getElementById('hero-live-btn');
        const eventTitleEl = document.getElementById('live-event-title');
        const countdownView = document.getElementById('countdown-view');
        const playerView = document.getElementById('player-view');
        const endedView = document.getElementById('ended-view');
        const livePlayer = document.getElementById('live-player');
        const livePreviewImage = document.getElementById('live-preview-image');
        const liveEventName = document.getElementById('live-event-name');
        const liveEventDescription = document.getElementById('live-event-description');
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        eventTitleEl.innerText = eventConfig.eventTitle;
        liveEventName.innerText = eventConfig.eventName;
        liveEventDescription.innerText = eventConfig.eventDescription;
        livePreviewImage.src = eventConfig.previewImageUrl;

        const targetDate = new Date(eventConfig.eventDate).getTime();
        
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            const isLive = distance <= 60000 && distance > - (1000 * 60 * 60 * 4);

            liveNavlink.style.display = 'list-item';
            heroLiveBtn.style.display = 'inline-block';
            
            if (distance > 60000) { // BEFORE
                liveNavlink.querySelector('a').innerHTML = '🕒 Upcoming Event';
                heroLiveBtn.innerHTML = '🕒 View Upcoming Event';
                heroLiveBtn.href = '#live-event';
                liveNavlink.querySelector('a').href = '#live-event';
                countdownView.style.display = 'block';
                playerView.style.display = 'none';
                endedView.style.display = 'none';
                daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            } else if (isLive) { // DURING
                liveNavlink.querySelector('a').innerHTML = '🔴 Live Now';
                heroLiveBtn.innerHTML = '🔴 Watch The Live Event Now!';
                heroLiveBtn.href = '#live-event';
                liveNavlink.querySelector('a').href = '#live-event';
                countdownView.style.display = 'none';
                playerView.style.display = 'block';
                endedView.style.display = 'none';
                if (livePlayer.src !== eventConfig.liveStreamUrl + "?autoplay=1") {
                    livePlayer.setAttribute('src', eventConfig.liveStreamUrl + "?autoplay=1");
                }
                clearInterval(interval);
            } else { // AFTER
                liveNavlink.querySelector('a').innerHTML = '🎬 Latest Event Coverage';
                heroLiveBtn.innerHTML = '🎬 Watch Our Latest Event!';
                heroLiveBtn.href = eventConfig.replayUrl;
                liveNavlink.querySelector('a').href = eventConfig.replayUrl;
                countdownView.style.display = 'none';
                playerView.style.display = 'none';
                endedView.style.display = 'block';
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
