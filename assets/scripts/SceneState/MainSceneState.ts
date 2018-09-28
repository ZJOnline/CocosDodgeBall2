import ISceneState from "../Utils/SceneManager/ISceneState";
import { SceneName } from "../Utils/SceneManager/SceneManager";
import { UIManager, UI_CONFIG, UI_TRANSITION_TYPE } from "../Utils/UIManager";
import { TweenFunc } from "../Utils/tweenfunc";
import WXTools from "../Utils/WX/WXTools";
import { gen_handler } from "../Utils/Utils";
import GameManager from "../Logic/GameManager";
import xxtea from "../Utils/xxtea";
import Tool from "../Utils/Tool";
import NodeTool from "../Utils/NodeTool";


declare function xxtea_encrypt(str:string, key:string);
declare function xxtea_decrypt(str:string, key:string);

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainSceneState extends ISceneState {

    /**
     *
     */
    constructor() {
        super();
        this.stateName = SceneName.Main;
    }

    enterScene() {
        console.log("enter main scene");
        UIManager.get_inst().show(UI_CONFIG.GameStartUI, 1, {
            transType: UI_TRANSITION_TYPE.RightIn,
            tweenFunc: TweenFunc.Cubic.easeOut,
            duration: 0.3,
        });

        this.initPlayerInfo();
    }

    exitScene() {
        console.log("leave main scene");
    }

    initPlayerInfo() {
        // WXTools.writeFile("111",gen_handler(() => {
        //     WXTools.readFile(gen_handler((_data: string) => {
        //         console.log(_data);  
        //     }))
        // }));

        WXTools.readFile(gen_handler((_data: string) => {
            _data = Tool.decryptStr(_data.toString());
            console.log(_data);
            GameManager.Instance.m_StorageData = JSON.parse(_data);
        }));
        let a = NodeTool.getAngleFromPosition(cc.v2(0, 0), cc.v2(-1, 1));
        console.log("a=", a);
    }
}

