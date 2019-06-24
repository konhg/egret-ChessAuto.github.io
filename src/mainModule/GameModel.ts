module game {
	export const enum GAMESTATE {
		/**无状态 */
		NONE = -1,
		/**移动时间 */
		MOVETIME = 0,
		/**移动等待时间 */
		MOVEWAIT = 1,
		/**战斗时间 */
		BATTLETIME = 2,
		/** */

	}
	export class GameModel {
		/**当前状态 */
		public stateInNow: number;
		/**当前商店的棋子数组★ */
		public currentShopHeros: GameHeroVO[] = [];
		/**当前棋盘等级 */
		public level: number = 10;
		/**允许上阵的最大人数 */
		public population: number = 10;
		/**未上阵棋子列表 */
		public notBattleHeros: BattleHeroVO[] = [];
		/**已上阵棋子列表 */
		public battleHeros: BattleHeroVO[][] = [];
		/**棋盘 */
		public checkerboard: any[] = [];
		/**未上阵棋盘 */
		public checkerboardNotBattle: any[] = [];
		public constructor() {
			this.notBattleHeros.length = Global.notBattleNumberMax;
			//初始化二维数组
			for (let i = 0; i < 8; i++) {
				let arr: BattleHeroVO[] = [];
				arr.length = 8;
				this.battleHeros[i] = arr;
			}
			this.checkerboardNotBattle = [
				{ id: 3, text: '' },
				{ id: 4, text: '' },
				{ id: 3, text: '' },
				{ id: 4, text: '' },
				{ id: 3, text: '' },
				{ id: 4, text: '' },
				{ id: 3, text: '' },
				{ id: 4, text: '' },
			]
			this.checkerboard = [
				[
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
				],
				[
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" }
				],
				[
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" }
				],
				[
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" },
					{ id: 2, text: "" },
					{ id: 1, text: "" }
				],
				[
					{ id: 3, text: "" },
					{ id: 4, text: "" },
					{ id: 3, text: "" },
					{ id: 4, text: "" },
					{ id: 3, text: "" },
					{ id: 4, text: "" },
					{ id: 3, text: "" },
					{ id: 4, text: "" }
				],
				[
					{ id: 4, text: "" },
					{ id: 3, text: "" },
					{ id: 4, text: "" },
					{ id: 3, text: "" },
					{ id: 4, text: "" },
					{ id: 3, text: "" },
					{ id: 4, text: "" },
					{ id: 3, text: "" }
				],
				[
					{ id: 3, text: "" },
					{ id: 4, text: "" },
					{ id: 3, text: "" },
					{ id: 4, text: "T" },
					{ id: 3, text: "X" },
					{ id: 4, text: "" },
					{ id: 3, text: "" },
					{ id: 4, text: "" }
				],
				[
					{ id: 4, text: "" },
					{ id: 3, text: "" },
					{ id: 4, text: "N" },
					{ id: 3, text: "M" },
					{ id: 4, text: "S" },
					{ id: 3, text: "L" },
					{ id: 4, text: "" },
					{ id: 3, text: "" }
				],
			];
		}
		/**获取以上阵人数 */
		public getBattleChessNumber(): number {
			let num: number = 0;
			for (let i = 0; i < this.battleHeros.length; i++) {
				for (let j = 4; j < this.battleHeros[i].length; j++) {
					if (!this.battleHeros[i][j] || null == this.battleHeros[i][j] || undefined == this.battleHeros[i][j]) {
						continue;
					}
					num++;
				}
			}
			return num;
		}
		/**设置所有的战斗棋子的选中状态 */
		public setAllBattleChessTouchFalse(bool: boolean): void {
			let dx: BattleHeroVO = null;
			for (let i = 0; i < this.battleHeros.length; i++) {
				for (let j = 4; j < this.battleHeros[i].length; j++) {
					if (!this.battleHeros[i][j] || null == this.battleHeros[i][j] || undefined == this.battleHeros[i][j]) {
						continue;
					}
					dx = this.battleHeros[i][j];
					dx.ChessExample.settouch(bool);
				}
			}
		}
		/**查询棋子是否在战斗列表 */
		public findChessInBattleHerosById(id: number): BattleHeroVO {
			let dx: BattleHeroVO = null;
			for (let i = 0; i < this.battleHeros.length; i++) {
				for (let j = 4; j < this.battleHeros[i].length; j++) {
					if (!this.battleHeros[i][j] || null == this.battleHeros[i][j] || undefined == this.battleHeros[i][j]) {
						continue;
					}
					dx = this.battleHeros[i][j];
					console.log(i, j, dx.ChessExample.id);
					if (dx.ChessExample.id == id) {
						return dx;
					}
				}
			}
			return null;
		}
		/**查询棋子是否在未战斗列表 */
		public findChessInNotBattleHerosById(id: number): BattleHeroVO {
			for (let j = 0; j < this.notBattleHeros.length; j++) {
				let dy: BattleHeroVO = null;
				if (!this.notBattleHeros[j] || null == this.notBattleHeros[j] || undefined == this.notBattleHeros[j]) {
					continue;
				}
				dy = this.notBattleHeros[j];
				console.log(j, dy.ChessExample.id);
				if (dy.ChessExample.id == id) {
					return dy;
				}
			}
			return null;
		}
		/**把棋子移动到已战斗棋子列表 */
		public moveNotBattleHerosToBattleHeros(id: number, targetX: number, targetY: number): void {
			let arrN: BattleHeroVO[] = [...this.notBattleHeros];//拷贝原始数组
			let n: BattleHeroVO;
			for (let i = 0; i < arrN.length; i++) {
				n = arrN[i];
				if (!n || n == undefined || n == null) {
					continue;
				}
				if (n.ChessExample.id == id) {
					this.battleHeros[targetX][targetY] = n;
					this.battleHeros[targetX][targetY].targetX = targetX;
					this.battleHeros[targetX][targetY].targetY = targetY;
					this.notBattleHeros[i] = null;
					arrN = n = null;
					console.dir(this.battleHeros);
					return;
				}
			}
			let arrB: BattleHeroVO[][] = [...this.battleHeros];//拷贝原始数组
			let b: BattleHeroVO;
			for (let i = 0; i < arrB.length; i++) {
				for (let j = 4; j < arrB[i].length; j++) {
					b = arrB[i][j];
					if (!b || b == undefined || b == null) {
						continue;
					}
					if (b.ChessExample.id == id) {
						if (targetX == i && targetY == j) {
							return;
						}
						this.battleHeros[targetX][targetY] = b;
						this.battleHeros[targetX][targetY].targetX = targetX;
						this.battleHeros[targetX][targetY].targetY = targetY;
						this.battleHeros[i][j] = null;
						arrB = b = null;
						console.dir(this.battleHeros);
						return;
					}
				}
			}
		}
		/**把棋子移到未战斗棋子列表 */
		public moveBattleHerosToNotBattleHeros(id: number, targetX: number, targetY: number): void {
			let arr: BattleHeroVO[][] = [...this.battleHeros];
			for (let i = 0; i < arr.length; i++) {
				for (let j = 4; j < arr[i].length; j++) {
					if (!arr[i][j] || arr[i][j] == undefined || arr[i][j] == null) {
						continue;
					}
					if (arr[i][j].ChessExample.id == id) {
						this.notBattleHeros[targetX] = arr[i][j];//new NotBattleHeroVO(arr[i][j].info, arr[i][j].id, arr[i][j].star, targetX);
						this.notBattleHeros[targetX].targetX = targetX;
						this.notBattleHeros[targetX].targetY = targetY;
						this.battleHeros[i][j] = null;
						arr = null;
						console.dir(this.notBattleHeros);
						return;
					}
				}
			}
			let arrN: BattleHeroVO[] = [...this.notBattleHeros];//拷贝原始数组
			let n: BattleHeroVO;
			for (let i = 0; i < arrN.length; i++) {
				n = arrN[i];
				if (!n || n == undefined || n == null) {
					continue;
				}
				if (n.ChessExample.id == id) {
					if (n.targetX == targetX) {
						return;
					}
					this.notBattleHeros[targetX] = n;
					this.notBattleHeros[targetX].targetX = targetX;
					this.notBattleHeros[targetX].targetY = targetY;
					this.notBattleHeros[i] = null;
					arrN = n = null;
					console.dir(this.notBattleHeros);
					return;
				}
			}
		}
	}
	export class GameHeroVO {
		/**
		 * 棋子数据
		 * @author konhg
		 * @description 包含棋子的基本数据
		 * @param name 名字
		 * @param types 职业
		 * @param atk 攻击力
		 * @param ftk 防御力
		 * @param cost 费用
		 */
		public constructor(public name: string, public types: string[] = [], public atk: number, public ftk: number, public cost: number) {

		}
	}
	/**
	 * 已战斗棋子数据
	 * @author konhg
	 * @description 棋子的战斗数据
	 * @param targetX 所在的数组下标
	 * @param targetY 所在的数组下标
	 * @param ChessExample 棋子界面上实例
	 */
	export interface BattleHeroVO {
		targetX?: number;
		targetY?: number;
		ChessExample?: Hero;
	}
}