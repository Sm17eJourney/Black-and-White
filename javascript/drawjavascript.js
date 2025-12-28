let swiper;
let isSliding = false;
let ignoreInput = false;

// 初始化 Swiper（只初始化一次）
function initSwiper() {
    if (swiper) return; // 已初始化就跳過

    const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    swiper = new Swiper('.book-swiper', {
        slidesPerView: 1,
        speed: 700,
        grabCursor: true,
        effect: isMobile ? 'slide' : 'creative',
        allowTouchMove: true,
        creativeEffect: {
            prev: { translate: ['-100%', 0, -300], rotate: [0, 0, -15], shadow: true },
            next: { translate: ['100%', 0, -300], rotate: [0, 0, 15], shadow: true },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 統一跳頁函數
    function slideToPage(index) {
        if (isSliding) return;
        isSliding = true;
        ignoreInput = true;
        swiper.slideTo(index, 700, false);
    }

    // Swiper 動畫結束解鎖
    swiper.on('transitionEnd', () => {
        isSliding = false;
        ignoreInput = false;
        $("#pageFld").val(swiper.realIndex + 1);
    });

    // 按鈕
    document.getElementById('firstBtn').onclick = () => slideToPage(0);
    document.getElementById('lastBtn').onclick = () => slideToPage(swiper.slides.length - 1);
    document.getElementById('prevBtn').onclick = () => slideToPage(swiper.realIndex - 1);
    document.getElementById('nextBtn').onclick = () => slideToPage(swiper.realIndex + 1);

    // input 手動跳頁
    let inputTimeout;
    $("#pageFld").on("input", function () {
        if (ignoreInput || isSliding) return;
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => {
            let page = parseInt($(this).val(), 10);
            if (isNaN(page)) return;
            page = Math.max(1, Math.min(page, swiper.slides.length));
            slideToPage(page - 1);
        }, 150);
    });

    // 初始化 input
    $("#pageFld").attr("max", swiper.slides.length);
    $("#pageFld").val(swiper.realIndex + 1);
}

// 初始化 Swiper
initSwiper();
