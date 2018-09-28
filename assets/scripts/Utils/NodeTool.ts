import Tool from "./Tool";

export default class NodeTool {

    
    /**
     * 设置节点的active属性，防止性能浪费
     * @param _node 
     * @param b 
     */
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
            Tool.log("can't find ", path);
            return null;
        }
        let resoult = child.getComponent(type);
        return resoult;
    }

    static getAngleFromNode(fromNode: cc.Node, toNode: cc.Node) {
        if (fromNode == undefined || toNode == undefined) {
            return 0;
        }
        let v1 = toNode.position.sub(fromNode.position);
        let rad = v1.normalize().signAngle(cc.Vec2.UP);
        let angle = (rad * 180) / Math.PI;
        angle = this.get360Angle(angle);
        return angle;
    }

    static getAngleFromPosition(fromNode: cc.Vec2, toNode: cc.Vec2) {
        if (fromNode == undefined || toNode == undefined) {
            return 0;
        }
        let v1 = toNode.sub(fromNode);
        let rad = v1.normalize().signAngle(cc.Vec2.UP);
        let angle = (rad * 180) / Math.PI;
        angle = this.get360Angle(angle);
        return angle;
    }

    static get360Angle(angle:number) {
        while (angle < 0) {
            angle += 360;
        }
        while (360 < angle) {
            angle -= 360;
        }
        return angle;
    }

    static getVec2FromAngle(angle: number) {
        angle = this.get360Angle(angle);
        let x, y;
        if (angle >= 0 && angle <= 90) {
            x = Math.cos(90 - angle);
            y = Math.sin(90 - angle);
        }
        else if (angle > 90 && angle <= 180) {
            x = Math.cos(angle-90);
            y = -Math.sin(angle-90);
        }
        else if (angle > 180 && angle < 270) {
            y = -Math.cos(angle-180);
            x = -Math.sin(angle-180);
        }
        else if (angle >= 270 && angle <= 360) {
            x = -Math.cos(angle-270);
            y = Math.sin(angle-270);
        }
        return cc.v2(x, y);
    }

}
