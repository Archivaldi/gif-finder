var limit = 0;
$(document).on("click", ".createGifs", function () {
    limit = 10;
    $("#gif-view").empty();
    var gifQ = $(this).val();
    var gifURL = "https://api.giphy.com/v1/gifs/search?api_key=30JspaJIb3w1ZakLhJQZgtog3Z26m3mp&q=" + gifQ + "&limit=" + limit + "&offset=0&lang=en";
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i <= 10; i++) {
            $("#gif-view").append("<div>");
            $("#gif-view div:last-child").attr("class", "divWithGif");
            $("#gif-view div:last-child").append("<img>");
            $(".divWithGif img:last-child").attr("value", gifQ);
            $(".divWithGif img:last-child").attr("src", response.data[i].images.downsized_still.url);
            $(".divWithGif img:last-child").attr("data-moving", response.data[i].images.downsized_large.url);
            $(".divWithGif img:last-child").attr("data-static", response.data[i].images.downsized_still.url);
            $(".divWithGif:last-child").append("<span>");
            $(".divWithGif span:last-child").text("Rating " + response.data[i].rating);

        }
    });
});

$("#more").on("click", function () {
    if (limit == 0) {
        console.log("Put the value");
    } else {
        var startSearchNum = $("#gif-view").children().length;
        limit += 10;
        gifQ = $(".divWithGif img:first-child").eq(0).attr("value");
        var gifURL = "https://api.giphy.com/v1/gifs/search?api_key=30JspaJIb3w1ZakLhJQZgtog3Z26m3mp&q=" + gifQ + "&limit=" + limit + "&offset=0&lang=en";
        $.ajax({
            url: gifURL,
            method: "GET"
        }).then(function (response) {
            for (var i = startSearchNum; i < limit; i++) {
                $("#gif-view").append("<div>");
                $("#gif-view div:last-child").attr("class", "divWithGif");
                $("#gif-view div:last-child").append("<img>");
                $(".divWithGif img:last-child").attr("src", response.data[i].images.downsized_still.url);
                $(".divWithGif img:last-child").attr("value", gifQ);
                $(".divWithGif img:last-child").attr("data-moving", response.data[i].images.downsized_large.url);
                $(".divWithGif img:last-child").attr("data-static", response.data[i].images.downsized_still.url);
                $(".divWithGif:last-child").append("<span>");
                $(".divWithGif span:last-child").text("Rating " + response.data[i].rating);


            }
        });
    }
})


$("input[type=submit]").on("click", function () {
    var newAnimal = $("input[type=text]").val();
    $("#buttons").append("<button>");
    $("#buttons button:last-child").attr("value", newAnimal);
    $("#buttons button:last-child").text(newAnimal);
    event.preventDefault();
});

$(document).on("click", "img", function () {
    var staticSRC = $(this).attr("data-static");
    var movingSRC = $(this).attr("data-moving");
    var actualSRC = $(this).attr("src");

    if (actualSRC == staticSRC) {
        $(this).attr("src", movingSRC);
    } else {
        $(this).attr("src", staticSRC);
    }
})