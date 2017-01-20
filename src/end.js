var endState = {

    init: function () {
        "use strict";
        game.scale.setGameSize(window.innerWidth, window.innerHeight);
    },
    
    create: function () {
        "use strict";
        
        var bar = game.add.graphics();
        bar.beginFill(0x1E8F39, 1);
        bar.drawRect(0, 0, game.width, 50);
        
        var resultStyle = {font: "bold 30px Arial", fill: "#000"}, headingStyle = {font: " 34px Arial", fill: "#000"}, itemStyle = {font: " 24px Arial", fill: "#000"};

        game.add.text(game.width / 2 - 60, 100, "Results", headingStyle);
        
        game.add.text(200, 200, "Time: " + time + "s"+ "\nLives: " + lives, resultStyle);
        this.add.button(game.width / 2 - 110, 400, 'orangePlay', this.startGame, this);
        game.add.text(game.width / 2 - 32, 412, "Retry", itemStyle);
        
    },
    
    startGame: function (pointer) {

		this.state.start('main');

	}
};