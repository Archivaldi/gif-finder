$(document).on("click", "button", function () {
    $("#gif-view").empty();
    var gifQ = $(this).val();
    var gifURL = "https://api.giphy.com/v1/gifs/search?api_key=30JspaJIb3w1ZakLhJQZgtog3Z26m3mp&q="+gifQ+"&limit=25&offset=0&rating=G&lang=en";
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function(response){
        for(var i = 0; i < 11; i++) {
            $("#gif-view").append("<img>");
            $("img").css("width", "400px");
            $("img").css("height", "300px");
            $("img").css("margin", "20px");
            $("#gif-view img:last-child").attr("src", response.data[i].images.downsized_still.url);
            $("#gif-view img:last-child").attr("data-moving", response.data[i].images.downsized_large.url);
            $("#gif-view img:last-child").attr("data-static", response.data[i].images.downsized_still.url);
        }
    });
});

$("input[type=submit]").on("click", function() {
    var newAnimal = $("input[type=text]").val();
    $("#buttons").append("<button>");
    $("#buttons button:last-child").attr("value", newAnimal);
    $("#buttons button:last-child").text(newAnimal);
    event.preventDefault();
});

$(document).on("click", "img", function() {
    var firstSRC = $(this).attr("data-static");
    var anotherSRC = $(this).attr("data-moving");
    var actualSRC = $(this).attr("src");
    if (actualSRC == firstSRC){
        $(this).attr("src", anotherSRC );
    } else {
        $(this).attr("src", firstSRC );
    }
})