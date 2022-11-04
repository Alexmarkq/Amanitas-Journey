class BackGround {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = './images/background.jpeg'
        this.backgroundPositionX = 0,
            this.backgroundPositionY = 0,
            this.backgroundVel = 1
    }

    drawBackground() {
        this.ctx.drawImage(
            this.image,
            this.backgroundPositionX,
            this.backgroundPositionY,
            this.canvasSize.w,
            this.canvasSize.h)

        this.ctx.drawImage(
            this.image,
            this.backgroundPositionX + this.canvasSize.w,
            this.backgroundPositionY,
            this.canvasSize.w,
            this.canvasSize.h
        )
        this.move()
    }

    move() {
        if (this.backgroundPositionX <= - this.canvasSize.w) {
            this.backgroundPositionX = 0;
        }
        this.backgroundPositionX -= this.backgroundVel
    }
}