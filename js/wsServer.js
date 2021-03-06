let app = require("http").createServer();
let io = require("socket.io")(app);

const PORT = 8080;

// 客户端计数
let clientCount = 0;
// 用来存储客户端的socket
let socketMap = {};

app.listen(PORT);

let bindListener = function (socket, event) {
    socket.on(event, function (data) {
        if (socket.clientNum % 2 == 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit(event, data);
            }
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit(event, data);
            }
        }
    });
};


io.on("connection", function (socket) {

    clientCount++;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    if (clientCount % 2 == 1) {
        socket.emit("waiting", "请等待玩家进入……");
    } else {
        if (socketMap[(clientCount - 1)]) {
            socket.emit("start");
            socketMap[(clientCount - 1)].emit("start");
        } else {
            socket.emit("leave");
        }
    }

    bindListener(socket, "init");
    bindListener(socket, "next");
    bindListener(socket, "rotate");
    bindListener(socket, "right");
    bindListener(socket, "down");
    bindListener(socket, "left");
    bindListener(socket, "fall");
    bindListener(socket, "fixed");
    bindListener(socket, "line");
    bindListener(socket, "time");
    bindListener(socket, "lose");
    bindListener(socket, "bottomLines");
    bindListener(socket, "addTailLines");
    
    socket.on("disconnect", function () {
        if (socket.clientNum % 2 == 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit("leave");
            }
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit("leave");
            }
        }
        delete(socketMap[socket.clientNum]);
    });
});

console.log("websocket is listening port " + PORT);