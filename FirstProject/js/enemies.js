class Enemies {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.enemiesPos = { x: 25, y: this.getRandom(300, 600) }
        this.enemiesSize = { w: 120, h: 120 }
        this.enemiesSpeed = this.getRandom(3, 5)
        this.imageInstance = undefined
        this.enemiesImg = './images/enemy.png'
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = this.enemiesImg
    }

    drawEnemies() {
        this.ctx.drawImage(
            this.imageInstance,
            this.enemiesPos.x,
            this.enemiesPos.y,
            this.enemiesSize.w,
            this.enemiesSize.h
        )
        this.moveEnemies()
    }

    moveEnemies() {
        if (this.enemiesPos.x >= this.canvasSize.w - this.enemiesSize.w) {
            this.enemiesSpeed *= -1
        }
        this.enemiesPos.x += this.enemiesSpeed
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min
    }
}