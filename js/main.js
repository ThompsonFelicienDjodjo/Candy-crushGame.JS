document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0

    const candyColor = [
        'url(image/blue-candy.png)',
        'url(image/green-candy.png)',
        'url(image/orange-candy.png)',
        'url(image/purple-candy.png)',
        'url(image/red-candy.png)',
        'url(image/yellow-candy.png)',
    ]

    // Creation de tableau
    function createBoard() {
        for (let i=0; i< width*width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColor.length)
            square.style.backgroundImage = candyColor[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

// Faire glisser les bonbons
    let colorBeingDragged
    let colorBeingReplaced
    let  squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
        console.log(colorBeingDragged)
        console.log(this.id, 'dragstart')
    }

    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, 'dragOver')
    }

    function dragEnter(e) {
        e.preventDefault()
        console.log(this.id, 'dragEnter')
    }

    function dragLeave() {
        console.log(this.id, 'dragLeave')
    }

    function dragDrop() {
        console.log(this.id, 'dragDrop')
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage  = colorBeingDragged
        squares [squareIdBeingDragged].style.backgroundImage  = colorBeingReplaced
    }

    function dragEnd() {
        console.log(this.id, 'dragEnd')
        // Faire le movement valide lors du déplacement des caes
        let validMoves = [
            squareIdBeingDragged -1,
            squareIdBeingDragged -width,
            squareIdBeingDragged +1,
            squareIdBeingDragged +width,
        ]
        let validMove = validMoves.includes(squareIdBeingReplaced)

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validMove) {
            squares [squareIdBeingReplaced].style.backgroundImage  = colorBeingReplaced
            squares [squareIdBeingDragged].style.backgroundImage  = colorBeingDragged
        } else squares [squareIdBeingDragged].style.backgroundImage  = colorBeingDragged
    }

// Deposer des bonbons une fois que certains sont nettoyés
    function moveDown() {
        for(i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage  === '') {
                squares[i + width].style.backgroundImage  = squares[i].style.backgroundImage
                squares[i].style.backgroundImage  = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && squares[i].style.backgroundImage  === '') {
                    let randomColor = Math.floor(Math.random() * candyColor.length)
                    squares[i].style.backgroundImage  = candyColor[randomColor]
                }
            }
        }
    }


   // verification des correspondances
    // verication de la rangée de quatre
    function checkRowForFour () {
        for (i = 0; i<60; i++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage  === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundImage  === decidedColor && !isBlank)){
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                    squares [index].style.backgroundImage  = ''
                })
            }
        }
    }
    checkRowForFour()

    // verication de la colonne de quatre
    function checkColumnForFour() {
        for (i = 0; i<47; i++) {
            let columnOfFour = [i, i+width, i+width*2, i+width*3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfFour.every(index => squares[index].style.backgroundImage  === decidedColor && !isBlank)){
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index => {
                    squares [index].style.backgroundImage  = ''
                })
            }
        }
    }
    checkColumnForFour()

    // verication de la rangée de trois
    function checkRowForThree () {
        for (i = 0; i<61; i++) {
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage  === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31,38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundImage  === decidedColor && !isBlank)){
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                    squares [index].style.backgroundImage  = ''
                })
            }
        }
    }
    checkRowForThree()

    // verication de la colonne de trois
    function checkColumnForThree () {
        for (i = 0; i<47; i++) {
            let columnOfThree = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage  === ''

            if (columnOfThree.every(index => squares[index].style.backgroundImage  === decidedColor && !isBlank)){
                score += 3
                scoreDisplay.innerHTML = score
               columnOfThree.forEach(index => {
                    squares [index].style.backgroundImage  = ''
                })
            }
        }
    }
    checkColumnForThree()

    window.setInterval(function () {
        moveDown()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
    }, 100)




})