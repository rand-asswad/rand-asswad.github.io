// activate nav button
var mobileNavBtn = document.querySelector("#nav-btn.mobile");
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
//let mobileNavLinks = mainNav.querySelectorAll("li a");
var mobileNavLinks = document.querySelectorAll("nav li a");
for (let i = 0; i < mobileNavLinks.length; i++) {
    mobileNavLinks[i].addEventListener("click", (e) => {
        mobileNavBtn.querySelector("#nav-stack").classList.remove("active");
        mainNav.classList.remove("active");
    });
}