let app = require("http").createServer();
let io = require("socket.io")(app);

const PORT = 8080;

// 客户端计数
let clientCount = 0;
// 用来存储客户端的socket
let socketMap = {};

app.listen(PORT);

io.on("connection", function(){

    clientCount ++;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    if(clientCount % 2 == 1){
        socket.emit("waiting", "请等待玩家进入……");
    } else{
        socket.emit("start");
        socketMap[(clientCount - 1)].emit("start")
    }

    io.on("disconnect", function(){

    });
});

console.log("websocket is listening port " + PORT);
