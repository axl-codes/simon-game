// array with colors of the buttons
const buttonColours = ['red', 'blue', 'green', 'yellow'];
//We create an empty array to keep the game Pattern
let gamePattern = []; 
// another empty array to keep the user game.
let userClickedPattern = [];
let started = false; // Toggle to know if the game has started or not
let level = 0;


$(document).keypress(function(event){

    if(!started){ // If the game is not started
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});


//Every buttons had the "btn" class
$(".btn").click(function(){
    let userChosenColor = $(this).attr("id"); // New variable that store the id of the button we clicked on
    userClickedPattern.push(userChosenColor); // we push the color in the array userclickedPattern
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});



/**
 * Function that generate a random number to choose a random color from the array, 
 * then the function push the color in the empty array (gamePattern)
 */
function nextSequence(){

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

/**
 * 
 * @param {*} name 
 * function that plays a sound depending of the chosen color
 */
function playSound(name){

        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

/**
 * 
 * @param {*} currentColour 
 */
function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");

    setTimeout(function(){ // Remove the pressed class from the selected button after 100 milliseconds
        $("." + currentColour).removeClass("pressed");
    }, 100);
}


/**
 * 
 * @param {*} currentLevel 
 */
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ //If the two arrays are similars 
        if(userClickedPattern.length === gamePattern.length){ // If they have th same length : the game plays again
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else { //If not the same arrays: 
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
    }
}

//If the game is over, we restart all the arrays and variables to have the possibility to play again.
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}