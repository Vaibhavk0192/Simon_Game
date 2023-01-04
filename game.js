var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userCLickedPattern = [];
var level = 0;
var started = false;
function nextSequence() {
  userCLickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(randomChosenColor) {
  var Sound = new Audio("sounds/" + randomChosenColor + ".mp3");
  Sound.play();
}

$(".btn").click(function () {
  var userChosenColor = this.id;
  userCLickedPattern.push(userChosenColor);
  var index = userCLickedPattern.length - 1;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(index);

});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(index) {
  if (userCLickedPattern[index] === gamePattern[index]) {
    console.log("sucesss");

    if (userCLickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("worng");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over,Press Any Key To Restart");
    startOver();
}
}

function startOver()
{
    started = false;
    level = 0;
    userCLickedPattern = [];
    gamePattern = [];
    
}
