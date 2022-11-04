class Platforms {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.platformSize = { w: this.getRandom(150, 350), h: 70 }
        this.platformPos = { x: this.canvasSize.w + 100, y: this.getRandom(300, 680) }
        this.image = new Image()
        this.image.src = './images/platform.png'
        this.platformVel = this.getRandom(3, 5)

        this.drawPlatforms()
    }

    drawPlatforms() {
        this.ctx.drawImage(
            this.image,
            this.platformPos.x,
            this.platformPos.y,
            this.platformSize.w,
            this.platformSize.h
        )
        this.movePlatforms()
    }

    movePlatforms() {
        this.platformPos.x -= this.platformVel
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min
    }
}