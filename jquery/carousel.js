const $track = $(".carousel__track") || null;
const $slides = Array.from($track.children()) || [];
const $nextButton = $(".carousel__button--right") || null;
const $prevButton = $(".carousel__button--left") || null;
const $dotsNav = $(".carousel__nav") || null;
const $dots = Array.from($dotsNav.children()) || [];
const slideWidth = $slides[0].getBoundingClientRect().width || null;


const makeButton = left => {
    if (left) {
        return `<div class="carousel__button carousel__button--left is-hidden">
        <i class="fas fa-arrow-left"></i>
     </div>`
    }
    else return (
    `<button class="carousel__button carousel__button--right">
        <i class="fas fa-arrow-right"></i>
    </button>`
    )
}

const makeCarouselWithNav = () => {
return (
`<div class="carousel__track-container">
    <ul class="carousel__track">
        <li class="carousel__slide current-slide">
        </li>
    </ul>
    </div>
<div class="carousel__nav">
    <button class="carousel__indicator current-slide"></button>
    <button class="carousel__indicator"></button>
    <button class="carousel__indicator"></button>
</div>
`)
};


for (let i = 0; i < $slides.length; i++) {
    if (!$slides[i]) continue;
    $($slides[i]).css("left", `${slideWidth * i}px`)
}


const moveToSlide = (track, curSlide, target) => {
    if(!track || !curSlide || !target) return;
    $(track).css("transform", `translateX(-${target.style.left})`);
    $(curSlide).removeClass("current-slide");
    $(target).addClass("current-slide");
}

const updateDots = (currentDot, targetDot) => {
    $(currentDot).removeClass("current-slide");
    $(targetDot).addClass("current-slide")
}

const hideShowArrows = (targetIndex, slides, prevButton, nextButton) => {
    if (targetIndex === 0) {
        $(prevButton).addClass("is-hidden");
        $(nextButton).removeClass("is-hideen");
    }
    else if (targetIndex === slides.length - 1) {
        $(prevButton).removeClass("is-hidden");
        $(nextButton).addClass("is-hidden");
    }
    else {
        $(prevButton).removeClass("is-hidden");
        $(nextButton).removeClass("is-hidden");
    }
}

$($prevButton).on("click", function (e) {
    const curSlide = $slides.find(slide => slide.classList.contains("current-slide"));
    const previousSlide = curSlide.previousElementSibling;
    const previousSlideIndex = $slides.findIndex(slide => slide === previousSlide);

    const currentDot = $dots.find(dot => dot.classList.contains("current-slide"));
    const targetDot = currentDot.previousElementSibling;

    moveToSlide($track, curSlide, previousSlide)
    updateDots(currentDot, targetDot)
    hideShowArrows(previousSlideIndex, $slides, $prevButton, $nextButton)
})

// when I click right, move slide to the right
$($nextButton).on("click", function (e) {
    const curSlide = $slides.find(slide => slide.classList.contains("current-slide"));
    const nextSlide = curSlide.nextElementSibling;
    const currentDot = $dots.find(dot => dot.classList.contains("current-slide"));
    const targetDot = currentDot.nextElementSibling;
    const nextIndex = $slides.findIndex(slide => slide === nextSlide);
    moveToSlide($track, curSlide, nextSlide);
    updateDots(currentDot, targetDot)
    hideShowArrows(nextIndex, $slides, $prevButton, $nextButton)
})


// when I click the nav indicators, move to that slide.
$($dotsNav).on("click", "button", function (e) {
    const targetDot = e.target;
    const currentSlide = $slides.find(slide => slide.classList.contains("current-slide"));
    const currentDot = $dots.find(dot => dot.classList.contains("current-slide"));

    const targetIndex = $dots.findIndex(dot => dot === targetDot);
    const targetSlide = $slides[targetIndex];

    moveToSlide($track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(targetIndex, $slides, $prevButton, $nextButton)
})