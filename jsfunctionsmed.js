/*
 Name: Evan Christopher
 Student ID:991134283
 Professor: Osama Abu Rahmeh
 Course: Syst 10199 - Web Development 2

 Description:
 Main javascript document which creates the required variables and functions
 necessary for the logical operation of the match game.
 */

//Data fields
var valueList = new Array(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18);
var savedValue = null;
var savedId = null;
var matches = 0;
var show = 0;
/*
    creates a multidimensional array for easy use on a table and for randomizing
    values for varied replay
 */
var rowList = new Array();
    for(var i=0;i<6;i++){
        rowList[i] = new Array();
        for (var j=0;j<6;j++){
            var num = Math.floor(Math.random()*valueList.length);
            rowList[i][j] = valueList[num];
            valueList.splice(num,1);
        }
    }
/*
    Main game function. Called on click of a table cell; this function calls and
    prints a value from rowList to a specific cell and either clears the data called
    or lights up the cell if the data matches. A matches variable is used to count
    towards an endGame function. Timeouts were added to allow the user time to see
    mismatched cards before being re-hidden; faster timeouts allowed the game to
    flow better.
 */
function checkData(id){
    document.getElementById(id).innerHTML = rowList[parseInt(id/6)][id%6];
    if (savedValue == null){
        savedValue = rowList[parseInt(id/6)][id%6];
        savedId = id;
    }else{
        if(savedValue !== rowList[parseInt(id/6)][id%6]){
            setTimeout(function func() { clearData(id,savedId) } ,400);
        } else {
            document.getElementById(id).style.backgroundColor = "lightgreen";
            document.getElementById(savedId).style.backgroundColor = "lightgreen";
            savedId = null;
            savedValue = null;
            matches++;
        }
    }
    endGame();
}
//function to clear the data in a cell when there is a mismatch.
//Also acts to clear variables to remove errors when comparing 2 values
function clearData(id,savedId) {
    document.getElementById(id).innerHTML = '';
    document.getElementById(savedId).innerHTML = '';
    savedId = null;
    savedValue = null;
}
/*
    The endGame function serves as a notification to the player that the game is over
    The player is asked to play again where the page is reloaded if yes and google is
    loaded if the player wishes to stop.
 */
function endGame(){
    if (matches === 18){
        alert("You Win");
        var playAgain = confirm("Play Again?")
        if(playAgain === true){
            location.reload();
        }else{
            window.location="http://www.google.com"
        }
    }
}
/*
    Simple visibility modifier for the "How to play" button which reveals and hides
    a instructional paragraph.
 */
function showInstructions(){
    if (show !== 1){
        document.getElementById("howtoplay2").style.visibility = "visible";
        show++;
    }else{
        document.getElementById("howtoplay2").style.visibility = "hidden";
        show--;
    }
}
