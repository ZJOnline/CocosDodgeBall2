import { UIBase } from "../Utils/UIBase";
import { EventMgr, Event_Name } from "../Utils/EventMgr";
import PlayerLogic from "../Logic/PlayerLogic";
import GamePlay from "../Play/GamePlay";
import Tool from "../Utils/Tool";
import NodeTool from "../Utils/NodeTool";

const { ccclass, property } = cc._decorator;

@ccclass("Door")
class Door {
    @property(cc.Node)
    doorLeft: cc.Node = null;
    @property(cc.Node)
    doorRight: cc.Node = null;
}

@ccclass
export default class MainBgUI extends UIBase {

    @property(cc.Node)
    bg1: cc.Node = null;
    @property(cc.Node)
    bg2: cc.Node = null;
    @property([Door])
    doors1: Door[] = [];
    @property([Door])
    doors2: Door[] = [];

    doors_origin: any;
    door_move_time = 0.5;//门移动时间
    door_originx = 37;//关门位置
    door_targetx = 111;//开门位置

    gameInfo: cc.Node;
    time_count: cc.Label;
    passCol: cc.Node;

    m_Player: PlayerLogic;
    onLoad() {
        this.gameInfo = cc.find("GameInfo", this.node);
        this.gameInfo.active = false;
        this.time_count = NodeTool.findChildComponent("Time", this.gameInfo, cc.Label);
        this.passCol = cc.find("Pass", this.gameInfo);
        this.passCol.active = false;
    }

    start() {
        this.doors_origin = [this.doors1[0].doorLeft.position,
        this.doors1[0].doorRight.position,
        this.doors1[1].doorLeft.position,
        this.doors1[1].doorRight.position,
        this.doors2[0].doorLeft.position,
        this.doors2[0].doorRight.position,
        this.doors2[1].doorLeft.position,
        this.doors2[1].doorRight.position,
        ];

    }

    on_show() {
        super.on_show();
        this.m_Player = GamePlay.Instance.player;
        EventMgr.Instance.add(Event_Name.SWITCH_BG, this.switchBG, this);
        EventMgr.Instance.add(Event_Name.MOVE_DOOR, this.openOrCloseGate, this);
        EventMgr.Instance.add(Event_Name.ENTER_STAGE, this.enterStage, this);
        EventMgr.Instance.add(Event_Name.GAME_OVER, this.gameOver, this);
        EventMgr.Instance.add(Event_Name.RETURN_HOME, this.returnHome, this);
        EventMgr.Instance.add(Event_Name.RESTART_STAGE, this.restartCurStage, this);
    }

    on_hide() {
        super.on_hide();
        EventMgr.Instance.remove(Event_Name.SWITCH_BG, this.switchBG);
        EventMgr.Instance.remove(Event_Name.MOVE_DOOR, this.openOrCloseGate);
        EventMgr.Instance.remove(Event_Name.ENTER_STAGE, this.enterStage);
        EventMgr.Instance.remove(Event_Name.GAME_OVER, this.gameOver);
        EventMgr.Instance.remove(Event_Name.RETURN_HOME, this.returnHome);
        EventMgr.Instance.remove(Event_Name.RESTART_STAGE, this.restartCurStage);
    }

    onDestroy() {
        // EventMgr.Instance.remove(Event_Name.SWITCH_BG, this.switchBG);
        // EventMgr.Instance.remove(Event_Name.MOVE_DOOR, this.openOrCloseGate);
        // EventMgr.Instance.remove(Event_Name.ENTER_STAGE, this.enterStage);
    }

    // update (dt) {}

    /**
     * 开始进入下一关，父物体设为bg2，跟随移动
     * @param params 
     */
    enterStage(...params: any[]) {
        this.gameInfo.active = true;
        this.gameInfo.parent = this.bg2;
        this.gameInfo.position = cc.Vec2.ZERO;
        this.time_count.string = GamePlay.Instance.cur_stage.aliveTime.toString();
        this.time_count.node.active = true;
        this.passCol.active = false;
    }

    returnHome() {
        this.gameInfo.active = false;
    }

