import ObjectPool from "./ObjectPool";
import EnemyController from "./EnemyController";
import Tool from "../Utils/Tool";
import SceneManager from "../Utils/SceneManager/SceneManager";
import EnemyBallLogic from "./EnemyBallLogic";

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
export default class EnemySpawner extends cc.Component {

    width = 350;
    height = 800;
    spawn = false;

    enemyPoint: cc.Node = null;
    player: cc.Node = null;

    enemyBallMap: Map<number, EnemyBallLogic>;
    // onLoad () {}

    start() {
        this.enemyBallMap = new Map();
        this.enemyPoint = cc.find("Enemy", SceneManager.Instance.sceneObjects);
    }

    update() {
        if (ObjectPool.instance.inited && !this.spawn) {
            // this.startSpawn();
            this.schedule(this.startSpawn, 1);
            this.spawn = true;
        }
    }

    startSpawn() {
        // let ob = ObjectPool.instance.getObject("ball");
        // ob.parent = this.enemyPoint;
        // let c = ob.getComponent(EnemyController);
        // c.player = this.player;
        // ob.position = cc.v2(-157 + Tool.getRandomFloatNum(0, this.width), -400 + Tool.getRandomFloatNum(0, this.height));

        let id = Date.now();
        this.enemyBallMap[id] = new EnemyBallLogic(id);
        this.enemyBallMap[id].spawn(this.enemyPoint, this.player, cc.v2(-157 + Tool.getRandomFloatNum(0, this.width), -400 + Tool.getRandomFloatNum(0, this.height)));
    }
}
