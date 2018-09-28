import { UIBase } from "../Utils/UIBase";
import { UIManager, UI_CONFIG } from "../Utils/UIManager";
import GamePlay from "../Play/GamePlay";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOverUI extends UIBase {

    home: cc.Node;
    restart: cc.Node;

    onLoad() {
        this.home = cc.find("Home", this.node);
        this.home.on("click", this.onHomeClick, this);
        this.restart = cc.find("Restart", this.node);
        this.restart.on("click", this.onRestartClick, this);
    }

    start () {

    }

    // update (dt) {}

    onHomeClick() {
        this.hide();
        UIManager.get_inst().show(UI_CONFIG.HomeUI);
        GamePlay.Instance.returnHome();
    }

    onRestartClick() {
        this.hide();
        GamePlay.Instance.restartCurStage();
    }
}
