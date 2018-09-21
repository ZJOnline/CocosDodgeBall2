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

@ccclass
export default class Tool {
    static writeLog = true;

    static getRandomIntNum(min: number, max: number) {
        let Range = max - min;
        let Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }

    static getRandomFloatNum(min: number, max: number) {
        let Range = max - min;
        let Rand = Math.random();
        return (min + Rand * Range);
    }

    static setNodeActive(_node: cc.Node, b: boolean) {
        if (_node.active != b) {
            _node.active = b;
        }
    }

    /**
     * 获取子节点上的组件
     * @param path 路径
     * @param parent 父节点
     * @param type 组件类型
     */
    static findChildComponent<T extends cc.Component>(path: string, parent: cc.Node, type: { prototype: T }) {
        let child = cc.find(path, parent);
        if (child == null || child == undefined) {
            this.log("can't find ", path);
            return null;
        }
        let resoult = child.getComponent(type);
        return resoult;
    }

    static log(message?: any, ...optionalParams: any[]) {
        if (this.writeLog) {
            console.log(message, optionalParams);
        }
    }

    static lerp(start: number, end: number, t: number): number {
        let result = 0;
        if (t > 1) {
            t = 1;
        } else if (t < 0) {
            t = 0;
        }
        let tem = end - start;
        result = tem * t;
        result = result + start;
        return result;
    }
}
