let Local = function (socket) {
    // 游戏对象
    let game;
    // 时间间隔
    const INTERVAL = 200;
    // 定时器
    let timer = null;
    // 时间计数器
    let timeCount = 0;
    // 时间
    let time = 0;

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
            gameDiv: document.getElementById("local_game"),
            nextDiv: document.getElementById("local_next"),
            timeDiv: document.getElementById("local_time"),
            scoreDiv: document.getElementById("local_score"),
            resultDiv: document.getElementById("local_gameover")
        }
        game = new Game();
        game.init(doms, generateType(), generateDir());
        bindKeyEvent();
        game.performNext(generateType(), generateDir());
        timer = setInterval(move, INTERVAL);
    }


    // 向下移动
    let move = function () {
        timeFunc();
        if (!game.down()) {
            // 固定方块
            game.fixed();
            // 检查是否可以消除行
            let line = game.checkClear();
            if (line) {
                game.addScore(line);
            }
            // 检查游戏是否结束
            let gameOver = game.checkGameOver();
            if (gameOver) {
                // 结束游戏
                game.showGameover();
                stop();
            } else {
                // 生成下一个方块
                game.performNext(generateType(), generateDir());
            }
        };
    }

    // 结束
    let stop = function () {
        if (timer) {
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

    // 随机生成干扰行
    let generateBottomLine = function (lineNum) {
        let lines = [];
        for (let i = 0; i < lineNum; i++) {
            let line = [];
            for (let j = 0; j < 10; j++) {
                line.push(Math.ceil(Math.random() * 2) - 1)
            }
            lines.push(line);
        }
        return lines;

    }

    // 计时函数
    let timeFunc = function () {
        timeCount++;
        if (timeCount == 5) {
            timeCount = 0;
            time++;
            game.setTime(time);
            if (time % 10 == 0) {
                game.addTailLines(generateBottomLine(1));
            }
        }
    };

    // 导出API
    this.start = start;
}