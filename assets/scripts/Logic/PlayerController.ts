import Tool from "../Utils/Tool";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    canvas: cc.Node;

    canTouch = false;
    passStage = false;

    targetRotation = 0;

    rangeX = 297;
    rangeY = 511;
    rangX_s = 73;
    // onLoad () {}

    start() {
        this.canvas = cc.find("Canvas");
        if (this.canvas) {
            this.canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }
        this.targetRotation = this.node.rotation;
    }

    onTouchStart(event: cc.Event.EventTouch) {
    }

    onTouchMove(event: cc.Event.EventTouch) {
        if (!this.canTouch) {
            return;
        }
        let v1 = event.getLocation().sub(event.getPreviousLocation());

        // console.log(event.getDelta());
        let rad = v1.normalize().signAngle(cc.Vec2.UP);
        let angle = (rad * 180) / Math.PI;
        this.targetRotation = angle;
        // this.node.rotation = angle;
        let targetPos = this.node.position.add(v1);

        if (Math.abs(targetPos.x) >= this.rangeX || Math.abs(targetPos.y) >= this.rangeY) {
            if (Math.abs(targetPos.x) <= this.rangX_s && this.passStage && targetPos.y > -this.rangeY) {

            }
            else {
                return;
            }
        }

        this.node.position = targetPos;
    }

    onTouchEnd(event: cc.Event.EventMouse) {
        // console.log(event.getLocation());
    }


    update(dt) {
        if (!this.canTouch) {
            return;
        }
        this.node.rotation = Tool.lerp(this.node.rotation, this.targetRotation, 0.5);
    }

    resetControl() {
        this.targetRotation = 0;
    }

}