    switchBG(...params: any[]) {
        if (this.node.active == false)
            return;
        if (params[0] == 1) {
            this.upDownSwitch();
        }
        else if (params[1] == 2) {
            this.leftRightSwitch();
        }
    }

    /**
     * 上下切换背景
     * 关闭bg1的上门
     * 移动两个背景
     * 背景移动完，将player从底下飞上来
     * 飞完关闭bg2的下门
     * bg1，bg2 变换到初始位置，开始倒计时
     */
    upDownSwitch() {

        EventMgr.Instance.fire(Event_Name.MOVE_DOOR, 1, 1, 0);
        this.scheduleOnce(() => {
            let finish = cc.callFunc(() => {
                this.upDownFinish();
            }, this);

            this.bg1.position = cc.v2(0, 0);
            this.bg1.runAction(cc.moveTo(1, cc.v2(0, -1334)));
            this.bg2.position = cc.v2(0, 1334);

            this.bg2.runAction(cc.sequence(cc.moveTo(1, cc.v2(0, 0)), finish));
        }, 0.5);

    }

    leftRightSwitch() {

    }

    /**
     * 将player从底下飞上来
     * 飞完关闭bg2的下门
     * bg1，bg2 变换到初始位置，开始倒计时
     */
    upDownFinish() {
        let finish = cc.callFunc(() => {
            this.playerMoveFinish();
        }, this);
        this.m_Player.m_view.node.active = true;
        this.m_Player.m_view.rotation = 0;
        this.m_Player.m_view.position = cc.v2(0, -700);
        this.m_Player.m_view.node.runAction(cc.sequence(cc.moveTo(1, cc.v2(0, -200)), finish));
    }

    playerMoveFinish() {

        this.m_Player.m_controller.canTouch = true;
        this.m_Player.alive = true;
        GamePlay.Instance.enemySpawner.startSpawn();
        EventMgr.Instance.fire(Event_Name.MOVE_DOOR, 2, 2, 0);
        this.scheduleOnce(() => {
            this.bg1.position = cc.v2(0, 0);
            this.bg2.position = cc.v2(0, 1334);
            this.gameInfo.parent = this.bg1;
            this.gameInfo.position = cc.Vec2.ZERO;
        }, 1);

        this.schedule(this.coutDown, 1, cc.macro.REPEAT_FOREVER, 1);
    }

    coutDown() {
        GamePlay.Instance.cur_stage.aliveTime = GamePlay.Instance.cur_stage.aliveTime - 1;
        this.time_count.string = GamePlay.Instance.cur_stage.aliveTime.toString();
        if (GamePlay.Instance.cur_stage.aliveTime == 0) {
            this.unschedule(this.coutDown);
            this.passStage();
        }
    }

    /**
     * 计时结束，可以过关
     */
    passStage() {
        EventMgr.Instance.fire(Event_Name.MOVE_DOOR, 1, 1, 1);
        GamePlay.Instance.passStage();
        this.passCol.active = true;
    }

    /**
     * 重新开始本关
     */
    restartCurStage() {
        EventMgr.Instance.fire(Event_Name.MOVE_DOOR, 1, 2, 1);//开第一个背景下门
        let finish = cc.callFunc(() => {
            this.m_Player.m_controller.canTouch = true;
            this.m_Player.alive = true;
            GamePlay.Instance.enemySpawner.startSpawn();
            EventMgr.Instance.fire(Event_Name.MOVE_DOOR, 1, 2, 0);
            this.scheduleOnce(() => {
                this.bg1.position = cc.v2(0, 0);
                this.bg2.position = cc.v2(0, 1334);
                this.gameInfo.parent = this.bg1;
                this.gameInfo.position = cc.Vec2.ZERO;
            }, 1);
            
            this.schedule(this.coutDown, 1, cc.macro.REPEAT_FOREVER, 1);
        }, this);
        this.m_Player.m_view.node.active = true;
        this.m_Player.m_view.rotation = 0;
        this.m_Player.m_view.position = cc.v2(0, -700);
        this.m_Player.m_view.node.runAction(cc.sequence(cc.moveTo(1, cc.v2(0, -200)), finish));
        
        this.time_count.string = GamePlay.Instance.cur_stage.aliveTime.toString();
        this.time_count.node.active = true;
    }

