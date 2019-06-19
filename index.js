window.onload = function () {
    generateBalls();
    // isGoal();
};
var BALL_COUNT = 7;
var BAll_SIZE = 40; //px

function allowDrop(ev) {
    debugger
    ev.preventDefault();
}

function drag(ev) {
    debugger
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    debugger
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function generateBalls() {
    var ballTemplate = document.querySelector('.ball');
    // var lefScoretResult = document.querySelector('.left-score-result')
    var field =  document.querySelector('.container');
    var leftGate =  document.querySelector('.panelty.left');
    var rightGate =  document.querySelector('.panelty.right');

    for (var index = 0; index < BALL_COUNT; index++) {
        var ball = ballTemplate.cloneNode(true);
        ball.style.backgroundColor = getRandomColor();
        ball.innerText = getRandomLetter();
        var position = getRandomPositionInRange(field);
        var isInLeftGoal = isRectangleRangeLeft(position, leftGate);
        var isRightGoal = isRectangleRangeRight(position, rightGate)
        while(isInLeftGoal || isRightGoal){
            position = getRandomPositionInRange(field);
            isInLeftGoal = isRectangleRangeLeft(position, leftGate);
            isRightGoal = isRectangleRangeRight(position, rightGate);
        }
        ball.style.left = position.x + 'px';
        ball.style.top = position.y + 'px';
        ball.style.display ='block';
        document.body.insertBefore(ball, document.body.lastChild);

    }
}

function getRandomLetter() {
    var chars = "ABCDEFGHIJKLMNOPQURSTUVWXYZ";
    return chars.substr(Math.floor(Math.random() * 25), 1);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getElemHeightRange(elem) {
    var rect = elem.getBoundingClientRect();
    var minHeight = rect.top + BAll_SIZE;
    var maxHeight = rect.bottom  - BAll_SIZE;
    return { yMin: minHeight, yMax: maxHeight };
}

function getElemdWidthRange(elem) {
    var rect = elem.getBoundingClientRect();
    var minWidth = rect.left + BAll_SIZE;
    var maxWidth = rect.right - BAll_SIZE;
    return { xMin: minWidth, xMax: maxWidth };
}

function isRectangleRangeLeft(position, elem) {
    var rect = elem.getBoundingClientRect();
    var delta = BAll_SIZE/2;
    return position.x + delta > rect.left   && position.x < rect.right - delta
         && position.y + delta> rect.top   && position.y < rect.bottom - delta;
}
function isRectangleRangeRight(position, elem) {
    var rect = elem.getBoundingClientRect();
    var delta = BAll_SIZE;
    return position.x - delta > rect.left   && position.x < rect.right + delta
         && position.y + delta> rect.top   && position.y < rect.bottom - delta;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPositionInRange(elem) {
    var xRange = getElemdWidthRange(elem);
    var yRange = getElemHeightRange(elem);
    var x = getRandomInt(xRange.xMin, xRange.xMax)
    var y = getRandomInt(yRange.yMin, yRange.yMax)
    return {x: x, y:y};
}



