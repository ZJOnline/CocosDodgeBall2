import NodeTool from "../Utils/NodeTool";
import Tool from "../Utils/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    _Shooting: boolean = false;

    speed: number;
    angle: number;
    accelSpeed: number;
    accelTurn: number;
    homing: boolean;
    homingTarget: cc.Node;
    homingAngleSpeed: number;
    wave: boolean;
    waveSpeed: number;
    waveRangeSize: number;
    pauseAndResume: boolean;
    pauseTime: number;
    resumeTime: number;

    @property(cc.Graphics)
    grap: cc.Graphics = null;
    targetDir: cc.Vec2;
    // onLoad () {}

    start() {
        this.grap.moveTo(0, 0);
        this.grap.lineTo(0,200);
        
        this.grap.stroke();
    }

    update(dt) {
        if (this._Shooting) {
            this.moveAction(this.speed, this.angle, this.accelSpeed, this.accelTurn,
                this.homing, this.homingTarget, this.homingAngleSpeed,
                this.wave, this.waveSpeed, this.waveRangeSize,
                this.pauseAndResume, this.pauseTime, this.resumeTime, dt)
        }
    }

    onDisable() {
        this._Shooting = false;
    }

    shot(speed: number, angle: number, accelSpeed: number, accelTurn: number,
        homing: boolean, homingTarget: cc.Node, homingAngleSpeed: number,
        wave: boolean, waveSpeed: number, waveRangeSize: number,
        pauseAndResume: boolean, pauseTime: number, resumeTime: number) {

        if (this._Shooting) {
            return;
        }
        this._Shooting = true;
        this.speed = speed;
        this.angle = angle;
        this.accelSpeed = accelSpeed;
        this.accelTurn = accelTurn;
        this.homing = homing;
        this.homingTarget = homingTarget;
        this.homingAngleSpeed = homingAngleSpeed;
        this.wave = wave;
        this.waveSpeed = waveSpeed;
        this.waveRangeSize = waveRangeSize;
        this.pauseAndResume = pauseAndResume;
        this.pauseTime = pauseTime;
        this.resumeTime = resumeTime;

        this.scheduleOnce(() => {
            this._Shooting = false;
        }, 5);
    }

    moveAction(speed: number, angle: number, accelSpeed: number, accelTurn: number,
        homing: boolean, homingTarget: cc.Node, homingAngleSpeed: number,
        wave: boolean, waveSpeed: number, waveRangeSize: number,
        pauseAndResume: boolean, pauseTime: number, resumeTime: number, dt: number) {

        this.node.rotation = angle;

        let selfFrameCnt = 0;
        let selfTimeCount = 0;

        if (homing) {
            if (homingTarget != undefined && homingTarget != null && 0 < homingAngleSpeed) {
                let rotAngle = NodeTool.getAngleFromNode(this.node, homingTarget);
                let myAngle = this.node.rotation;
                let toAngle = Tool.lerp(myAngle, rotAngle, homingAngleSpeed * dt);
                this.node.rotation = toAngle;
            }
        }
        else if (wave) {
            angle += accelTurn * dt;
            if (0 < waveSpeed && 0 < waveRangeSize) {
                let waveAngle = angle + (waveRangeSize / 2 * Math.sin(selfFrameCnt * waveSpeed / 100));
                this.node.rotation = waveAngle;
            }
            selfFrameCnt++;
        }
        else {
            let addAngle = accelTurn * dt;
            this.node.rotation = this.node.rotation + addAngle;
        }

        speed += accelSpeed * dt;
        // let dir = NodeTool.getVec2FromAngle(this.node.rotation);
        console.log(Math.PI / 180);
        let dir = cc.Vec2.UP.rotate(Math.PI / 180 * angle);
        this.targetDir = dir;
        this.drawLine(dir);
        // this.node.position = this.node.position.add(dir.normalize().mul(speed).mul(dt));
        
    }

    drawLine(dir:cc.Vec2) {
        this.grap.clear();
        this.grap.moveTo(0, 0);
        let targetPos = this.node.position.add(dir.normalize().mul(100));
        this.grap.lineTo(targetPos.x,targetPos.y);
        this.grap.lineTo(0,200);
        this.grap.stroke();

    }
}
