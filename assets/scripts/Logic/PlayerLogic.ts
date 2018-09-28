import EntityLogic from "./EntityLogic";
import ObjectPool from "./ObjectPool";
import EnemyController from "./EnemyController";
import EnemyBallView from "../View/EnemyBallView";
import { LoaderMgr } from "../Utils/LoaderMgr";
import { gen_handler } from "../Utils/Utils";
import SceneManager from "../Utils/SceneManager/SceneManager";
import PlayerView from "../View/PlayerView";
import PlayerController from "./PlayerController";
import { UIManager, UI_CONFIG } from "../Utils/UIManager";
import GamePlay from "../Play/GamePlay";

export default class PlayerLogic extends EntityLogic {

    m_view: PlayerView;
    m_controller: PlayerController;
    alive = true;

    spawn() {

        let ob = ObjectPool.instance.getObject("Player");
        SceneManager.Instance.sceneObjects.addChild(ob);
        ob.position = cc.Vec2.ZERO;
        this.m_controller = ob.getComponent(PlayerController);
        this.m_view = ob.getComponent(PlayerView);
        this.m_view.logic = this;
        this.m_view.rebirth();
    }

    /**
     * 撞到球，死亡
     */
    die() {
        if (!this.alive) {
            return;
        }
        super.die();
        this.alive = false;
        this.m_view.node.active = false;
        this.m_controller.canTouch = false;
        this.m_controller.resetControl();
        UIManager.get_inst().show(UI_CONFIG.GameOverUI);
        GamePlay.Instance.gameOver();
    }

    /**
     * 触发进入下一关trigger
     */
    passStage() {
        this.m_controller.canTouch = false;
        this.m_controller.resetControl();
        GamePlay.Instance.clearScene();
    }

    beginRestartStage() {
        this.m_controller.canTouch = false;
        this.m_controller.resetControl();
    }

}
