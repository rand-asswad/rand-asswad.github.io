
// activate first nav element
$(".home-nav li:first").addClass("active");

// activate scrollify plugin
$.scrollify({
    section : ".section",
    sectionName : "section-name",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: true,
    overflowScroll: true,
    updateHash: true,
    touchScroll:true,
    before:function(i, sections) {
        // change active li link
        var href = sections[i].attr("data-section-name");
        $(".home-nav li.active").removeClass("active");
        $(".home-nav li").find("a[href=\"#" + href + "\"]").parent().addClass("active");
    },
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
});

// activate nav links
$(".home-nav a").on("click", function() {
    $.scrollify.move($(this).attr("href"));
});