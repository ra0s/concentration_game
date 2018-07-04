class BoardSquare {
    constructor(element, color) {
        this.element = element;
        this.element.addEventListener("click", this, false);
        this.setColor(color);
        this.isFaceUp = false;
        this.isMatched = false;
    }

    handleEvent(event) {
        switch (event.type) {
          case "click":
            // 1
            if (this.isFaceUp || this.isMatched) {
              // 2
              return;
            }
      
            // 3
            this.isFaceUp = true;
            this.element.classList.add('flipped');
      
            // 4
            squareFlipped(this);
        }
      }
    setColor(color) {
        const faceUpElement = this.element.getElementsByClassName('faceup')[0];
        faceUpElement.classList.remove(this.color);
        this.color = color;
        faceUpElement.classList.add(color);
    }
    reset() {
        this.isFaceUp = false;
        this.isMatched = false;
        this.element.classList.remove('flipped');
      }
    
      matchFound() {
        this.isFaceUp = true;
        this.isMatched = true;
      }
    
}


function generateHTMLForBoardSquares() {
    const numberOfSquares = 16;
    let squaresHTML = '';
  
    // generate HTML for board squares
    for (let i = 0; i < numberOfSquares; i++) {
      squaresHTML +=
        '<div class="col-3 board-square">\n' +
        '<div class="face-container">\n' +
        '<div class="facedown"></div>\n' +
        '<div class="faceup"></div>\n' +
        '</div>\n' +
        '</div>\n';
    }
  
    // insert squares HTML in DOM
    const boardElement = document.getElementById('gameboard');
    boardElement.innerHTML = squaresHTML;
  }
  
  generateHTMLForBoardSquares();

  const colorPairs = [];

  function generateColorPairs() {
      if(colorPairs.length > 0) 
      {
        return colorPairs;
      }
      else
      {
          for(let i = 0; i < 8; i++)
          {
              colorPairs.push('color-' + i);
              colorPairs.push('color-' + i);
          }
          
          return colorPairs;
      }
  }

  function shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;
      while (0 !== currentIndex)
      {
          //Select a random number
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          //Swap it with current number
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
  }
  function shuffleColors() {
    const colorPairs = generateColorPairs()
    return shuffle(colorPairs);
  }
  const boardSquares = [];
  function setupGame() {
      generateHTMLForBoardSquares();
      const randomColorPairs = shuffleColors();
      const squareElements = document.getElementsByClassName("board-square");
      for(let i = 0; i < squareElements.length; i++)
      {
          const element = squareElements[i];
          const color = randomColorPairs[i];
          const square = new BoardSquare(element, color);
          boardSquares.push(square);
      }
  }
  setupGame();

  let firstFaceupSquare = null;

function squareFlipped(square) {
  // 2
  if (firstFaceupSquare === null) {
    firstFaceupSquare = square;
    return
  }

  // 3
  if (firstFaceupSquare.color === square.color) {
    // 4
    firstFaceupSquare.matchFound();
    square.matchFound();

    firstFaceupSquare = null;
  } else {
    // 5
    const a = firstFaceupSquare;
    const b = square;

    firstFaceupSquare = null;

    setTimeout(function() {
      a.reset();
      b.reset();
    }, 400);
  }
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => { 
    resetGame();
});

function resetGame()
{
    firstFaceupSquare = null;
    boardSquares.forEach((square) => { 
        square.reset()
    });

    setTimeout(() => {
        const randomColorPairs = shuffleColors();
        for(let i = 0; i < boardSquares.length; i++)
        {
            const newColor = randomColorPairs[i];
            const square = boardSquares[i];
            square.setColor(newColor);
        }
    }, 500);
}