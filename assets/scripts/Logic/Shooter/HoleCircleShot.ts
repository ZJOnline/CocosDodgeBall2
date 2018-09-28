import BaseShooter from "./BaseShooter";
import NodeTool from "../../Utils/NodeTool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HoleCircleShot extends BaseShooter {

    _HoleCenterAngle: number = 180;
    _HoleSize: number = 20;

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    shot() {
        this._HoleCenterAngle = NodeTool.get360Angle(this._HoleCenterAngle);
        let startAngle = this._HoleCenterAngle - (this._HoleSize / 2);
        let endAngle = this._HoleCenterAngle + (this._HoleSize / 2);
        let shiftAngle = 360 / this._BulletNum;

        for (let i = 0; i < this._BulletNum; i++){
            let angle = shiftAngle * i;
            if (startAngle <= angle && angle <= endAngle) {
                continue;
            }

            let bullet = this.getBullet(this.node.position, this.node.rotation);
            if (bullet == null) {
                break;
            }
            console.log("angle  ", angle);
            this.shotBullet(bullet, this._BulletSpeed, angle);
        }
        this.finishShoot();
    }
}
