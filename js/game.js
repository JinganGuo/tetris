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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    
    // divs
    let nextDivs = [];
    let gameDivs = [];

    // 当前方块
    let cur;
    // 下一个方块
    let next;

    // 初始化div
    let initDiv = function(container, data, divs){
        for(let i = 0; i < data.length; i ++){
            let div = [];
            for (let j = 0; j < data[0].length; j ++){
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
    var refreshDiv = function(data, divs){
        for(let i = 0; i < data.length; i ++) {
            for(let j = 0; j < data[0].length; j ++) {
                if(data[i][j] == 0) {
                    divs[i][j].className = "none";
                } else if(data[i][j] == 1) {
                    divs[i][j].className = "done";
                } else if(data[i][j] == 2) {
                    divs[i][j].className = "current";
                }
            }
        }
    };

    // 初始化
    let init = function(doms){
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;

        cur = new Square();
        next = new Square();

        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);

        cur.origin.x = 0;
        cur.origin.y = 0;
        for(let i = 0; i < cur.data.length; i ++) {
            for (let j = 0; j < cur.data[0].length; j ++) {
                gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
            }
        }

        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }

    // 导出API
    this.init = init;
}