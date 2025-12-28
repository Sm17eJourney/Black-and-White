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
let ignoreInput = false; // 新增鎖定 flag

// 統一跳頁函數
function slideToPage(index) {
    if (isSliding) return;
    isSliding = true;
    ignoreInput = true; // 避免 input 被觸發
    swiper.slideTo(index, 700, false);
    setTimeout(() => {
        isSliding = false;
        ignoreInput = false;
    }, 750);
}

// 同步 input 與 Swiper 當前頁
swiper.on("slideChange", function () {
    if (ignoreInput) return; // 防止 slideChange 觸發 input 再跳一次
    $("#pageFld").val(swiper.realIndex + 1);
});

// 按鈕事件
document.getElementById('firstBtn').onclick = () => slideToPage(0);
document.getElementById('lastBtn').onclick = () => slideToPage(swiper.slides.length - 1);
document.getElementById('prevBtn').onclick = () => swiper.slidePrev();
document.getElementById('nextBtn').onclick = () => swiper.slideNext();

// input 手動跳頁（改用 debounce 防止重複觸發）
let inputTimeout;
$("#pageFld").on("input", function () {
    if (ignoreInput || isSliding) return;

    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
        let page = parseInt($(this).val(), 10);
        if (isNaN(page)) return;

        page = Math.max(1, Math.min(page, swiper.slides.length));
        slideToPage(page - 1);
    }, 200); // 延遲 200ms 避免連續觸發
});

// 初始化 input 最大值與預設值
$("#pageFld").attr("max", swiper.slides.length);
$("#pageFld").val(swiper.realIndex + 1);