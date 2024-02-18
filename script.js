class ChessPiece {
    constructor(team, role, originalX, originalY) {
        this.team = team;
        this.role = role;
        this.positionX = originalX;
        this.positionY = originalY;
        this.alive = true;
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
        if (originalY + 1 !== ) {            //need to think

        }
    }
}