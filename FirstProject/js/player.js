class Player {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.playerSize = { w: 100, h: 100 }
        this.playerPos = { x: 20, y: 20 }
        this.playerVel = { x: 0, y: 1 }
        this.Physics = { gravity: 0.6 };

        this.canJump = false;
        this.playerImg = 'images/seta.png'
        this.imageInstance = undefined

        this.key = {
            left: 'ArrowLeft',
            right: 'ArrowRight',
            jump: 'ArrowUp'
        }
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = this.playerImg
    }

    drawPlayer() {
        this.ctx.drawImage(
            this.imageInstance,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h
        )
    }

    setEventHandlers() {
        let jumpSound = new Audio('./sound/jump.wav')
        document.onkeydown = event => {
            switch (event.key) {
                case this.key.left:
                    this.playerVel.x = -4
                    break;
                case this.key.right:
                    this.playerVel.x = +4
                    break;
                case this.key.jump:
                    if (this.canJump) {
                        this.playerVel.y = -20
                        this.canJump = false
                        jumpSound.play()
                        break;
                    }
            }
        }
        document.onkeyup = event => {
            switch (event.key) {
                case this.key.left:
                    this.playerVel.x = 0
                    break;
                case this.key.right:
                    this.playerVel.x = 0
                    break;
            }
        }
    }

    move() {
        this.playerPos.y += this.playerVel.y
        this.playerPos.x += this.playerVel.x
        if (this.playerPos.y + this.playerSize.h + this.playerVel.y <= this.canvasSize.h)
            this.playerVel.y += this.Physics.gravity
        if (this.playerPos.x >= this.canvasSize.w - this.playerSize.w) {
            this.playerPos.x = this.canvasSize.w - this.playerSize.w
        }
        if (this.playerPos.x < 0) { this.playerPos.x = 0, this.playerVel.x = 0 }
        if (this.playerPos.y < 0) { this.playerPos.y = 0, this.playerVel.y = 0 }
    }
}







