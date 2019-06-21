var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameController = (function () {
        function GameController() {
            this._gameModel = new game.GameModel();
        }
        Object.defineProperty(GameController, "this", {
            get: function () {
                if (this._this == null) {
                    this._this = new GameController();
                }
                return this._this;
            },
            enumerable: true,
            configurable: true
        });
        GameController.prototype.showPanel = function () {
            if (this.gamePanel == null) {
                this.gamePanel = new game.GamePanel(this._gameModel);
                game.Global.gameController.addChild(this.gamePanel);
            }
        };
        GameController.prototype.closePanel = function () {
            if (this.gamePanel != null) {
                game.Global.gameController.removeChild(this.gamePanel);
                this.gamePanel = null;
            }
        };
        Object.defineProperty(GameController.prototype, "model", {
            get: function () {
                return this._gameModel;
            },
            enumerable: true,
            configurable: true
        });
        return GameController;
    }());
    game.GameController = GameController;
    __reflect(GameController.prototype, "game.GameController");
})(game || (game = {}));
//# sourceMappingURL=GameController.js.map