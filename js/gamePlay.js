const gamePlay = {
    key: 'gamePlay',
    preload: function() {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // 載入資源
        this.load.image('bg', 'images/bg.jpg');
        this.load.image('town', 'images/town.png');
        this.load.image('statue', 'images/statue.png');
        this.load.image('temple', 'images/temple.png');
        this.load.image('bridge_stone', 'images/bridge_stone.png');
        this.load.image('wall', 'images/wall.png');
        this.load.image('church', 'images/church.png');
        this.load.image('house', 'images/house.png');
        // this.load.image('scoreBackground', 'images/score_background.jpg');
        // this.load.image('scoreBackground2', 'images/score_background2.jpg');
        // this.load.spritesheet('p1', 'images/p1.png', { frameWidth: 231, frameHeight: 209 });
        this.load.image('bg2', 'images/bg2.png');
        this.load.image('bg5', 'images/bg5.png');
        this.load.image('road', 'images/slope.png');
        this.load.image('shadow', 'images/shadow.png');
        this.load.spritesheet('woman', 'images/woman.png', { frameWidth: 308, frameHeight: 294 });
        //this.load.audio('fuse', 'sounds/tnt/fuse.wav');

    },
    create: function() {
        this.finalsec = 200;
        // 資源載入完成，加入遊戲物件及相關設定
        this.bg = this.add.image(screenW / 2, screenH / 4, 'bg');
        this.town = this.add.image(screenW * 8 / 15, screenH * 9 / 13, 'town');
        this.house = this.add.tileSprite(screenW * 30 / 40, screenH * 18 / 19, screenW * 2, screenW, 'house');
        this.house.visible = false;
        this.town.setScale(screenW / 1007 * 19 / 17, screenH / 395 * 24 / 17);
        this.town.visible = false;
        this.bridge_stone = this.physics.add.sprite(screenW * 16 / 10, screenH * 6 / 13, 'bridge_stone');
        this.bridge_stone.setVelocityX(detla(-22));
        this.bridge_stone.setScale(screenW / 255, screenH / 178);

        this.statue = this.physics.add.sprite(screenW * 3 / 15, screenH * 11 / 10, 'statue');
        this.statue.setScale(0.5);
        this.statue.setVelocityX(detla(-22));

        this.temple = this.physics.add.sprite(screenW * 12 / 10, screenH * 7 / 13, 'temple');
        this.temple.setScale(screenW / 680 / 2, screenH / 510 / 2);
        this.temple.setVelocityX(detla(-22));

        this.church = this.physics.add.sprite(screenW * 12 / 10, screenH * 7 / 13, 'church');
        this.church.setScale(screenW / 493 / 2, screenH / 642 / 2);
        this.church.visible = false;
        //this.church.setVelocityX(detla(-22));

        this.wall = this.add.tileSprite(screenW * 30 / 40, screenH / 2 - screenH / 3 - screenH / 10, screenW * 2, screenW, 'wall');
        this.wall.setScale(screenW / 597 / 4 * 4, screenH / 745 / 4 * 4);
        this.wall.visible = false;
        //this.wall.angle = -25;

        this.bg2 = this.add.tileSprite(screenW / 2, screenW / 2, screenW, screenW, 'bg2');
        console.log(screenW, screenH)
        this.road = this.add.tileSprite(screenW / 2, screenH / 3, screenW * 2 - screenH / 8, screenH * 2, 'road');
        this.road.setScale(screenW / 1920 * 2, screenH / 1920 * 2);

        this.shadow = this.physics.add.sprite(screenW / 2, screenH * 38 / 40, 'shadow');
        this.bg5 = this.add.tileSprite(screenW / 2, screenW / 2, screenW, screenW, 'bg5');

        this.text1 = this.add.text(50, 50,
            '', {
                fontSize: 30
            });
        this.text2 = this.add.text(50, 100,
            '', {
                fontSize: 30
            });
        this.text3 = this.add.text(50, 150,
            '', {
                fontSize: 30
            });
        //變數
        this.slopem = 0;
        this.walkCM = 0;
        this.walkM = 0;
        this.obj = {
            townVisible: false,
            final: false,
            temple: false,
            bridge: false,
            slope: false,
            wall: false,
            church: false
        }

        //設定人物位置
        this.woman = this.physics.add.sprite(screenW / 2, screenH * 3 / 4, 'woman');

        //設定動畫播放
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('woman', { start: 0, end: 5 }),
            frameRate: 3,
            repeat: -1
        });
        //播放動畫
        this.woman.anims.play('run', true);

        this.input.on('pointerdown', () => {
            if (!this.scale.isFullscreen) this.scale.startFullscreen();
        });
    },
    update: function() {
        // 遊戲狀態更新
        if (this.walkM < this.finalsec) this.road.tilePositionX += detla(0.2);
        if (this.walkM < this.finalsec) this.house.tilePositionX += detla(0.2);
        this.wall.tilePositionX += detla(0.2) / 2;
        this.bg2.tilePositionY -= (0.5);
        this.bg5.tilePositionY -= (1);
        this.bg2.tilePositionX -= (0.5);
        this.bg5.tilePositionX -= (1);
        if (this.slopem > -25 && this.walkM < 164) this.slopem -= detla(0.001);
        if (this.walkM >= 120 && !this.obj.townVisible) {
            this.town.visible = true;
            this.obj.townVisible = true;
        }
        if (this.walkM > 164 && this.slopem < 0 && this.walkM < this.finalsec) this.slopem += 1;
        if (this.walkM >= 0 && this.walkM > 164 && this.walkM < this.finalsec) {
            this.house.visible = true;
            this.wall.visible = true;
            this.town.visible = false;
            this.church.visible = true;
            this.church.setVelocityX(detla(-22));
        }
        if (this.walkM >= this.finalsec && !this.obj.final) {
            this.church.setVelocityX(0);
            this.woman.setVelocityX(detla(22));
            this.shadow.setVelocityX(detla(22));
            this.wall.visible = false;
            this.obj.final = true;
        }

        if (this.walkM > 252) {
            this.cameras.main.fade(1000);
            this.time.delayedCall(1000, () => {
                this.scene.start('end');
                location.reload();
            });
        }

        if (this.walkM >= 27 && !this.obj.temple) {
            this.text1.setText("醒靈寺是二二八事件最終戰役──「烏牛欄之役」的古戰場，當時於今愛蘭橋");
            this.text2.setText("設有一吊橋一群學生約（三十餘人），在橋頭與國民黨軍（七百餘人）對戰");
            this.text3.setText("造成該營傷亡二百人以上，為台灣歷史上的以寡擊眾的知名戰役。");
            this.obj.temple = true;
        }
        if (this.walkM >= 60 && !this.obj.bridge) {
            this.text1.setText("日本政府曾在此建造烏牛欄吊橋，但橋頭「烏牛欄橋」石碑已遭埔里鎮公所破壞。");
            this.text2.setText("");
            this.text3.setText("");
            this.obj.bridge = true;
        }
        if (this.walkM >= 120 && !this.obj.slope) {
            this.text1.setText("愛蘭臺地因地勢高，嫁過來的婦女得去南港溪挑水，很少人願意嫁來愛蘭");
            this.text2.setText("，於是這裡的坡被稱作「無某崎」。");
            this.text3.setText("");
            this.obj.slope = true;
        }
        if (this.walkM >= 165 && !this.obj.wall) {
            this.text1.setText("土角牆是早期愛蘭開發時，居民用土和碎稻梗作磚砌成的牆，至今愛蘭仍保留");
            this.text2.setText("八十年以上的土角牆。");
            this.text3.setText("");
            this.obj.wall = true;
        }
        if (this.walkM >= this.finalsec && !this.obj.church) {
            this.text1.setText("台灣基督長老教會愛蘭教會，是一間以巴宰族為主的教會，也是埔里基督教信仰");
            this.text2.setText("的重要起源地。921地震後，愛蘭教會成為巴宰族人心靈重建與文化復振的根據地");
            this.text3.setText("，不僅給予精神支持，也帶頭推動巴宰文化復振工作。");
            this.obj.church = true;
        }


        //if (this.slopem > -25) this.slopem -= 5;
        this.bridge_stone.setVelocityY(detla(5 / 25) * (-this.slopem));
        this.temple.setVelocityY(detla(5 / 25) * (-this.slopem));
        //this.statue.setVelocityY(5 / 25 * (-this.slopem));
        this.road.angle = this.slopem;
        //this.road.angle = 0;
        this.walkCM++;
        if (detla(this.walkCM) >= 100) {
            this.walkM++;
            this.walkCM = 0;
        }
    }
}

function detla(x) {
    return x * 500 / 100;
}