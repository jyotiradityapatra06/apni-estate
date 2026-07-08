document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Drawer Control Sheet ---
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
    }

    // --- High-Polish FAQ Drawer Transitions ---
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

    // --- Portal Window Interaction Overlays ---
    const authModal = document.getElementById("auth-modal");
    const loginTriggers = document.querySelectorAll(".login-link, .mobile-login-btn, #desktop-btn-login");
    const closeTrigger = document.getElementById("auth-modal-close");

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
    }

    // --- Quick Access Autocomplete Demo Trigger ---
    const demoFillTrigger = document.getElementById("demo-fill-trigger");
    const signInEmailInput = document.getElementById("sign-in-email");
    const signInPasswordInput = document.getElementById("sign-in-password");

    if (demoFillTrigger && signInEmailInput && signInPasswordInput) {
        demoFillTrigger.addEventListener("click", () => {
            signInEmailInput.value = "demo@apniestate.com";
            signInPasswordInput.value = "admin123";
        });
    }
});
