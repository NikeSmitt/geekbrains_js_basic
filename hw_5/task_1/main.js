console.log('Welcome');
let body = document.body;
// console.log(body);

function createBoard(size) {

    // считаем размеры квадратов и корректируем размер доски
    const squareSize = Math.floor(size / 8);
    const board = document.createElement('div');
    board.style.width = `${squareSize * 8}px`;
    board.style.height = `${squareSize * 8}px`;
    board.classList.add('board')

    
    const letters = "ABCDEFGH"

    let isBlack = false;
    for (let rowNum = 0; rowNum < 8; rowNum += 1) {
        // каждая строка начинается с противоположного цвета
        isBlack = !isBlack;
        const newRow = document.createElement('div');
        newRow.classList.add('row');

        for (let squareNum = 0; squareNum < 8; squareNum += 1) {
            const square = document.createElement('div');
            if (isBlack) {
                square.style.backgroundColor = 'rgb(66, 30, 0)';
            } else {
                square.style.backgroundColor = 'rgb(243, 222, 198)';
            }

            // устанавливаем размеры квадратов
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;


            //добавляем номера строк
            if (squareNum === 0) {
                const el = document.createElement('div');
                el.classList.add(isBlack ? 'white' : 'black');
                el.textContent = `${8 - rowNum}`;
                square.appendChild(el)
            }

            //добавляем буквы столбцов
            if (rowNum === 0) {
                const el = document.createElement('div');
                el.classList.add(isBlack ? 'white' : 'black');
                el.textContent = `${letters[squareNum]}`;
                square.appendChild(el)
            }

            
            // каждый следующий квадрат меняет цвет
            isBlack = !isBlack;     
            newRow.appendChild(square);
        }
        board.appendChild(newRow);
    }
    return board;
}


// for px only
boardSize = 500;
document.body.appendChild(createBoard(700));