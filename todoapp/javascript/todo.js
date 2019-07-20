$("ul").on("click", 'li', function() {
    $(this).toggleClass("completed");
    // $(this).css({
    //     color : "gray",
    //     textDecoration : 'line-through'
    // });
    // if($(this).css('color') === 'rgb(128, 128, 128)') {
    //     $(this).css('color', 'black');
    // }
    // else {
    //     $(this).css("color", "gray");
    // }
});

$("ul").on('click', 'span', function(event) {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    event.stopPrpagation;
})



$("input[type='text']").on("keypress", function(event) {
    var text = $(this).val();
    if(event.which === 13)  {
        $("ul").append("<li><span><i class='far fa-trash-alt'></i></span> " + text + "</li>");
        $(this).val() = '';
    }
    
});

$("#plus").on("click", function() {
    $("input[type='text']").fadeToggle();
})