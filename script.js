"use strict";

// ========================================
// MOBILE NAVIGATION
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }
    });
}


// ========================================
// DYNAMIC FOOTER YEAR
// ========================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ========================================
// TYPING EFFECT
// ========================================

const typingText = document.getElementById("typingText");

const roles = [
    "AI & ML Enthusiast",
    "Software Developer",
    "Problem Solver",
    "Technology Explorer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    if (!typingText) {
        return;
    }

    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentRole.substring(
        0,
        characterIndex
    );

    let delay = deleting ? 35 : 70;

    if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1400;
    } else if (deleting && characterIndex === 0) {
        deleting = false;

        roleIndex = (roleIndex + 1) % roles.length;

        delay = 350;
    }

    window.setTimeout(typeRole, delay);
}

if (typingText) {
    window.setTimeout(typeRole, 1200);
}


// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}


// ========================================
// ACTIVE NAVIGATION SECTION
// ========================================

const sections = document.querySelectorAll(
    "main section[id]"
);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const sectionId = entry.target.id;

            navLinks?.querySelectorAll("a").forEach((link) => {
                const target = link.getAttribute("href");

                if (target === `#${sectionId}`) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    },
    {
        rootMargin: "-30% 0px -60% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


// ========================================
// CONSOLE MESSAGE
// ========================================

console.log(
    "%cWelcome to Mayuresh's Portfolio!",
    "color: #18583d; font-size: 16px; font-weight: bold;"
);

console.log(
    "Thanks for exploring. Feel free to connect through the contact section."
);
