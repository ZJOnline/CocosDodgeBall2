import { EventMgr, Event_Name } from "./EventMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TriggerEventDispatcher extends cc.Component {

    @property(Number)
    triggerID:number = 0;
    @property(Number)
    triggerType:number = 0;

    start () {

    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        EventMgr.Instance.fire(Event_Name.TRIGGER_ENTER, this.triggerID,this.triggerType);
    }
}
