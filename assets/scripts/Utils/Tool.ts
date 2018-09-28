import GameManager from "../Logic/GameManager";

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

    static encryptStr(str:string) {
        let fun = require('../Utils/XXTeaJs');
        str = fun.encrypt(str, GameManager.Instance.m_GameData.encryptKey);
        return str;
    }
    
    static decryptStr(str:string) {
        let fun = require('../Utils/XXTeaJs');
        str = fun.decrypt(str, GameManager.Instance.m_GameData.encryptKey);
        return str;
    }
}
