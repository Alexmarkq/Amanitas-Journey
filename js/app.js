const app = {
    appName: 'Canvas game',
    version: '1.0.0',
    licensed: undefined,
    author: 'Alexis Marquez & Alberto Naval',
    ctx: undefined,
    FPS: '60',
    framesCounter: 0,

    canvasSize: { w: undefined, h: undefined, },

    backGround: undefined,
    player: undefined,
    platforms: [],
    enemies: [],
    tube: undefined,
    score: 0,

    init() {
        this.setDimensions()
        this.setContext()
        this.createEnemies()
        this.createTube()
        this.start()
        this.createPlatforms()
    },


    start() {
        this.reset()

        setInterval(() => {
            this.framesCounter++
            if (this.framesCounter % 100 === 0) this.createPlatforms()
            if (this.framesCounter % 200 === 0) this.createEnemies()

            this.clear()
            this.drawAll()
            this.playerPlatformColission()
            this.clearPlatforms()
            this.playerEnemiesCollision()
            this.playerTubeCollision()
            this.isGameOver()
            this.isVictory()


        }, 1000 / this.FPS)
    },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight,
        }
        document.querySelector('#myCanvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('#myCanvas').setAttribute('height', this.canvasSize.h)

    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
    },

    reset() {
        this.player = new Player(this.ctx, this.canvasSize)
        this.backGround = new BackGround(this.ctx, this.canvasSize)
    },

    createPlatforms() {
        this.platforms.push(
            new Platforms(this.ctx, this.canvasSize),
        )
    },
    createEnemies() {
        this.enemies.push(new Enemies(this.ctx, this.canvasSize))

    },

    createTube() {
        this.tube = new Tube(this.ctx, this.canvasSize)
    },

    clearPlatforms() {
        this.platforms = this.platforms.filter(obs => obs.platformPos.x + obs.platformSize.w - 10 >= 0)
    },


    clearEnemies() {
        this.enemies = this.enemies.filter(e => e.enemiesPos.x + e.enemiesSize.w - 10 >= 0)
    },

    drawAll() {

        this.backGround.drawBackground()
        this.player.drawPlayer()
        this.player.move()
        this.player.setEventHandlers()
        this.tube.drawTube()
        this.drawScore()
        this.platforms.forEach(platform => platform.drawPlatforms())
        this.enemies.forEach(enemy => enemy.drawEnemies())

    },

    playerPlatformColission() {

        this.platforms.forEach((p) => {

            if (
                p.platformPos.x < this.player.playerPos.x + this.player.playerSize.w && //<-- derecha?
                p.platformPos.x + p.platformSize.w > this.player.playerPos.x && //<-- izquierda
                p.platformPos.y < this.player.playerPos.y + this.player.playerSize.h && //<--
                p.platformSize.h + p.platformPos.y > this.player.playerPos.y //<--
            ) {
                if (
                    p.platformPos.x + p.platformSize.w - 10 > this.player.playerPos.x &&
                    this.player.playerPos.y > p.platformPos.y
                ) {
                    this.playerVel *= 1
                    this.player.playerPos.x = p.platformPos.x - this.player.playerSize.w
                    console.log('izquierda')

                } else {
                    this.player.playerPos.y = p.platformPos.y - this.player.playerSize.h + 10
                    this.player.canJump = true
                    this.player.playerVel.y = 0
                    console.log('arriba')
                }
            }

        })
    },

    playerEnemiesCollision() {
        this.enemies.forEach((e, index) => {
            if (
                e.enemiesPos.x < this.player.playerPos.x + this.player.playerSize.w &&
                e.enemiesPos.x + e.enemiesSize.w > this.player.playerPos.x &&
                e.enemiesPos.y < this.player.playerPos.y + this.player.playerSize.h &&
                e.enemiesSize.h + e.enemiesPos.y > this.player.playerPos.y
            ) {
                if (e.enemiesPos.x + e.enemiesSize.w - 10 > this.player.playerPos.x &&
                    this.player.playerPos.y > e.enemiesPos.y) {
                    this.player.playerPos.y = this.canvasSize.h + this.player.playerSize.h
                    this.isGameOver()
                    console.log('izquierda enemigo')
                } else if (e.enemiesPos.x + e.enemiesSize.w > this.player.playerPos.x &&
                    this.player.playerPos.y > e.enemiesPos.y) {
                    this.player.playerPos.y = this.canvasSize.h + this.player.playerSize.h
                    this.isGameOver()
                    console.log('derecha enemigo')
                } else {
                    this.player.playerPos.y = e.enemiesPos.y - this.player.playerSize.h + 10
                    //const index = this.enemies.indexOf(e)
                    this.enemies.splice(index, 1)

                    //e.enemiesPos.y = this.canvasSize.h + e.enemiesSize.h
                    if (this.score <= 1900) this.score += 100
                    //else this.isVictory()
                    this.player.canJump = true
                    console.log('Arriba enemigo')
                }
            }
        })
    },

    playerTubeCollision() {
        if (
            this.tube.tubePos.x < this.player.playerPos.x + this.player.playerSize.w &&
            this.tube.tubePos.x + this.tube.tubeSize.w > this.player.playerPos.x &&
            this.tube.tubePos.y < this.player.playerPos.y + this.player.playerSize.h &&
            this.tube.tubeSize.h + this.tube.tubePos.y > this.player.playerPos.y
        ) {
            this.player.playerPos.y = this.tube.tubePos.y - this.player.playerSize.h + 15
            this.player.canJump = true
            this.player.playerVel.y = 0
        }
    },

    drawScore() {
        this.ctx.fillStyle = "black",
            this.ctx.font = "small-caps bold 40px Courier New",
            this.ctx.fillText(`Score:${this.score}`, this.canvasSize.w - 250, 100)
    },

    drawGameOver() {
        this.ctx.fillStyle = "black",
            this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        this.ctx.fillStyle = "white",
            this.ctx.font = "120px Courier New",
            this.ctx.fillText('GAME OVER', this.canvasSize.w / 4, this.canvasSize.h / 2)
        this.ctx.font = "small-caps 50px Courier New"
        this.ctx.fillText(`YOU SUCK MOTHERFUCKER!!`, this.canvasSize.w / 4, this.canvasSize.h / 2 + 100)
        this.ctx.fillText(`   You killed: ${this.score / 100} enemies`, this.canvasSize.w / 4, this.canvasSize.h / 2 + 200)

    },

    isGameOver() {
        if (this.player.playerPos.y > this.canvasSize.h + this.player.playerSize.h) {
            this.clear(setInterval)
            this.drawGameOver()
        }

    },

    drawVictory() {
        this.ctx.fillStyle = "white",
            this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h),
            this.ctx.fillStyle = "black",
            this.ctx.font = "bold 120px Courier New"
        this.ctx.fillText('YOU WIN', this.canvasSize.w / 4 + 100, this.canvasSize.h / 2)
        this.ctx.font = "small-caps 50px Courier New"
        this.ctx.fillText(`Your score is: ${this.score}`, this.canvasSize.w / 3, this.canvasSize.h / 2 + 100)
    },

    isVictory() {
        if (this.score >= 1500) {
            this.clear(setInterval)
            this.drawVictory()
        }

    }




}