document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []

    const candyColor = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue',
    ]

    // Creation de tableau
    function createBoard() {
        for (let i=0; i< width*width; i++) {
            const square = document.createElement('div')
            let randomColor = Math.floor(Math.random() * candyColor.length)
            square.style.backgroundColor = candyColor[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()







})