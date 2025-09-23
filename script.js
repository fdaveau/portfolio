window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(InertiaPlugin)

    let oldX = 0, 
        oldY = 0, 
        deltaX = 0,
        deltaY = 0
    
    const root = document.querySelector('.mwg_effect000')
    root.addEventListener("mousemove", (e) => {
        // Calculate horizontal movement since the last mouse position
        deltaX = e.clientX - oldX;

        // Calculate vertical movement since the last mouse position
        deltaY = e.clientY - oldY;

        // Update old coordinates with the current mouse position
        oldX = e.clientX;
        oldY = e.clientY;
    })

    root.querySelectorAll('.media').forEach(el => {

        // Add an event listener for when the mouse enters each media
        el.addEventListener('mouseenter', () => {
            
            const tl = gsap.timeline({ 
                onComplete: () => {
                    tl.kill()
                }
            })
            tl.timeScale(1.2) // Animation will play 20% faster than normal
            
            const image = el.querySelector('img')
            tl.to(image, {
               inertia: {
                    x: {
                        velocity: deltaX * 30, // Higher number = movement amplified
                        end: 0 // Go back to the initial position
                    },
                    y: {
                        velocity: deltaY * 30, // Higher number = movement amplified
                        end: 0 // Go back to the initial position
                    },
                },
            })
            tl.fromTo(image, {
                rotate: 0
            }, {
                duration: 0.4,
                rotate:(Math.random() - 0.5) * 30, // Returns a value between -15 & 15
                yoyo: true, 
                repeat: 1,
                ease: 'power1.inOut' // Will slow at the begin and the end
            }, '<') // The animation starts at the same time as the previous tween
        })
    })

})

// Ensure navbar toggle works
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Toggle Bootstrap classes
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            } else {
                navbarCollapse.classList.add('show');
            }
        });
        
        // Close menu when clicking on nav links (mobile UX improvement)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
});
