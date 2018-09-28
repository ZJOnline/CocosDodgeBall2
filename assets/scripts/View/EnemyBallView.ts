import EntityView from "./EntityView";
import EnemyController from "../Logic/EnemyController";
import { TweenUtil } from "../Utils/TweenUtil";
import { TweenFunc } from "../Utils/tweenfunc";
import GamePlay from "../Play/GamePlay";
import Tool from "../Utils/Tool";
import ObjectPool from "../Logic/ObjectPool";
import SceneManager from "../Utils/SceneManager/SceneManager";
import ConstData from "../Utils/ConstData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyBallView extends EntityView {

    m_controller: EnemyController;
    birthTime = 0.5;
    m_color: cc.Color;

    onLoad() {
        this.m_controller = this.node.getComponent(EnemyController);
    }

    start() {
        super.start();
    }

    rebirth() {
        super.rebirth();
        this.m_color = ConstData.BallColor[Tool.getRandomIntNum(0, 7)];
        this.node.color = this.m_color;
        this.m_controller.enabled = false;
        this.scheduleOnce(() => {
            this.m_controller.enabled = true;
        }, this.birthTime);
        let that = this;
        TweenUtil.from({
            node: this.node,
            width: 0,
            height: 0,
            duration: this.birthTime,
            tweenFunc: TweenFunc.Quart.easeOut
        });
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        GamePlay.Instance.player.die();
        // this.logic.die();
    }

    die() {
        let name = "balldie_" + Tool.getRandomIntNum(1, 3);
        let dieOb: cc.Node = ObjectPool.instance.getObject(name);
        dieOb.parent = SceneManager.Instance.sceneObjects;
        dieOb.position = this.node.position;
        dieOb.color = this.m_color;
        dieOb.scale = 0;
        dieOb.opacity = 0;
        dieOb.rotation = Tool.getRandomIntNum(0, 360);
        dieOb.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.delayTime(0.3)));
        dieOb.runAction(cc.sequence(cc.fadeIn(0.2), cc.delayTime(0.1),cc.fadeOut(0.7)));
    }

    // update (dt) {}
}
