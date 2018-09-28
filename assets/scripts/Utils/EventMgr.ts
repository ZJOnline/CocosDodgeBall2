export class EventMgr
{
    private static inst:EventMgr;
    private listeners:any;          //Event_Name => cb[]

    private constructor()
    {
        this.listeners = {};
    }

    static get Instance():EventMgr
    {
        if(!this.inst)
        {
            this.inst = new EventMgr();
        }
        return this.inst;
    }

    fire(event:Event_Name, ...params:any[]):void
    {
        let cbs:any[] = this.listeners[event];
        if(!cbs)
        {
            return;
        }
        for(let i:number = 0, len:number = cbs.length; i < len; i += 2)
        {
            let cb:any = cbs[i];
            let host:any = cbs[i+1];
            cb.call(host, ...params);
        }
    }

    add(event:Event_Name, cb:Function, host:any = null):void
    {
        let cbs:any[] = this.listeners[event];
        if(!cbs)
        {
            this.listeners[event] = cbs = []; 
        }
        cbs.push(cb, host);
    }

    remove(event:Event_Name, cb:Function)
    {
        let cbs:any[] = this.listeners[event];
        if(!cbs)
        {
            return;
        }
        let index:number = cbs.indexOf(cb);
        if(index < 0)
        {
            cc.warn("EventMgr remove", event, ", but cb not exists!");
            return;
        }
        cbs.splice(index, 2);
    }

    clear()
    {
        for(let key in this.listeners)
        {
            this.listeners[key].length = 0;
        }
        this.listeners = {};
    }
}

/**事件名称定义*/
export enum Event_Name {
    USER_INFO_CHANGED,
    COIN_CHANGED,
    PASS_CHANGED,
    GRADE_CHANGED,
    SHAREHINT_CHANGED,
    GAME_LEVEL_CHANGED,
    UI_SHOW,
    UI_HIDE,
    LEVEL_DATA_LOADED,
    MUTE_MUSIC,
    UNMUTE_MUSIC,
    SWITCH_BG,
    MOVE_DOOR,
    ENTER_STAGE,
    GAME_OVER,
    TRIGGER_ENTER,
    GOTO_NEXT_STAGE,
    RETURN_HOME,
    RESTART_STAGE,
}