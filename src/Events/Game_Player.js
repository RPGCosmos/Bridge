import hooker from '../hooker';
import EventBus from "../bus";

/*
 * Available Events:
 * Game_Player.move.before
 * Game_Player.move.after
 */

/**
 * moveByInput is called very frequently, cannot dispatch all the time.
 *
 * @TODO: Is this the right method for movement?
 */
// Game_Player.prototype.moveByInput = function () {
//     if (!this.isMoving() && this.canMove()) {
//         var direction = this.getInputDirection();
//         if (direction > 0) {
//             $gameTemp.clearDestination();
//         } else if ($gameTemp.isDestinationValid()) {
//             var x = $gameTemp.destinationX();
//             var y = $gameTemp.destinationY();
//             direction = this.findDirectionTo(x, y);
//         }
//         if (direction > 0) {
//             EventBus.dispatchEvent(new CustomEvent('Game_Player.moveByInput.beforeMove', {
//                 detail: {
//                     map_id: $gameMap.mapId(),
//                     x: this.x,
//                     y: this.y,
//                     direction: direction,
//                     moveSpeed: this.realMoveSpeed(),
//                     moveFrequency: this.moveFrequency(),
//                     characterName: this._characterName,
//                     characterIndex: this._characterIndex
//                 }
//             }));

//             this.executeMove(direction);

//             EventBus.dispatchEvent(new CustomEvent('Game_Player.moveByInput.afterMove', {
//                 detail: {
//                     map_id: $gameMap.mapId(),
//                     x: this.x,
//                     y: this.y,
//                     direction: direction,
//                     moveSpeed: this.realMoveSpeed(),
//                     moveFrequency: this.moveFrequency(),
//                     characterName: this._characterName,
//                     characterIndex: this._characterIndex
//                 }
//             }));
//         }
//     }
// };

hooker('Game_Player', 'executeMove', function() {
    EventBus.dispatchEvent('Game_Player.move.before', {
        detail: {
            map_id: $gameMap.mapId(),
            x: this.x,
            y: this.y,
            moveSpeed: this.realMoveSpeed(),
            moveFrequency: this.moveFrequency(),
            characterName: this._characterName,
            characterIndex: this._characterIndex
        }
    });
}, function() {
    EventBus.dispatchEvent('Game_Player.move.before', {
        detail: {
            map_id: $gameMap.mapId(),
            x: this.x,
            y: this.y,
            moveSpeed: this.realMoveSpeed(),
            moveFrequency: this.moveFrequency(),
            characterName: this._characterName,
            characterIndex: this._characterIndex
        }
    });
})

hooker('Game_Player', 'refresh', undefined, function() {
    EventBus.dispatchEvent('Game_Player.refresh', {
        detail: {
            characterName: this._characterName,
            characterIndex: this._characterIndex
        }
    });
});
