module game {
	export class GamePanel extends eui.Component {
		private timer: egret.Timer;
		private countDown: number = 15;

		public constructor(private model: GameModel) {
			super();
			this.skinName = "MainSkin";
			this.countDown = Global.refreshShopTime;

			this.timer = new egret.Timer(1000);

			this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);

			this.model.currentShopHeros = Global.getHeros(this.model.level);
			this.timer.start();
		}
		private isShowPrompt: string[] = [];
		private isShowPromptbool: boolean = false;//显示日志的标记
		/**
		 * @author konhg
		 * @description 显示操作日志，需要的地方调一下
		 * @param txt 显示的文本
		 */
		private showPrompt(txt: string): void {
			if (txt != '') {
				this.isShowPrompt.push(txt);
			}
			if (this.isShowPrompt.length > 0 && this.isShowPromptbool == false) {
				this.isShowPromptbool = true;
				// (<eui.Scroller>this['scroler']).viewport.scrollV = ((<eui.Scroller>this['scroler']).viewport.contentHeight - (<eui.Scroller>this['scroler']).viewport.height);
				// if ((<eui.Scroller>this['scroler']).viewport.contentHeight > (<eui.Scroller>this['scroler']).viewport.height) {
				// 	(<eui.Scroller>this['scroler']).scrollPolicyV = 'ON';
				// }else{
				// 	(<eui.Scroller>this['scroler']).scrollPolicyV = 'OFF';
				// }
				GameTools.showText((<eui.Label>this['prompt']), this.isShowPrompt[0], 120, () => {
					this.isShowPrompt.shift();
					this.isShowPromptbool = false;
					this.showPrompt('');
				})
			}
		}
		private timerFunc(e: egret.TimerEvent): void {
			(<eui.Label>this['Countdown']).textFlow = new egret.HtmlTextParser().parser(`<font color=0xff0000>刷新倒计时:</font><font color=0x00ffff>${this.countDown}</font>`);
			this.countDown--;
			if (this.countDown < 0) {
				this.countDown = Global.refreshShopTime;
				this.model.currentShopHeros = Global.getHeros(this.model.level);
				GameTools.showTips(`商店刷新了新的英雄`, 1);
				this.removeShopPanel();
				return;
			}


		}
		/**移除商店页面 */
		private removeShopPanel(): void {
			if (this['shopgroup'].getChildByName('shoppanel')) {
				this['shopgroup'].removeChild(this['shopgroup'].getChildByName('shoppanel'));
			}
		}
		/**显示商店 */
		private showShopPanel(): void {
			this.removeShopPanel();
			let shopPanel: ShopPanel = new ShopPanel(this.addHero.bind(this), this.model);
			shopPanel.name = 'shoppanel';
			(<eui.Group>this['shopgroup']).addChild(shopPanel);
			this.setChildIndex((<eui.Group>this['shopgroup']), this.numChildren - 1);
			shopPanel = null;
		}
		/**实例化页面添加监听方法 */
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
			switch (partName) {
				case "shopBtn":
					(<eui.Button>instance).addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
						if (this.model.currentShopHeros == null) {
							GameTools.showTips('随机英雄失败', 1, true);
							return;
						}
						this.showShopPanel();
					}, this);
					break;
				case "closeBtn":
					(<eui.Button>instance).addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
						GameController.this.closePanel();
					}, this);
					break;
				case 'battlegroup':
					for (let i = 0; i < this.model.checkerboard.length; i++) {
						for (let j = 0; j < this.model.checkerboard[i].length; j++) {
							let group: eui.Group = new eui.Group();
							group.width = Global.chessWidth;
							group.height = Global.chessHeight;
							(<eui.Group>instance).addChild(group);
							group.x = Global.chessWidth * j;
							group.y = Global.chessHeight * i;
							let rect: eui.Rect = new eui.Rect(Global.chessWidth, Global.chessHeight);
							switch (this.model.checkerboard[i][j]['id']) {
								case 1:
									rect.fillColor = 0x00ff00;
									break;
								case 2:
									rect.fillColor = 0xff0000;
									break;
								case 3:
									rect.fillColor = 0x000000;
									break;
								case 4:
									rect.fillColor = 0xffffff;
									break;
							}

							group.addChild(rect);
							rect.verticalCenter = 0;
							rect.horizontalCenter = 0;
							if (this.model.checkerboard[i][j]['text'] != '') {
								let text: eui.Label = new eui.Label(this.model.checkerboard[i][j]['text']);
								group.addChild(text);
								text.size = 50;
								text.bold = true;
								text.textColor = 0xff0000;
								text.fontFamily = "SimHei";
								text.verticalCenter = 0;
								text.horizontalCenter = 0;
							}
						}
					}
					break;
				case "notbattlegroup":
					for (let i = 0; i < this.model.checkerboardNotBattle.length; i++) {
						let group: eui.Group = new eui.Group();
						group.width = Global.chessWidth;
						group.height = Global.chessHeight;
						(<eui.Group>instance).addChild(group);
						group.x = Global.chessWidth * i;
						let rect: eui.Rect = new eui.Rect(Global.chessWidth, Global.chessHeight);
						switch (this.model.checkerboardNotBattle[i]['id']) {
							case 1:
								rect.fillColor = 0x00ff00;
								break;
							case 2:
								rect.fillColor = 0xff0000;
								break;
							case 3:
								rect.fillColor = 0x000000;
								break;
							case 4:
								rect.fillColor = 0xffffff;
								break;
						}
						group.addChild(rect);
						rect.verticalCenter = 0;
						rect.horizontalCenter = 0;
						if (this.model.checkerboardNotBattle[i]['text'] != '') {
							let text: eui.Label = new eui.Label(this.model.checkerboardNotBattle[i]['text']);
							group.addChild(text);
							text.size = 50;
							text.bold = true;
							text.textColor = 0xff0000;
							text.fontFamily = "SimHei";
							text.verticalCenter = 0;
							text.horizontalCenter = 0;
						}
					}
					break;
			}
		}
		/**
		 * 添加商店购买的棋子到未上阵列表
		 * 购买成功失败的判断方法
		 */
		private addHero(index: number, delArr: uplevelObj[]): void {
			if (delArr.length > 0) {
				this.model.currentShopHeros[index] = null;
				this.upDataChess(delArr);
				return;
			}
			let hinfo: BattleHeroVO = {};
			for (let i = 0; i < this.model.notBattleHeros.length; i++) {
				if (this.model.notBattleHeros[i] == null || this.model.notBattleHeros[i] == undefined || !this.model.notBattleHeros[i]) {
					let id = Global.chessID++;
					hinfo.ChessExample = this.addHeroToBattleGroup(this.model.currentShopHeros[index], id, 1);
					hinfo.targetX = i;
					hinfo.targetY = 0;
					this.model.notBattleHeros[i] = hinfo;
					break;
				}
			}
			if (!hinfo.ChessExample) {
				GameTools.showTips('购买失败,未上阵棋子已满', 1, true);
				return;
			}
			this.showPrompt(`购买了${hinfo.ChessExample.heroInfo.name}\n`);
			GameTools.showTips('购买成功', 1);
			this.model.currentShopHeros[index] = null;
		}
		/**升星功能 */
		private upDataChess(arr: uplevelObj[]): void {

			let data: uplevelObj = {};
			/**查询是否在已上阵列表 */
			let findInBattle: Function = (id: number): BattleHeroVO => {
				let dx: BattleHeroVO = null;
				for (let i = 0; i < this.model.battleHeros.length; i++) {
					for (let j = 0; j < this.model.battleHeros[i].length; j++) {
						if (!this.model.battleHeros[i][j] || null == this.model.battleHeros[i][j] || undefined == this.model.battleHeros[i][j]) {
							continue;
						}
						dx = this.model.battleHeros[i][j];
						if (dx.ChessExample.id == id) {
							return dx;
						}
					}
				}
				return null;
			}
			/**查询是否在未上阵列表 */
			let findInNotBattle: Function = (id: number): BattleHeroVO => {
				for (let j = 0; j < this.model.notBattleHeros.length; j++) {
					let dy: BattleHeroVO = null;
					if (!this.model.notBattleHeros[j] || null == this.model.notBattleHeros[j] || undefined == this.model.notBattleHeros[j]) {
						continue;
					}
					dy = this.model.notBattleHeros[j];
					if (dy.ChessExample.id == id) {
						return dy;
					}
				}
				return null;
			}
			let isUplevel: boolean = false;/**是否已升星标记 */
			let dh: BattleHeroVO = null;
			for (let c = 0; c < arr.length; c++) {
				data = arr[c];
				if (findInBattle(data.id) != null && isUplevel == false) {
					dh = findInBattle(data.id);/**优先已上阵列表 */
					break;
				}
			}
			/**如果在已上阵列表内，优先升级以上阵列表的棋子 */
			if (dh == null) {
				for (let c = 0; c < arr.length; c++) {
					data = arr[c];
					let dn: BattleHeroVO = findInNotBattle(data.id);
					if (dn != null && isUplevel == false) {
						isUplevel = true;
						dn.ChessExample.heroStar = arr.length > 2 ? 3 : 2;
						dn.ChessExample.refresh();
						GameTools.showTips(`成功将${dn.ChessExample.heroInfo.name}升至${dn.ChessExample.heroStar}星`, 1);
						this.showPrompt(`${dn.ChessExample.heroInfo.name} 升至${dn.ChessExample.heroStar}星\n`);
					} else {
						this.removeHeroToBattleGroupOrNotBattleGroup(dn.ChessExample.id, dn.targetX, dn.targetY);
					}
				}
			} else {
				for (let c = 0; c < arr.length; c++) {
					data = arr[c];
					let db: BattleHeroVO = findInBattle(data.id);
					if (db != null && isUplevel == false) {
						isUplevel = true;
						db.ChessExample.heroStar = arr.length > 2 ? 3 : 2;
						db.ChessExample.refresh();
						GameTools.showTips(`成功将${db.ChessExample.heroInfo.name}升至${db.ChessExample.heroStar}星`, 1);
						this.showPrompt(`${db.ChessExample.heroInfo.name} 升至${db.ChessExample.heroStar}星\n`);
					} else {
						let db: BattleHeroVO = findInBattle(data.id);
						if (db) {
							this.removeHeroToBattleGroupOrNotBattleGroup(db.ChessExample.id, db.targetX, db.targetY);
						} else {
							let dj: BattleHeroVO = findInNotBattle(data.id);
							this.removeHeroToBattleGroupOrNotBattleGroup(dj.ChessExample.id, dj.targetX, dj.targetY);
						}

					}
				}
			}
		}
		/**添加一个棋子到未上阵列显示容器 */
		private addHeroToBattleGroup(heroInfo: GameHeroVO, id, star): Hero {
			let h: Hero = new Hero(heroInfo, id, star, this.model, this.moveChessToBattleGroup.bind(this), this.moveChessToNotBattleGroup.bind(this));
			h.name = id + '';
			(<eui.Group>this['notbattlegroup']).addChild(h);
			for (let i = 0; i < this.model.notBattleHeros.length; i++) {
				if (this.model.notBattleHeros[i] == null) {
					h.x = Global.chessWidth * (i);
					h.y = 0;
					break;
				}
			}
			return h;
		}
		/**移动棋子，移动到已上阵列表 */
		private moveChessToBattleGroup(id, targetX, targetY, hX, hY, chess: Hero): void {
			(<eui.Group>this['battlegroup']).addChild(chess);
			chess.x = hX;
			chess.y = hY;
			this.model.moveNotBattleHerosToBattleHeros(id, targetX, targetY);
		}
		/**移动棋子，移动到未上阵列表 */
		private moveChessToNotBattleGroup(id, targetX, targetY, hX, hY, chess: Hero): void {
			(<eui.Group>this['notbattlegroup']).addChild(chess);
			chess.x = hX;
			chess.y = hY;
			this.model.moveBattleHerosToNotBattleHeros(id, targetX, targetY);
		}
		/**从界面上移除一个棋子
		 * @param id 生成棋子时的唯一id
		 */
		private removeHeroToBattleGroupOrNotBattleGroup(id: number | string, targetX, targetY): void {
			let i: string = String(id);
			if ((<eui.Group>this['notbattlegroup']).getChildByName(i) != null) {
				this.model.notBattleHeros[targetX] = null;
				(<eui.Group>this['notbattlegroup']).removeChild((<eui.Group>this['notbattlegroup']).getChildByName(i));
			}
			if ((<eui.Group>this['battlegroup']).getChildByName(i) != null) {
				this.model.battleHeros[targetX][targetY] = null;
				(<eui.Group>this['battlegroup']).removeChild((<eui.Group>this['battlegroup']).getChildByName(i));
			}
		}
	}

}