var ball, cursors, blocks, lives, bBlocks;
var doors, exit, lava, key;
var time, timeText, timeTxt, level;


// Create our 'main' state that will contain the game
var mainState = {
    
    init: function () {
        "use strict";
        game.scale.setGameSize(1280, 720);
        time = 0;
        lives = 3;
    },
    
    preload: function () {
        "use strict";
        // Here we preload the assets
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        level = [
            '                      l            l               b',
            '   P                  l            l               b',
            '                      l     l      l     l         b',
            'bbbbbbbbbbbbbbbbbb    l     l      l     l         b',
            'b                     l E   l            l         b',
            'l                     l     l            l         b',
            'b      bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb       b',
            'l                            b             b       b',
            'b                            b             b       b',
            'bbbbbbbbbbbbbbbbbbbbbbb      b      b      b       b',
            'b            B        b      b      b      b       b',
            'b   K                 b      b      b      b       b',
            'b        B            b      b      b      b       b',
            'b   B           B     b123456b123456b      b       b',
            'b                     b             bDDDDDDb       b',
            'b                     b        B    b      b       b',
            'b                     b             b      b       b',
            'b      B      B       b             b      b       b',
            'b                     b    B        b      b       b',
            'b                     b             b      l       b',
            'b   B                 b        B    bB    lll     Bb',
            'b        B        B   b             bBB    l     BBb',
            'b                                   bBBB        BBBb',
            'b                                   bBBBB      BBBBb',
            'blllllllllllllllllllllbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        ];
        
        
        game.world.setBounds(0, 0, level[1].length * 80, level.length * 60);
        this.add.tileSprite(0, 0, level[1].length * 80, level.length * 60, 'back');
        
        doors = game.add.group();
        blocks = game.add.physicsGroup();
        bBlocks = game.add.physicsGroup();
        lava = game.add.physicsGroup();
        
        doors = game.add.group();
        doors.enableBody = true;
        
        this.createMap();

    },
    
    createMap: function () {
        
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'b') {
                    blocks.create(80*j, 60*i, 'block');
                } else if (level[i][j] == 'D') {
                    doors.create(80*j, 60*i, 'door');
                } else if (level[i][j] == 'B') {
                    bBlocks.create(80*j, 60*i, 'b-block');
                } else if (level[i][j] == 'l') {
                    lava.create(80*j, 60*i, 'lava');
                } else if (level[i][j] == 'K'){
                    key = game.add.sprite(80*j, 60*i,'key');
                    game.physics.arcade.enable(key);
                    key.scale.setTo(0.5);
                } else if (level[i][j] == 'E'){
                    exit = game.add.sprite(80*j, 60*i,'exit');
                    game.physics.arcade.enable(exit);
                    exit.scale.setTo(0.5);
                } else if (level[i][j] == 'P'){
                    ball = game.add.sprite(80*j, 60*i, 'ball');
                    ball.scale.setTo(0.4);
                    game.physics.arcade.enable(ball);
                    //  ball physics properties. Give the little guy a slight bounce.
                    ball.body.bounce.y = 0.6;
                    ball.body.bounce.x = 0.6;
                    ball.body.collideWorldBounds = true;
                    game.camera.follow(ball);
                }
            }
        }
        
    },
    
    create: function () {
        "use strict";

        blocks.setAll('body.immovable', true);
        doors.setAll('body.immovable', true);
        bBlocks.setAll('body.immovable', true);
        lava.setAll('body.immovable', true);
        game.time.events.loop(1000, this.updateTimer, this);
        
        
		window.addEventListener("deviceorientation", this.handleOrientation, true);
        
        var signs = game.add.physicsGroup();
        
        signs.create(20, -20, 'sign');
        signs.create(20, -70, 'sign');
        signs.setAll('body.immovable', true);
        signs.fixedToCamera = true;
        
        timeText = game.add.text(65, 70, "Lives: " + lives, {font: "20px Arial", fill: "#fff", align: "left"});
        timeText.fixedToCamera = true;
        timeTxt = game.add.text(65, 20, "Time: " + time, {font: "20px Arial", fill: "#fff", align: "left"});
        timeTxt.fixedToCamera = true;

        cursors = game.input.keyboard.createCursorKeys();
    },
    
    updateTimer: function () {
        "use strict";
        time += 1;
        timeTxt.text = "Time: " + time;
    },
   
    handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		ball.body.velocity.x += x*0.8;
		ball.body.velocity.y += y*0.4;
	},
    
    bounceIt: function () {
		ball.body.velocity.x = ball.body.velocity.x * 1.5;
		ball.body.velocity.y = ball.body.velocity.y * 1.5;
    },
    
    update: function () {
        "use strict";
        // Here we update the game 60 times per second
        
        this.physics.arcade.collide(ball, blocks);
        this.physics.arcade.collide(ball, bBlocks, this.bounceIt);
        this.physics.arcade.collide(ball, doors);
        game.physics.arcade.overlap(ball, exit, this.endScreen, null, this);
        game.physics.arcade.overlap(ball, lava, this.hitBall, null, this);
        game.physics.arcade.overlap(ball, key, this.removeDoors, null, this);


        if (cursors.left.isDown) {
            ball.body.velocity.x -= 5;
        } else if (cursors.right.isDown) {
            ball.body.velocity.x += 5
        }
        
        if (cursors.up.isDown) {
            ball.body.velocity.y -= 5;
        } else if (cursors.down.isDown) {
            ball.body.velocity.y += 5
        }
    },
    
    removeDoors: function () {
        for (var i = 0;i<doors.length;i++){
            doors.getAt(i).kill();
        }
        
    },
    
    hitBall: function () {
        ball.reset(200, 100);
        lives -= 1;
        if (lives > 0) {
            timeText.text = "Lives: " + lives;
        } else {
            game.state.start('end', true, false, false);
        }
        
        for (var i = 0; i<doors.length; i++){
            doors.getAt(i).revive();
        }
        
    },
    
    endScreen: function () {
        "use strict";
        game.state.start('end', true, false, true);
    }
};