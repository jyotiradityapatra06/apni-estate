/**
 * Apni Estate — Dynamic Automation Core
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Fluid Sticky Header Padding Controller
    const navAxis = document.querySelector(".nav-axis");
    const navWrapper = document.querySelector(".nav-wrapper");

    if (navAxis && navWrapper) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                navWrapper.style.padding = "6px 40px";
                navAxis.style.background = "rgba(255, 255, 255, 0.95)";
                navAxis.style.boxShadow = "0 16px 40px rgba(15, 23, 42, 0.04)";
            } else {
                navWrapper.style.padding = "0 40px";
                navAxis.style.background = "rgba(255, 255, 255, 0.75)";
                navAxis.style.boxShadow = "none";
            }
        }, { passive: true });
    }

    // 2. High-Performance Fluid Counter Engine
    const numericNodes = document.querySelectorAll(".metric-numerical");
    const easeOutQuad = (t) => t * (2 - t);

    const accelerateCounters = (node) => {
        const capValue = parseInt(node.getAttribute("data-metric-cap"), 10);
        if (isNaN(capValue)) return;

        const duration = 2000;
        let startTime = null;

        const counterEngine = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const runtime = currentTime - startTime;
            let progress = Math.min(runtime / duration, 1);
            
            const easedProgress = easeOutQuad(progress);
            const currentVal = easedProgress * capValue;

            if (progress < 1) {
                if (capValue === 5) {
                    node.textContent = (currentVal).toFixed(1);
                } else {
                    node.textContent = Math.floor(currentVal).toLocaleString() + (capValue === 98 ? "%" : "+");
                }
                requestAnimationFrame(counterEngine);
            } else {
                if (capValue === 5) {
                    node.textContent = "4.9"; // Design spec parity
                } else {
                    node.textContent = capValue.toLocaleString() + (capValue === 98 ? "%" : "+");
                }
            }
        };
        
        requestAnimationFrame(counterEngine);
    };

    // 3. Native Intersection Observers (Hardware-Accelerated Animation Trigger)
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
        threshold: 0.1, 
        rootMargin: "0px 0px -40px 0px" 
    });

    numericNodes.forEach(node => globalObserver.observe(node));

    const animationSelectors = [
        ".matrix-cell",
        ".feature-premium-card",
        ".manifesto-card-block",
        ".value-strip",
        ".hero-textuality",
        ".recognition-pill-glass",
        ".cta-monolithic-panel",
        ".architectural-footer"
    ].join(", ");

    document.querySelectorAll(animationSelectors).forEach(card => {
        card.classList.add("reveal-scaffold");
        globalObserver.observe(card);
    });
});
