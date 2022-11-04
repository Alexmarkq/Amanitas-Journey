const game = document.querySelector('canvas')
const start = document.querySelector('div')
const startButton = document.querySelector('button')

startButton.onclick = () => {
    start.classList.add('hidden')
    game.classList.remove('hidden')
    app.init()
}



