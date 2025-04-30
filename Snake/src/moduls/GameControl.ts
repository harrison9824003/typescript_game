import Snake from "./Snake";
import Food from "./Foods";
import ScorePanel from "./ScorePanel";

// GameControl 類別負責遊戲的控制邏輯
class GameControl {
    // 蛇的實例
    snake: Snake;

    // 食物的實例
    food: Food;

    // 分數面板的實例
    scorePanel: ScorePanel;

    // 遊戲的方向
    direction: string = '';

    // 遊戲是否存活
    isLive: boolean = true;

    // 速數
    speed: number = 300;

    // 最慢速度，依照分數面板的等級來調整
    minSpeed: number = 300;
    
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 2);

        this.init();
    }

    // 初始化遊戲控制器
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    // 鍵盤事件處理函數
    keydownHandler(event: KeyboardEvent) {

        // 判斷加速鍵 a 或 A 是否被按下
        if (event.key == 'a' || event.key == 'A') {
            // 設定為加速
            if (this.speed <= 100) {
                this.speed = 100;
            } else {
                this.speed -= 30;
            }
        }

        // 判斷按下減速 s 或 S 鍵
        if (event.key == 's' || event.key == 'S') {
            // 設定為減速
            if (this.speed >= this.minSpeed) {
                this.speed = this.minSpeed;
            } else {
                this.speed += 30;
            }
        }

        // 顯示速度
        document.getElementById('speed')!.innerHTML = this.speed + '';

        // 按鍵
        document.getElementById('enterKey')!.innerHTML = event.key + '';

        // 判斷按下方向鍵或 WASD 鍵才修改方向
        if (
            event.key !== 'ArrowUp' && 
            event.key !== 'ArrowDown' && 
            event.key !== 'ArrowLeft' && 
            event.key !== 'ArrowRight' && 
            event.key !== 'Up' && 
            event.key !== 'Down' && 
            event.key !== 'Left' && 
            event.key !== 'Right'
        ) {
            return;
        }

        this.direction = event.key;
    }

    run() {
        // 取得蛇的當前位置
        let x = this.snake.xPosition;
        console.log('x', x);
        let y = this.snake.yPosition;
        console.log('y', y);

        // 蛇頭預設為三角形，往下 180 度
        let transform = 'rotate(180deg)';

        // 根據方向更新蛇的位置
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                console.log('up', y);
                y -= 10;
                transform = 'rotate(0deg)';
                break;
            case "ArrowDown":
            case "Down":
                console.log('down', y);
                y += 10;
                transform = 'rotate(180deg)';
                break;
            case "ArrowLeft":
            case "Left":
                console.log('left', x);
                transform = 'rotate(270deg)';
                x -= 10;
                break;
            case "ArrowRight":
            case "Right":
                console.log('right', x);
                x += 10;
                transform = 'rotate(90deg)';
                break;
        }

        // 檢查是否吃到食物
        this.checkEat(x, y);

        // 檢查蛇是否撞牆或撞到自己
        try {
            this.snake.xPosition = x;
            this.snake.yPosition = y;
            
            // 判斷 X 與 Y 是否有換座標，切換蛇頭的方向
            if (this.snake.xPosition == x && this.snake.yPosition == y) {
                this.snake.head.style.transform = transform;
            }
        } catch (e) {
            alert((e as Error).message + ' Game Over!');
            this.isLive = false;
        }

        // 調整時間
        this.minSpeed = 300 - (this.scorePanel.level - 1) * 30;
        if (this.speed > this.minSpeed) {
            this.speed = this.minSpeed;
        }

        // 檢查蛇是否存活
        // 如果蛇存活，則繼續遊戲
        this.isLive && setTimeout(this.run.bind(this), this.speed);
    }

    // 檢查蛇是否吃到食物
    checkEat(x: number, y: number) {
        if (x === this.food.xPosition && y === this.food.yPosition) {
            this.food.changeFoodPosition();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}

export default GameControl;
