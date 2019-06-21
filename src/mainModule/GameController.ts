module game {
	export class GameController {
		private gamePanel: GamePanel;
		private _gameModel: GameModel;
		private static _this: GameController;
		public constructor() {
			this._gameModel = new GameModel();
		}
		public static get this(): GameController {
			if (this._this == null) {
				this._this = new GameController();
			}
			return this._this;
		}
		public showPanel(): void {
			if (this.gamePanel == null) {
				this.gamePanel = new GamePanel(this._gameModel);
				Global.gameController.addChild(this.gamePanel);
			}
		}
		public closePanel(): void {
			if (this.gamePanel != null) {
				Global.gameController.removeChild(this.gamePanel);
				this.gamePanel = null;
			}
		}
		public get model(): GameModel {
			return this._gameModel;
		}
	}
}