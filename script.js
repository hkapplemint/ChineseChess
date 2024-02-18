const chessBoard = []
const createEmptyChessBoard = () => {
    for (let y = 0; y < 10 ; y++) {
        for (let x = 0; x < 9; x ++){
            chessBoard.push({x, y, team: "empty",role: "empty"})
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
    }

    move(targetX, targetY) {
        switch(this.role) {
            case "chariot":
                chariotCheckMove(this.originalX, this.originalY, targetX, targetY);
                break   
            case "horse":
                horseCheckMove(this.originalX, this.originalY, targetX, targetY);
                break   
            case "elephant":
                elephantCheckMove(this.originalX, this.originalY, targetX, targetY);
                break
            case "advisor":
                advisorCheckMove(this.originalX, this.originalY, targetX, targetY);
                break
            case "general":
                generalCheckMove(this.originalX, this.originalY, targetX, targetY);
                break
            case "cannon":
                cannonCheckMove(this.originalX, this.originalY, targetX, targetY);
                break
            case "soldier":
                soliderCheckMove(this.originalX, this.originalY, targetX, targetY);
                break
            default:
                break
        }
    }
}



const isEmpty = (positionX, positionY) => {
    //check something
    return //true or false
}

const chariotCheckMove = (originalX, originalY, targetX, targetY) => {
    if (originalX !== targetX && originalY === targetY) {  //moving horizontal

        return
    } else if (originalX === targetX && originalY !== targetY){  //moving vertical

        return
    }
    return console.log("Invalid move")
}

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