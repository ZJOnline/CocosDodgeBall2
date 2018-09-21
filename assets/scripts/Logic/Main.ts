import SceneManager from "../Utils/SceneManager/SceneManager";
import { LoaderMgr } from "../Utils/LoaderMgr";
import { gen_handler } from "../Utils/Utils";
import { TimerMgr } from "../Utils/TimerMgr";
import JsonReader from "../Utils/DataLoader/JsonReader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    private static m_instance: Main;
    public static get Instance() {
        return Main.m_instance;
    }

    canvas: any;

    onLoad() {
        Main.m_instance = this;
        cc.game.addPersistRootNode(this.node);

        LoaderMgr.get_inst().loadAsset("Prefabs/UI/Canvas", gen_handler((res: any): void => {
            this.canvas = res;
            SceneManager.Instance.loadScene("Main");
        }), cc.Prefab);

        new JsonReader();
    }

    start () {
        // SceneManager.Instance.loadScene("Main");
    }

    update(dt) {
        TimerMgr.getInst().update(dt);
    }
}
