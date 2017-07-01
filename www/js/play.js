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
	if(e.target.id != "board" && e.target.id != "pos0" && e.target.id != "pos3")
	{
		startingXCoord = e.changedTouches[0].clientX;
    startingYCoord = e.changedTouches[0].clientY;
		selectedTileNumber = parseInt(e.target.id.replace("pos", ""));
    selectedTilePosition = BOARDSTATE.indexOf(selectedTileNumber);
    selectedTile = document.getElementById(e.target.id);
    selectedTile.style.zIndex = 20;
    distanceFromStart = 0;
    previousMoveDirection = "none";

		tileSelected(e.target.id);
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


      document.getElementById("pos0").innerHTML = distanceFromStart;

      if(validRightMove(currXCoord, currYCoord))
      {
        moveTileRight();
        startingXCoord = currXCoord;
        startingYCoord = currYCoord;
        currentPositionInBoardState = BOARDSTATE.indexOf(selectedTileNumber);
        distanceFromStart = Math.abs(selectedTilePosition - currentPositionInBoardState);
        previousMoveDirection = "right";
      }

      else if(validLeftMove(currXCoord, currYCoord))
      {
        moveTileLeft();
        startingXCoord = currXCoord;
        startingYCoord = currYCoord;
        currentPositionInBoardState = BOARDSTATE.indexOf(selectedTileNumber);
        distanceFromStart = Math.abs(selectedTilePosition - currentPositionInBoardState);
        previousMoveDirection = "left";
      }

      else if(validUpMove(currXCoord, currYCoord))
      {
        moveTileUp();
        startingXCoord = currXCoord;
        startingYCoord = currYCoord;
        currentPositionInBoardState = BOARDSTATE.indexOf(selectedTileNumber);
        distanceFromStart = Math.abs(selectedTilePosition - currentPositionInBoardState);
        previousMoveDirection = "up";
      }

      else if(validDownMove(currXCoord, currYCoord))
      {
        moveTileDown();
        startingXCoord = currXCoord;
        startingYCoord = currYCoord;
        currentPositionInBoardState = BOARDSTATE.indexOf(selectedTileNumber);
        distanceFromStart = Math.abs(selectedTilePosition - currentPositionInBoardState);
        previousMoveDirection = "down";
      }
    }
 	}, false);

document.addEventListener("touchend", function(e) {
	if(e.target.id != "board" && e.target.id != "pos0" && e.target.id != "pos3")
		tileUnselected(e.target.id);
 	}, false);

function tileSelected(id) {
}

function tileUnselected(id) {
  document.getElementById(id).style.zIndex = 0;
}

function validRightMove(currXCoord, currYCoord) {
  var validRightMove = false;

	if(currXCoord > (startingXCoord + (TILEWIDTH/2)) &&
     !crossingBoundary("right") &&
     ((previousMoveDirection == "left" && distanceFromStart > 0) ||
      distanceFromStart == 0))
    validRightMove = true;

  return validRightMove;
}

function validLeftMove(currXCoord, currYCoord) {
  var validLeftMove = false;

  if(currXCoord < (startingXCoord - (TILEWIDTH/2)) &&
     !crossingBoundary("left") &&
     ((previousMoveDirection == "right" && distanceFromStart > 0) ||
      distanceFromStart == 0))
    validLeftMove = true;

  return validLeftMove;
}

function validUpMove(currXCoord, currYCoord) {
  var validUpMove = false;

  if(currYCoord < (startingYCoord - (TILEWIDTH/2)) &&
     !crossingBoundary("up") &&
     ((previousMoveDirection == "down" && distanceFromStart > 0) ||
      distanceFromStart == 0))
    validUpMove = true;

  return validUpMove;
}

function validDownMove(currXCoord, currYCoord) {
  var validDownMove = false;

  if(currYCoord > (startingYCoord + (TILEWIDTH/2)) &&
     !crossingBoundary("down") &&
     ((previousMoveDirection == "up" && distanceFromStart > 0) ||
      distanceFromStart == 0))
    validDownMove = true;

  return validDownMove;
}

function crossingBoundary(moveDirection) {
  var crossingBoundary = false;

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

function moveTileRight() {
  var blankTile = document.getElementById("pos" + (BOARDSTATE[currentPositionInBoardState+1]));
  blankTile.style.left = (parseInt(blankTile.style.left.replace("px", "")) - (TILEWIDTH + SQUAREMARGIN)) + "px";

  selectedTile.style.left = (selectedTileLeft + (TILEWIDTH + SQUAREMARGIN)) + "px";

  var temp = BOARDSTATE[currentPositionInBoardState];
  BOARDSTATE[currentPositionInBoardState] = BOARDSTATE[currentPositionInBoardState+1];
  BOARDSTATE[currentPositionInBoardState+1] = temp;
}

function moveTileLeft() {
  var blankTile = document.getElementById("pos" + (BOARDSTATE[currentPositionInBoardState-1]));
  blankTile.style.left = (parseInt(blankTile.style.left.replace("px", "")) + (TILEWIDTH + SQUAREMARGIN)) + "px";

  selectedTile.style.left = (selectedTileLeft - (TILEWIDTH + SQUAREMARGIN)) + "px";

  var temp = BOARDSTATE[currentPositionInBoardState];
  BOARDSTATE[currentPositionInBoardState] = BOARDSTATE[currentPositionInBoardState-1];
  BOARDSTATE[currentPositionInBoardState-1] = temp;
}

function moveTileUp() {
  var blankTile = document.getElementById("pos" + (BOARDSTATE[currentPositionInBoardState-4]));
  blankTile.style.top = (parseInt(blankTile.style.top.replace("px", "")) + (TILEWIDTH + SQUAREMARGIN)) + "px";

  selectedTile.style.top = (selectedTileTop - (TILEWIDTH + SQUAREMARGIN)) + "px";

  var temp = BOARDSTATE[currentPositionInBoardState];
  BOARDSTATE[currentPositionInBoardState] = BOARDSTATE[currentPositionInBoardState-4];
  BOARDSTATE[currentPositionInBoardState-4] = temp;
}

function moveTileDown() {
  var blankTile = document.getElementById("pos" + (BOARDSTATE[currentPositionInBoardState+4]));
  blankTile.style.top = (parseInt(blankTile.style.top.replace("px", "")) - (TILEWIDTH + SQUAREMARGIN)) + "px";

  selectedTile.style.top = (selectedTileTop + (TILEWIDTH + SQUAREMARGIN)) + "px";

  var temp = BOARDSTATE[currentPositionInBoardState];
  BOARDSTATE[currentPositionInBoardState] = BOARDSTATE[currentPositionInBoardState+4];
  BOARDSTATE[currentPositionInBoardState+4] = temp;
}










