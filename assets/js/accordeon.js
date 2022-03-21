/* Slide animation with Vanilla JS
 * sources:
 * - https://dev.to/bmsvieira/vanilla-js-slidedown-up-4dkn
 * - https://css-tricks.com/using-css-transitions-auto-dimensions/
 * 
 * the sliding element should have the following styles:
 *   height: auto;
 *   overflow: hidden;
 *   transition: height [duration] [transition-timing-function];
 */

let slideUp = (target) => {
    var height = target.scrollHeight;
    var transition = target.style.transition;
    target.style.transition = '';

    requestAnimationFrame(() => {
        target.style.height = height + 'px';
        target.style.transition = transition;

        requestAnimationFrame(() => {
            target.style.height = 0;
        })
    });
};

let slideDown = (target) => {
    var height = target.scrollHeight;
    target.style.height = height + 'px';
    //target.style.display = 'block'; // if it's set as none
    
    target.addEventListener('transitioned', (e) => {
        target.style.height = null;
    }, { once: true });
};

/* Activate accordeon items on click
 * works well with or without the animation 
 */
const accordeon = document.querySelectorAll(".accordeon");

for (let i = 0; i < accordeon.length; i++) {
    let items = accordeon[i].querySelectorAll(".accordeon-item");
    for (let j = 0; j < items.length; j++) {
        let element = items[j];

        // add event listeners
        element.onclick = (e) => {
            if (element.classList.contains("active")) {
                slideUp(element.querySelector(".accordeon-content"));
                element.classList.remove("active");
            } else {
                let active_accordeon = accordeon[i].querySelector(".accordeon-item.active");
                if (active_accordeon) {
                    slideUp(active_accordeon.querySelector(".accordeon-content"));
                    active_accordeon.classList.remove("active");
                }
                slideDown(element.querySelector(".accordeon-content"));
                element.classList.add("active");
            }
        };

        // start collapsed
        element.querySelector(".accordeon-content").style.height = 0;
    }
}