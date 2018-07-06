let socket = io("ws://localhost:8080");
let local = new Local(socket);
let remote = new Remote(socket);

socket.on("waiting", function(str){
    document.getElementById("waiting").innerHTML = str;
});
 