class Tube {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.tubeSize = { w: 180, h: 100 }
        this.tubePos = { x: -5, y: 200 }
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './images/tube.png'
    }

    drawTube() {
        this.ctx.drawImage(
            this.imageInstance,
            this.tubePos.x,
            this.tubePos.y,
            this.tubeSize.w,
            this.tubeSize.h
        )
    }
}