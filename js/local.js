let Local = function(){
    // 游戏对象
    let game;
    // 开始
    let start = function() {
        let doms = {
            gameDiv: document.getElementById("game"),
            nextDiv: document.getElementById("next")
        }
        game = new Game();
        game.init(doms);
    }

    // 导出API
    this.start = start;
}