/**
 * Apni Estate — Dynamic Automation Core (Polished & Pure JavaScript)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. FLUID STICKY HEADER (Optimized with requestAnimationFrame)
    // ==========================================================================
    const navAxis = document.querySelector(".nav-axis");
    const navWrapper = document.querySelector(".nav-wrapper");
    let isTicking = false;

    const updateHeader = () => {
        if (!navAxis) return;

        if (window.scrollY > 40) {
            navAxis.classList.add("scrolled");
            navAxis.style.background = "rgba(255, 255, 255, 0.95)";
            navAxis.style.boxShadow = "0 10px 30px rgba(15, 23, 42, 0.05)";
        } else {
            navAxis.classList.remove("scrolled");
            navAxis.style.background = "rgba(255, 255, 255, 0.8)";
            navAxis.style.boxShadow = "none";
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
    // 2. SCROLLSPY & CLICK NAVIGATION ACTIVE STATE
    // ==========================================================================
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll("main, section[id]");

    // Click Handler for Instant Feedback
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
        });
    });

    // Intersection Observer for Automatic Scroll Tracking
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
    // 3. HIGH-PERFORMANCE FLUID COUNTER ENGINE
    // ==========================================================================
    const numericNodes = document.querySelectorAll(".metric-numerical");
    const easeOutQuad = (t) => t * (2 - t);

    const accelerateCounters = (node) => {
        const capValueStr = node.getAttribute("data-metric-cap");
        if (!capValueStr) return;
        const capValue = parseInt(capValueStr, 10);
        if (isNaN(capValue)) return;

        const duration = 2000;
        let startTime = null;

        const counterEngine = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const runtime = currentTime - startTime;
            const progress = Math.min(runtime / duration, 1);
            
            const easedProgress = easeOutQuad(progress);
            const currentVal = easedProgress * capValue;

            if (progress < 1) {
                if (capValue === 5) {
                    node.textContent = currentVal.toFixed(1);
                } else {
                    node.textContent = Math.round(currentVal).toLocaleString() + (capValue === 98 ? "%" : "+");
                }
                requestAnimationFrame(counterEngine);
            } else {
                if (capValue === 5) {
                    node.textContent = "4.9";
                } else {
                    node.textContent = capValue.toLocaleString() + (capValue === 98 ? "%" : "+");
                }
            }
        };
        
        requestAnimationFrame(counterEngine);
    };

    // ==========================================================================
    // 4. NATIVE INTERSECTION OBSERVERS & STAGGER ANIMATIONS
    // ==========================================================================
    const globalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains("metric-numerical")) {
                    accelerateCounters(target);
                } else {
                    target.classList.add("revealed");
                }
                
                observer.unobserve(target);
            }
        });
    }, { 
        threshold: 0.05, 
        rootMargin: "0px 0px -30px 0px" 
    });

    numericNodes.forEach(node => globalObserver.observe(node));

    const animationSelectors = [
        ".matrix-cell", 
        ".feature-premium-card", 
        ".manifesto-element", 
        ".hero-textuality", 
        ".recognition-pill-glass"
    ].join(", ");

    document.querySelectorAll(animationSelectors).forEach(card => {
        card.classList.add("reveal-scaffold");
        globalObserver.observe(card);
    });

    // Stagger Transition Delays for grid layouts
    document.querySelectorAll(".feature-premium-card").forEach((card, index) => {
        card.style.transitionDelay = `${index * 80}ms`;
    });

    document.querySelectorAll(".matrix-cell").forEach((card, index) => {
        card.style.transitionDelay = `${index * 60}ms`;
    });

    // ==========================================================================
    // 5. MODAL INTERACTION CONTROLLER
    // ==========================================================================
    const authModal = document.getElementById("auth-modal");
    const loginTriggers = document.querySelectorAll(".login-link");
    const closeTrigger = document.getElementById("auth-modal-close");
    
    const signInPane = document.getElementById("sign-in-pane");
    const signUpPane = document.getElementById("sign-up-pane");
    const toSignUp = document.getElementById("trigger-to-signup");
    const toSignIn = document.getElementById("trigger-to-signin");

    // Open Modal
    loginTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            if (authModal) {
                authModal.classList.add("active-modal");
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Close Modal
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

    // Global Escape Key Listener for Modals
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && authModal && authModal.classList.contains("active-modal")) {
            authModal.classList.remove("active-modal");
            document.body.style.overflow = "auto";
        }
    });

    // Sign-In <=> Sign-Up Switcher
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

    // ==========================================================================
    // 6. RESPONSIVE MOBILE MENU CONTROLLER
    // ==========================================================================
    const menuTrigger = document.getElementById("mobile-menu-trigger");
    const linksMenu = document.getElementById("nav-links-menu");
    const mobileLinks = document.querySelectorAll(".nav-links-cluster .nav-item, .mobile-login-btn, .mobile-cta-btn");

    if (menuTrigger && linksMenu) {
        menuTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            menuTrigger.classList.toggle("open-icon");
            linksMenu.classList.toggle("open-menu");
            
            // Toggle body overflow based on menu state
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
    // 7. HIGH-PERFORMANCE SCROLL PROGRESS BAR
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
    // 8. HERO DASHBOARD PARALLAX EFFECT
    // ==========================================================================
    const heroDashboard = document.querySelector(".hero-dashboard-mockup");
    
    if (heroDashboard) {
        window.addEventListener("scroll", () => {
            const depth = window.scrollY * 0.05;
            heroDashboard.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(${depth}px)`;
        }, { passive: true });
    }
});
