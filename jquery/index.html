const track = $(".carousel__track")
const slides = Array.from(track.children());
const nextButton = $(".carousel__button--right") || null;
const prevButton = $(".carousel__button--left") || null;
const slidesWidth = slides[0].getBoundingClientRect().width || null;
const dotNav = $(".carousel__nav");
const dots = Array.from(dotNav.children());

const makeButton = direction => {
    return `<button class="carousel__button carousel__button--${direction}"><i class="fas fa-arrow-left"></i></button>`
}

const makeCarouselSlides = (isCurrent) => {
    if (isCurrent) return `<li class="carousel__slide current-slide"></li>`
    return `<li class="carousel__slide"></li>`
}

const makeCards = (title, rating) => (
    `<div class="card">
        <h2>${title}</h2>
        <p>${rating}</p>
    </div>`
);

const makeRatings = numStars => {
    return `<span><i class="fas fa-star"></i></span>`.repeat(numStars)
}

const makeRemoveButton = () => {
    return `<button class="carousel__slide-card-remove">Remove</button>`
}
 
const makeCarouselIndicators = isCurrent => {
    let indicator;
    isCurrent
        ? indicator = `<button class="carousel__indicator current-slide"></button>`
        : indicator = `<button class="carousel__indicator"></button>`;
    return indicator;
}

const moveToSlide = (track, currentSlide, targetSlide) => {
    console.log(targetSlide.style.left)
    $(track).css("transform", `translateX(-${targetSlide.style.left})`);
    $(currentSlide).removeClass("current-slide");
    $(targetSlide).addClass("current-slide");
}

const updateDots = (currentDot, targetDot) => {
    $(currentDot).removeClass("current-slide");
    $(targetDot).addClass("current-slide");
}

const showAndHideArrows = (targetIndex, prevButton, nextButton) => {
    if (targetIndex === 0) {
        $(prevButton).addClass("hide")
        $(nextButton).removeClass("hide")
    }
    else if(targetIndex === 0 && !slides.length && !dots.length) {
        $(prevButton).addClass("hide");
        $(nextButton).addClass("hide");
    }
    else if (targetIndex === slides.length - 1) {
        $(prevButton).removeClass("hide");
        $(nextButton).addClass("hide");
    }
    else {
        $(prevButton).removeClass("hide");
        $(nextButton).removeClass("hide");
    }
}

const inputIsValid = (title, ratings) => {
    if(title.trim().length < 2 || !Number.isFinite(ratings) || ratings > 10 || ratings < 0) return false;
    return true;
}

$("form").on("submit", function(e) {
    e.preventDefault();
    const movieTitle = $(`input[type="text"]`).val();
    const ratings = +$(`input[type="number"]`).val();
    if(!inputIsValid(movieTitle, ratings)) {
        alert("Invalid inputs passed, check your data")
        throw new Error("Invalid movie title or ratings passed")
    }
    const newSlide = $(makeCarouselSlides());    
    const card = $(makeCards(movieTitle, ratings));
    const stars = $(makeRatings(ratings))
    const removeButton = $(makeRemoveButton());
    $(card).append($(stars)).append($(removeButton));

    const slideWithCard = $(newSlide).append(card);
    const dot = $(makeCarouselIndicators());

    $(".carousel__track").fadeIn(350, function() {
        $(this).append(slideWithCard)
    })
    $(".carousel__nav").fadeIn(350, function() {
        $(this).append(dot)
    })

    slides.push($(slideWithCard).get(0))
    dots.push($(dot).get(0));

    for (let i = 0; i < slides.length; i++) {
        $(slides[i]).css("left", `${slidesWidth * i}px`)
    }
    
    $(".carousel__button--right").removeClass("hide")
    $("input").val("")
    $(".carousel__slide-card-remove").fadeIn(350, function(e) {
        $(this).removeClass("hide")
    })
})

$(".carousel").on("click", "button.carousel__slide-card-remove", function(e) {
    if(!slides.length) return;
    const currentSlide = slides.find(slide => $(slide).hasClass("current-slide"));
    const previousSlide = $(currentSlide).prev().get(0);
    const previousSlideIndex = slides.findIndex(slide => slide === previousSlide);
    const currentDot = dots.find(dot => $(dot).hasClass("current-slide"));
    const prevDot = $(currentDot).prev().get(0);

    // Update the UI, first move to all the previous ones
    moveToSlide(track, currentSlide, previousSlide)
    updateDots(currentDot, prevDot);
    showAndHideArrows(previousSlideIndex, prevButton, nextButton)    

    // remove currentSlide
    $(currentSlide).remove();
    // remove the dot on the nav
    $(currentDot).remove();
})

$(prevButton).on("click", function (e) {
    const currentSlide = slides.find(slide => $(slide).hasClass("current-slide"));
    const previousSlide = $(currentSlide).prev().get(0)
    const previousSlideIndex = slides.findIndex(slide => slide === previousSlide);
    const currentDot = dots.find(dot => $(dot).hasClass("current-slide"));
    const targetDot = $(currentDot).prev().get(0);

    moveToSlide(track, currentSlide, previousSlide)
    updateDots(currentDot, targetDot)
    showAndHideArrows(previousSlideIndex, prevButton, nextButton);
})

$(nextButton).on("click", function (e) {
    const currentSlide = slides.find(slide => $(slide).hasClass("current-slide"));    
    const nextSlide = $(currentSlide).next().get(0);
    console.log("nextSlide's far apart by: ", $(nextSlide).css("left"))

    const targetIndex = slides.findIndex(slide => slide === nextSlide);
    const currentDot = dots.find(dot => $(dot).hasClass("current-slide"));
    const targetDot = $(currentDot).next().get(0);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, targetDot);
    showAndHideArrows(targetIndex, prevButton, nextButton);
});

$(dotNav).on("click", "button", function (e) {
    const targetDot = e.target;
    const currentSlide = slides.find(slide => $(slide).hasClass("current-slide"));
    console.log("current-slide :", currentSlide);

    const currentDot = dots.find(dot => $(dot).hasClass("current-slide"));
    console.log("current-dot", currentDot);

    const targetIndex = dots.findIndex(dot => dot === targetDot);
    console.log("target index is ", targetIndex);

    const targetSlide = slides[targetIndex];
    console.log("targetSlide is ", targetSlide);

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    showAndHideArrows(targetIndex, prevButton, nextButton);
})
