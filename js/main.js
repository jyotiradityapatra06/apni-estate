/**
 * Apni Estate — Modern SaaS Automation Core
 * High-performance, lightweight, responsive client-side interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. FLUID STICKY HEADER (Glassmorphism on Scroll)
    // ==========================================================================
    const navAxis = document.getElementById("main-nav");
    let isTicking = false;

    const updateHeader = () => {
        if (!navAxis) return;

        if (window.scrollY > 40) {
            navAxis.classList.add("scrolled");
        } else {
            navAxis.classList.remove("scrolled");
        }
        isTicking = false;
    };

    window.addEventListener("scroll", () => {
        if (!isTicking) {
            requestAnimationFrame(updateHeader);
            isTicking = true;
        }
    }, { passive: true });

    // ==========================================================================
    // 2. SCROLLSPY ACTIVE STATE NAVIGATION
    // ==========================================================================
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll("main, section[id]");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
        });
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");
                
                navItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${currentId}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "-20% 0px -40% 0px"
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ==========================================================================
    // 3. REVEAL SCENARIOS INTERSECTION OBSERVER
    // ==========================================================================
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.05, 
        rootMargin: "0px 0px -40px 0px" 
    });

    const revealSelectors = [
        ".feature-premium-card", 
        ".matrix-cell", 
        ".recognition-pill-glass", 
        ".timeline-step",
        ".comparison-block",
        ".metric-premium-box"
    ].join(", ");

    document.querySelectorAll(revealSelectors).forEach(card => {
        card.classList.add("reveal-scaffold");
        revealObserver.observe(card);
    });

    // Stagger layout delays cleanly
    document.querySelectorAll(".feature-premium-card").forEach((card, index) => {
        card.style.transitionDelay = `${(index % 3) * 80}ms`;
    });

    document.querySelectorAll(".matrix-cell").forEach((card, index) => {
        card.style.transitionDelay = `${(index % 3) * 60}ms`;
    });

    document.querySelectorAll(".timeline-step").forEach((card, index) => {
        card.style.transitionDelay = `${index * 80}ms`;
    });

    // ==========================================================================
    // 4. HIGH-POLISH FAQ ACCORDION TRANSITIONS
    // ==========================================================================
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const trigger = item.querySelector(".faq-trigger");
        const response = item.querySelector(".faq-response");

        if (trigger && response) {
            trigger.addEventListener("click", () => {
                const isActive = item.classList.contains("active-faq");

                faqItems.forEach(i => {
                    i.classList.remove("active-faq");
                    const resp = i.querySelector(".faq-response");
                    if (resp) resp.style.maxHeight = "0px";
                });

                if (!isActive) {
                    item.classList.add("active-faq");
                    response.style.maxHeight = response.scrollHeight + "px";
                }
            });
        }
    });

    // ==========================================================================
    // 5. RESPONSIVE MOBILE MENU CONTROLLER
    // ==========================================================================
    const menuTrigger = document.getElementById("mobile-menu-trigger");
    const linksMenu = document.getElementById("nav-links-menu");
    const mobileLinks = document.querySelectorAll(".nav-links-cluster .nav-item, .mobile-login-btn, .mobile-cta-btn");

    if (menuTrigger && linksMenu) {
        menuTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            menuTrigger.classList.toggle("open-icon");
            linksMenu.classList.toggle("open-menu");
            document.body.style.overflow = linksMenu.classList.contains("open-menu") ? "hidden" : "auto";
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuTrigger.classList.remove("open-icon");
                linksMenu.classList.remove("open-menu");
                document.body.style.overflow = "auto";
            });
        });

        document.addEventListener("click", (e) => {
            if (!linksMenu.contains(e.target) && !menuTrigger.contains(e.target)) {
                menuTrigger.classList.remove("open-icon");
                linksMenu.classList.remove("open-menu");
                document.body.style.overflow = "auto";
            }
        });
    }

    // ==========================================================================
    // 6. SCROLL PROGRESS INDICATOR
    // ==========================================================================
    const scrollBar = document.getElementById("scrollBar");
    
    if (scrollBar) {
        window.addEventListener("scroll", () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const percent = (scrollTop / scrollHeight) * 100;
            
            scrollBar.style.width = percent + "%";
        }, { passive: true });
    }

    // ==========================================================================
    // 7. MODAL INTERACTION CONTROLLER (Sign-In / Sign-Up Switcher)
    // ==========================================================================
    const authModal = document.getElementById("auth-modal");
    const loginTriggers = document.querySelectorAll(".login-link, .mobile-login-btn, #desktop-btn-login");
    const closeTrigger = document.getElementById("auth-modal-close");
    
    const signInPane = document.getElementById("sign-in-pane");
    const signUpPane = document.getElementById("sign-up-pane");
    const toSignUp = document.getElementById("trigger-to-signup");
    const toSignIn = document.getElementById("trigger-to-signin");

    loginTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            if (authModal) {
                authModal.classList.add("active-modal");
                document.body.style.overflow = "hidden";
            }
        });
    });

    if (closeTrigger && authModal) {
        closeTrigger.addEventListener("click", () => {
            authModal.classList.remove("active-modal");
            document.body.style.overflow = "auto";
        });

        authModal.addEventListener("click", (e) => {
            if (e.target === authModal) {
                authModal.classList.remove("active-modal");
                document.body.style.overflow = "auto";
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && authModal && authModal.classList.contains("active-modal")) {
            authModal.classList.remove("active-modal");
            document.body.style.overflow = "auto";
        }
    });

    if (toSignUp && toSignIn && signInPane && signUpPane) {
        toSignUp.addEventListener("click", (e) => {
            e.preventDefault();
            signInPane.classList.add("hidden-pane");
            signUpPane.classList.remove("hidden-pane");
        });

        toSignIn.addEventListener("click", (e) => {
            e.preventDefault();
            signUpPane.classList.add("hidden-pane");
            signInPane.classList.remove("hidden-pane");
        });
    }

    // Demo authentication configuration
    const demoFillTrigger = document.getElementById("demo-fill-trigger");
    const signInEmailInput = document.getElementById("sign-in-email");
    const signInPasswordInput = document.getElementById("sign-in-password");

    if (demoFillTrigger && signInEmailInput && signInPasswordInput) {
        demoFillTrigger.addEventListener("click", () => {
            signInEmailInput.value = "demo@apniestate.com";
            signInPasswordInput.value = "admin123";
            demoFillTrigger.style.borderColor = "var(--primary)";
            demoFillTrigger.style.backgroundColor = "rgba(38, 72, 231, 0.08)";
            setTimeout(() => {
                demoFillTrigger.style.borderColor = "";
                demoFillTrigger.style.backgroundColor = "";
            }, 600);
        });
    }
});
