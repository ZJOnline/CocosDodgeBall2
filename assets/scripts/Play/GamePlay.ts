import { LoaderMgr } from "../Utils/LoaderMgr";
import { gen_handler } from "../Utils/Utils";
import SceneManager from "../Utils/SceneManager/SceneManager";
import EnemySpawner from "../Logic/EnemySpawner";
import PlayerLogic from "../Logic/PlayerLogic";
import ObjectPool from "../Logic/ObjectPool";
import { UIManager, UI_CONFIG, UI_POP_TYPE } from "../Utils/UIManager";
import Stage from "./Stage";
import { EventMgr, Event_Name } from "../Utils/EventMgr";
import TriggerEventMgr from "../Utils/TriggerEventMgr";
import GameManager from "../Logic/GameManager";
import WXTools from "../Utils/WX/WXTools";
import xxtea from "../Utils/xxtea";
import Tool from "../Utils/Tool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    private static m_instance: GamePlay;
    public static get Instance() {
        return this.m_instance;
    }

    cur_stage: Stage;
    enemySpawner: EnemySpawner;
    player: PlayerLogic;
    gameState: GameState = GameState.Home;

    curSelectStageIndex = 1;

    inited = false;

    onLoad() {
        GamePlay.m_instance = this;
        EventMgr.Instance.add(Event_Name.GOTO_NEXT_STAGE, this.goToNextStage, this);
    }

    start() {
        this.curSelectStageIndex = GameManager.Instance.m_StorageData.curSelectStage;

    }

    update() {
        if (ObjectPool.instance.inited && !this.inited) { 
            this.init();
            this.inited = true;
        }
    }

    onDestroy() {
        EventMgr.Instance.remove(Event_Name.GOTO_NEXT_STAGE, this.goToNextStage);
    }

    init() {
        this.player = new PlayerLogic();
        this.player.spawn();
        UIManager.get_inst().show(UI_CONFIG.MainBgUI,UI_POP_TYPE.Bg);
        UIManager.get_inst().show(UI_CONFIG.HomeUI);
        this.enemySpawner = this.node.addComponent(EnemySpawner);
        this.enemySpawner.player = this.player.m_view.node;
    }

    /**
     * player死亡
     */
    gameOver() {
        this.clearScene();
        EventMgr.Instance.fire(Event_Name.GAME_OVER);
        this.gameState = GameState.GameOver;
    }

    /**
     * 清空场景
     */
    clearScene() {
        this.enemySpawner.stopSpawn();
        this.enemySpawner.clear();
    }

    /**
     * 开始按钮点击，开始进入关卡
     */
    startStage() {
        this.gameState = GameState.Stage;
        this.cur_stage = new Stage(this.curSelectStageIndex);
        this.saveDataToFile();
    }

    /**
     * 计时结束，可以过关，使player可以往上走
     */
    passStage() {
        this.player.m_controller.passStage = true;
    }

    /**
     * 触发trigger，前往下一关
     */
    goToNextStage() {
        if (this.gameState != GameState.Stage) {
            return;
        }
        this.cur_stage = new Stage(this.cur_stage.id + 1);
        EventMgr.Instance.fire(Event_Name.MOVE_DOOR, 2, 2, 1);//开第二个背景下门
        EventMgr.Instance.fire(Event_Name.SWITCH_BG, 1);//切换背景
        EventMgr.Instance.fire(Event_Name.ENTER_STAGE);
        this.player.m_view.node.active = false;
        this.player.m_controller.passStage = false;
        
        this.saveDataToFile();
        console.log("goToNextStage");
    }

    /**
     * 重新开始本关
     */
    restartCurStage() {
        this.gameState = GameState.Stage;
        this.cur_stage = new Stage(this.cur_stage.id);
        this.player.beginRestartStage();
        EventMgr.Instance.fire(Event_Name.RESTART_STAGE);
        this.player.m_controller.passStage = false;
    }

    /**
     * 返回home界面
     */
    returnHome() {
        
        this.gameState = GameState.Home;
    }

    saveDataToFile() {
        GameManager.Instance.m_StorageData.curSelectStage = this.curSelectStageIndex;
        let str = JSON.stringify(GameManager.Instance.m_StorageData);
        console.log(str);
        str = Tool.encryptStr(str.toString());
        WXTools.writeFile(str.toString(), null);

        // str = Tool.decryptStr(str.toString());
        // console.log(str);
    }

    /**
     * 创建延时自动回收的物体
     * @param _name 
     */
    GetDelayReturnObject(_name:string) {
        let ob = ObjectPool.instance.getObject(_name);
        this.scheduleOnce(() => {
            ObjectPool.instance.returnPool(ob);
        }, 1);
        return ob;
    }
}

export enum GameState{
    Home = 1,
    Stage = 2,
    GameOver = 3,
}