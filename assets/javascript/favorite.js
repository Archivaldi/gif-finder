var firebaseConfig = {
    apiKey: "AIzaSyAXHO7kWS5V4Z81zMeyJHJcI1QYOxN8-bA",
    authDomain: "gif-finder-7967a.firebaseapp.com",
    databaseURL: "https://gif-finder-7967a.firebaseio.com",
    projectId: "gif-finder-7967a",
    storageBucket: "",
    messagingSenderId: "619759614376",
    appId: "1:619759614376:web:9edcb3e313100203"
}

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

database.ref().on("value", function(snapshot) {
    $("div").empty();
    for (var i = 0; i < snapshot.numChildren(); i++){
        $("div").append("<img>");
        $("div img:last-child").attr("src", snapshot.val().favoriteGifs[i]);
    }
});
