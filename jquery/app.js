const state = { movies: [] }
const $carousel = $(".carousel");

const makeCards = (title, ratings) => {
    return (`
        <div class="caoursel__image">
            <h2>${title}</h2>
            <h3>${ratings}</h3>
        </div>`
)};

// form submission
$(`form`).on("submit", function (e) {
    e.preventDefault();
    const title = $("input").eq(0).val();
    const ratings = $("input").eq(1).val();
    const copied = [...state.movies, { title, ratings }];
    if(title.length === 0 || ratings.length === 0) alert(new Error("Invalid inputs passed"))
    
    if(!$slides.length) {        
        const leftButton = makeButton(left);
        const carouselTrack = makeCarouselTrack();
         // the card is here (carouselTrack's child element)
        const rightButton = makeButton();
        const carouselNav = makeCarouselNav();
        const dot = makeCarouselDot();
        

        $($carousel)
        .append($(leftButton))
        .append($(carouselTrack))
        .append($(rightButton))
        .append()
    }
    
});

// if There is no slides

