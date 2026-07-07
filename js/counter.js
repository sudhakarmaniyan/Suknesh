// Counter Animation

document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute("data-target") || counter.innerText, 10);
        if (!target || counter.dataset.done === "true") return;

        counter.dataset.done = "true";
        let current = 0;
        const step = Math.max(1, Math.floor(target / 80));

        const update = () => {
            current += step;
            if (current >= target) {
                counter.innerText = target + "+";
                return;
            }
            counter.innerText = current + "+";
            requestAnimationFrame(update);
        };

        update();
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) animateCounter(entry.target);
            });
        }, { threshold: 0.4 });

        counters.forEach(counter => observer.observe(counter));
    } else {
        counters.forEach(animateCounter);
    }
});
