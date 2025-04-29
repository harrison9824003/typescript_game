class Foods {
    element: HTMLElement;

    constructor() {
        // 取得 id 為 food 元素
        this.element = document.getElementById('food')!;
    }

    get xPosition() {
        // 取得食物的 x 座標
        return this.element.offsetLeft;
    }

    get yPosition() {
        // 取得食物的 y 座標
        return this.element.offsetTop;
    }

    changeFoodPosition() {
        // 隨機產生食物的 x 和 y 座標
        let top = Math.floor(Math.random() * 29) * 10;
        // 取得隨機的 x 座標，範圍是 0 到 290，並乘以 10 以符合格子大小
        let left = Math.floor(Math.random() * 29) * 10;

        // 設定食物的 x 和 y 座標
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Foods;
