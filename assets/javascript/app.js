var config = {
    apiKey: "AIzaSyAXHO7kWS5V4Z81zMeyJHJcI1QYOxN8-bA",
    authDomain: "gif-finder-7967a.firebaseapp.com",
    databaseURL: "https://gif-finder-7967a.firebaseio.com",
    projectId: "gif-finder-7967a",
    storageBucket: "",
    messagingSenderId: "619759614376",
    appId: "1:619759614376:web:9edcb3e313100203"
}

firebase.initializeApp(config);

//Get a reference to the database service
var database = firebase.database();

var favorites = [];

// database.ref().on("value", function(snapshot){
//     var value = snapshot.val();
//     debugger;
//     if (snapshot.val().favoriteGifs) {
//         favorites = snapshot.val().favoriteGifs;
//     } else {
//         favorites =[];
//     }
// });


var limit = 10; // limit for searching gifs

//create 10 gifs if we clicked on new button
$(document).on("click", ".createGifs", function () {
    limit = 10;
    $("#gif-view").empty();
    var gifQ = $(this).val();
    var gifURL = "https://api.giphy.com/v1/gifs/search?api_key=30JspaJIb3w1ZakLhJQZgtog3Z26m3mp&q=" + gifQ + "&limit=" + limit + "&offset=0&lang=en";
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < limit; i++) {
            $("#gif-view").append("<div>");
            $("#gif-view div:last-child").attr("class", "divWithGif");
            $("#gif-view div:last-child").append("<img>");
            $("#gif-view div:last-child img:last-child").attr("value", gifQ);
            $("#gif-view div:last-child img:last-child").attr("src", response.data[i].images.downsized_still.url);
            $("#gif-view div:last-child img:last-child").attr("data-moving", response.data[i].images.downsized_large.url);
            $("#gif-view div:last-child img:last-child").attr("data-static", response.data[i].images.downsized_still.url);
            $("#gif-view div:last-child").append("<span>");
            $("#gif-view div:last-child span:last-child").text(response.data[i].title);
            $("#gif-view div:last-child").append("<span>");
            $("#gif-view div:last-child span:last-child").text("Rating " + response.data[i].rating);


        }
    });
});

//create +10 gif everytime when we click "give me more" button
$("#more").on("click", function () {
    if ($("#gif-view").children().length == 0) {
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
            for (var i = startSearchNum + 1; i < limit; i++) {
                $("#gif-view").append("<div>");
                $("#gif-view div:last-child").attr("class", "divWithGif");
                $("#gif-view div:last-child").append("<img>");
                $("#gif-view div:last-child img:last-child").attr("value", gifQ);
                $("#gif-view div:last-child img:last-child").attr("src", response.data[i].images.downsized_still.url);
                $("#gif-view div:last-child img:last-child").attr("data-moving", response.data[i].images.downsized_large.url);
                $("#gif-view div:last-child img:last-child").attr("data-static", response.data[i].images.downsized_still.url);
                $("#gif-view div:last-child").append("<span>");
                $("#gif-view div:last-child span:last-child").text(response.data[i].title);
                $("#gif-view div:last-child").append("<span>");
                $("#gif-view div:last-child span:last-child").text("Rating " + response.data[i].rating);

            }
        });
    }
})

//function for adding new animal into search list
$("input[type=submit]").on("click", function () {
    var newAnimal = $("input[type=text]").val();
    $("#buttons").append("<button>");
    $("#buttons button:last-child").attr("value", newAnimal);
    $("#buttons button:last-child").attr("class", "createGifs");
    $("#buttons button:last-child").text(newAnimal);
    event.preventDefault();
});

//swithing between static and moving gifs
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

$(document).on("dblclick", "img", function(){
    var newImg = $(this).attr("data-moving");
    database.ref().push({
        favoriteGif: newImg
      });
})