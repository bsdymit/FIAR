function playCpuTurn() {
    easyMove();
}

function easyMove() {
    var chosenEmptyTile = Math.random() < 0.5 ? 0 : 3;
    var locationOfChosenEmptyTile = BOARDSTATE.indexOf(chosenEmptyTile);
    var tileToMove = getTileToMove(locationOfChosenEmptyTile);
}

function getTileToMove(locationOfChosenEmptyTile) {
    
}

function getAdjacentTileLocations(locationOfChosenEmptyTile) {
    var listOfAdjacentTiles = [];

    if(locationOfChosenEmptyTile != 0 && locationOfChosenEmptyTile != 4
        && locationOfChosenEmptyTile != 8 && locationOfChosenEmptyTile != 12) {
            listOfAdjacentTiles.push(locationOfChosenEmptyTile - 1)
    }

    if(locationOfChosenEmptyTile != 3 && locationOfChosenEmptyTile != 7
        && locationOfChosenEmptyTile != 11 && locationOfChosenEmptyTile != 15) {
            listOfAdjacentTiles.push(locationOfChosenEmptyTile + 1);
    }

    if(locationOfChosenEmptyTile != 0 && locationOfChosenEmptyTile != 1
        && locationOfChosenEmptyTile != 2 && locationOfChosenEmptyTile != 3) {
            listOfAdjacentTiles.push(locationOfChosenEmptyTile - 4);
    }

    if(locationOfChosenEmptyTile != 12 && locationOfChosenEmptyTile != 13
        && locationOfChosenEmptyTile != 14 && locationOfChosenEmptyTile != 15) {
            listOfAdjacentTiles.push(locationOfChosenEmptyTile - 4);
    }

    for()


    return listOfAdjacentTiles;
}