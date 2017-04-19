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

document.addEventListener("touchstart", function(e) {
	if(e.target.id != "board")
	{
		startingCoords = e.changedTouches[0];
		startingXCoord = startingCoords.clientX;
		selectedTileId = e.target.id;
		document.getElementById("pos0").innerHTML = startingXCoord;
		squareSelected(e.target.id);
	}

 	}, false);

document.addEventListener("touchmove", function(e) {
		var currentTouchObj = e.changedTouches[0];
		document.getElementById("pos1").innerHTML = currentTouchObj.clientX;

		if(currentTouchObj.clientX > startingXCoord)
			squareMoved();

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
	div.style.backgroundColor = "red";
}
