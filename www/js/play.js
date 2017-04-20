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
var startingXCoord;
var startingYCoord;
var startingTileLeft;

document.addEventListener("touchstart", function(e) {
	if(e.target.id != "board")
	{
		startingXCoord = e.changedTouches[0].clientX;
    startingYCoord = e.changedTouches[0].clientY;
    startingTileLeft = e.target.style.left;
		selectedTileId = e.target.id;
		document.getElementById("pos0").innerHTML = startingXCoord;
		tileSelected(e.target.id);
	}

 	}, false);

document.addEventListener("touchmove", function(e) {
    var currXCoord = e.changedTouches[0].clientX;
    var currYCoord = e.changedTouches[0].clientY;
    var div = document.getElementById(e.target.id);

		if(validRightMove(currXCoord, currYCoord))
    {
			moveTileRight(currXCoord, div);
    }

    else if(validLeftMove(currXCoord, currYCoord))
      div.style.backgroundColor = "blue";

    else if(validUpMove(currXCoord, currYCoord))
      div.style.backgroundColor = "yellow";

    else if(validDownMove(currXCoord, currYCoord))
      div.style.backgroundColor = "purple";

 	}, false);

document.addEventListener("touchend", function(e) {
	if(e.target.id != "board")
		tileUnselected(e.target.id);
 	}, false);

function tileSelected(id) {
	startingTileId = id;
	var div = document.getElementById(id);
	div.style.backgroundColor = "green";
}

function tileUnselected(id) {
	startingTileId = id;
	var div = document.getElementById(id);
	div.style.backgroundColor = "white";
}

function validRightMove(currXCoord, currYCoord) {
  var isRightMove = false;

	if(currXCoord > startingXCoord && (Math.abs(currXCoord - startingXCoord) > Math.abs(currYCoord - startingYCoord)))
    isRightMove = true;

  return isRightMove;
}

function validLeftMove(currXCoord, currYCoord) {
  var isLeftMove = false;

  if(currXCoord < startingXCoord && (Math.abs(currXCoord - startingXCoord) > Math.abs(currYCoord - startingYCoord)))
    isLeftMove = true;

  return isLeftMove;
}

function validUpMove(currXCoord, currYCoord) {
  var isUpMove = false;

  if(currYCoord < startingYCoord && (Math.abs(currXCoord - startingXCoord) < Math.abs(currYCoord - startingYCoord)))
    isUpMove = true;

  return isUpMove;
}

function validDownMove(currXCoord, currYCoord) {
  var isDownMove = false;

  if(currYCoord > startingYCoord && (Math.abs(currXCoord - startingXCoord) < Math.abs(currYCoord - startingYCoord)))
    isDownMove = true;

  return isDownMove;
}

function moveTileRight(currXCoord, div) {
  var dist = currXCoord - startingXCoord;


  div.style.left = (startingTileLeft + dist) + "px";

}










