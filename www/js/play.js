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
 * under the License.
 */
 
 function createBoard() {
	 var canvas = document.getElementById("boardCanvas");
	 var ctx = canvas.getContext("2d");
	 
	 var tileSize = 100; //temp should be based on screen size
	 var numberOfTiles = 14;
	 var tiles = createTiles(numberOfTiles, tileSize);
	 
	 
 }
 
 function createTiles(numberOfTiles, tileSize) {
	 var tiles = [];
	 
	 var i;
	 for(i = 0; i < numberOfTiles; i++) {
	 	tiles.push(ctx.createImageData(tileSize, tileSize));
	 }
	 
	 tiles = colorTiles(tiles);
	 
	 return tiles;
 }
 
 function colorTiles(tiles) {
	 var i;
	 for(i = 0; i < tiles.length; i++) {
		 var j;
		 for(j = 0; j < tiles[i].data.length; j += 4) {
			 tiles[i].data[j+0] = 255;
			 tiles[i].data[j+1] = 0;
			 tiles[i].data[j+2] = 0;
			 tiles[i].data[j+3] = 255;
		 }
	 }
 }
