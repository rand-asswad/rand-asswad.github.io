const links = document.querySelectorAll("#main-nav a");
const sections = document.querySelectorAll("#main section");

// update active nav links on scroll
// source: https://javascript.tutorialink.com/add-class-active-on-scroll-vanilla-js/
const scrollOffsetTop = 50;
function changeLinkState() {
  let index = sections.length;

  while (--index && window.scrollY + scrollOffsetTop < sections[index].offsetTop) {}

  links.forEach((link) => link.classList.remove('active'));

  // add the active class if within visible height of the element
  if (scrollY - sections[index].offsetHeight < sections[index].offsetTop) {
    links[index].classList.add('active');
  }
}

changeLinkState();
window.addEventListener('scroll', changeLinkState);

/*
// scroll snap own implementation
function getCurrentSection() {
  for (let i=0; i<sections.length-1; i++)
    if (window.scrollY + 50 > sections[i].offsetTop
       && window.scrollY < sections[i+1].offsetTop)
      return i;
  return sections.length - 1;
}

var lastScrollY = window.pageYOffset;
function getNextSection(current) {
  var next;
  if (window.pageYOffset > lastScrollY) {
    //console.log("Scrolling downwards");
    next = current < sections.length - 1 ? current + 1 : current;
  } else {
    //console.log("Scrolling upwards");
    next = current > 0 ? current - 1 : 0;
  }
  return next;
}

// source: https://www.codeguage.com/courses/js/events-scroll-event
const scrollSnapTimeout = 500; //ms
var scrolling = false;
var next = null;
setInterval(function() {
  if (scrolling) {
    var current = getCurrentSection();
    if (next === null) {
      next = getNextSection(current);
      sections[next].scrollIntoView({behavior:"smooth"});
    } else if (next == current) {
      next = null;
    }
    scrolling = false;
  }
}, scrollSnapTimeout);

window.onscroll = function(e) {
  scrolling = true;
}
*/