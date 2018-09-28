import Bullet from "../Bullet";
import ObjectPool from "../ObjectPool";
import Tool from "../../Utils/Tool";
import SceneManager from "../../Utils/SceneManager/SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseShooter extends cc.Component {
    // "Set a bullet prefab for the shot. (ex. sprite or model)"
    _BulletPrefab: cc.Node;
    // "Set a bullet number of shot."
    _BulletNum: number = 10;
    // "Set a bullet base speed of shot."
    public _BulletSpeed: number = 50;
    // "Set an acceleration of bullet speed."
    public _AccelerationSpeed: number = 0;
    // "Set an acceleration of bullet turning."
    public _AccelerationTurn: number = 0;
    // "This flag is pause and resume bullet at specified time."
    public _UsePauseAndResume: boolean = false;
    // "Set a time to pause bullet."
    public _PauseTime: number = 0;
    // "Set a time to resume bullet."
    public _ResumeTime: number = 0;
    // "This flag settings pooling bullet GameObject at initial awake."
    public _InitialPooling: boolean = false;
    // "This flag is automatically release the bullet GameObject at the specified time."
    public _UseAutoRelease: boolean = false;
    // "Set a time to automatically release after the shot at using UseAutoRelease. (sec)"
    public _AutoReleaseTime: number = 10;
    // "Set a GameObject that receives callback method after shot."
    public _CallbackReceiver: cc.Node;
    // "Set a name of callback method at using Call Back Receiver."
    public _CallbackMethod: string;

    _Shooting: boolean;

    onDisable() {
        this._Shooting = false;
    }

    // update (dt) {}

    shot() {

    }

    getBullet(pos: cc.Vec2, rotation: number): Bullet {
        let ob = ObjectPool.instance.getObject("Bullet");
        if (ob == null) {
            Tool.log("bullet ob is null!");
            return null;
        }
        let b = ob.getComponent(Bullet);
        if (b == null) {
            Tool.log("bullet is null!");
            return null;
        }
        ob.parent = SceneManager.Instance.sceneObjects;
        ob.position = pos;
        ob.rotation = rotation;
        return b;
    }

    shotBullet(bullet: Bullet, speed: number, angle: number, homing: boolean = false,
        homingTarget: cc.Node = null, homingAngleSpeed: number = 0, wave: boolean = false,
        waveSpeed: number = 0, waveRangeSize: number = 0) {

        if (bullet == null || bullet == undefined) {
            return;
        }
        bullet.shot(speed, angle, this._AccelerationSpeed, this._AccelerationTurn,
            homing, homingTarget, homingAngleSpeed,
            wave, waveSpeed, waveRangeSize,
            this._UsePauseAndResume, this._PauseTime, this._ResumeTime);

    }

    finishShoot() {

    }
}
