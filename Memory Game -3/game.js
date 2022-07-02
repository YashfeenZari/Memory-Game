// alert("hiii"); --checking if game.js is linked to html

// $("h1").css("color","red"); 
// --- checking if jQuery link is loaded 

alert("MEMORY_GAME:  Remember the blinks on the screen and the pattern")
//GAME:

//L-1
var buttonColor =["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern=[];

//7-0 . You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//7-2.  Create a new variable called level and start at level 0.
var level = 0;


//7-1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function () {
   if(!started){
    // !started -- as started var has initial value of false i.e not started --so ! this indicates started= true 

    //7-3 The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
    
   }
});


$(".btn").click(function () {
  
   
    //function for storing the id of which btn user clicked 
  
        var userChosenColour = $(this).attr("id");
        // adding the value at the ned og the aray userclickedpatter
        userClickedPattern.push(userChosenColour);

        
    //audio to user chosen color
   playSound(userChosenColour);
   animatePress(userChosenColour);

   
    //8-2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
  // .length gives the actual count of the items ..and we need the index of the last elemt pressed -- so index = length-1 ..hence -1 
    
});


  //8-1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
    
    //8-3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");

        
      //8-4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if(gamePattern.length===userClickedPattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else {
        console.log("wrong");
        
        //9 level --if wrong click 
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");  
        }, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");

     //10-2. Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}



function nextSequence() {

    //8-6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern=[];

    
    //7-4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++ ;
    //7-5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level "+level);


    //L-1.2--creating a random no between 0 to 4 --4 not included
    var randomNumber =Math.floor(Math.random()*4) ;

    var randomChosenColour = buttonColor[randomNumber];

    // adding randomChosenColour to the end of array gamePattern
    gamePattern.push(randomChosenColour);

    //flash animation
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //audio to random chosen color
   playSound(randomChosenColour);

}

function playSound(name) {

    //audio to random chosen color
    var audio= new Audio("sounds/"+ name +".mp3");
    audio.play();
    
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");

    //remove pressed class after 100 milli seconds
    setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");     
    }, 100);

}

  //10-3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
function startOver() {
    level=0;
    gamePattern=[];
    started=false;    
}














