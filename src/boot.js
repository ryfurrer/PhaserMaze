var bootState = {
    
    preload: function () {
        game.load.image('orangePlay', 'assets/clickMe.png');
        game.load.image('back','assets/backg.png');
        game.load.image('exit', 'assets/goal.png');
        game.load.image('key', 'assets/goal2.png');
        game.load.image('ball', 'assets/ball.png');
        game.load.image('sign', 'assets/sign.png');
        game.load.image('block', 'assets/block1.png');
        game.load.image('lava', 'assets/lava.png');
        game.load.image('b-block', 'assets/block4.png');
        game.load.image('m-block', 'assets/block2.png');
        game.load.image('door', 'assets/block3.png');
    },
    
    create: function () {
        "use strict";
        this.game.stage.backgroundColor = '#fff';
        
        this.input.maxPointers = 1;
        
        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = false;
            this.scale.pageAlignVertically = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1920, 1080);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(false, true);
        }
        
        game.state.start('main');
    }
};

var game = new Phaser.Game(1280, 720, Phaser.CANVAS);


game.state.add('boot', bootState);
game.state.add('main', mainState);
game.state.add('end', endState);
//	Now start the Boot state.
game.state.start('boot');