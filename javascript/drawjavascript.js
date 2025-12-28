const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);

const swiper = new Swiper('.book-swiper', {
    slidesPerView: 1,
    speed: 700,
    grabCursor: true,
    effect: isMobile ? 'slide' : 'creative',
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


let isSliding = false;

// 同步 input 與 Swiper 當前頁
swiper.on("slideChange", function () {
    $("#pageFld").val(swiper.realIndex + 1);
});

// 按鈕事件
document.getElementById('firstBtn').onclick = () => slideToPage(0);
document.getElementById('lastBtn').onclick = () => slideToPage(swiper.slides.length - 1);
document.getElementById('prevBtn').onclick = () => swiper.slidePrev();
document.getElementById('nextBtn').onclick = () => swiper.slideNext();

// input 手動跳頁
$("#pageFld").on("input", function () {
    if (isSliding) return;

    let page = parseInt($(this).val(), 10);
    if (isNaN(page)) return;

    page = Math.max(1, Math.min(page, swiper.slides.length));
    slideToPage(page - 1);
});

// 統一跳頁函數
function slideToPage(index) {
    if (isSliding) return;

    isSliding = true;
    swiper.slideTo(index, 700, false); // 動畫時間 700ms
    setTimeout(() => { isSliding = false; }, 750); // 解鎖，稍微大於動畫時間
}

// 初始化 input 最大值與預設值
$("#pageFld").attr("max", swiper.slides.length);
$("#pageFld").val(swiper.realIndex + 1);
