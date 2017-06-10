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

var selectedTileId;
var selectedTile;
var previousXCoord;
var previousYCoord;
var startingXCoord;
var startingYCoord;
var startingTileLeft;
var startingTileTop;

var SQUAREMARGIN;

window.onload = function setBoardAndTileSizes() {

  var boardWidth = round(screen.width - 50, 4);
  boardWidth = round(boardWidth, 5);
  boardWidth = round(boardWidth, 2);

  document.getElementById("board").style.width = boardWidth + "px";
  document.getElementById("board").style.paddingBottom = boardWidth + "px";

  setSquareWidthAndMargins((boardWidth - 40) / 4);

}

function setSquareWidthAndMargins(squareWidth){
    var elements = document.getElementsByClassName("square");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width = (squareWidth + "px");
        elements[i].style.paddingBottom = (squareWidth + "px");
        elements[i].style.marginLeft = "8px";
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
    startingTileLeft = e.target.style.left;
    startingTileTop = e.target.style.top;
		selectedTileId = e.target.id.replace("pos", "");
    selectedTile = document.getElementById(e.target.id);
		document.getElementById("pos0").innerHTML = selectedTile.style.width;

    SQUAREMARGIN = 8;//window.getComputedStyle(selectedTile).marginLeft.replace("px", "");

		tileSelected(e.target.id);
	}

 	}, false);

document.addEventListener("touchmove", function(e) {
    if(e.target.id != "board")
    {
      var currXCoord = e.changedTouches[0].clientX;
      var currYCoord = e.changedTouches[0].clientY;
      var div = document.getElementById(e.target.id);

      if(validRightMove(currXCoord, currYCoord))
      {
        moveTileRight(currXCoord, div);
        div.style.backgroundColor = "red";
      }

      else if(validLeftMove(currXCoord, currYCoord))
      {
        moveTileLeft(currXCoord, div);
        div.style.backgroundColor = "blue";
      }

      else if(validUpMove(currXCoord, currYCoord))
      {
        moveTileUp(currYCoord, div);
        div.style.backgroundColor = "yellow";
      }

      else if(validDownMove(currXCoord, currYCoord))
      {
        moveTileDown(currYCoord, div);
        div.style.backgroundColor = "purple";
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
}

function validRightMove(currXCoord, currYCoord) {
  var isRightMove = false;

	if(currXCoord > previousXCoord && !crossingBoundary("right"))
    isRightMove = true;

  return isRightMove;
}

function validLeftMove(currXCoord, currYCoord) {
  var isLeftMove = false;

  if(currXCoord < previousXCoord && !crossingBoundary("left"))
    isLeftMove = true;

  return isLeftMove;
}

function validUpMove(currXCoord, currYCoord) {
  var isUpMove = false;

  if(currYCoord < previousYCoord && (Math.abs(currXCoord - previousXCoord) < Math.abs(currYCoord - previousYCoord)))
    isUpMove = true;

  return isUpMove;
}

function validDownMove(currXCoord, currYCoord) {
  var isDownMove = false;

  if(currYCoord > previousYCoord && (Math.abs(currXCoord - previousXCoord) < Math.abs(currYCoord - previousYCoord)))
    isDownMove = true;

  return isDownMove;
}

function crossingBoundary(moveDirection) {
  var crossingBoundary = false;
  var board = document.getElementById("board").getBoundingClientRect();
  var tile = selectedTile.getBoundingClientRect();

  if(tile.right >= (board.right - SQUAREMARGIN) || tile.left <= (board.left + SQUAREMARGIN*1 ))
       crossingBoundary = true;

  return crossingBoundary;
}

function moveTileRight(currXCoord, div) {
  var dist = currXCoord - startingXCoord;

  //document.getElementById("pos0").innerHTML = startingTileLeft;

  div.style.left = (startingTileLeft + dist) + "px";

}

function moveTileLeft(currXCoord, div) {
  var dist = currXCoord - startingXCoord;


  div.style.left = (startingTileLeft + dist) + "px";

}

function moveTileUp(currYCoord, div) {
  var dist = currYCoord - startingYCoord;


  div.style.top = (startingTileTop + dist) + "px";

}

function moveTileDown(currYCoord, div) {
  var dist = currYCoord - startingYCoord;


  div.style.top = (startingTileTop + dist) + "px";

}










