

class Empty {
    constructor(originalX, originalY) {
        this.team = "empty";
        this.role = "empty";
        this.positionX = originalX;
        this.positionY = originalY;
    }
}

const chessBoard = []
const createEmptyChessBoard = () => {
    for (let y = 0; y < 10 ; y++) {
        for (let x = 0; x < 9; x ++){
            chessBoard.push({x, y, team: "empty",role: "empty", classObj: new Empty(x, y)})
        }
    }
};

createEmptyChessBoard();

class ChessPiece {
    constructor(team, role, originalX, originalY) {
        this.team = team;
        this.role = role;
        this.positionX = originalX;
        this.positionY = originalY;
        this.isAlive = true;
    }

    create() {
        const objToUpdate = chessBoard.find(obj => obj.x === this.positionX && obj.y === this.positionY);
        objToUpdate.team = this.team;
        objToUpdate.role = this.role;
        objToUpdate.classObj = this;
    }

    move(targetX, targetY) {
        switch(this.role) {
            case "chariot":
                const {x, y} = chariotCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                this.positionX = x;
                this.positionY = y;
                break   
            case "horse":
                horseCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                break   
            case "elephant":
                elephantCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                break
            case "advisor":
                advisorCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                break
            case "general":
                generalCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                break
            case "cannon":
                cannonCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                break
            case "soldier":
                soliderCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                break
            default:
                break
        }
    }
}

const getPieceUsingCoordinate = (positionX, positionY) => {  //return an object that matches the given coordinate
    return chessBoard.find(obj => obj.x === positionX && obj.y === positionY);
}

const isEmpty = (positionX, positionY) => {
    const objToCheck = getPieceUsingCoordinate(positionX, positionY);
    if (objToCheck.role === "empty"){
        return true
    } else {
        return false
    }
}

const isEnemy = (positionX, positionY, selfTeam) => {
    const objToCheck = getPieceUsingCoordinate(positionX, positionY);
    if (objToCheck.team !== selfTeam && objToCheck.team !=="empty") {
        return true
    } else {
        return false
    }
}

const chariotCheckMove = (originalX, originalY, targetX, targetY, selfTeam) => {
    const isChariotMoveValid = (movementArr) => { //return true if valid move, false if not valid
        const movementArrRoles = movementArr.map(obj => obj.role);
        const movementArrRolesWithoutEmpty = movementArrRoles.filter(role => role !== "empty");
        const movementArrSetSize = new Set(movementArrRoles).size;
        console.log("Path:")
        console.log(movementArrRoles);
        console.log("Path set size:")
        console.log(movementArrSetSize);
        console.log('Path without "empty":')
        console.log(movementArrRolesWithoutEmpty);
        if (movementArrRoles.length === 2 && movementArrSetSize === 2 && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY))) {
            //move by one space only
            //the target must be enemy or an empty cell
            console.log("Valid move1");
            return true
        } else if (movementArrRoles.length > 2 && movementArrRolesWithoutEmpty.length === 1) {
            //move more than one space
            //the path only consist of chariot itself and empty cells
            //after filtering out empty(ies), the new movement array only contains chariot itself
            console.log("Valid move2")
            return true
        } else if (movementArrRoles.length > 2 && movementArrSetSize === 3 && movementArrRolesWithoutEmpty.length === 2 && isEnemy(targetX, targetY, selfTeam)) {
            //move more than one space
            //the path consists of exactly chariot, empty(ies), and target
            //after filtering out empty(ies), the new movement array only contains chariot itself, and one target
            //the target must be enemy
            console.log("Valid move3");
            return true
        } else {
            console.log("Invalid move 1")
            return false
        }

    }
    const updateChessBoard = () => {   //update the chess board arr with empty and target respectively
        const originalObj = getPieceUsingCoordinate(originalX, originalY);
        const targetObj = getPieceUsingCoordinate(targetX, targetY);
        targetObj.team = originalObj.team;
        targetObj.role = originalObj.role;
        targetObj.classObj.isAlive = false;
        targetObj.classObj.positionX = -1;
        targetObj.classObj.positionY = -1;
        targetObj.classObj = originalObj.classObj;
        originalObj.team = "empty";
        originalObj.role = "empty";
        originalObj.classObj = new Empty(originalX, originalY);
    }


    if (originalX !== targetX && originalY === targetY) {  //moving horizontal
        if(originalX > targetX){  //moving left
            const movementArr = chessBoard.filter(obj => obj.y === originalY && obj.x >= targetX && obj.x <= originalX)
            if(isChariotMoveValid(movementArr)){
                updateChessBoard();
                return {x: targetX, y: targetY}
            }
        } else { //moving right
            const movementArr = chessBoard.filter(obj => obj.y === originalY && obj.x <= targetX && obj.x >= originalX)
            if(isChariotMoveValid(movementArr)){
                updateChessBoard();
                return {x: targetX, y: targetY}
            }
        }
    } else if (originalX === targetX && originalY !== targetY){  //moving vertical
        if(originalY < targetY) { // moving up
            const movementArr = chessBoard.filter(obj => obj.x === originalX && obj.y <= targetY && obj.y >= originalY)
            if(isChariotMoveValid(movementArr)){
                updateChessBoard();
                return {x: targetX, y: targetY}
            }
        } else { //moving down
            const movementArr = chessBoard.filter(obj => obj.x === originalX && obj.y >= targetY && obj.y <= originalY)
            if(isChariotMoveValid(movementArr)){
                updateChessBoard();
                return {x: targetX, y: targetY}
            }
        }
    }
    console.log("Invalid move 2") //if all fails
    return {x: originalX, y: originalY}
}


