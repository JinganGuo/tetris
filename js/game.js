let Game = function () {
    // dom元素
    let gameDiv;
    let nextDiv;
    // 游戏矩阵
    let gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 0]
    ];

    // divs
    let nextDivs = [];
    let gameDivs = [];

    // 当前方块
    let cur;
    // 下一个方块
    let next;

    // 检测点是否合法
    let check = function (pos, x, y) {

        console.log(gameData[pos.x + x][pos.y + y]);

        if (pos.x + x < 0) {
            return false;
        } else if (pos.x + x >= gameData.length) {
            return false;
        } else if (pos.y + y < 0) {
            return false;
        } else if (pos.y + y >= gameData[0].length) {
            return false;
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            return false;
        } else {
            return true;
        }
    };

    // 检测数据是否合法
    let isValid = function (pos, data) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // 清除数据
    let clearData = function () {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    };

    // 设置数据
    let setData = function () {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    };

    // 下移
    let down = function () {
        if (cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    // 左移
    let left = function () {
        if (cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    // 右移
    let right = function () {
        if (cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };

    // 初始化div
    let initDiv = function (container, data, divs) {
        for (let i = 0; i < data.length; i++) {
            let div = [];
            for (let j = 0; j < data[0].length; j++) {
                let newNode = document.createElement("div");
                newNode.className = "none";
                newNode.style.top = (i * 20) + "px";
                newNode.style.left = (j * 20) + "px";
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    };

    // 刷新div
    var refreshDiv = function (data, divs) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = "none";
                } else if (data[i][j] == 1) {
                    divs[i][j].className = "done";
                } else if (data[i][j] == 2) {
                    divs[i][j].className = "current";
                }
            }
        }
    };

    // 初始化
    let init = function (doms) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;

        cur = new Square();
        next = new Square();

        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);

        cur.origin.x = 0;
        cur.origin.y = 0;

        setData();

        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }

    // 导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
}