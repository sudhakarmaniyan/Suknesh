// Suknesh Techcenter LLP - Main JS

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => loader.classList.add("hide"), 500);
    }

    // 3D Logo Spinner Setup
    const navLogo = document.querySelector('.navbar-brand img');
    if (navLogo && !navLogo.closest('.logo-spinner')) {
        const spinner = document.createElement('div');
        spinner.className = 'logo-spinner';
        
        const front = navLogo.cloneNode(true);
        front.className = 'logo-front';
        
        const back = navLogo.cloneNode(true);
        back.className = 'logo-back';
        
        spinner.appendChild(front);
        spinner.appendChild(back);
        
        navLogo.parentNode.replaceChild(spinner, navLogo);
    }

    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Dynamic Active Navbar Link
    let currentUrl = window.location.pathname.split("/").pop();
    if (currentUrl === "") currentUrl = "index.html";
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        if (link.getAttribute("href") === currentUrl) {
            link.classList.add("active");
        }
    });
});
