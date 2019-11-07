
new fullpage('#fullpage', {
    menu: "#main-nav",
    sectionSelector: "section",

    afterLoad: (origin, destination, direction) => {
        //if (destination.index == 1) sketch.play();
        //if (origin.index == 1) sketch.pause();
    }
});