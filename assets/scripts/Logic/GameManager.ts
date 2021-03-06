import GameData, { StorageData } from "../Play/GameData";
import TriggerEventMgr from "../Utils/TriggerEventMgr";

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
export default class GameManager extends cc.Component {

    private static _instance: GameManager;

    
    public static get Instance() {
        return this._instance;
    }
    
    m_GameData: GameData;
    m_StorageData: StorageData;
    m_triggerEventMgr: TriggerEventMgr;

    onLoad() {
        GameManager._instance = this;
        cc.director.getCollisionManager().enabled = true;
        this.m_GameData = new GameData();
        this.m_StorageData = new StorageData();
        this.m_triggerEventMgr = new TriggerEventMgr();
    }

    start () {

    }

    // update (dt) {}
}
