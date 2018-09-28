import Tool from "../Utils/Tool";
import DataTable from "../Utils/DataLoader/DataTable";
import { handler } from "../Utils/Utils";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass("Prefab")
class Prefab{
    @property(cc.String)
    name: cc.String = "";
    @property(cc.Integer)
    count: cc.Integer = 0;
}

@ccclass
export default class ObjectPool extends cc.Component {

    @property([Prefab])
    prefabs: Prefab[] = [];

    public pool: { [key: string]: Array<cc.Node> } = {};
    public static instance: ObjectPool = null;
    public inited: boolean = false;

    onLoad() {
        ObjectPool.instance = this;
        this.init();
    }

    start() {

    }

    init() {
        let pools = DataTable.ObjectPoolDT.getAllDataList();

        for (let i = 0; i < pools.length; i++) {
            cc.loader.loadRes(pools[i].path + pools[i].name, (error: Error, resource: any) => {
                this.pool[pools[i].name] = new Array<cc.Node>();
                for (let j = 0; j < pools[i].count; j++) {
                    let ob: cc.Node = cc.instantiate(resource);
                    ob.position = new cc.Vec2(2000, 2000);
                    ob.name = pools[i].name;
                    this.pool[pools[i].name].push(ob);
                }
                if (i == pools.length - 1) {
                    console.log(i);
                    this.inited = true;
                }
            });
        }
    }

    getObject(name: string): cc.Node {
        if (this.pool[name] == undefined)
            return null
        if (this.pool[name].length > 0) {
            if (this.pool[name].length > 1) {
                let ob = this.pool[name].shift();
                ob.active = true;
                if (ob.isValid) {
                    return ob;
                }
                else {
                    console.log("error");
                }
            }
            else {
                let ob: cc.Node = cc.instantiate(this.pool[name][0]);
                ob.position = new cc.Vec2(2000, 2000);
                return ob;
            }
        }
        return null;
    }

    showEntity(path: string, name: string, cb: handler) {
        let ob = this.getObject(name);
        if (ob != null) {
            cb.exec(ob);
            return;
        }
        cc.loader.loadRes(path + name, (error: Error, resource: any) => { 
            this.pool[name] = new Array<cc.Node>();
            let ob: cc.Node = cc.instantiate(resource);
            ob.position = new cc.Vec2(2000, 2000);
            ob.name = name;
            // this.pool[name].push(ob);
            // ob = cc.instantiate(resource);
            // ob.position = new cc.Vec2(2000, 2000);
            // ob.name = name;
            cb.exec(ob);
        })
    }

    returnPool(node: cc.Node) {
        let name = node.name;
        if (this.pool[name] != null || this.pool[name] != undefined) {
            this.pool[name].push(node);
            node.active = false;
            node.position = cc.v2(2000, 2000);
        }
        else {
            console.log("returnPool error!");

        }
    }
}
