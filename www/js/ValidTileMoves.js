var lastMovedTileNumber = -1;

function lastMovedTile(selectedTileNumber) {
  var tileWasMovedLast =  false;

  if(this.lastMovedTileNumber == selectedTileNumber)
    tileWasMovedLast = true;

  return tileWasMovedLast;
}

function setLastMovedTileNumber(selectedTileNumber) {
  this.lastMovedTileNumber = selectedTileNumber;
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