const tempBlackSolider = new ChessPiece("black", "solider", 3, 1);
tempBlackSolider.create();
// const tempBlackSolider2 = new ChessPiece("black", "soldier", 3, 1);
// tempBlackSolider2.create();
const tempRedChariot = new ChessPiece("red", "chariot", 3, 6);
console.log("Before move:")
console.log(tempRedChariot)
tempRedChariot.create();
tempRedChariot.move(3, 1);
console.log("After move:")
console.log(tempBlackSolider);
console.log(tempRedChariot);

const horseCheckMove = (originalX, originalY, targetX, targetY) => {
    if ((originalX === targetX + 1 || originalX === targetX - 1) && originalY === targetY - 2) {  //moving up, then left or right
        if (originalY + 1 === isEmpty(originalX, originalY+1)) {

        }
    }
    if ((originalX === targetX + 1 || originalX === targetX - 1) && originalY === targetY + 2){  //moving down, then left or right
        if (originalY - 1 === isEmpty(originalX, originalY-1)) {

        }
    }
    if (originalX === targetX - 2 && (originalY === targetY + 1 || originalY === targetY - 1)) {  //moving left, then up or down
        if (originalX - 1 === isEmpty(originalX-1, originalY)) {

        }
    }
    if (originalX === targetX + 2 && (originalY === targetY + 1 || originalY === targetY - 1)) {  //moving right, then up or down
        if (originalX + 1 === isEmpty(originalX+1, originalY)) {
            
        }
    }
}





//Creating team red
const redChariot1 = new ChessPiece("red", "chariot", 0, 0);
redChariot1.create();
const redHorse1 = new ChessPiece("red", "horse", 1, 0);
redHorse1.create();
const redElephant = new ChessPiece("red", "elephant", 2, 0);
redElephant.create();
const redAdvisor1 = new ChessPiece("red", "advisor", 3, 0);
redAdvisor1.create();
const redGeneral = new ChessPiece("red", "general", 4, 0);
redGeneral.create();
const redAdvisor2 = new ChessPiece("red", "advisor", 5, 0);
redAdvisor2.create();
const redElephant2 = new ChessPiece("red", "elephant", 6, 0);
redElephant2.create();
const redHorse2 = new ChessPiece("red", "horse", 7, 0);
redHorse2.create();
const redChariot2 = new ChessPiece("red", "chariot", 8, 0);
redChariot2.create();
const redCannon1 = new ChessPiece("red", "cannon", 1, 2);
redCannon1.create();
const redCannon2 = new ChessPiece("red", "cannon", 7, 2);
redCannon2.create();
const redSoldier1 = new ChessPiece("red", "soldier", 0, 3);
redSoldier1.create();
const redSoldier2 = new ChessPiece("red", "soldier", 2, 3);
redSoldier2.create();
const redSoldier3 = new ChessPiece("red", "soldier", 4, 3);
redSoldier3.create();
const redSoldier4 = new ChessPiece("red", "soldier", 6, 3);
redSoldier4.create();
const redSoldier5 = new ChessPiece("red", "soldier", 8, 3);
redSoldier5.create();
//creating team black
const blackChariot1 = new ChessPiece("black", "chariot", 0, 9);
blackChariot1.create();
const blackHorse1 = new ChessPiece("black", "horse", 1, 9);
blackHorse1.create();
const blackElephant = new ChessPiece("black", "elephant", 2, 9);
blackElephant.create();
const blackAdvisor1 = new ChessPiece("black", "advisor", 3, 9);
blackAdvisor1.create();
const blackGeneral = new ChessPiece("black", "general", 4, 9);
blackGeneral.create();
const blackAdvisor2 = new ChessPiece("black", "advisor", 5, 9);
blackAdvisor2.create();
const blackElephant2 = new ChessPiece("black", "elephant", 6, 9);
blackElephant2.create();
const blackHorse2 = new ChessPiece("black", "horse", 7, 9);
blackHorse2.create();
const blackChariot2 = new ChessPiece("black", "chariot", 8, 9);
blackChariot2.create();
const blackCannon1 = new ChessPiece("black", "cannon", 1, 7);
blackCannon1.create();
const blackCannon2 = new ChessPiece("black", "cannon", 7, 7);
blackCannon2.create();
const blackSoldier1 = new ChessPiece("black", "soldier", 0, 6);
blackSoldier1.create();
const blackSoldier2 = new ChessPiece("black", "soldier", 2, 6);
blackSoldier2.create();
const blackSoldier3 = new ChessPiece("black", "soldier", 4, 6);
blackSoldier3.create();
const blackSoldier4 = new ChessPiece("black", "soldier", 6, 6);
blackSoldier4.create();
const blackSoldier5 = new ChessPiece("black", "soldier", 8, 6);
blackSoldier5.create();

console.log(chessBoard);