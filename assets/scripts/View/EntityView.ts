import EnemyBallLogic from "../Logic/EnemyBallLogic";
import EntityLogic from "../Logic/EntityLogic";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityView extends cc.Component {

    logic: EntityLogic;

    get position() {
        return this.node.position;
    }

    set position(v:cc.Vec2) {
        this.node.position = v;
    }
    
    get rotation() {
        return this.node.rotation;
    }

    set rotation(r:number) {
        this.node.rotation = r;
    }

    set scale(v:cc.Vec2) {
        this.node.scaleX = v.x;
        this.node.scaleY = v.y;
    }

    // onLoad () {}

    start () {
        
    }

    rebirth() {
        
    }

    // update (dt) {}
}
