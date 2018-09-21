import EntityLogic from "./EntityLogic";
import ObjectPool from "./ObjectPool";
import EnemyController from "./EnemyController";
import EnemyBallView from "../View/EnemyBallView";

export default class EnemyBallLogic extends EntityLogic {



    /**
     *
     */
    constructor(_id: number) {
        super();
        this.m_id = _id;
    }

    spawn(_parent: cc.Node, _player: cc.Node, _pos: cc.Vec2) {
        let ob = ObjectPool.instance.getObject("ball");
        ob.parent = _parent;
        let c = ob.getComponent(EnemyController);
        this.m_view = ob.getComponent(EnemyBallView);
        this.m_view.logic = this;
        c.player = _player;
        ob.position = _pos;

        this.m_view.rebirth();
    }

}
