
function Animation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame;
    yindex = 0;
    

    console.log(frame + " " + xindex + " " + yindex);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth,
                 this.frameHeight);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function FireBall(game, spritesheet, x, y) {
    this.animation = new Animation(spritesheet, 75, 80, 0.14, 4, false, false)
    this.x = x;
    this.y = y;
    this.game = game;
    this.ctx = game.ctx;
}

FireBall.prototype.update = function () {
    this.x += 4;
}

FireBall.prototype.draw = function () {
    console.log("drawing");
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x+90, this.y+10);
}

function Zombie(game, spritesheet){
	this.animation = new Animation(spritesheet, 120, 80, 0.15, 4, true, false)
	this.x = 180;
    this.y = 120;
    this.game = game;
    this.ctx = game.ctx;
}
Zombie.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}
Zombie.prototype.update = function() {
    this.x += 2;
}

function Man(game, spritesheet) {
    this.animation = new Animation(spritesheet, 122, 120, 0.23, 4, true, false);
    this.x = 0;
    this.y = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.shooting = false;
}


Man.prototype.update = function() {
    if (this.game.space) {
        this.shooting = true;
        this.game.addEntity(new FireBall(this.game, AM.getAsset("./img/fire.png"), this.x, this.y));
    } 
    this.x += 2;
}

Man.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}


var AM = new AssetManager();

AM.queueDownload("./img/zombieWalking2.png");
AM.queueDownload("./img/guy.png");
AM.queueDownload("./img/fire.png");

AM.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
 
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Man(gameEngine, AM.getAsset("./img/guy.png")));
    gameEngine.addEntity(new Zombie(gameEngine, AM.getAsset("./img/zombieWalking2.png")));

});
