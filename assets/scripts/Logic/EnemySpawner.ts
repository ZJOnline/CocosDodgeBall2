import ObjectPool from "./ObjectPool";
import EnemyController from "./EnemyController";
import Tool from "../Utils/Tool";
import SceneManager from "../Utils/SceneManager/SceneManager";
import EnemyBallLogic from "./EnemyBallLogic";
import DataTable from "../Utils/DataLoader/DataTable";
import GamePlay from "../Play/GamePlay";
import { RefreshDTItem, MonsterDTItem } from "../Utils/DataLoader/DataClasses";
import { gen_handler } from "../Utils/Utils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemySpawner extends cc.Component {

    width = 350;
    height = 800;

    enemyPoint: cc.Node = null;
    player: cc.Node = null;

    enemyBalls: EnemyBallLogic[] = [];
    enemyBallMap: Map<number, EnemyBallLogic>;
    monsters: cc.Node[] = [];
    // onLoad () {}

    start() {
        this.enemyBallMap = new Map();
        this.enemyPoint = cc.find("Enemy", SceneManager.Instance.sceneObjects);
    }

    update() {
        if (ObjectPool.instance.inited && !this.spawn) {

            // this.schedule(this.startSpawn, 1);
            // this.spawn = true;
        }
    }

    startSpawn() {
        // this.schedule(this.spawnBall, 5);
        // this.spawnMonster();
    }

    spawnMonster() {
        let refreshData = DataTable.RefreshDT.getData(GamePlay.Instance.cur_stage.stageData.spawn);
        for (let i = 0; i < refreshData.length; i++) {
            this.scheduleOnce(() => {
                this.spawn(refreshData[i]);
            }, refreshData[i].time)
        }
    }

    spawnBall() {
        let id = Date.now();
        // this.enemyBallMap[id] = new EnemyBallLogic(id);
        // this.enemyBallMap[id].spawn(this.enemyPoint, this.player, cc.v2(-157 + Tool.getRandomFloatNum(0, this.width), -400 + Tool.getRandomFloatNum(0, this.height)));
        let enemy = new EnemyBallLogic(id);
        this.enemyBalls.push(enemy);
        enemy.spawn(this.enemyPoint, this.player, cc.v2(-157 + Tool.getRandomFloatNum(0, this.width), -400 + Tool.getRandomFloatNum(0, this.height)));
    }

    spawn(data: RefreshDTItem) {
        let monster: MonsterDTItem = DataTable.MonsterDT.getData(data.monsterID);
        ObjectPool.instance.showEntity(monster.path, monster.name, gen_handler((_node: cc.Node) => {
            _node.parent = SceneManager.Instance.sceneObjects;
            _node.active = true;
            if (data.random) {
                _node.position = cc.v2(-157 + Tool.getRandomFloatNum(0, this.width), -400 + Tool.getRandomFloatNum(0, this.height));
            } else {
                _node.position = cc.v2(data.posX, data.posY);
            }
            this.monsters.push(_node);
        }, this));
    }

    stopSpawn() {
        // this.unschedule(this.spawnBall);
        this.unscheduleAllCallbacks();
    }

    clear() {
        for (let i = 0; i < this.enemyBalls.length; i++) {
            this.enemyBalls[i].die();
        }
        this.enemyBalls = [];

        for (let i = 0; i < this.monsters.length; i++){
            ObjectPool.instance.returnPool(this.monsters[i]);
        }
        this.monsters = [];
    }
}
