// this script should be run last

// control desktop/mobile versions
const navBreakPoint = 1000;

var mainNav = document.querySelector("nav");
function updateComponentsOnResize() {
    if (window.innerWidth < navBreakPoint) {
        mainNav.classList.add("mobile");
    } else {
        mainNav.classList.remove("mobile");
    }
}
window.addEventListener('resize', updateComponentsOnResize);
updateComponentsOnResize();
