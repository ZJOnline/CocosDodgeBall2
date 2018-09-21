import { LoaderMgr } from "../Utils/LoaderMgr";
import { gen_handler } from "../Utils/Utils";
import SceneManager from "../Utils/SceneManager/SceneManager";
import EnemySpawner from "../Logic/EnemySpawner";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    enemySpawner: EnemySpawner;

    start() {
        LoaderMgr.get_inst().loadPrefabObj("Prefabs/player_01", gen_handler((_node: cc.Node) => {
            SceneManager.Instance.sceneObjects.addChild(_node);
            _node.position = cc.Vec2.ZERO;
            _node.name = "Player";
            this.enemySpawner = this.node.addComponent(EnemySpawner);
            this.enemySpawner.player = _node;
        }, this));

    }

}
