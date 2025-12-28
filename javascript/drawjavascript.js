
document.addEventListener('DOMContentLoaded', () => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const swiper = new Swiper('.book-swiper', {
        slidesPerView: 1,
        speed: 700,
        grabCursor: true,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        

        effect: isTouchDevice ? 'slide' : 'creative',
        creativeEffect: isTouchDevice ? undefined : {
            prev: {
                translate: ['-100%', 0, -300],
                rotate: [0, 0, -15],
                shadow: true,
            },
            next: {
                translate: ['100%', 0, -300],
                rotate: [0, 0, 15],
                shadow: true,
            },
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    function setSwiperHeight() {
        if (isTouchDevice) {
            const swiperEl = document.querySelector('.book-swiper');
            if (swiperEl) swiperEl.style.height = window.innerHeight + 'px';
        }
    }
    
    window.addEventListener('resize', setSwiperHeight);
    window.addEventListener('orientationchange', setSwiperHeight);
    setSwiperHeight();
    document.getElementById('firstBtn').onclick = () => {
        swiper.slideTo(0);
    };

    

    document.getElementById('lastBtn').onclick = () => {
        swiper.slideTo(swiper.slides.length - 1);
    };

    document.getElementById('prevBtn').onclick = () => {
        swiper.slidePrev();
    };

    document.getElementById('nextBtn').onclick = () => {
        swiper.slideNext();
    };


    $("#pageFld").val(swiper.realIndex + 1);
    $("#pageFld").attr("max", swiper.slides.length);

    swiper.on("slideChange", function () {
    $("#pageFld").val(swiper.realIndex + 1);
    });


    $("#pageFld").on("change", function () {
    let page = parseInt($(this).val(), 10);

    if (isNaN(page)) return;

    page = Math.max(1, Math.min(page, swiper.slides.length));

    swiper.slideTo(page - 1);
    });

});
