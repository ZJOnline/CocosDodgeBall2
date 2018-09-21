import EntityView from "./EntityView";
import EnemyController from "../Logic/EnemyController";
import { TweenUtil } from "../Utils/TweenUtil";
import { TweenFunc } from "../Utils/tweenfunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyBallView extends EntityView {

    m_controller: EnemyController;
    birthTime = 0.5;

    onLoad() {
        this.m_controller = this.node.getComponent(EnemyController);
    }

    start() {
        super.start();
    }

    rebirth() {
        super.rebirth();
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
        console.log("onCollisionEnter");
    }

    // update (dt) {}
}
