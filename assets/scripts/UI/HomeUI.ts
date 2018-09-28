import { UIBase } from "../Utils/UIBase";
import { EventMgr, Event_Name } from "../Utils/EventMgr";
import GamePlay from "../Play/GamePlay";
import PlayerLogic from "../Logic/PlayerLogic";
import Tool from "../Utils/Tool";
import DataTable from "../Utils/DataLoader/DataTable";
import NodeTool from "../Utils/NodeTool";


const { ccclass, property } = cc._decorator;

@ccclass
export default class HomeUI extends UIBase {

    @property(cc.Button)
    btn_start: cc.Button = null;

    @property(cc.Animation)
    balls: cc.Animation = null;
    m_Player: PlayerLogic;
    hideImP: cc.Node;
    leftArrow: cc.Node;//左箭头
    rightArrow: cc.Node;//右箭头
    stageTxt: cc.Label;

    delayActive = 2;//显示出来后，延迟几秒才能点击
    canTouch = false;

    onLoad() {
        this.btn_start.node.on(cc.Node.EventType.TOUCH_END, this.onStartClick, this);
        this.hideImP = cc.find("Node", this.node);
        this.leftArrow = cc.find("StageSelector/Left", this.node);
        this.leftArrow.on("click", this.onLeftArrowClick, this);
        this.rightArrow = cc.find("StageSelector/Right", this.node);
        this.rightArrow.on("click", this.onRightArrowClick, this);
        this.stageTxt = NodeTool.findChildComponent("StageSelector/Num", this.node, cc.Label);
    }

    start() {
        
    }

    // update(dt) {
        
    // }

    on_show() {
        super.on_show();
        this.canTouch = false;
        this.scheduleOnce(() => {
            this.canTouch = true;
        }, this.delayActive);
        this.m_Player = GamePlay.Instance.player;
        this.m_Player.m_view.node.active = true;
        GamePlay.Instance.player.m_view.position = cc.Vec2.ZERO;
        GamePlay.Instance.player.m_view.rotation = 0;
        GamePlay.Instance.player.m_view.scale = cc.v2(2, 2);
        this.hideImP.runAction(cc.fadeIn(0.5));
        this.balls.play("BallBack");

        this.stageTxt.string = GamePlay.Instance.curSelectStageIndex.toString();
    }

    onStartClick() {
        if (!this.canTouch) {
            return;
        }
        this.canTouch = false;
        let finish = cc.callFunc(() => {
            EventMgr.Instance.fire(Event_Name.SWITCH_BG, 1);
            this.hide();
        }, this);
        this.m_Player.m_view.node.runAction(cc.sequence(
            cc.scaleBy(0.4, 0.3, 0.3),
            cc.delayTime(0.3),
            cc.moveTo(1, cc.v2(0, 700)).easing(cc.easeCubicActionIn()),
            finish,
        ));
        this.balls.play("BallUp");
        this.hideImP.runAction(cc.fadeOut(0.5));
        GamePlay.Instance.startStage();
        EventMgr.Instance.fire(Event_Name.MOVE_DOOR, 1, 1, 1);
        EventMgr.Instance.fire(Event_Name.MOVE_DOOR, 2, 2, 1);
        EventMgr.Instance.fire(Event_Name.ENTER_STAGE);
    }

    onLeftArrowClick() {
        if (GamePlay.Instance.curSelectStageIndex > 1) {
            GamePlay.Instance.curSelectStageIndex--;
        }
        this.stageTxt.string = GamePlay.Instance.curSelectStageIndex.toString();
    }
    
    onRightArrowClick() {
        if (GamePlay.Instance.curSelectStageIndex < DataTable.StageDT.getAllDataList().length) {
            GamePlay.Instance.curSelectStageIndex++;
        }
        this.stageTxt.string = GamePlay.Instance.curSelectStageIndex.toString();
    }
}
