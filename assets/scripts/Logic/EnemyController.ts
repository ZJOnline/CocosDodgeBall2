import GameManager from "./GameManager";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyController extends cc.Component {

    player: cc.Node;

    state: BallState = BallState.Attack;

    // onLoad () {}

    start () {
        
    }

    update(dt) {
        let deltaV = this.player.position.sub(this.node.position);
        switch (this.state) {
            case BallState.Attack:
                this.node.position = this.node.position.add(deltaV.normalize().mul(GameManager.Instance.m_GameData.enemyBallSpeed));
                break;
            case BallState.Run:
                this.node.position = this.node.position.sub(deltaV.normalize().mul(GameManager.Instance.m_GameData.enemyBallSpeed));
                break;
        }
        
        
    }

    changeState(_state: BallState) {
        this.state = _state;
    }
}

export enum BallState{
    Attack = 1,
    Run = 2,
    
}
