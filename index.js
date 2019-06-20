window.onload = function () {
    generateBalls();
};
var BALL_COUNT = 7;
var BAll_SIZE = 30;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("ball", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var leftGate = document.querySelector('.panelty.left');
    var rightGate = document.querySelector('.panelty.right');
    var ballId = ev.dataTransfer.getData("ball");
    var targetBall = document.getElementById(ballId);
    var isGoalToLeft = isGoal({ x: ev.x, y: ev.y }, leftGate);
    var isGoalToRight = isGoal({ x: ev.x, y: ev.y }, rightGate);
    targetBall.style.left = ev.pageX  + 'px';
    targetBall.style.top = ev.pageY + 'px';
    targetBall.draggable = false;
    if (isGoalToLeft) {
        incrementScore('.left-score-digit');
        appendBallToResultTable('.left-score-result', targetBall);
    }
    if (isGoalToRight) {
        incrementScore('.right-score-digit');
        appendBallToResultTable('.right-score-result', targetBall);
    }
}

function incrementScore(querySelector) {
    var leftScore = document.querySelector(querySelector);
    leftScore.innerText = parseInt(leftScore.innerText) + 1;
}
function appendBallToResultTable(querySelector, ball) {
    var lefScoretResult = document.querySelector(querySelector);
    var resultBall =  ball.cloneNode(true);
    resultBall.id = '';
    resultBall.style.position = 'relative';
    resultBall.style.left = 'auto';
    resultBall.style.top = 'auto';
    resultBall.style.display = 'inline-block';
    lefScoretResult.insertBefore(resultBall, lefScoretResult.lastChild);
}

function generateBalls() {
    var ballTemplate = document.querySelector('.ball');
    var field = document.querySelector('.container');
    var leftGate = document.querySelector('.panelty.left');
    var rightGate = document.querySelector('.panelty.right');

    for (var index = 0; index < BALL_COUNT; index++) {
        var ball = ballTemplate.cloneNode(true);
        ball.style.backgroundColor = getRandomColor();
        ball.innerText = getRandomLetter();
        ball.id = 'ball' + index;
        var position = getRandomPositionInRange(field);
        var isInLeftGoal = isRectangleInRange(position, leftGate);
        var isRightGoal = isRectangleInRange(position, rightGate);
        while (isInLeftGoal || isRightGoal) {
            console.log(ball.innerText, 'recalc');
            position = getRandomPositionInRange(field);
            isInLeftGoal = isRectangleInRange(position, leftGate);
            isRightGoal = isRectangleInRange(position, rightGate);
        }
        ball.style.left = position.x + 'px';
        ball.style.top = position.y + 'px';
        ball.style.display = 'block';
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
    var maxHeight = rect.bottom - BAll_SIZE;
    return { yMin: minHeight, yMax: maxHeight };
}

function getElemdWidthRange(elem) {
    var rect = elem.getBoundingClientRect();
    var minWidth = rect.left + BAll_SIZE;
    var maxWidth = rect.right - BAll_SIZE;
    return { xMin: minWidth, xMax: maxWidth };
}

function isRectangleInRange(position, elem) {
    var rect = elem.getBoundingClientRect();
    return (position.x > rect.left && position.x < rect.right)
        || (position.y > rect.top && position.y < rect.bottom);
}
function isGoal(position, elem) {
    var rect = elem.getBoundingClientRect();
    return (position.x > rect.left && position.x < rect.right)
        && (position.y > rect.top && position.y < rect.bottom);
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
    return { x: x, y: y };
}



