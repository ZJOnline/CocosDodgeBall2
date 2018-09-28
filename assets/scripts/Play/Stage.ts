import DataTable from "../Utils/DataLoader/DataTable";
import Tool from "../Utils/Tool";
import GamePlay from "./GamePlay";
import { StageDTItem } from "../Utils/DataLoader/DataClasses";
import { TimerMgr } from "../Utils/TimerMgr";
import { gen_handler } from "../Utils/Utils";
import { LoaderMgr } from "../Utils/LoaderMgr";
import SceneManager from "../Utils/SceneManager/SceneManager";
import BaseShooter from "../Logic/Shooter/BaseShooter";

export default class Stage {

    id: number;
    aliveTime: number;
    name: string;

    stageData: StageDTItem;

    /**
     *
     */
    constructor(id: number) {
        if (id > DataTable.StageDT.getAllDataList().length) {
            id = id - 1;
        }
        this.id = id;
        GamePlay.Instance.curSelectStageIndex = id;
        this.stageData = DataTable.StageDT.getData(id);
        this.initStage();
    }

    initStage() {
        let d = DataTable.StageDT.getData(this.id);
        if (d == null) {
            Tool.log("can't find id=", this.id);
            return;
        }
        this.aliveTime = d.time;
        this.name = d.name;

        TimerMgr.getInst().once(2, gen_handler(() => {
            LoaderMgr.get_inst().loadPrefabObj("Prefabs/Enemy/MHoleCircle", gen_handler((_node: cc.Node) => {
                _node.parent = SceneManager.Instance.sceneObjects;
                _node.position = cc.Vec2.ZERO;
                let shooter = _node.getComponent(BaseShooter);
                shooter.shot();
            }));
        }));
    }
}
