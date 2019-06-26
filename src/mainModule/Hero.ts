module game {
	/**
	 * 单个棋子实例
	 * @author konhg
	 * @description 实例化单个棋子，继承eui.Panel，可拖拽
	 * @param heroID 棋子数据, 唯一
	 * @param heroStar 棋子的星级, 不唯一
	 * @param moveChessToBattleGroup 拖拽到战斗列表方法
	 * @param moveChessToNotBattleGroup 拖拽到未战斗列表方法
	 */
	export class Hero extends eui.Panel {
		private pointX: number;
		private pointY: number;
		public constructor(public heroInfo: GameHeroVO, public id: number, public heroStar: number, public model: GameModel, public moveChessToBattleGroup?: Function, public moveChessToNotBattleGroup?: Function) {
			super();
			this.skinName = "HeroBattle";
		}
		public refresh(): void {
			(<eui.Label>this['star']).text = this.heroStar + '';
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance)
			switch (partName) {
				case 'name':
					(<eui.Label>instance).textFlow = new egret.HtmlTextParser().parser(`<font color=${Global.getQualityColor(this.heroInfo.cost)}>${this.heroInfo.name}</font>`);
					break;
				case 'star':
					(<eui.Label>instance).text = this.heroStar + '';
					break;
			}
		}
		/**设置是否可拖拽 */
		public settouch(bool: boolean): void {
			this.touchChildren = bool;
		}
		protected onTouchBegin(event: egret.TouchEvent): void {
			super.onTouchBegin(event);
			this.pointX = this.x;
			this.pointY = this.y;
			this.parent.setChildIndex(this, this.parent.numChildren - 1);
			this.parent.parent.setChildIndex(this.parent, this.parent.parent.numChildren - 1);
			/**生成一个小tip */
			let tips: eui.Component = new eui.Component();
			tips.name = 'heroTips';
			tips.skinName = 'HeroTips';
			(<eui.Label>tips['heroName']).text = this.heroInfo.name;
			(<eui.Label>tips['heroName']).textColor = Global.getQualityColor(this.heroInfo.cost);
			(<eui.Label>tips['atk']).text = "攻击力:" + this.heroInfo.atk;
			(<eui.Label>tips['ftk']).text = "防御力:" + this.heroInfo.ftk;
			this.addChild(tips);
			tips.x = 0;
			tips.y = -tips.height;
			tips = null;
		}
		protected onTouchMove(event: egret.TouchEvent): void {
			super.onTouchMove(event);
		}
		protected onTouchEnd(event: egret.TouchEvent): void {
			super.onTouchEnd(event);
			if (this.getChildByName('heroTips') != null) {
				this.removeChild(this.getChildByName('heroTips'));
			}
			let battleGroup: eui.Group = (<eui.Group>this.parent.parent['battlegroup']);
			let battleGroupX: number = battleGroup.x;
			let battleGroupY: number = battleGroup.y;
			let battleGroupWidth: number = battleGroup.width;
			let battleGroupHeight: number = battleGroup.height;
			let notBattleGroup: eui.Group = (<eui.Group>this.parent.parent['notbattlegroup']);
			let notbattleGroupX: number = notBattleGroup.x;
			let notbattleGroupY: number = notBattleGroup.y;
			let notbattleGroupWidth: number = notBattleGroup.width;
			let notbattleGroupHeight: number = notBattleGroup.height;

			if (event.stageX >= battleGroupX && event.stageX <= (battleGroupX + battleGroupWidth) && event.stageY >= battleGroupY && event.stageY <= (battleGroupY + battleGroupHeight)) {
				//扔到已上阵列表,移动格子
				let targetPoint: egret.Point = battleGroup.globalToLocal(event.stageX, event.stageY);
				let targetX = Math.abs(Math.floor(targetPoint.x / Global.chessWidth));
				let targetY = Math.abs(Math.floor(targetPoint.y / Global.chessHeight));
				if (targetY > 3 && (this.model.battleHeros[targetX][targetY] == null || this.model.battleHeros[targetX][targetY] == undefined)) {
					if (this.model.stateInNow != GAMESTATE.MOVETIME || (this.model.findChessInBattleHerosById(this.id) == null && this.model.getBattleChessNumber() >= this.model.population)) {
						//还原坐标
						this.x = this.pointX;
						this.y = this.pointY;
						return;
					}
					let hX = targetX * Global.chessWidth;
					let hY = targetY * Global.chessHeight;
					this.moveChessToBattleGroup(this.id, targetX, targetY, hX, hY, this);
					return;
				}
			} else if (event.stageX >= notbattleGroupX && event.stageX <= (notbattleGroupX + notbattleGroupWidth) && event.stageY >= notbattleGroupY && event.stageY <= (notbattleGroupY + notbattleGroupHeight)) {
				//扔到未上阵列表，移动格子

				let targetPoint: egret.Point = notBattleGroup.globalToLocal(event.stageX, event.stageY);
				let targetX = Math.abs(Math.floor(targetPoint.x / Global.chessWidth));
				if (this.model.notBattleHeros[targetX] == null || this.model.notBattleHeros[targetX] == undefined) {
					let hX = targetX * Global.chessWidth;
					this.moveChessToNotBattleGroup(this.id, targetX, 0, hX, 0, this);
					return;
				}
			}
			//还原坐标
			this.x = this.pointX;
			this.y = this.pointY;
		}
		/**移除自己 */
		public removeThis(): void {
			this.close();
		}
	}
}