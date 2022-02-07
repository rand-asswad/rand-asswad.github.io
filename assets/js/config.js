// this script should be run last

// control desktop/mobile versions
const mobileMaxWidth = 800;

var mainNav = document.querySelector("nav");
function updateComponentsOnResize() {
    if (window.innerWidth < mobileMaxWidth) {
        mainNav.classList.add("mobile");
    } else {
        mainNav.classList.remove("mobile");
    }
}
window.addEventListener('resize', updateComponentsOnResize);
updateComponentsOnResize();
