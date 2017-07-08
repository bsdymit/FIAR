/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the booty License.
 */

var selectedTileNumber;
var selectedTile;
var previousXCoord;
var previousYCoord;
var startingXCoord;
var startingYCoord;
var selectedTileLeft;
var startingTileTop;
var currentPositionInBoardState;
var distanceFromStart;
var previousMoveDirection;

var BOARDSTATE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

$(function() {
  $('#board').fadeIn(500);
  $('#gameMenuOptionButtons').fadeIn(500);
});

document.addEventListener("touchstart", function(e) {
	if(e.target.id != "board" && e.target.id != "pos0" && e.target.id != "pos3")
	{
		startingXCoord = e.changedTouches[0].clientX;
    startingYCoord = e.changedTouches[0].clientY;
		selectedTileNumber = parseInt(e.target.id.replace("pos", ""));
    selectedTilePosition = BOARDSTATE.indexOf(selectedTileNumber);
    selectedTile = document.getElementById(e.target.id);
    distanceFromStart = 0;
    previousMoveDirection = "none";

		tileSelected();
	}
}, false);

document.addEventListener("touchmove", function(e) {
    if(e.target.id != "board" && e.target.id != "pos0" && e.target.id != "pos3")
    {
      currentPositionInBoardState = BOARDSTATE.indexOf(selectedTileNumber);
      selectedTileLeft = parseInt(e.target.style.left.replace("px", ""));
      selectedTileTop = parseInt(e.target.style.top.replace("px", ""));
      var currXCoord = e.changedTouches[0].clientX;
      var currYCoord = e.changedTouches[0].clientY;

      if(!lastMovedTile(selectedTileNumber))
      {
        if(validRightMove(currXCoord, currYCoord))
          moveTileRight(currXCoord, currYCoord);

        else if(validLeftMove(currXCoord, currYCoord))
          moveTileLeft(currXCoord, currYCoord);

        else if(validUpMove(currXCoord, currYCoord))
          moveTileUp(currXCoord, currYCoord);

        else if(validDownMove(currXCoord, currYCoord))
          moveTileDown(currXCoord, currYCoord);
      }
    }
 	}, false);

document.addEventListener("touchend", function(e) {
	if(e.target.id != "board" && e.target.id != "pos0" && e.target.id != "pos3")
		tileUnselected(e.target.id);
 	}, false);

function tileSelected() {
  selectedTile.style.zIndex = 20;
  selectedTile.style.opacity = .5;
}

function tileUnselected(id) {
  document.getElementById(id).style.zIndex = 0;
  selectedTile.style.opacity = 1;

  if(distanceFromStart > 0)
  {
    var winningColor = checkForWinner();
    if(winningColor == playerColors[0] || winningColor == playerColors[1])
      endGame(players[playerColors.indexOf(winningColor)]);

    if(lastMovedTileNumber != -1)
      document.getElementById("pos" + lastMovedTileNumber).style.border = "";
    setLastMovedTileNumber(selectedTileNumber);
    document.getElementById("pos" + lastMovedTileNumber).style.border = "2px white dotted";
    nextPlayer();
  }
}

function restartGame(afterEndGame) {
  if(afterEndGame == true)
  {
    setBoardAndTileSizes();
    BOARDSTATE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    setCurrentPlayer(players[0]);
    document.getElementById("pos" + lastMovedTileNumber).style.border = "";
  }
  else
    window.location.reload();
}

function quitGame() {
  window.location.href = "index.html";
}
