let Local = function(){
    // 游戏对象
    let game;

    // 绑定键盘事件
    let bindKeyEvent = function() {
        document.onkeydown = function(e){
            if(e.keyCode == 37) {
                // left
                game.left();
            } else if(e.keyCode == 38) {
                // up
                game.up();   
            }  else if(e.keyCode == 39) {
                // right
                game.right();
            } else if(e.keyCode == 40) {
                // down
                game.down();
            } else if(e.keyCode == 32) {
                // space
            }
        }
    };

    // 开始
    let start = function() {
        let doms = {
            gameDiv: document.getElementById("game"),
            nextDiv: document.getElementById("next")
        }
        game = new Game();
        game.init(doms);
        bindKeyEvent();
    }

    // 导出API
    this.start = start;
}