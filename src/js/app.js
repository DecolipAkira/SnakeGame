const helper = new Helper(document.querySelector('#game'));

const framerate = 15;
const un = 16;
let direction = '';
let snake = [{ x: un * 9, y: un * 9 }];
let increment = false;
let fruit = {};

const restart = () => {
    helper.context().clearRect(0, 0, 608, 608);
    snake = [{ x: un * 9, y: un * 9 }];
    direction = '';
    increment = false;
    fruit = {};
}

const addFruit = () => {
    fruit = {
        x: (Math.floor(Math.random() * 38 - 1) + 1) * un,
        y: (Math.floor(Math.random() * 38 - 1) + 1) * un
    }
    setTimeout(() => helper.drawRect('red', fruit.x, fruit.y, un, un), 1500);
}

const render = () => {
    const firstS = snake[0];

    if(firstS.x == un * 38 || firstS.y == un * 38 || firstS.x < 0 || firstS.y < 0) restart();

    snake.forEach((s, k) => {
        if(snake.length > 1 && k != 0 && (firstS.x == s.x && firstS.y == s.y)) restart();
    });
    
    if(direction) {
        if(Object.keys(fruit).length == 0) addFruit();

        if(firstS.x == fruit.x && firstS.y == fruit.y) {
            fruit = {};
            increment = true;
        }

        if(!increment) {
            const pop = snake.pop();
            helper.context().clearRect(pop.x, pop.y, un, un);
        } else {
            increment = false;
        }

        switch(direction) {
            case 'ArrowLeft':
                snake.unshift({ x: firstS.x - un, y: firstS.y });
                break;
            case 'ArrowRight':
                snake.unshift({ x: firstS.x + un, y: firstS.y });
                break;
            case 'ArrowDown':
                snake.unshift({ x: firstS.x, y: firstS.y + un });
                break;
            case 'ArrowUp':
                snake.unshift({ x: firstS.x, y: firstS.y - un });
                break;
        }
    }

    snake.forEach(s => {
        helper.drawRect('#FFF', s.x, s.y, un, un);
        helper.drawStrokeRect('#000', s.x, s.y, un, un);
    });
}

setInterval(render, 1000 / framerate);

document.addEventListener('keydown', e => {
    if([37, 38, 39, 40].indexOf(e.keyCode) != -1) {
        if(direction == 'ArrowLeft' && e.key == 'ArrowRight') return 0;
        if(direction == 'ArrowRight' && e.key == 'ArrowLeft') return 0;
        if(direction == 'ArrowUp' && e.key == 'ArrowDown') return 0;
        if(direction == 'ArrowDown' && e.key == 'ArrowUp') return 0;

        direction = e.key;
    }
});