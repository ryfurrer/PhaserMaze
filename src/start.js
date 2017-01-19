var startState = {

    init: function () {
        "use strict";
    },
    
    create: function () {
        "use strict";

        
		this.add.button(game.world.centerX - 106, 350, 'orangePlay', this.startGame, this);

        var txt = "Maze", text = ".";
        
        game.add.text(game.world.centerX - 80 / 4 - 22 * txt.length - 2, 60, txt, {font: "80px Arial", fill: "#000", align: "center"});
        game.add.text(game.world.centerX - 40 / 8 * text.length, 180, text, {font: "40px Arial", fill: "#000", align: "center"});
        game.add.text(game.world.centerX - 52, 362, "Start Game", {font: "20px Arial", fill: "#000000", align: "center"});
        
    },
    
    startGame: function (pointer) {
        "use strict";
		//	starts the actual game
		game.state.start('main');

	}
    
};

