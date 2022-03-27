const gameStart = {
    key: 'gameStart',
    preload: function() {
        // 載入資源
        this.scale.lockOrientation('landscape');
        this.load.image('bg', 'images/bg.jpg');
        this.load.image('town', 'images/town.png');
        this.load.image('statue', 'images/statue.png');
        this.load.image('temple', 'images/temple.png');
        this.load.image('bridge_stone', 'images/bridge_stone.png');
        this.load.image('road', 'images/slope.png');
        this.load.image('bg2', 'images/bg2.png');
        this.load.image('bg5', 'images/bg5.png');
        this.load.image('title', 'images/title.png');
        this.load.image('btn', 'images/btn.png');
        this.load.image('shadow', 'images/shadow.png');
        this.load.spritesheet('woman', 'images/woman.png', { frameWidth: 308, frameHeight: 294 });
        //this.load.audio('hob', 'sounds/hob.mp3');
        //this.load.audio('decision', 'sounds/decision5.wav');
    },
    create: function() {
        // 資源載入完成，加入遊戲物件及相關設定
        //this.bg1 = this.add.tileSprite(x, y, width, height, 'bg1');
        this.bg = this.add.image(screenW / 2, screenH / 4, 'bg');
        this.town = this.add.image(screenW * 8 / 15, screenH * 9 / 13, 'town');
        this.town.setScale(screenW / 1007 * 19 / 17, screenH / 395 * 24 / 17);
        this.bg2 = this.add.tileSprite(screenW / 2, screenW / 2, screenW, screenW, 'bg2');
        this.road = this.add.tileSprite(screenW / 2, screenH / 40 * 13, screenW * 2, screenH * 2, 'road');
        this.shadow = this.add.image(screenW / 2, screenH * 38 / 40, 'shadow');
        this.woman = this.add.sprite(screenW / 2, screenH * 3 / 4, 'woman');
        this.bg5 = this.add.tileSprite(screenW / 2, screenW / 2, screenW, screenW, 'bg5');
        this.title = this.add.image(screenW / 2, screenH / 4, 'title');
        this.title.setScale(screenW / 1724 * 17 / 19, screenH / 332 * 3 / 8);
        //this.road.angle = -25;
        this.input.on('pointerdown', () => {
            if (!this.scale.isFullscreen) {
                this.scale.startFullscreen();
            }
            if (!this.scale.isFullscreen) return;
            //this.sound.play('decision');
            this.scene.start('gamePlay');
            //music.stop();
        });
        //設定動畫播放
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('woman', { start: 0, end: 6 }),
            frameRate: 3,
            repeat: -1
        });

        //播放動畫
        this.woman.anims.play('run', true);

        //var music = this.sound.add('hob', { loop: true });
        //music.play();
    },
    update: function() {
        // 遊戲狀態更新
        this.road.tilePositionX += 0.1;
        this.bg2.tilePositionY -= 0.5;
        this.bg5.tilePositionY -= 1;
        this.bg2.tilePositionX -= 0.5;
        this.bg5.tilePositionX -= 1;
    }
}