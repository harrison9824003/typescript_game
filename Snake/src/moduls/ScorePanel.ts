class ScorePanel{
    score = 0;
    level = 1;

    // 取得 id 為 score 和 level 的元素
    scoreEle: HTMLElement;
    // 取得 id 為 level 的元素
    levelEle: HTMLElement;

    // 設定最高等級和升級所需的分數
    maxLevel: number;
    // 升級所需的分數
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 增加分數的方法
    addScore(){
        this.scoreEle.innerHTML = ++this.score + '';
        if(this.score % this.upScore === 0){
            this.levelUp();                                                                                     
        }
    }

    // 升級的方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
}

export default ScorePanel;
