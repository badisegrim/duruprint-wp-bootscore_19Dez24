jQuery(document).ready(function ($) {
    function adjustCarouselHeight() {
        $('.carousel-item').each(function () {
            const imgHeight = $(this).find('.foreground-image').prop('naturalHeight') || 500; // Fallback-Wert
            $(this).css('height', imgHeight + 'px');
        });
    }

    // Höhe beim Laden und bei der Größenänderung des Fensters anpassen
    $(window).on('load resize', adjustCarouselHeight);
    $('.carousel').on('slid.bs.carousel', adjustCarouselHeight);
});
