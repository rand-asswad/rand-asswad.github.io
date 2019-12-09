var fp = new fullpage('#fullpage', {
    menu: "#main-nav",
    sectionSelector: "section",

    afterLoad: (origin, destination, direction) => {
        //if (destination.index == 1) sketch.play();
        //if (origin.index == 1) sketch.pause();
    }
});

const mobileMaxWidth = 800;
if (window.innerWidth < mobileMaxWidth) {
    // stop fullpage scroll
    fp.setAutoScrolling(false);

    // hide desktop-only elements
    let desktopElements = document.querySelectorAll(".desktop");
    for (let i = 0; i < desktopElements.length; i++) {
        desktopElements[i].remove();//style.visibility = "hidden";
    }

    // show mobile-only elements
    let mobileElements = document.querySelectorAll(".mobile");
    for (let i = 0; i < mobileElements.length; i++) {
        mobileElements[i].style.visibility = "visible";
    }

    // add main nav shit
    let mainNav = document.querySelector("nav");
    mainNav.classList.add("mobile");

    // activate nav button
    let mobileNavBtn = document.querySelector("#nav-btn.mobile");
    mobileNavBtn.addEventListener("click", (e) => {
        if (mobileNavBtn.querySelector(".active")) { // is active
            mobileNavBtn.querySelector("#nav-stack").classList.remove("active");
            mainNav.classList.remove("active");
        } else { // is inactive
            mobileNavBtn.querySelector("#nav-stack").classList.add("active");
            mainNav.classList.add("active");
        }
    });

    // hide nav on button click
    let mobileNavLinks = mainNav.querySelectorAll("li a");
    for (let i = 0; i < mobileNavLinks.length; i++) {
        mobileNavLinks[i].addEventListener("click", (e) => {
            mobileNavBtn.querySelector("#nav-stack").classList.remove("active");
            mainNav.classList.remove("active");
        });
    }

    // hide fixed link icons
    document.querySelector("body ul#link-icons").remove();
} else {
    // show desktop-only elements
    let desktopElements = document.querySelectorAll(".desktop");
    for (let i = 0; i < desktopElements.length; i++) {
        desktopElements[i].style.visibility = "visible";
    }

    // hide mobile-only elements
    let mobileElements = document.querySelectorAll(".mobile");
    for (let i = 0; i < mobileElements.length; i++) {
        mobileElements[i].remove();
    }

    // hide nav link icons
    document.querySelector("nav ul#link-icons").remove();
}