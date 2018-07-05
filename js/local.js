let Local = function () {
    // 游戏对象
    let game;
    // 时间间隔
    const INTERVAL = 200;
    // 定时器
    let timer = null;

    // 绑定键盘事件
    let bindKeyEvent = function () {
        document.onkeydown = function (e) {
            if (e.keyCode == 37) {
                // left
                game.left();
            } else if (e.keyCode == 38) {
                // up
                game.rotate();
            } else if (e.keyCode == 39) {
                // right
                game.right();
            } else if (e.keyCode == 40) {
                // down
                game.down();
            } else if (e.keyCode == 32) {
                // space
                game.fall();
            }
        }
    };

    // 开始
    let start = function () {
        let doms = {
            gameDiv: document.getElementById("game"),
            nextDiv: document.getElementById("next")
        }
        game = new Game();
        game.init(doms);
        bindKeyEvent();
        timer = setInterval(move, INTERVAL);
    }


    // 向下移动
    let move = function () {
        if (!game.down()) {
            // 固定方块
            game.fixed();
            // 检查是否可以消除行
            game.checkClear();
            // 检查游戏是否结束
            let gameOver = game.checkGameOver();
            if (gameOver) {
                // 结束游戏
                stop();
            } else {
                // 生成下一个方块
                game.performNext(generateType(), generateDir());
            }
        };
    }

    // 结束
    let stop = function () {
        if (timer){
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    };
    // 生成一个随机方块种类
    let generateType = function () {
        return Math.ceil(Math.random() * 7) - 1;
    }
    // 生成一个随机方块旋转次数
    let generateDir = function () {
        return Math.ceil(Math.random() * 4) - 1;
    }

    // 导出API
    this.start = start;
}