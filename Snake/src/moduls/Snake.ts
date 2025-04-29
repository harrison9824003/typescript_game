class Snake {
    head: HTMLElement;
    bodies: HTMLCollection;
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies =this.element.getElementsByTagName('div');
    }

    // 獲取蛇頭的 x 和 y 座標
    get xPosition() {
        return this.head.offsetLeft;
    }

    get yPosition() {
        return this.head.offsetTop;
    }

    // 設定蛇頭的 x 和 y 座標
    set xPosition(value: number) {
        if(this.xPosition === value) {
            console.log('Snake is moving in the same direction X!');
            return;
        }

        if(value < 0 || value > 290) {
            throw new Error('Snake hit the wall!');
        }

        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if(value > this.xPosition) {
                console.log('move left!');
                value = this.xPosition - 10;
            } else {
                console.log('move right!');
                value = this.xPosition + 10;
            }
        }

        this.moveBody();

        this.head.style.left = value + 'px';

        this.checkHeadBody();
    }

    // 設定蛇頭的 y 座標
    set yPosition(value: number) {
        if(this.yPosition === value) {
            console.log('Snake is moving in the same direction Y!');
            return;
        }

        if(value < 0 || value > 290) {
            throw new Error('Snake hit the wall!');
        }

        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if(value > this.yPosition) {
                console.log('move up!');
                value = this.yPosition - 10;
            } else {
                console.log('move down!');
                value = this.yPosition + 10;
            }
        }

        this.moveBody();

        this.head.style.top = value + 'px';

        this.checkHeadBody();
    }

    // 新增身體的方法
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    // 移動身體的方法
    moveBody() {
        for(let i = this.bodies.length - 1; i > 0; i--) {
            let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            console.log('x:', x, 'y:', y);
            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px';
        }
    }

    // 檢查蛇頭是否碰到身體的方法
    checkHeadBody() {
        for(let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            console.log('bd:', bd.offsetLeft, bd.offsetTop);
            console.log('head:', this.xPosition, this.yPosition);
            if(this.xPosition === bd.offsetLeft && this.yPosition === bd.offsetTop) {
                throw new Error('Snake hit itself!');
            }
        }
    }
}

export default Snake;
