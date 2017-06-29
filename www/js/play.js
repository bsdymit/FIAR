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

var TILEWIDTH;
var SQUAREMARGIN;
var BOARDSTATE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

window.onload = function setBoardAndTileSizes() {

  SQUAREMARGIN = 8;
  var boardWidth = round(screen.width - 50, 4);
  boardWidth = round(boardWidth, 5);
  boardWidth = round(boardWidth, 2);

  document.getElementById("board").style.width = boardWidth + "px";
  document.getElementById("board").style.paddingBottom = boardWidth + "px";

  setSquareWidthAndMargins((boardWidth - (SQUAREMARGIN * 5)) / 4);
  TILEWIDTH = document.getElementById("pos0").getBoundingClientRect().width;
}

function setSquareWidthAndMargins(squareWidth){
  var elements = document.getElementsByClassName("square");
  for (var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      elements[(4*i)+j].style.width = (squareWidth + "px");
      elements[(4*i)+j].style.paddingBottom = (squareWidth + "px");
      elements[(4*i)+j].style.left = (j*squareWidth) + ((j+1)*SQUAREMARGIN) + "px";
      elements[(4*i)+j].style.top = (i*squareWidth) + ((i+1)*SQUAREMARGIN) + "px";
    }
  }
}

var round = function (x, to) {
    return Math.floor(x / to) * to;
};

document.addEventListener("touchstart", function(e) {
	if(e.target.id != "board")
	{
		previousXCoord = e.changedTouches[0].clientX;
    previousYCoord = e.changedTouches[0].clientY;
    startingXCoord = previousXCoord;
    startingYCoord = previousYCoord;
    selectedTileLeft = parseInt(e.target.style.left.replace("px", ""));
    startingTileTop = e.target.style.top;
		selectedTileNumber = e.target.id.replace("pos", "");
    selectedTile = document.getElementById(e.target.id);
    currentPositionInBoardState = BOARDSTATE.indexOf(parseInt(selectedTileNumber));
    selectedTile.style.zIndex = 20;

		tileSelected(e.target.id);
	}

 	}, false);

document.addEventListener("touchmove", function(e) {
    if(e.target.id != "board")
    {
      var currXCoord = e.changedTouches[0].clientX;
      var currYCoord = e.changedTouches[0].clientY;

      if(validRightMove(currXCoord, currYCoord))
      {
        moveTileRight(currXCoord);
        selectedTile.style.backgroundColor = "red";
      }

      else if(validLeftMove(currXCoord, currYCoord))
      {
        moveTileLeft(currXCoord);
        selectedTile.style.backgroundColor = "blue";
      }

      else if(validUpMove(currXCoord, currYCoord))
      {
        moveTileUp(currYCoord);
        selectedTile.style.backgroundColor = "yellow";
      }

      else if(validDownMove(currXCoord, currYCoord))
      {
        moveTileDown(currYCoord);
        selectedTile.style.backgroundColor = "purple";
      }

      previousXCoord = currXCoord;
      previousYCoord = currYCoord;
    }
 	}, false);

document.addEventListener("touchend", function(e) {
	if(e.target.id != "board")
		tileUnselected(e.target.id);
 	}, false);

function tileSelected(id) {
	document.getElementById(id).style.backgroundColor = "green";
}

function tileUnselected(id) {
	document.getElementById(id).style.backgroundColor = "orange";
  document.getElementById(id).style.zIndex = 0;
}

function validRightMove(currXCoord, currYCoord) {
  var isRightMove = false;

	if(currXCoord > (startingXCoord + (TILEWIDTH/2)) && !crossingBoundary("right"))
    isRightMove = true;

  return isRightMove;
}

function validLeftMove(currXCoord, currYCoord) {
  var isLeftMove = false;

  if(currXCoord < (startingXCoord - (TILEWIDTH/2)) && !crossingBoundary("left"))
    isLeftMove = true;

  return isLeftMove;
}

