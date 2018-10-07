Scene_Name.prototype.onInputOk = function () {
  this._actor.setName(this._editWindow.name());
  EventBus.dispatchEvent(new CustomEvent('Scene_Name.setName', {
    detail: {
      name: this._editWindow.name()
    }
  }));
  this.popScene();
};
