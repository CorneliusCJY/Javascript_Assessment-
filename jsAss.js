const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

class Field {

    field = [];
  
    constructor() {

      //The current location of your character, default location 0,0
      this.locationX = 0;
      this.locationY = 0;
        
      //creating a 2D array
      for (let a = 0; a < col; a++) {
        this.field[a] = [];
      }
      this.generateField(row, col, 0.2);    //passing 0.2 as the argument of percentage to the generateField method
    }
    generateField(height,width,percentage =0.1){
        for (let y = 0; y<height; y++){
            for (let x = 0; x, width; x++){
                const prob = Math.random();
                this.field[y][x]= fieldCharacter;
            }
        }
    }

    isInBoundaries()
    {
      //return true or false 
       //move one step to the right = x + 1
      //move one step to the left = x - 1
      //move one step up = y - 1
      //move one step down = y + 1

      //need to check if locationY within 0 and width-1 (9)    
      //need to check if locationX within 0 and height-1 (9)
      if (this.locationY >= 0 && this.locationY < col 
          && this.locationX >= 0 && this.locationX < row)
      {
        return true;
      }
      return false;
    }
  
    runGame() {
      //Implement your codes
      //print the field onto the terminal
      let playing = true;
      while (playing) {

        this.print();
        this.askQuestion();

         //Check if Char is out of boundaries (up, down, left, right
        if (!this.isInBoundaries())   //return either true or false
        {
          console.log("Out of bounds. Game Over");
          playing = false;
        }
        else
        {
          if (this.field[this.locationY][this.locationX] == hole)
            {  
              //Check if Char fell into a hole 
              console.log("Sorry, you fell down into a hole. Game Over");
              playing = false;
            }
            //Check if Char gets the hat
            else if (this.field[this.locationY][this.locationX] == hat)
            {
              console.log("Congrats. You have found your hat!");
              playing = false;
            }
            //update the location of the Character
            this.field[this.locationY][this.locationX] = pathCharacter;
          }
      }
    }
  
    print() {
      clear();
      const displayString = this.field.map(row => {
          return row.join('');
        }).join('\n');
      console.log(displayString);
    }
  
    askQuestion() {
      const answer = prompt('Which way? ').toUpperCase();
      //Implement your codes when user input u, d, l, r
      //answer can be 'u', 'd', 'l', 'r', and others
         //move one step to the right = x + 1
          //move one step to the left = x - 1
          //move one step up = y - 1
          //move one step down = y + 1
      switch(answer) {
        case 'U':
          this.locationY -= 1;
          break;
        case 'D':
          this.locationY += 1;
          break;
        case 'L':
          this.locationX -= 1;
          break;
        case 'R':
          this.locationX += 1;
          break;
        default:
          //Enter other keys
          console.log("Enter u, d, l or r");  
          this.askQuestion();
      }
    }
  
    generateField(height, width, percentage) {
      
      //percentage = 0.2

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

          //Generate random holes
          const prob = Math.random();   //0 - 1 (e.g. 0.25, 0.57)

          //Step 1: random the hole Char onto  the field 
          //random number that is generated to compare to the percentage that you have set (0.2)
          //Based on the probability of the random number 
          
          /*prob = 0.25, percentage = 0.2 
            prob = 0.18, percentage = 0.2
            prob = 0.87, percentage = 0.2

            if prob <= percentage, generate hole
            if prob > percentage, generate fieldCharacter
          */

          //this.field[y][x] = fieldCharacter;
          //Ternary Operator
          this.field[y][x] = prob > percentage ? fieldCharacter : hole;

          //x populate the columns 10
          //y populate the rows 10
        
        }
      }
  
      //Set the "hat" location randomly
      //Two Math.random() - to populate x & y position 
      let hatX = Math.floor(Math.random() * width); //0-9
      let hatY = Math.floor(Math.random() * height);

      //What if hatX and hatY position is 0,0 - it will replace the character with the hat
      //check if hat will replace character or not - Char position is 0,0

      //if-else - only check once: random give us back 0,0 again
      //for loop - how many times to loop until 
      //while/do-while

      do {
        hatX = Math.floor(Math.random() * width);
        hatY = Math.floor(Math.random() * height);
      } 
      while (hatX == 0 && hatY == 0)    //|| (0, 6) , (4, 0) , (0,1)

      //5, 6 - set the position of the hat
      this.field[hatY][hatX] = hat;
    
      //set character position as [0][0]
      this.field[0][0] = pathCharacter;
    }
  }
  
  //Create an instance object of the Field Class
  const myfield = new Field();
  myfield.runGame();

