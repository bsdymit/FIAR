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
var startingCoords;
var startingXCoord;
var startingYCoord;

document.addEventListener("touchstart", function(e) {
	if(e.target.id != "board")
	{
		startingCoords = e.changedTouches[0];
		startingXCoord = startingCoords.clientX;
    startingYCoord = startingCoords.clientY;
		selectedTileId = e.target.id;
		document.getElementById("pos0").innerHTML = startingXCoord;
		squareSelected(e.target.id);
	}

 	}, false);

document.addEventListener("touchmove", function(e) {
    var currX = e.changedTouches[0].clientX;
    var currY = e.changedTouches[0].clientY;
    var div = document.getElementById(e.target.id);

		if(validRightMove(currX, currY))
			div.style.backgroundColor = "red";

    else if(validLeftMove(currX, currY))
      div.style.backgroundColor = "blue";

    else if(validUpMove(currX, currY))
      div.style.backgroundColor = "yellow";

    else if(validDownMove(currX, currY))
      div.style.backgroundColor = "purple";

 	}, false);

document.addEventListener("touchend", function(e) {
	if(e.target.id != "board")
		squareUnselected(e.target.id);
 	}, false);

function squareSelected(id) {
	startingTileId = id;
	var div = document.getElementById(id);
	div.style.backgroundColor = "green";
}

function squareUnselected(id) {
	startingTileId = id;
	var div = document.getElementById(id);
	div.style.backgroundColor = "white";
}

function squareMoved() {
	var div = document.getElementById(selectedTileId);
}

function validRightMove(currX, currY) {
  var isRightMove = false;

	if(currX > startingXCoord && (Math.abs(currX - startingXCoord) > Math.abs(currY - startingYCoord)))
    isRightMove = true;

  return isRightMove;
}

function validLeftMove(currX, currY) {
  var isLeftMove = false;

  if(currX < startingXCoord && (Math.abs(currX - startingXCoord) > Math.abs(currY - startingYCoord)))
    isLeftMove = true;

  return isLeftMove;
}

function validUpMove(currX, currY) {
  var isUpMove = false;

  if(currY > startingXCoord && (Math.abs(currX - startingXCoord) < Math.abs(currY - startingYCoord)))
    isUpMove = true;

  return isUpMove;
}

function validDownMove(currX, currY) {
  var isDownMove = false;

  if(currY < startingXCoord && (Math.abs(currX - startingXCoord) < Math.abs(currY - startingYCoord)))
    isDownMove = true;

  return isDownMove;
}












