import NetworkPlayer from "./NetworkPlayer";
import Types from "../types";
import EventBus from "../bus";

export default class NetworkBattleManager {

  constructor(socket) {
    this.socket = socket;
    this.players = {};
  }

  registerGameHooks() {
    EventBus.addEventListener('Scene_Battle.start', function (e) {
      console.info('Scene_Battle.start', e.detail);
    });
    EventBus.addEventListener('Scene_Battle.update', function (e) {
      console.info('Scene_Battle.update', e.detail);
    });
  }

  registerServerHooks() {
  }


}