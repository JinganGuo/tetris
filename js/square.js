let Square = function () {
    // 方块数据
    this.data = [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
    ];
    // 原点
    this.origin = {
        x: 0,
        y: 0
    };
};

Square.prototype.canDown = function(isValid) {
    let test = {};          
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
   return isValid(test, this.data);
};
Square.prototype.down = function(){
    this.origin.x += 1;
}
Square.prototype.canLeft = function(isValid) {
    let test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
   return isValid(test, this.data);
};
Square.prototype.left = function(){
    this.origin.y -= 1;
}
Square.prototype.canRight = function(isValid) {
    let test = {};
    test.x = this.origin;
    test.y = this.origin.y + 1;
   return isValid(test, this.data);
};
Square.prototype.right = function(){
    this.origin.y = this.origin.y + 1;
}