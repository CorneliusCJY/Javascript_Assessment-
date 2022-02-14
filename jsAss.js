const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
const {timeStamp } = require('console'); 
const { eventNames } = require('process');
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
let game = true;

class Field{
    field = [];
    constructor(){
        this.locationX = 0;
        this.locationY = 0;
        for(let a = 0; a < col; a++)
        {    this.field[a] = [];
        }
        this.generateField(row, col, 0.2);
    }
    askQuestion() {
        const answer = prompt('Where do you want to move? (u = up, d = down, l = left, r = right)')
        // wipe the old pathCharacter
        this._field[this.y][this.x] = fieldCharacter;
        switch(direction) {
          // up
          case 'u':
            this.y -= 1;//keycodes up = 38
            break;
          // down
          case 'd':
            this.y += 1;  // keycodes down 40
            break;
          // left
          case 'l':
            this.x -= 1;// keycodes left = 37
            break;
          // right
          case 'r':
            this.x += 1; // keycodes right = 38
        }
      }
    
    generateField(height, width, percentage = 0.1)
    {  
        for (let y = 0; y < height; y++){
            for (let x = 0; x < width; x++) {
            //generate random holes
            const prob = Math.random();
            this.field[y][x] = fieldCharacter;
            }
        }
        // make a hole in every row of the field (except for the very first)
        for (let k = 1; k < height; k++) {
          let makeHole = Math.floor(Math.random() * width);
          this.field[k][makeHole] = hole;
        }
        // put the hat on the last row of the field
        let makeHat = Math.floor(Math.random() * width)
        this.field[width-1][makeHat] = hat;

        //this.field[y][x] = pathCharacter;
        this.field[this.locationX][this.locationY] = pathCharacter;
        return Field;
    }


    runGame(){
        let game = true
        while (game === true)
          switch (this.field[this.locationX][this.locationY]){
            case fieldCharacter : 
                this._field[this.y][this.x] = pathCharacter;
                this.print(this._field);
                this.askQuestion()
            break;
            
            case hole:
                console.log(`Sorry, you fell down a hole!`);
                game = false;
                break;
            case hat:
                console.log(`Congrats, you found your hat!`);
                game = false;
                break;
            case undefined:
                console.log (`Out of bounds - Game End!`)
                game = false;
            
    }    }

    print()
    {   clear ();
        const displayString = this.field.map (row =>{
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

}
 //End of Class
const myfield = new Field();
myfield.runGame();

