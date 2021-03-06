import ISceneState from "../Utils/SceneManager/ISceneState";
import SceneManager, { SceneName } from "../Utils/SceneManager/SceneManager";
import { UIManager, UI_CONFIG, UI_TRANSITION_TYPE, UI_POP_TYPE } from "../Utils/UIManager";
import { gen_handler } from "../Utils/Utils";
import { LoaderMgr } from "../Utils/LoaderMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameSceneState extends ISceneState {

    /**
     *
     */
    constructor() {
        super();
        this.stateName = SceneName.Game;
    }

    enterScene() {
        console.log("enter game scene");
        LoaderMgr.get_inst().loadPrefabObj("Prefabs/GamePlay", gen_handler((_node) => {
            cc.director.getScene().addChild(_node);
        },this));
    }
    
    exitScene() {
        console.log("leave game scene");
    }

}
