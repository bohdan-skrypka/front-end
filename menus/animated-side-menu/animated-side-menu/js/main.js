$(function() {
    
    var navBtn = $('.nav-btn');
    function toggleNav() {
        navBtn.toggleClass('open');
        $('nav').toggleClass('open');
        $('.container').toggleClass('open');
    }
    navBtn.click(function() {
        toggleNav();
    })
    $('nav ul li a').click(function(e) {
        toggleNav();
    })
    
})