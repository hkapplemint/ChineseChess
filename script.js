const container = document.getElementById("container");

const turnDisplay = document.getElementById("turn-display")


class Empty {
    constructor(originalX, originalY) {
        this.team = "empty";
        this.role = "empty";
        this.positionX = originalX;
        this.positionY = originalY;
        this.isAlive = false;
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

const createEmptyElementsFromEmptyCells = (arr) => {
    arr.forEach(obj => {
        if (obj.role === "empty" && obj.team === "empty"){
            const emptyElement = document.createElement("div");
            const gridCol = obj.x + 1;
            const gridRow = Math.abs(obj.y - 10);
            emptyElement.id = `empty-col-${gridCol}-rol-${gridRow}`;
            emptyElement.style.width = "90%";
            emptyElement.style.height = "90%";
            emptyElement.dataset.x = obj.x;
            emptyElement.dataset.y = obj.y;
            emptyElement.style.gridArea = `${gridRow} / ${gridCol} / ${gridRow + 1} / ${gridCol + 1}`;

            container.append(emptyElement);
        } else {
        }
    });
}

createEmptyChessBoard();


class ChessPiece {
    constructor(team, role, originalX, originalY, id) {
        this.team = team;
        this.role = role;
        this.positionX = originalX;
        this.positionY = originalY;
        this.isAlive = true;
        this.id = id;
    }

    create() {
        const kebabToCamel = (kebabString) => {
            return kebabString.replace((/-([a-z0-9])/g), (_match, letter) => {
                return letter.toUpperCase();
            });
        }

        const objToUpdate = chessBoard.find(obj => obj.x === this.positionX && obj.y === this.positionY);
        objToUpdate.team = this.team;
        objToUpdate.role = this.role;
        objToUpdate.classObj = this;
        const createElement = document.createElement("img");
        createElement.id = `${this.team}-${this.role}-${this.id}`;
        createElement.src = `img/${this.team}_${this.role}.png`;
        createElement.classList.add("chess-piece");
        createElement.style.gridArea = `${Math.abs(this.positionY - 10)} / ${this.positionX + 1} / ${Math.abs(this.positionY - 10) + 1} / ${this.positionX + 1 + 1}`;
        createElement.draggable = false;
        createElement.dataset.x = this.positionX;
        createElement.dataset.y = this.positionY;
        createElement.dataset.name = `${kebabToCamel(createElement.id)}`

        container.append(createElement);
    }
    
    move(targetX, targetY) {
        let returnCoordinate = {x: this.positionX, y: this.positionY};
        let isMoved = false;
        switch(this.role) {
            case "chariot":
                returnCoordinate = chariotCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                isMoved = (returnCoordinate.x !== this.positionX || returnCoordinate.y !== this.positionY);
                this.positionX = returnCoordinate.x;
                this.positionY = returnCoordinate.y;
                console.log(isMoved)
                return isMoved;
            case "horse":
                returnCoordinate = horseCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                isMoved = (returnCoordinate.x !== this.positionX || returnCoordinate.y !== this.positionY);
                this.positionX = returnCoordinate.x;
                this.positionY = returnCoordinate.y;
                return isMoved;
            case "elephant":
                returnCoordinate = elephantCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                isMoved = (returnCoordinate.x !== this.positionX || returnCoordinate.y !== this.positionY);
                this.positionX = returnCoordinate.x;
                this.positionY = returnCoordinate.y;
                return isMoved;
            case "advisor":
                returnCoordinate = advisorCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                isMoved = (returnCoordinate.x !== this.positionX || returnCoordinate.y !== this.positionY);
                this.positionX = returnCoordinate.x;
                this.positionY = returnCoordinate.y;
                return isMoved;
            case "general":
                returnCoordinate = generalCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                isMoved = (returnCoordinate.x !== this.positionX || returnCoordinate.y !== this.positionY);
                this.positionX = returnCoordinate.x;
                this.positionY = returnCoordinate.y;
                return isMoved;
            case "cannon":
                returnCoordinate = cannonCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                isMoved = (returnCoordinate.x !== this.positionX || returnCoordinate.y !== this.positionY);
                this.positionX = returnCoordinate.x;
                this.positionY = returnCoordinate.y;
                return isMoved;
            case "soldier":
                returnCoordinate = soliderCheckMove(this.positionX, this.positionY, targetX, targetY, this.team);
                isMoved = (returnCoordinate.x !== this.positionX || returnCoordinate.y !== this.positionY);
                this.positionX = returnCoordinate.x;
                this.positionY = returnCoordinate.y;
                return isMoved;
            default:
                return false
        }
    }
}

const getPieceUsingCoordinate = (positionX, positionY) => {
    //return an object that matches the given coordinate
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

const updateChessBoard = (originalX, originalY, targetX, targetY) => {
    //update the chess board arr with empty and target respectively
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

const chariotCheckMove = (originalX, originalY, targetX, targetY, selfTeam) => {
    console.log(`Chariot moving, ox:${originalX} oy:${originalY} tx:${targetX} ty:${targetY}`);
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

    if (originalX !== targetX && originalY === targetY) {  //moving horizontal
        if(originalX > targetX){  //moving left
            const movementArr = chessBoard.filter(obj => obj.y === originalY && obj.x >= targetX && obj.x <= originalX)
            if(isChariotMoveValid(movementArr)){
                console.log("Chariot valid move1")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        } else { //moving right
            const movementArr = chessBoard.filter(obj => obj.y === originalY && obj.x <= targetX && obj.x >= originalX)
            if(isChariotMoveValid(movementArr)){
                console.log("Chariot valid move2")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        }
    } else if (originalX === targetX && originalY !== targetY){  //moving vertical
        if(originalY < targetY) { // moving up
            const movementArr = chessBoard.filter(obj => obj.x === originalX && obj.y <= targetY && obj.y >= originalY)
            if(isChariotMoveValid(movementArr)){
                console.log("Chariot valid move3")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        } else { //moving down
            const movementArr = chessBoard.filter(obj => obj.x === originalX && obj.y >= targetY && obj.y <= originalY)
            if(isChariotMoveValid(movementArr)){
                console.log("Chariot valid move4")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        }
    }
    console.log("Chariot invalid move 2") //if all fails
    return {x: originalX, y: originalY}
}

const horseCheckMove = (originalX, originalY, targetX, targetY, selfTeam) => {
    if ((originalX === targetX + 1 || originalX === targetX - 1) && originalY === targetY - 2) {  //moving up, then left or right
        if (isEmpty(originalX, originalY+1) && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
            if (originalX === targetX + 1) { //moving up, then left
                console.log("Horse valid move1");
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            } else {
                //moving up, then right
                console.log("Horse valid move2");
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        }
    }
    if ((originalX === targetX + 1 || originalX === targetX - 1) && originalY === targetY + 2){  //moving down, then left or right
        if (isEmpty(originalX, originalY-1) && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
            if (originalX === targetX + 1) { //moving down, then left
                console.log("Horse valid move3");
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            } else {
                //moving down, then right
                console.log("Horse valid move4");
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        }
    }
    if (originalX === targetX - 2 && (originalY === targetY + 1 || originalY === targetY - 1)) {  //moving right, then up or down
        if (isEmpty(originalX+1, originalY) && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
            if (originalY === targetY + 1) { //moving right, then down
                console.log("Horse valid move5");
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            } else {
                //moving right, then up
                console.log("Horse valid move6");
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        }
    }
    if (originalX === targetX + 2 && (originalY === targetY + 1 || originalY === targetY - 1)) {  //moving left, then up or down
        if (isEmpty(originalX-1, originalY) && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
            if (originalY === targetY + 1) { //moving left, then down
                console.log("Horse valid move7");
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            } else {
                //moving left, then up
                console.log("Horse valid move8");
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        }
    }

    console.log("Horse invalid Move2");
    return {x: originalX, y: originalY}
}

const elephantCheckMove = (originalX, originalY, targetX, targetY, selfTeam) => {
    if (selfTeam === "red" && targetY >= 5) {
        console.log("Red Elephant attempted to cross river")
        return {x: originalX, y: originalY}
    }
    if (selfTeam === "black" && targetY <= 4) {
        console.log("Black Elephant attempted to cross river")
        return {x: originalX, y: originalY}
    }

    if (originalX - 2 === targetX && originalY + 2 === targetY && isEmpty(originalX - 1, originalY + 1) && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        //moving left and up
        console.log("Elephant valid move1");
        updateChessBoard(originalX, originalY, targetX, targetY);
        return {x: targetX, y: targetY}
    } else if (originalX + 2 === targetX && originalY + 2 === targetY && isEmpty(originalX + 1, originalY + 1) && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        //moving right and up
        console.log("Elephant valid move2");
        updateChessBoard(originalX, originalY, targetX, targetY);
        return {x: targetX, y: targetY}
    } else if (originalX - 2 === targetX && originalY - 2 === targetY && isEmpty(originalX - 1, originalY - 1) && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        //moving left and down
        console.log("Elephant valid move3");
        updateChessBoard(originalX, originalY, targetX, targetY);
        return {x: targetX, y: targetY}
    } else if (originalX + 2 === targetX && originalY - 2 === targetY && isEmpty(originalX + 1, originalY - 1) && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        //moving right and down
        console.log("Elephant valid move4");
        updateChessBoard(originalX, originalY, targetX, targetY);
        return {x: targetX, y: targetY}
    }

    console.log("Elephant invalid move2")
    return {x: originalX, y: originalY}
}

const advisorCheckMove = (originalX, originalY, targetX, targetY, selfTeam) => {
    if (selfTeam === "red" && targetX >= 3 && targetX <= 5 && targetY >= 0 && targetY <= 2 && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        if (originalX - 1 === targetX && originalY + 1 === targetY) {
            //moving left and up
            console.log("Advisor valid move1")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX + 1 === targetX && originalY + 1 === targetY) {
            //moving right and up
            console.log("Advisor valid move2")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX - 1 === targetX && originalY - 1 === targetY) {
            //moving left and down
            console.log("Advisor valid move3")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX + 1 === targetX && originalY - 1 === targetY) {
            //moving right and down
            console.log("Advisor valid move4")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        }
    } else if (selfTeam === "black" && targetX >= 3 && targetX <= 5 && targetY >= 7 && targetY <= 9 && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        if (originalX - 1 === targetX && originalY + 1 === targetY) {
            //moving left and up
            console.log("Advisor valid move1")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX + 1 === targetX && originalY + 1 === targetY) {
            //moving right and up
            console.log("Advisor valid move2")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX - 1 === targetX && originalY - 1 === targetY) {
            //moving left and down
            console.log("Advisor valid move3")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX + 1 === targetX && originalY - 1 === targetY) {
            //moving right and down
            console.log("Advisor valid move4")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        }
    }
    console.log("Advisor invalid move2")
    return {x: originalX, y: originalY}
}

const generalCheckMove = (originalX, originalY, targetX, targetY, selfTeam) => {
    if (selfTeam === "red" && targetX >= 3 && targetX <= 5 && targetY >= 0 && targetY <= 2 && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        if (originalX - 1 === targetX && originalY === targetY) {
            //moving left
            console.log("General valid move1")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX + 1 === targetX && originalY === targetY) {
            //moving right
            console.log("General valid move2")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX === targetX && originalY + 1 === targetY) {
            //moving up
            console.log("General valid move3")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX === targetX && originalY - 1 === targetY) {
            //moving down
            console.log("General valid move4")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        }
    } else if (selfTeam === "black" && targetX >= 3 && targetX <= 5 && targetY >= 7 && targetY <= 9  && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        if (originalX - 1 === targetX && originalY === targetY) {
            //moving left
            console.log("General valid move1")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX + 1 === targetX && originalY === targetY) {
            //moving right
            console.log("General valid move2")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX === targetX && originalY + 1 === targetY) {
            //moving up
            console.log("General valid move3")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalX === targetX && originalY - 1 === targetY) {
            //moving down
            console.log("General valid move4")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        }
    }

    console.log("General invalid move2");
    return {x: originalX, y: originalY}
}

const cannonCheckMove = (originalX, originalY, targetX, targetY, selfTeam) => {
    const isCannonMoveValid = (movementArr) => { //return true if valid move, false if not valid
        const movementArrRoles = movementArr.map(obj => obj.role);
        const movementArrRolesWithoutEmpty = movementArrRoles.filter(role => role !== "empty");
        const movementArrSetSize = new Set(movementArrRoles).size;
        console.log("Path:")
        console.log(movementArrRoles);
        console.log("Path set size:")
        console.log(movementArrSetSize);
        console.log('Path without "empty":')
        console.log(movementArrRolesWithoutEmpty);

        if (movementArrRoles.length === 2 && movementArrSetSize === 2 && isEmpty(targetX, targetY)) {
            //move by one space only
            //the target must be an empty cell
            console.log("Valid move1");
            return true
        } else if (movementArrRoles.length > 2 && movementArrRolesWithoutEmpty.length === 1) {
            //move more than one space
            //the path only consist of chariot itself and empty cells
            //after filtering out empty(ies), the new movement array only contains cannon itself
            console.log("Valid move2")
            return true
        } else if (movementArrRoles.length > 2 && movementArrRolesWithoutEmpty.length === 3 && isEnemy(targetX, targetY, selfTeam)) {
            //cannon -> someChessPiece -> target
            //move more than one space
            //the path consists of cannon, +-empty(ies), someChessPiece, and target
            //after filtering out empty(ies), the new movement array only contains cannon itself, someChessPiece, and one target
            //the target must be enemy
            console.log("Valid move3");
            return true
        } else {
            console.log("Invalid move 1")
            return false
        }
    }

    if (originalX !== targetX && originalY === targetY) {  //moving horizontal
        if(originalX > targetX){  //moving left
            const movementArr = chessBoard.filter(obj => obj.y === originalY && obj.x >= targetX && obj.x <= originalX)
            if(isCannonMoveValid(movementArr)){
                console.log("Cannon valid move1")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        } else { //moving right
            const movementArr = chessBoard.filter(obj => obj.y === originalY && obj.x <= targetX && obj.x >= originalX)
            if(isCannonMoveValid(movementArr)){
                console.log("Cannon valid move2")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        }
    } else if (originalX === targetX && originalY !== targetY){  //moving vertical
        if(originalY < targetY) { // moving up
            const movementArr = chessBoard.filter(obj => obj.x === originalX && obj.y <= targetY && obj.y >= originalY)
            if(isCannonMoveValid(movementArr)){
                console.log("Cannon valid move3")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        } else { //moving down
            const movementArr = chessBoard.filter(obj => obj.x === originalX && obj.y >= targetY && obj.y <= originalY)
            if(isCannonMoveValid(movementArr)){
                console.log("Cannon valid move4")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        }
    }

    console.log("Cannon invalid move2");
    return {x: originalX, y: originalY}
}

const soliderCheckMove = (originalX, originalY, targetX, targetY, selfTeam) => {
    if (selfTeam === "red" && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        if (originalY <= 4 && originalX === targetX && originalY + 1 === targetY) {
            //red solider, not yet crossed the river, moving up
            console.log("Red soldier, not crossed river, moving up")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalY >= 5) {
            //red solider crossed the river
            if (originalX === targetX && originalY + 1 === targetY) {
                //moving up
                console.log("Red solider moving up")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
            if (originalX - 1 === targetX && originalY === targetY) {
                //moving left
                console.log("Red solder moving left")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
            if (originalX + 1 === targetX && originalY === targetY) {
                //moving right
                console.log("Red solder moving right")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
        }
    } else if (selfTeam === "black" && (isEmpty(targetX, targetY) || isEnemy(targetX, targetY, selfTeam))) {
        if (originalY >= 5 && originalX === targetX && originalY - 1 === targetY) {
            //black solider, not yet crossed the river, moving down
            console.log("black soldier, not crossed river, moving down")
            updateChessBoard(originalX, originalY, targetX, targetY);
            return {x: targetX, y: targetY}
        } else if (originalY <= 4) {
            //black soldier crossed river
            if (originalX === targetX && originalY - 1 === targetY) {
                //moving down
                console.log("Black solider moving down")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
            if (originalX - 1 === targetX && originalY === targetY) {
                //moving left
                console.log("Black solder moving left")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
            if (originalX + 1 === targetX && originalY === targetY) {
                //moving right
                console.log("Black solder moving right")
                updateChessBoard(originalX, originalY, targetX, targetY);
                return {x: targetX, y: targetY}
            }
            
        }
    }

    console.log("Soldier invalid move2");
    return {x: originalX, y: originalY}
}


const chessPieces = {
//creating team red
    redchariot1: new ChessPiece("red", "chariot", 0, 0, 1),
    redHorse1: new ChessPiece("red", "horse", 1, 0, 1),
    redElephant1: new ChessPiece("red", "elephant", 2, 0, 1),
    redAdvisor1: new ChessPiece("red", "advisor", 3, 0, 1),
    redGeneral1: new ChessPiece("red", "general", 4, 0, 1),
    redAdvisor2: new ChessPiece("red", "advisor", 5, 0, 2),
    redElephant2: new ChessPiece("red", "elephant", 6, 0, 2),
    redHorse2: new ChessPiece("red", "horse", 7, 0, 2),
    redChariot2: new ChessPiece("red", "chariot", 8, 0, 2),
    redCannon1: new ChessPiece("red", "cannon", 1, 2, 1),
    redCannon2: new ChessPiece("red", "cannon", 7, 2, 2),
    redSoldier1: new ChessPiece("red", "soldier", 0, 3, 1),
    redSoldier2: new ChessPiece("red", "soldier", 2, 3, 2),
    redSoldier3: new ChessPiece("red", "soldier", 4, 3, 3),
    redSoldier4: new ChessPiece("red", "soldier", 6, 3, 4),
    redSoldier5: new ChessPiece("red", "soldier", 8, 3, 5),
//creating team black
    blackChariot1: new ChessPiece("black", "chariot", 0, 9, 1),
    blackHorse1: new ChessPiece("black", "horse", 1, 9, 1),
    blackElephant1: new ChessPiece("black", "elephant", 2, 9, 1),
    blackAdvisor1: new ChessPiece("black", "advisor", 3, 9, 1),
    blackGeneral1: new ChessPiece("black", "general", 4, 9, 1),
    blackAdvisor2: new ChessPiece("black", "advisor", 5, 9, 2),
    blackElephant2: new ChessPiece("black", "elephant", 6, 9, 2),
    blackHorse2: new ChessPiece("black", "horse", 7, 9, 2),
    blackChariot2: new ChessPiece("black", "chariot", 8, 9, 2),
    blackCannon1: new ChessPiece("black", "cannon", 1, 7, 1),
    blackCannon2: new ChessPiece("black", "cannon", 7, 7, 2),
    blackSoldier1: new ChessPiece("black", "soldier", 0, 6, 1),
    blackSoldier2: new ChessPiece("black", "soldier", 2, 6, 2),
    blackSoldier3: new ChessPiece("black", "soldier", 4, 6, 3),
    blackSoldier4: new ChessPiece("black", "soldier", 6, 6, 4),
    blackSoldier5: new ChessPiece("black", "soldier", 8, 6, 5)
}

for (let key in chessPieces) {
    if(chessPieces.hasOwnProperty(key)) {
        chessPieces[key].create();
    }
}

createEmptyElementsFromEmptyCells(chessBoard);

console.log(chessBoard);

let selectedPiece = "";
let selectedElement = "";
let clickStage = 0;

let isRedsTurn = true;
let isGameEnded = false;

document.addEventListener("click", event => {
    if (isGameEnded) {
        return
    }

    const clickedElement = event.target;

    if (clickStage === 0 && !clickedElement.id.startsWith("e")) {
        //user select a chess piece
        if(isRedsTurn && clickedElement.id.startsWith("r")) {
            selectedPiece = chessPieces[clickedElement.dataset.name];
            selectedElement = clickedElement;
            selectedElement.classList.add("selected");
            console.log(selectedElement);
            clickStage++;
        } else if (!isRedsTurn && clickedElement.id.startsWith("b")) {
            selectedPiece = chessPieces[clickedElement.dataset.name];
            selectedElement = clickedElement;
            selectedElement.classList.add("selected");
            console.log(selectedElement);
            clickStage++;
        }
    }

    if (clickStage === 1 && chessPieces[clickedElement.dataset.name] !== selectedPiece) {
        if (isRedsTurn && clickedElement.id.startsWith("r")) {
            selectedElement.classList.remove("selected");
            selectedPiece = chessPieces[clickedElement.dataset.name];
            selectedElement = clickedElement;
            //new element is now selected
            selectedElement.classList.add("selected");
            console.log(selectedElement);
        } else if (!isRedsTurn && clickedElement.id.startsWith("b")) {
            selectedElement.classList.remove("selected");
            selectedPiece = chessPieces[clickedElement.dataset.name];
            selectedElement = clickedElement;
            //new element is now selected
            selectedElement.classList.add("selected");
            console.log(selectedElement);
        } else {
            //after selecting a chess piece, user clicked another element that is not the same chess piece
            const update = () => {
                //creating an empty element to fill the spot
                const newEmptyElement = document.createElement("div");
                newEmptyElement.style.width = "90%";
                newEmptyElement.style.height = "90%";
                newEmptyElement.style.gridArea = selectedElement.style.gridArea;
                newEmptyElement.dataset.x = selectedElement.dataset.x;
                newEmptyElement.dataset.y = selectedElement.dataset.y;
                console.log("2" + selectedElement.style.gridArea);
                container.append(newEmptyElement);
        
        
                selectedElement.dataset.x = clickedElement.dataset.x;
                selectedElement.dataset.y = clickedElement.dataset.y;
                selectedElement.style.gridArea = clickedElement.style.gridArea;
        
                clickedElement.remove();
            }

            selectedElement.classList.remove("selected");
            const x = parseInt(event.target.dataset.x);
            const y = parseInt(event.target.dataset.y);
            const isMoved = selectedPiece.move(x, y);
            if (isMoved) {
                update();

                //check end game
                if (isRedsTurn && event.target.id.includes("general")) {
                    isGameEnded = true;
                    turnDisplay.textContent = "Game Ended";
                    console.log("Game Ended");
                } else if (!isRedsTurn && event.target.id.includes("general")) {
                    isGameEnded = true;
                    turnDisplay.textContent = "Game Ended";
                    console.log("Game Ended");
                } else {
                    isRedsTurn = !isRedsTurn;
                    turnDisplay.textContent = isRedsTurn ? "Red" : "Black";
                }

                
            }
        
            clickStage = 0;
        }
    }
    


    console.log(event.target);
    console.log(clickStage);
})