function validUpMove(currXCoord, currYCoord) {
  var isUpMove = false;

  if(currYCoord < (startingYCoord - (TILEWIDTH/2)) && !crossingBoundary("up"))
    isUpMove = true;

  return isUpMove;
}

function validDownMove(currXCoord, currYCoord) {
  var isDownMove = false;

  if(currYCoord > (startingYCoord + (TILEWIDTH/2)) && !crossingBoundary("down"))
    isDownMove = true;

  return isDownMove;
}

function crossingBoundary(moveDirection) {
  var crossingBoundary = false;

  document.getElementById("pos8").innerHTML = BOARDSTATE[currentPositionInBoardState+1];

  if(moveDirection == "right" &&
     ((currentPositionInBoardState == 3 ||
      currentPositionInBoardState == 7  ||
      currentPositionInBoardState == 11 ||
      currentPositionInBoardState == 15) ||
      (BOARDSTATE[currentPositionInBoardState+1] != 0 &&
      BOARDSTATE[currentPositionInBoardState+1] != 3)))
       crossingBoundary = true;

  else if(moveDirection == "left" &&
     ((currentPositionInBoardState == 0 ||
      currentPositionInBoardState == 4 ||
      currentPositionInBoardState == 8 ||
      currentPositionInBoardState == 12) ||
      (BOARDSTATE[currentPositionInBoardState-1] != 0 &&
      BOARDSTATE[currentPositionInBoardState-1] != 3)))
       crossingBoundary = true;

  else if(moveDirection == "up" &&
     ((currentPositionInBoardState == 0 ||
      currentPositionInBoardState == 1 ||
      currentPositionInBoardState == 2 ||
      currentPositionInBoardState == 3) ||
      (BOARDSTATE[currentPositionInBoardState-4] != 0 &&
      BOARDSTATE[currentPositionInBoardState-4] != 3)))
       crossingBoundary = true;

  else if(moveDirection == "down" &&
     ((currentPositionInBoardState == 12 ||
      currentPositionInBoardState == 13 ||
      currentPositionInBoardState == 14 ||
      currentPositionInBoardState == 15) ||
      (BOARDSTATE[currentPositionInBoardState+4] != 0 &&
      BOARDSTATE[currentPositionInBoardState+4] != 3)))
       crossingBoundary = true;

  return crossingBoundary;
}

function moveTileRight(currXCoord) {
  var blankTile = document.getElementById("pos" + (parseInt(selectedTileNumber)+1));
  blankTile.style.left = (parseInt(blankTile.style.left.replace("px", "")) - (TILEWIDTH + SQUAREMARGIN)) + "px";

  selectedTile.style.left = (selectedTileLeft + TILEWIDTH + SQUAREMARGIN) + "px";

    document.getElementById("pos0").innerHTML = blankTile.style.left;
  var temp = BOARDSTATE[currentPositionInBoardState];
  BOARDSTATE[currentPositionInBoardState] = BOARDSTATE[currentPositionInBoardState+1];
  BOARDSTATE[currentPositionInBoardState+1] = temp;

  document.getElementById("pos15").innerHTML = selectedTile.id;
}

function moveTileLeft(currXCoord) {
  var blankTile = document.getElementById("pos" + (parseInt(selectedTileNumber)-1));
  blankTile.style.left = (TILEWIDTH + SQUAREMARGIN) + "px";

  selectedTile.style.left = -(TILEWIDTH + SQUAREMARGIN) + "px";
}

function moveTileUp(currYCoord) {
  var blankTile = document.getElementById("pos" + (parseInt(selectedTileNumber)-4));
  blankTile.style.top = (TILEWIDTH + SQUAREMARGIN) + "px";

  selectedTile.style.top = -(TILEWIDTH + SQUAREMARGIN) + "px";
}

function moveTileDown(currYCoord) {
  var blankTile = document.getElementById("pos" + (parseInt(selectedTileNumber)+4));
  blankTile.style.top = -(TILEWIDTH + SQUAREMARGIN) + "px";

  selectedTile.style.top = (TILEWIDTH + SQUAREMARGIN) + "px";
}










