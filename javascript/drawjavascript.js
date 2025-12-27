const swiper = new Swiper('.book-swiper', {
    slidesPerView: 1,
    speed: 700,
    grabCursor: true,

    effect: 'creative',
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

// 2️⃣ 翻頁後，同步輸入框（對應 turned）
swiper.on("slideChange", function () {
  $("#pageFld").val(swiper.realIndex + 1);
});

// 3️⃣ 輸入數字 → 跳頁
$("#pageFld").on("change", function () {
  let page = parseInt($(this).val(), 10);

  if (isNaN(page)) return;

  // 限制範圍（1 ~ 總頁數）
  page = Math.max(1, Math.min(page, swiper.slides.length));

  swiper.slideTo(page - 1);
});