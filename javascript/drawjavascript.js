const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);

let isSliding = false;
let inputTimeout;

const swiper = new Swiper('.book-swiper', {
    slidesPerView: 1,
    speed: 700,
    grabCursor: true,
    effect: isMobile ? 'slide' : 'creative',
    allowTouchMove: true, // 手指滑動
    creativeEffect: {
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

// 統一跳頁函數
function slideToPage(index) {
    if (isSliding) return;
    isSliding = true;
    swiper.slideTo(index, 700, false);
}

// Swiper 事件監聽，動畫結束解鎖
swiper.on('transitionEnd', () => {
    isSliding = false;
    $("#pageFld").val(swiper.realIndex + 1);
});

// 按鈕事件
document.getElementById('firstBtn').onclick = () => slideToPage(0);
document.getElementById('lastBtn').onclick = () => slideToPage(swiper.slides.length - 1);
document.getElementById('prevBtn').onclick = () => slideToPage(swiper.realIndex - 1);
document.getElementById('nextBtn').onclick = () => slideToPage(swiper.realIndex + 1);

// input 手動跳頁（debounce）
$("#pageFld").on("input", function () {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
        let page = parseInt($(this).val(), 10);
        if (isNaN(page)) return;
        page = Math.max(1, Math.min(page, swiper.slides.length));
        slideToPage(page - 1);
    }, 150); // 延遲 150ms
});

// 初始化 input 最大值與預設值
$("#pageFld").attr("max", swiper.slides.length);
$("#pageFld").val(swiper.realIndex + 1);
