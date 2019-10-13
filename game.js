var buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    console.log(userClickedPattern);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    // Randomly select color from array and store color in game pattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Animate blink or flash effect when button is clicked
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play audio corresponding to the color selected
    playSound(randomChosenColor);

    animatePress(randomChosenColor);
}

function playSound(name) {
    // Play sound with the same file name as the parameter "name"
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    // Add "pressed" css effect on pressed button
    $("#" + currentColor).addClass("pressed")

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        gameOver();
        startOver();
    }
}

function gameOver() {
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false
}

