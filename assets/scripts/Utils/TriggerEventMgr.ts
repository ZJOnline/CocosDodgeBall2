import { EventMgr, Event_Name } from "./EventMgr";
import GamePlay from "../Play/GamePlay";

export default class TriggerEventMgr {

    /**
     *
     */
    constructor() {
                
        EventMgr.Instance.add(Event_Name.TRIGGER_ENTER, this.onTriggerEnter, this);
    }

    onTriggerEnter(...params: any[]) {
        let triggerID = params[0];
        let triggerType = params[1];
        switch (triggerType) {
            case 1:
                GamePlay.Instance.player.passStage();
                EventMgr.Instance.fire(Event_Name.GOTO_NEXT_STAGE);
                break;
        
            default:
                break;
        }
    }
}

/**
 * triggerType
 * 1:过关后网上走触发的trigger
 * 
 * 
 */
