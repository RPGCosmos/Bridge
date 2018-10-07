Scene_Battle.prototype.start = function () {
  Scene_Base.prototype.start.call(this);
  this.startFadeIn(this.fadeSpeed(), false);
  BattleManager.playBattleBgm();
  BattleManager.startBattle();

  EventBus.dispatchEvent(new CustomEvent('Scene_Battle.start', {
    detail: {
      battle: this
    }
  }));
};

Scene_Battle.prototype.update = function () {
  var active = this.isActive();
  $gameTimer.update(active);
  $gameScreen.update();
  this.updateStatusWindow();
  this.updateWindowPositions();
  if (active && !this.isBusy()) {
    this.updateBattleProcess();
  }
  Scene_Base.prototype.update.call(this);
};

Scene_Battle.prototype.updateBattleProcess = function () {
  if (!this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
    BattleManager.update();
    this.changeInputWindow();
  }
};

Scene_Battle.prototype.createPartyCommandWindow = function () {
  this._partyCommandWindow = new Window_PartyCommand();
  this._partyCommandWindow.setHandler('fight', this.commandFight.bind(this));
  this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
  this._partyCommandWindow.deselect();
  this.addWindow(this._partyCommandWindow);
};

Scene_Battle.prototype.createActorCommandWindow = function () {
  this._actorCommandWindow = new Window_ActorCommand();
  this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
  this._actorCommandWindow.setHandler('skill', this.commandSkill.bind(this));
  this._actorCommandWindow.setHandler('guard', this.commandGuard.bind(this));
  this._actorCommandWindow.setHandler('item', this.commandItem.bind(this));
  this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
  this.addWindow(this._actorCommandWindow);
};