    /**
     * player死亡，游戏结束
     */
    gameOver() {
        this.unschedule(this.coutDown);
        EventMgr.Instance.fire(Event_Name.MOVE_DOOR, 1, 1, 0);
        this.time_count.node.active = false;
        this.passCol.active = false;
    }

    /**
     * 打开或关闭门
     * @param params 三个参数，第一个参数控制bg1还是bg2的门 1,2，第二个参数控制上面还是下面的门 1,2 ，第三个参数控制开1还是关0
     */
    openOrCloseGate(...params: any[]) {
        if (params[0] == 1) {
            this.doors1[params[1] - 1].doorLeft.stopAllActions();
            this.doors1[params[1] - 1].doorRight.stopAllActions();
            if (params[1] == 1) {
                if (params[2] == 1) {
                    this.doors1[0].doorLeft.runAction(cc.moveTo(this.door_move_time, -this.door_targetx, this.doors1[0].doorLeft.y));
                    this.doors1[0].doorRight.runAction(cc.moveTo(this.door_move_time, this.door_targetx, this.doors1[0].doorRight.y));
                }
                else if (params[2] == 0) {
                    this.doors1[0].doorLeft.runAction(cc.moveTo(this.door_move_time, -this.door_originx, this.doors1[0].doorLeft.y));
                    this.doors1[0].doorRight.runAction(cc.moveTo(this.door_move_time, this.door_originx, this.doors1[0].doorRight.y));
                }
            }
            else if (params[1] == 2) {
                if (params[2] == 1) {
                    this.doors1[1].doorLeft.runAction(cc.moveTo(this.door_move_time, -this.door_targetx, this.doors1[1].doorLeft.y));
                    this.doors1[1].doorRight.runAction(cc.moveTo(this.door_move_time, this.door_targetx, this.doors1[1].doorRight.y));
                }
                else if (params[2] == 0) {
                    this.doors1[1].doorLeft.runAction(cc.moveTo(this.door_move_time, -this.door_originx, this.doors1[1].doorLeft.y));
                    this.doors1[1].doorRight.runAction(cc.moveTo(this.door_move_time, this.door_originx, this.doors1[1].doorRight.y));
                }
            }
        }
        else if (params[0] == 2) {
            this.doors2[params[1] - 1].doorLeft.stopAllActions();
            this.doors2[params[1] - 1].doorRight.stopAllActions();
            if (params[1] == 1) {
                if (params[2] == 1) {
                    this.doors2[0].doorLeft.runAction(cc.moveTo(this.door_move_time, -this.door_targetx, this.doors2[0].doorLeft.y));
                    this.doors2[0].doorRight.runAction(cc.moveTo(this.door_move_time, this.door_targetx, this.doors2[0].doorRight.y));
                }
                else if (params[2] == 0) {
                    this.doors2[0].doorLeft.runAction(cc.moveTo(this.door_move_time, -this.door_originx, this.doors2[0].doorLeft.y));
                    this.doors2[0].doorRight.runAction(cc.moveTo(this.door_move_time, this.door_originx, this.doors2[0].doorRight.y));
                }
            }
            else if (params[1] == 2) {
                if (params[2] == 1) {
                    this.doors2[1].doorLeft.runAction(cc.moveTo(this.door_move_time, -this.door_targetx, this.doors2[1].doorLeft.y));
                    this.doors2[1].doorRight.runAction(cc.moveTo(this.door_move_time, this.door_targetx, this.doors2[1].doorRight.y));
                }
                else if (params[2] == 0) {
                    this.doors2[1].doorLeft.runAction(cc.moveTo(this.door_move_time, -this.door_originx, this.doors2[1].doorLeft.y));
                    this.doors2[1].doorRight.runAction(cc.moveTo(this.door_move_time, this.door_originx, this.doors2[1].doorRight.y));
                }
            }
        }
    }


}
