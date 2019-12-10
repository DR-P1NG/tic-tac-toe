// MAIN JavaScript File

// **GAME REGISTRY**
//arrays to hold cells that players have claimed
var xCells = [];
var oCells = [];
var changePlayer = false;
var stop = false;

//string to hold which player is active, either X or O
var activePlayer = "";

//init for start and reset
var init = function(){
	$('.cell').empty();
	xCells = [];
	oCells = [];
	activePlayer = "X";
	stop = false;
	$(".active-player-text").html("<p> Active Player: X </p>");

}

// **GAME FUNCTIONS**
//run appropriate functions for the end of a players turn, after they select a cell
var endTurn = function(cellId){
	claimCell(cellId);
	victoryCheck();
	togglePlayer();
}

//function to register the cells that are claimed, and marks the board
var claimCell = function(cellId){
	if (stop == false) {
		if (activePlayer == "X" && xCells.indexOf(cellId) == -1 && oCells.indexOf(cellId) == -1) {
			$("#" + String(cellId)).append("<img src='https://www.stickpng.com/assets/images/5a01bcbd7ca233f48ba627d5.png' height='100' width='100'>");
			xCells.push(cellId);
			changePlayer = true;
		} else if (activePlayer == "O" && oCells.indexOf(cellId) == -1 && xCells.indexOf(cellId) == -1) {
			$("#" + String(cellId)).append("<img src='https://www.stickpng.com/assets/images/5a01bbba7ca233f48ba627c1.png' height='100' width='100'>");
			oCells.push(cellId);
			changePlayer = true;
		} else {
			changePlayer = false;
		}
		console.log(xCells); 
		console.log(oCells);
		console.log(stop);
	}
}

//victory check
var victoryCheck = function(cellId){
	if (stop == false) {
		if (xCheck(1, 2, 3) == true || xCheck(4, 5, 6) == true || xCheck(7, 8, 9) == true || xCheck(1, 4, 7) == true || xCheck(2, 5, 8) == true || xCheck(3, 6, 9) == true || xCheck(1, 5, 9) == true || xCheck(3, 5, 7) == true) {
			alert("X Won");
			stop = true;
		} else if (oCheck(1, 2, 3) == true || oCheck(4, 5, 6) == true || oCheck(7, 8, 9) == true || oCheck(1, 4, 7) == true || oCheck(2, 5, 8) == true || oCheck(3, 6, 9) == true || oCheck(1, 5, 9) == true || oCheck(3, 5, 7) == true) {
			alert("O Won");
			stop = true;
		} else if (xCells.length + oCells.length == 9) {
			alert("Tie");
			stop = true;
		};
	}
}

//toggle active player
var togglePlayer = function(){
	if (stop == false) {
		if (activePlayer == "X" && changePlayer == true) {
			activePlayer = "O";
			$(".active-player-text").html("<p> Active Player: O </p>");
		} else if (activePlayer == "O" && changePlayer == true) {
			activePlayer = "X";
			$(".active-player-text").html("<p> Active Player: X </p>");
		}
	}
}

//check the three numbers passed to see if they are in the xCells array
var xCheck = function(one, two, three){
	if($.inArray(one+'', xCells) != -1 && $.inArray(two+'', xCells) != -1 && $.inArray(three+'', xCells) != -1){
		return true;
	}else{
		return false;
	}
}

//check the three numbers passed to see if they are in the yCells array
var oCheck = function(one, two, three){
	if($.inArray(one+'', oCells) != -1 && $.inArray(two+'', oCells) != -1 && $.inArray(three+'', oCells) != -1){
		return true;
	}else{
		return false;
	}
}

// **GAME SETUP**
// clear the registry variables
init();

// attach the click handlers
$(document).ready(function() {
    $('.cell').click(function(event) {
    	var cellId = event.currentTarget.id;
    	endTurn(cellId);
    });

    $('#reset').click(function(){
    	init();
    });
});