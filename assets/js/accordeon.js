(function($){
    var contents = $('.accordeon-content');
    var titles = $('.accordeon-title');
    titles.on('click',function(){
        var title = $(this);
        contents.filter(':visible').slideUp(function() {
            $(this).prev('.accordeon-title').removeClass('active');
        });
    
        var content = title.next('.accordeon-content'); 
    
        if (!content.is(':visible')) {
            content.slideDown(function(){title.addClass('active')});
        }
    });
})(jQuery);